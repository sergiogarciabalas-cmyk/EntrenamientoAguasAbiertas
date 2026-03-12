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

const testimoniosReales = [
    {
        name: "Pere Dalmau, 58",
        initials: "PD",
        details: "Ingeniero Industrial, Mataró",
        quote: "Sergi introdujo unas pautas de entrenamiento distintas y desconocidas para mi. Me inculcó una motivación extra que hizo mejorar mi rendimiento en piscina y en el mar. He logrado travesías de hasta 30Km.",
        imageName: "peredalmau_repte_cap_de_creus-300x300.jpeg"
    },
    {
        name: "Guillem Pujol, 25",
        initials: "GP",
        details: "Estudiante CAFE, Blanes",
        quote: "Sergi fue el entrenador en el que confié para mi preparación en el ciclo olímpico de 2016 a 2020. Mejoré todas mis marcas y me proclamé Campeón de España en 10Km. Sin él no lo hubiera conseguido.",
        imageName: "guillem_testimonio_web-200x300.jpg"
    },
    {
        name: "César Palomeque, 45",
        initials: "CP",
        details: "Policia Local, Ávila",
        quote: "Quería nadar la Batalla de Rande (27Km) y encontré a Sergi. Planificó mi día a día con adaptación a mi disponibilidad y feedback diario. Completé el reto y además disfruté muchísimo de la prueba.",
        imageName: "cesar_testimonio_web-300x300.webp"
    }
];

async function run() {
    console.log("⏳ Creando y subiendo los 3 testimonios reales completos desde cero...");

    for (const test of testimoniosReales) {
        try {
            const imagePath = './' + test.imageName;
            let imageRef = null;

            if (fs.existsSync(imagePath)) {
                console.log('✅ Subiendo imagen ' + test.imageName + '...');
                const buffer = fs.readFileSync(imagePath);
                const asset = await client.assets.upload('image', buffer, { filename: test.imageName });
                imageRef = asset._id;
            } else {
                console.warn('⚠️ Imagen no encontrada localmente: ' + test.imageName);
            }

            const doc = {
                _type: 'testimonial',
                authorName: test.name,
                authorInitials: test.initials,
                authorDetails: test.details,
                quote: test.quote,
                publishedAt: new Date().toISOString()
            };

            if (imageRef) {
                doc.image = {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: imageRef
                    }
                };
            }

            const result = await client.create(doc);
            console.log('🎉 Testimonio creado para ' + test.name + ' con ID: ' + result._id);

        } catch (err) {
            console.error('❌ Error procesando testimonio de ' + test.name + ': ', err.message);
        }
    }
}

run();
