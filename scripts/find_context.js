import fs from 'fs';
async function fetchImages() {
    const res = await fetch('https://entrenamientoaguasabiertas.com');
    const html = await res.text();
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Pere Dalmau') || lines[i].includes('Guillem Pujol') || lines[i].includes('Palomeque')) {
            console.log('--- FOUND AT LINE ' + i + ' ---');
            for (let j = Math.max(0, i - 15); j <= Math.min(lines.length - 1, i + 5); j++) {
                console.log(lines[j]);
            }
        }
    }
}
fetchImages();
