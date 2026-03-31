import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
}

export const useSEO = ({ title, description }: SEOProps) => {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Update or create meta description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                metaDescription.setAttribute('content', description);
                document.head.appendChild(metaDescription);
            }
        }

        // We could theoretically Clean up on unmount, but typically in SPAs we just let the next route override it.
    }, [title, description]);
};
