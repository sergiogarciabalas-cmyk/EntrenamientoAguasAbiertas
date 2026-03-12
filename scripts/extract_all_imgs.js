import fs from 'fs';
async function main() {
    const res = await fetch('https://entrenamientoaguasabiertas.com');
    const html = await res.text();
    const matches = html.match(/(https?:\/\/[^\s"'()]+\.(?:jpg|jpeg|png|webp))/gi);
    if (matches) {
        const urls = [...new Set(matches)].filter(u => u.includes('wp-content'));
        urls.forEach(u => console.log(u));
    }
}
main();
