import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

const url = 'https://t01yxrzf.api.sanity.io/v2024-02-28/data/query/production?query=*[_type == "service" && slug.current == "plan-entrenamiento-online-o-mixto"][0]';

fetch(url, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${SANITY_TOKEN}`
    }
})
    .then(res => res.json())
    .then(json => {
        fs.writeFileSync('./plan_online.json', JSON.stringify(json.result, null, 2));
        console.log('✅ Document saved to plan_online.json');
    })
    .catch(err => console.error('❌ Error:', err));
