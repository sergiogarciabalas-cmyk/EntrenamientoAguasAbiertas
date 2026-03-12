import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
});

async function run() {
    const testimonials = await client.fetch(`*[_type == "testimonial"]{..., image{asset->{url}}}`);
    fs.writeFileSync('testim.json', JSON.stringify(testimonials, null, 2));

    // Revisar la información de las imágenes del wp-page para ver de dónde sacan sus captions
    const clin = await client.fetch(`*[_type in ["service", "page"] && slug.current == "clinics-presenciales"][0]`);
    if (clin) fs.writeFileSync('clinics.json', JSON.stringify(clin, null, 2));
}
run();
