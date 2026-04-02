export default async function handler(req, res) {
    const { slug } = req.query;
    const siteName = 'Entrenamiento Aguas Abiertas';
    const siteBrand = 'Sergi Swim Coach';
    const siteUrl = 'https://www.entrenamientoaguasabiertas.com';
    const defaultOgImage = `${siteUrl}/og-image.jpg`;

    const escapeHtmlAttr = (value = '') =>
        String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

    try {
        // Hardcodeamos la URL de producción para evitar los bloqueos de Vercel SSO en los dominios de preview
        const indexUrl = `${siteUrl}/index.html`;
        
        // Obtenemos el esqueleto de la página original a ciegas
        const resp = await fetch(indexUrl);
        let html = await resp.text();

        if (slug && slug !== 'undefined' && slug !== '') {
            // Consultar a Sanity por el Título, el Extracto y la URL Fotográfica
            const projectId = 't01yxrzf';
            const dataset = 'production';
            const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
                title,
                excerpt,
                "imageUrl": mainImage.asset->url
            }`);
            
            const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
            const sanityResp = await fetch(sanityUrl);
            const data = await sanityResp.json();
            
            if (data.result) {
                const post = data.result;
                
                // Reemplazamos violentamente -pero con precisión quirúrgica- las etiquetas 
                // genéricas por las del propio artículo para el robot de WhatsApp.
                
                // Título y URL Canonical (CRÍTICO para Facebook y LinkedIn)
                const articleUrl = `${siteUrl}/blog/${slug}`;
                html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/g, `<link rel="canonical" href="${articleUrl}" />`);
                html = html.replace(/<meta property="og:type" content=".*?"\s*\/?>/g, '<meta property="og:type" content="article" />');
                html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${articleUrl}" />`);
                html = html.replace(/<meta property="og:site_name" content=".*?"\s*\/?>/g, `<meta property="og:site_name" content="${siteName}" />`);
                html = html.replace(/<meta (name|property)="twitter:url" content=".*?"\s*\/?>/g, `<meta name="twitter:url" content="${articleUrl}" />`);
                html = html.replace(/<meta (name|property)="twitter:site" content=".*?"\s*\/?>/g, '<meta name="twitter:site" content="@SergiSwimCoach" />');
                
                if (post.title) {
                    const safeTitle = escapeHtmlAttr(post.title);
                    const titleWithBrand = `${safeTitle} | ${siteBrand}`;
                    html = html.replace(/<title>.*?<\/title>/g, `<title>${titleWithBrand}</title>`);
                    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${safeTitle}" />`);
                    html = html.replace(/<meta (name|property)="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${titleWithBrand}" />`);
                    html = html.replace(/<meta property="og:image:alt" content=".*?"\s*\/?>/g, `<meta property="og:image:alt" content="${safeTitle} | ${siteName}" />`);
                    html = html.replace(/<meta (name|property)="twitter:image:alt" content=".*?"\s*\/?>/g, `<meta name="twitter:image:alt" content="${safeTitle} | ${siteName}" />`);
                    html = html.replace(/<\/head>/, `  <meta property="article:publisher" content="${siteName}" />\n  </head>`);
                }
                
                // Descripción corta (Subtítulo en WhatsApp)
                if (post.excerpt) {
                   const safeExcerpt = escapeHtmlAttr(post.excerpt);
                   html = html.replace(/<meta name="description" content=".*?"\s*\/?>/g, `<meta name="description" content="${safeExcerpt}" />`);
                   html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${safeExcerpt}" />`);
                   html = html.replace(/<meta (name|property)="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${safeExcerpt}" />`);
                }
                
                // FOTO (La joya de la corona, previsualización de imagen)
                const shareImageUrl = post.imageUrl
                    ? `${siteUrl}/og-cache/${encodeURIComponent(slug)}.jpg?v=20260402-static`
                    : defaultOgImage;
                const safeAlt = escapeHtmlAttr(`${post.title || siteBrand} | ${siteName}`);
                html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${shareImageUrl}" />`);
                html = html.replace(/<meta property="og:image:alt" content=".*?"\s*\/?>/g, `<meta property="og:image:alt" content="${safeAlt}" />`);
                html = html.replace(/<meta property="og:image:secure_url" content=".*?"\s*\/?>/g, `<meta property="og:image:secure_url" content="${shareImageUrl}" />`);
                html = html.replace(/<meta property="og:image:type" content=".*?"\s*\/?>/g, '<meta property="og:image:type" content="image/jpeg" />');
                html = html.replace(/<meta property="og:image:width" content=".*?"\s*\/?>/g, '<meta property="og:image:width" content="1200" />');
                html = html.replace(/<meta property="og:image:height" content=".*?"\s*\/?>/g, '<meta property="og:image:height" content="630" />');
                html = html.replace(/<meta (name|property)="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${shareImageUrl}" />`);
                html = html.replace(/<meta (name|property)="twitter:image:alt" content=".*?"\s*\/?>/g, `<meta name="twitter:image:alt" content="${safeAlt}" />`);
            }
        }

        // Devolvemos a Vercel nuestro robot de HTML modificado para el mundo exterior.
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(html);

    } catch (err) {
        console.error('Error in api/og:', err);
        // Si hay cualquier error catastrófico, el usuario sigue vivo: se sirve el índice de todos modos
        res.status(500).send('Falló el renderizado dinámico del bot, pero sigues vivo.');
    }
}
