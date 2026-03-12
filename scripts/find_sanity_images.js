import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

async function run() {
    const assets = await client.fetch(`*[_type == "sanity.imageAsset"]{url, originalFilename}`);
    assets.forEach(a => {
        if (!a.originalFilename) return;
        const name = a.originalFilename.toLowerCase();
        if (name.includes('dalmau') || name.includes('guillem') || name.includes('pujol') || name.includes('cesar') || name.includes('palomeque') || name.includes('testim')) {
            console.log(a.url, a.originalFilename);
        }
    });
}
run();
