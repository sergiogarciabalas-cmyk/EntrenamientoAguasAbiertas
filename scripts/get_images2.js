async function getUrls() {
    try {
        const res = await fetch("https://entrenamientoaguasabiertas.com");
        const data = await res.text();
        const regex = /<img[^>]+src="([^">]+)"[^>]*>/ig;
        let match;
        while ((match = regex.exec(data)) !== null) {
            console.log(match[1]);
        }
    } catch (e) {
        console.error(e);
    }
}
getUrls();
