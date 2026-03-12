async function getUrls() {
    try {
        const res = await fetch("https://entrenamientoaguasabiertas.com");
        const data = await res.text();
        const regex = /<img[^>]+src="([^">]+)"[^>]*>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
            const url = match[1];
            if (url.toLowerCase().includes('dalmau') || url.toLowerCase().includes('guillem') || url.toLowerCase().includes('cesar') || url.toLowerCase().includes('testimonial')) {
                console.log(url);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
getUrls();
