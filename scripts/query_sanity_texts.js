import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

async function run() {
    const web = await client.fetch(`*[_type in ["service", "page"] && slug.current == "webinars"][0]`);
    if (web) fs.writeFileSync('webinars_fuerza.json', JSON.stringify(web, null, 2));
}
run();
