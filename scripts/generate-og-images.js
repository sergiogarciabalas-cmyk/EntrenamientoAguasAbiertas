import fs from 'node:fs/promises';
import path from 'node:path';

const projectId = 't01yxrzf';
const dataset = 'production';
const apiVersion = 'v2024-01-01';
const outputDir = path.join(process.cwd(), 'public', 'og-cache');

function sanitizeSlug(slug) {
  return String(slug || '')
    .trim()
    .replace(/[^a-z0-9-_]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchPostsWithImages() {
  const query = encodeURIComponent(`*[
    _type == "post" &&
    defined(slug.current) &&
    defined(mainImage.asset->url)
  ]{
    "slug": slug.current,
    "imageUrl": mainImage.asset->url
  }`);

  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo consultar Sanity para generar OG images: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data?.result) ? data.result : [];
}

async function downloadOgImage(slug, imageUrl) {
  const safeSlug = sanitizeSlug(slug);
  if (!safeSlug || !imageUrl) return false;

  const targetPath = path.join(outputDir, `${safeSlug}.jpg`);
  const sourceUrl = `${imageUrl}?w=1200&h=630&fit=crop&auto=format&fm=jpg&q=85`;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`No se pudo descargar la imagen OG para ${safeSlug}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(arrayBuffer));
  return true;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const posts = await fetchPostsWithImages();
  let generated = 0;

  for (const post of posts) {
    try {
      const wrote = await downloadOgImage(post.slug, post.imageUrl);
      if (wrote) generated += 1;
    } catch (error) {
      console.warn(`Aviso al generar OG image para "${post.slug}":`, error.message);
    }
  }

  console.log(`✅ OG images generadas en public/og-cache: ${generated}`);
}

main().catch((error) => {
  console.error('❌ Error generando OG images:', error);
  process.exit(1);
});
