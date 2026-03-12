import fs from 'fs';

async function download() {
    try {
        const res = await fetch('https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const buffer = await res.arrayBuffer();
        fs.writeFileSync('public/hero-bg.jpg', Buffer.from(buffer));
        console.log(`Descargado localmente: ${buffer.byteLength} bytes.`);
    } catch (err) {
        console.error(err);
    }
}

download();
