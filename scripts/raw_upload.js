import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
    console.error('❌ ERROR: Set SANITY_TOKEN env var');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync('./servicios_page.json', 'utf8'));

delete data._rev;
delete data._updatedAt;

const url = 'https://t01yxrzf.api.sanity.io/v2024-02-28/data/mutate/production';
const mutation = {
    mutations: [
        {
            createOrReplace: data
        }
    ]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`
    },
    body: JSON.stringify(mutation)
})
    .then(res => res.json())
    .then(json => console.log('✅ Resp:', JSON.stringify(json, null, 2)))
    .catch(err => console.error('❌ Error:', err));
