import fs from 'fs';
import { createClient } from '@sanity/client';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: false,
    token: SANITY_TOKEN,
    apiVersion: '2024-02-28',
});

async function run() {
    console.log("⏳ Buscando testimonios de Guillem, Pere y César...");

    // Obtener todos los testimonios que puedan encajar
    const query = `*[_type == "testimonial"]`;
    const testimonios = await client.fetch(query);

    const targetNames = ["Guillem", "Pere", "César"];
    const targetTestimonios = testimonios.filter(t =>
        targetNames.some(name => t.authorName?.includes(name))
    );

    if (targetTestimonios.length === 0) {
        console.log("❌ No se encontraron testimonios para esos nombres en:", testimonios.map(t => t.authorName).join(', '));
        return;
    }

    // Mapa de imágenes locales base
    const mapImages = {
        "Guillem": "guillem_testimonio_web-200x300.jpg",
        "Pere": "peredalmau_repte_cap_de_creus-300x300.jpeg",
        "César": "cesar_testimonio_web-300x300.webp"
    };

    for (const test of targetTestimonios) {
        let matchedName = targetNames.find(name => test.authorName.includes(name));

        if (matchedName && mapImages[matchedName]) {
            const fileName = mapImages[matchedName];
            const imagePath = `./${fileName}`;

            console.log(`✅ Subiendo imagen para ${matchedName}: ${imagePath}`);

            try {
                // Leer imagen local
                const buffer = fs.readFileSync(imagePath);

                // Subir como Asset a Sanity
                const asset = await client.assets.upload('image', buffer, { filename: fileName });

                // Actualizar el documento de Testimonial con la referencia de la imagen
                await client.patch(test._id)
                    .set({
                        image: {
                            _type: 'image',
                            asset: {
                                _type: "reference",
                                _ref: asset._id
                            }
                        }
                    })
                    .commit();

                console.log(`🎉 Testimonio ${matchedName} (${test._id}) enlazado correctamente a su nueva foto.`);
            } catch (err) {
                console.error(`❌ Error actualizando a ${matchedName}: `, err.message);
            }
        }
    }
}

run();
