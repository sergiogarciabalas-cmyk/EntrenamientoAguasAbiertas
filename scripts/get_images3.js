async function getUrls() {
    try {
        const res = await fetch("https://entrenamientoaguasabiertas.com");
        const data = await res.text();
        const regex = /<img[^>]+data-src="([^">]+)"[^>]*>/ig;
        let match;
        while ((match = regex.exec(data)) !== null) {
            console.log(match[1]);
        }
        const regex2 = /<img[^>]+data-lazy-src="([^">]+)"[^>]*>/ig;
        while ((match = regex2.exec(data)) !== null) {
            console.log(match[1]);
        }
    } catch (e) {
        console.error(e);
    }
}
getUrls();
