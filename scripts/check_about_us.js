import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

async function run() {
    const page = await client.fetch(`*[_type == "page" && slug.current == "about-us"][0]`);
    if (page && page.content) {
        page.content.forEach((b) => {
            if (b._type === 'block' && b.children) {
                console.log(b.children.map(c => c.text).join(''));
            }
        });
    }
}
run();
