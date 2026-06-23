import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    schema?: any; // Objeto de esquema JSON-LD
}

export const useSEO = ({ title, description, canonical, ogImage, ogType = 'website', schema }: SEOProps) => {
    useEffect(() => {
        // 1. Actualizar el título de la pestaña
        document.title = title;

        // Helper para crear o actualizar etiquetas meta
        const updateOrCreateMeta = (nameOrProperty: string, value: string, isProperty = false) => {
            const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
            let meta = document.querySelector(selector);
            if (!meta) {
                meta = document.createElement('meta');
                if (isProperty) {
                    meta.setAttribute('property', nameOrProperty);
                } else {
                    meta.setAttribute('name', nameOrProperty);
                }
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', value);
        };

        // 2. Actualizar meta descripción
        if (description) {
            updateOrCreateMeta('description', description);
            updateOrCreateMeta('og:description', description, true);
            updateOrCreateMeta('twitter:description', description);
        }

        // 3. Open Graph y Twitter Title
        updateOrCreateMeta('og:title', title, true);
        updateOrCreateMeta('twitter:title', title);

        // 4. Tipo de recurso Open Graph
        updateOrCreateMeta('og:type', ogType, true);

        // 5. URL canónica (OG y Twitter)
        const currentUrl = canonical || window.location.href;
        updateOrCreateMeta('og:url', currentUrl, true);
        updateOrCreateMeta('twitter:url', currentUrl);

        // 6. Imagen de compartir (OG y Twitter)
        const defaultImage = 'https://entrenamientoaguasabiertas.com/og-image.jpg';
        const imgUrl = ogImage || defaultImage;
        updateOrCreateMeta('og:image', imgUrl, true);
        updateOrCreateMeta('twitter:image', imgUrl);
        updateOrCreateMeta('twitter:card', 'summary_large_image');

        // 7. Enlace canónico
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', currentUrl);

        // 8. Inyección de Datos Estructurados (JSON-LD)
        let scriptTag = document.getElementById('seo-jsonld') as HTMLScriptElement;
        if (schema) {
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.id = 'seo-jsonld';
                scriptTag.type = 'application/ld+json';
                document.head.appendChild(scriptTag);
            }
            scriptTag.text = JSON.stringify(schema);
        } else {
            if (scriptTag) {
                scriptTag.remove();
            }
        }

        // Limpieza al desmontar
        return () => {
            const currentScript = document.getElementById('seo-jsonld');
            if (currentScript) {
                currentScript.remove();
            }
        };
    }, [title, description, canonical, ogImage, ogType, schema]);
};
