import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

client.fetch(`*[_type == "service" && slug.current == "plan-entrenamiento-online-o-mixto"][0].content`).then(content => {
    // Find blocks containing the word "Solicita"
    const blocksWithSolicita = content.filter(block =>
        block._type === 'block' &&
        block.children &&
        block.children.some(child => child.text && child.text.includes('Solicita'))
    );
    console.log(JSON.stringify(blocksWithSolicita, null, 2));
});
