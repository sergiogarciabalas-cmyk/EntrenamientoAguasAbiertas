import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const url = 'https://t01yxrzf.api.sanity.io/v2024-02-28/data/query/production?query=*[_type == "service"]';

async function run() {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } });
    const json = await res.json();

    if (!json.result) {
        console.error(json);
        return;
    }

    const mutations = [];

    for (const service of json.result) {
        let modified = false;
        let serviceStr = JSON.stringify(service);

        // Find and replace wrong URLs
        if (serviceStr.includes('/informe-tecnico/')) {
            serviceStr = serviceStr.replace(/\/informe-tecnico\//g, '/informe-tecnico-y-antropometria/');
            modified = true;
        }

        if (modified) {
            console.log(`Página de servicio modificada: ${service.slug?.current}`);
            const updatedService = JSON.parse(serviceStr);
            delete updatedService._rev;
            delete updatedService._updatedAt;

            mutations.push({ createOrReplace: updatedService });
        }
    }

    if (mutations.length > 0) {
        console.log(`Aplicando ${mutations.length} mutaciones...`);
        const mutateUrl = 'https://t01yxrzf.api.sanity.io/v2024-02-28/data/mutate/production';
        const mutRes = await fetch(mutateUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${SANITY_TOKEN}`
            },
            body: JSON.stringify({ mutations })
        });
        const mutJson = await mutRes.json();
        console.log('✅ Resultado Mutación:', JSON.stringify(mutJson, null, 2));
    } else {
        console.log('✅ No se encontraron más enlaces rotos en el resto de páginas de servicios.');
    }
}

run();
