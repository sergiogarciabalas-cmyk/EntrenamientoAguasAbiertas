import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const PROJECT_ID = 't01yxrzf';
const DATASET = 'production';

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
    console.log("⏳ Subiendo imágenes y creando documentos vía fetch puro...");
    const mutations = [];

    for (const test of testimoniosReales) {
        let imageAssetId = null;
        const imagePath = './' + test.imageName;

        // 1. Subir imagen primero
        if (fs.existsSync(imagePath)) {
            console.log('Subiendo foto: ' + test.imageName);
            const buffer = fs.readFileSync(imagePath);
            const uploadUrl = 'https://' + PROJECT_ID + '.api.sanity.io/v2024-02-28/assets/images/' + DATASET + '?filename=' + test.imageName;

            try {
                const res = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'image/jpeg',
                        Authorization: 'Bearer ' + SANITY_TOKEN
                    },
                    body: buffer
                });
                const json = await res.json();
                if (json.document && json.document._id) {
                    imageAssetId = json.document._id;
                    console.log('✅ Foto subida: ' + imageAssetId);
                } else {
                    console.error("❌ Fallo subiendo foto:", json);
                }
            } catch (err) {
                console.error("❌ Error de red subiendo foto:", err);
            }
        }

        // 2. Preparar el documento
        const doc = {
            _type: 'testimonial',
            authorName: test.name,
            authorInitials: test.initials,
            authorDetails: test.details,
            quote: test.quote,
            publishedAt: new Date().toISOString()
        };

        if (imageAssetId) {
            doc.image = {
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: imageAssetId
                }
            };
        }

        mutations.push({ create: doc });
    }

    // 3. Enviar mutación con los testimonios creados
    console.log('Aplicando ' + mutations.length + ' testimonios a Sanity...');
    const mutateUrl = 'https://' + PROJECT_ID + '.api.sanity.io/v2024-02-28/data/mutate/' + DATASET;
    const mutRes = await fetch(mutateUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + SANITY_TOKEN
        },
        body: JSON.stringify({ mutations })
    });
    const mutJson = await mutRes.json();
    console.log('✅ Resultado:', JSON.stringify(mutJson, null, 2));
}

run();
