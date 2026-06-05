import { createClient } from '@sanity/client'

const baseClient = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
})

const isBrowser = typeof window !== 'undefined';

export const client = {
    ...baseClient,
    fetch: async (query: string, params?: any, options?: any) => {
        const isLocalhost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (isBrowser && !isLocalhost) {
            try {
                const response = await window.fetch('/api/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query, params }),
                });
                if (response.ok) {
                    return await response.json();
                }
            } catch (e) {
                console.warn('API proxy failed, falling back to direct Sanity query:', e);
            }
        }

        return baseClient.fetch(query, params, options);
    }
} as any;

