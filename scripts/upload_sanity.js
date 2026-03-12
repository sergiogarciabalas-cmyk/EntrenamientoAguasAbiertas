import { createClient } from '@sanity/client';
import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
    console.error('❌ ERROR: Set SANITY_TOKEN env var');
    process.exit(1);
}

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: false,
    token: SANITY_TOKEN,
    apiVersion: '2024-02-28',
});

const data = JSON.parse(fs.readFileSync('./servicios_page.json', 'utf8'));

// Delete _rev and _updatedAt as we are overwriting
delete data._rev;
delete data._updatedAt;

client.createOrReplace(data).then(result => {
    console.log(`✅ Page updated in Sanity: ${result._id}`);
}).catch(err => {
    console.error('❌ Error updating page:', err.message);
});
