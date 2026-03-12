import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-01-01'
});

async function main() {
    const pages = await client.fetch('*[_type == "page"]{title, slug}');
    console.log("PAGES:", JSON.stringify(pages, null, 2));

    const posts = await client.fetch('*[_type == "post"][0...5]{title, slug}');
    console.log("POSTS:", JSON.stringify(posts, null, 2));
}

main();
