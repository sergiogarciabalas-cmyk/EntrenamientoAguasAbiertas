import fs from 'fs';
async function fetchImages() {
    const res = await fetch('https://entrenamientoaguasabiertas.com');
    const html = await res.text();
    const imgRegex = /<img[^>]*>/ig;
    let urls = new Set();
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        if (match[0].includes('wp-content')) {
            urls.add(match[0]);
        }
    }
    const styleRegex = /background-image:\s*url\(([^)]+)\)/ig;
    while ((match = styleRegex.exec(html)) !== null) {
        if (match[1].includes('wp-content')) {
            urls.add(match[1]);
        }
    }
    console.log(Array.from(urls).join('\n'));
}
fetchImages();
