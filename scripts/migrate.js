import { createClient } from '@sanity/client';
import fetch from 'node-fetch';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';

// 1. Configuración de Sanity
const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
    console.error('❌ ERROR: No has proporcionado tu Token de Sanity.');
    console.error('Genera uno en https://www.sanity.io/manage, ve a API > Add API token (rol Editor).');
    console.error('Luego ejecuta el script así en Powershell:');
    console.error('$env:SANITY_TOKEN="TU_TOKEN_AQUI"; node scripts/migrate.js');
    process.exit(1);
}

const client = createClient({
    projectId: 't01yxrzf', // El proyecto actual
    dataset: 'production',
    useCdn: false,
    token: SANITY_TOKEN,
    apiVersion: '2024-02-28',
});

// 2. Configuración de Block Tools para convertir HTML a PortableText
const blockContentType = Schema.compile({
    name: 'myBlog',
    types: [
        {
            type: 'object',
            name: 'blogPost',
            fields: [
                {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [{ type: 'block' }, { type: 'image' }],
                },
            ],
        },
        {
            type: 'object',
            name: 'htmlBlock',
            fields: [
                {
                    title: 'HTML',
                    name: 'html',
                    type: 'text'
                }
            ]
        }
    ],
}).get('blogPost').fields.find((field) => field.name === 'body').type;

// Función auxiliar para subir una imagen desde URL a Sanity
async function uploadImageToSanity(imageUrl) {
    try {
        console.log(`Descargando imagen: ${imageUrl}`);
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const buffer = await response.buffer();
        const asset = await client.assets.upload('image', buffer, { filename: imageUrl.split('/').pop() });
        console.log(`✅ Imagen subida a Sanity: ${asset.url}`);
        return asset.url; // Retornamos la URL provista por Sanity (CDN)
    } catch (error) {
        console.error(`❌ Error subiendo imagen ${imageUrl}:`, error.message);
        return imageUrl; // Fallback: si falla, mantenemos la URL original
    }
}

// Custom rule to extract tables/iframes as raw HTML
const blockConfig = {
    parseHtml: html => new JSDOM(html).window.document,
    rules: [
        {
            deserialize(el, next, block) {
                if (el.tagName && (el.tagName.toLowerCase() === 'table' || el.tagName.toLowerCase() === 'iframe' || el.tagName.toLowerCase() === 'figure')) {
                    // Fix lazy loaded images and absolute paths (Ahora apuntarán a Sanity tras pre-procesado)
                    return block({
                        _type: 'htmlBlock',
                        html: el.outerHTML
                    });
                }

                // Fallback for standalone images
                if (el.tagName && el.tagName.toLowerCase() === 'img') {
                    // En este punto, el HTML ya ha sido preprocesado y las imágenes tienen la URL de Sanity
                    return block({
                        _type: 'htmlBlock',
                        html: el.outerHTML
                    });
                }
                return undefined;
            }
        }
    ]
};

// Función para procesar todas las imágenes de un HTML genérico antes de block-tools
async function preprocessImagesInHtml(htmlContent) {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');

    for (const img of images) {
        let originalUrl = img.dataset.src || img.src;

        if (!originalUrl) continue;

        // Componer URL absoluta si es relativa
        if (originalUrl.startsWith('/')) {
            originalUrl = 'https://www.entrenamientoaguasabiertas.com' + originalUrl;
        } else if (!originalUrl.startsWith('http')) {
            originalUrl = 'https://www.entrenamientoaguasabiertas.com/' + originalUrl;
        }

        // Evitar procesar imágenes que ya son de Sanity u otros CDNs externos válidos que no queramos migrar
        if (originalUrl.includes('sanity.io')) continue;

        const sanityUrl = await uploadImageToSanity(originalUrl);
        img.src = sanityUrl;
        img.removeAttribute('srcset'); // Limpiamos srcset para forzar la carga de la imagen principal subida
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
    }

    return document.body.innerHTML;
}

// 3. URLs de WordPress
const WP_API_PAGES = 'https://entrenamientoaguasabiertas.com/wp-json/wp/v2/pages?per_page=100';
const WP_API_POSTS = 'https://entrenamientoaguasabiertas.com/wp-json/wp/v2/posts?per_page=100';

async function migratePages() {
    console.log('⏳ Obteniendo páginas de WordPress...');

    try {
        const res = await fetch(WP_API_PAGES);
        const pages = await res.json();

        if (!Array.isArray(pages)) {
            console.error('❌ La respuesta de WordPress no es un array de páginas.');
            return;
        }

        console.log(`✅ ¡Encontradas ${pages.length} páginas! Empezando migración...`);

        for (const wpPage of pages) {
            const title = wpPage.title.rendered;
            const slug = wpPage.slug;
            let htmlContent = wpPage.content.rendered;

            // Fix global URLs pointing to the old WP domain
            htmlContent = htmlContent.replace(/https?:\/\/(www\.)?entrenamientoaguasabiertas\.com/g, '');

            console.log(`\n📄 Procesando: ${title}`);

            // Convertir HTML a PortableText, preprocesando las imágenes antes
            const processedHtmlContent = await preprocessImagesInHtml(htmlContent);
            const blocks = htmlToBlocks(processedHtmlContent, blockContentType, blockConfig);

            // Crear o Reemplazar el documento en Sanity
            const sanityDoc = {
                _type: 'page',
                _id: `wp-page-${wpPage.id}`,
                title: title,
                slug: { current: slug },
                content: blocks,
            };

            try {
                const result = await client.createOrReplace(sanityDoc);
                console.log(`✅ Creado en Sanity con ID: ${result._id}`);
            } catch (err) {
                console.error(`❌ Error importando "${title}":`, err.message);
            }
        }

        console.log('\n🎉 ¡Migración de páginas COMPLETADA!');

    } catch (err) {
        console.error('❌ Error capturando de WordPress:', err.message);
    }
}

async function migratePosts() {
    console.log('\n⏳ Obteniendo artículos del Blog de WordPress...');

    try {
        const res = await fetch(WP_API_POSTS);
        const posts = await res.json();

        if (!Array.isArray(posts)) {
            console.error('❌ La respuesta de WordPress no es un array de posts.');
            return;
        }

        console.log(`✅ ¡Encontrados ${posts.length} artículos! Empezando migración...`);

        for (const wpPost of posts) {
            const title = wpPost.title.rendered;
            const slug = wpPost.slug;
            let htmlContent = wpPost.content.rendered;

            // Fix global URLs pointing to the old WP domain
            htmlContent = htmlContent.replace(/https?:\/\/(www\.)?entrenamientoaguasabiertas\.com/g, '');

            const excerpt = wpPost.excerpt ? wpPost.excerpt.rendered.replace(/<[^>]*>?/gm, '') : '';
            const publishedAt = wpPost.date;

            console.log(`\n📝 Procesando POST: ${title}`);

            // Preprocesar imágenes en el Post y convertir a bloques
            const processedHtmlContent = await preprocessImagesInHtml(htmlContent);
            const blocks = htmlToBlocks(processedHtmlContent, blockContentType, blockConfig);

            const sanityDoc = {
                _type: 'post',
                _id: `wp-post-${wpPost.id}`,
                title: title,
                slug: { current: slug },
                excerpt: excerpt,
                publishedAt: publishedAt,
                body: blocks,
            };

            try {
                const result = await client.createOrReplace(sanityDoc);
                console.log(`✅ Post Creado en Sanity con ID: ${result._id}`);
            } catch (err) {
                console.error(`❌ Error importando post "${title}":`, err.message);
            }
        }

        console.log('\n🎉 ¡Migración de Blog COMPLETADA!');

    } catch (err) {
        console.error('❌ Error capturando posts de WordPress:', err.message);
    }
}

async function runAll() {
    await migratePages();
    await migratePosts();
}

runAll();
