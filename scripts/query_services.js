import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

client.fetch(`*[_type == "service"]{ title, "slug": slug.current }`).then(services => {
    console.log("Servicios disponibles:");
    console.log(JSON.stringify(services, null, 2));
});
