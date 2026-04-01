import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ID = 't01yxrzf';
const DATASET = 'production';
const API_VERSION = '2024-01-01';
const SITE_URL = 'https://entrenamientoaguasabiertas.com';

async function fetchSanity(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodedQuery}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.result;
}

async function generateSitemap() {
    console.log('Generando sitemap.xml automático...');

    try {
        const posts = await fetchSanity(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`);
        const services = await fetchSanity(`*[_type == "service"]{ "slug": slug.current, _updatedAt }`);

        const staticRoutes = [
            '/',
            '/sobre-mi',
            '/blog',
            '/contacto',
            '/aviso-legal',
            '/privacidad',
            '/cookies',
            '/webinars',
            '/clases-presenciales',
            '/area-privada'
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticRoutes.forEach(route => {
            xml += `  <url>\n`;
            xml += `    <loc>${SITE_URL}${route}</loc>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
            xml += `  </url>\n`;
        });

        if (posts) {
            posts.forEach((post) => {
                if (!post.slug) return;
                xml += `  <url>\n`;
                xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
                xml += `    <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>\n`;
                xml += `    <changefreq>monthly</changefreq>\n`;
                xml += `    <priority>0.7</priority>\n`;
                xml += `  </url>\n`;
            });
        }

        if (services) {
            services.forEach((service) => {
                if (!service.slug) return;
                const isHardcoded = [
                    'clinics-presenciales', 
                    'plan-entrenamiento-online-o-mixto', 
                    'planes-entrenamiento-en-grupo', 
                    'informe-tecnico-y-antropometria', 
                    'asesoramiento-entrenamiento'
                ].includes(service.slug);
                const route = isHardcoded ? `/${service.slug}` : `/servicios/${service.slug}`;
                xml += `  <url>\n`;
                xml += `    <loc>${SITE_URL}${route}</loc>\n`;
                xml += `    <lastmod>${new Date(service._updatedAt).toISOString()}</lastmod>\n`;
                xml += `    <changefreq>monthly</changefreq>\n`;
                xml += `    <priority>0.8</priority>\n`;
                xml += `  </url>\n`;
            });
        }

        const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
        fs.writeFileSync(publicPath, xml + '</urlset>');

        const total = staticRoutes.length + (posts?.length || 0) + (services?.length || 0);
        console.log(`✅ Sitemap generado exitosamente en public/sitemap.xml con ${total} rastros.`);
        process.exit(0);
    } catch (error) {
        console.error('Error generando sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
