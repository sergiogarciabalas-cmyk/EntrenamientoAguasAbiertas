const projectId = 't01yxrzf';
const dataset = 'production';
const apiVersion = 'v2024-01-01';
const defaultOgImage = 'https://www.entrenamientoaguasabiertas.com/og-image.jpg';

async function getPostImageUrl(slug) {
    if (!slug) return null;

    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
        "imageUrl": mainImage.asset->url
    }`);
    const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();
    return data?.result?.imageUrl || null;
}

export default async function handler(req, res) {
    const slug = typeof req.query.slug === 'string' ? req.query.slug : '';

    try {
        const sourceUrl = await getPostImageUrl(slug);
        const imageUrl = sourceUrl
            ? `${sourceUrl}?w=1200&h=630&fit=crop&auto=format`
            : defaultOgImage;

        if (req.method === 'HEAD') {
            const headResponse = await fetch(imageUrl, { method: 'HEAD' });

            if (!headResponse.ok) {
                res.redirect(302, defaultOgImage);
                return;
            }

            const contentType = headResponse.headers.get('content-type') || 'image/jpeg';
            const contentLength = headResponse.headers.get('content-length');

            res.setHeader('Content-Type', contentType);
            if (contentLength) {
                res.setHeader('Content-Length', contentLength);
            }
            res.setHeader('Cache-Control', 'no-store, max-age=0');
            res.status(200).end();
            return;
        }

        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            res.redirect(302, defaultOgImage);
            return;
        }

        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader('Content-Type', imageResponse.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Content-Length', String(buffer.length));
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        res.status(200).send(buffer);
    } catch (error) {
        console.error('Error in api/og-image:', error);
        res.redirect(302, defaultOgImage);
    }
}
