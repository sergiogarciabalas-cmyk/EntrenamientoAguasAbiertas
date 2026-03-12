import fs from 'fs';

async function fetchImages() {
    try {
        const response = await fetch('https://entrenamientoaguasabiertas.com/');
        const html = await response.text();

        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/ig;
        const lazyRegex = /<img[^>]+data-lazy-src="([^">]+)"[^>]*>/ig;
        const styleRegex = /background-image:\s*url\s*\(\s*['"]?([^'")]*)['"]?\s*\)/ig;

        let urls = new Set();
        let match;
        while ((match = imgRegex.exec(html)) !== null) urls.add(match[1]);
        while ((match = lazyRegex.exec(html)) !== null) urls.add(match[1]);
        while ((match = styleRegex.exec(html)) !== null) urls.add(match[1]);

        console.log("Found URLs:");
        console.log(Array.from(urls).filter(u => u.includes('wp-content/uploads')).join('\n'));
    } catch (e) {
        console.error(e);
    }
}
fetchImages();
