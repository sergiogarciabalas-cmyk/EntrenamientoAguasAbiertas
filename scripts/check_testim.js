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
    const query = `*[_type == "testimonial"]{
        _id, authorName, "imageUrl": image.asset->url
    }`;
    const result = await client.fetch(query);
    console.log(JSON.stringify(result, null, 2));
}

run();
