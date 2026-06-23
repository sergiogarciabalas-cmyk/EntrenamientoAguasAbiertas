import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 't01yxrzf',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
})

const originalFetch = client.fetch.bind(client);
const isBrowser = typeof window !== 'undefined';

// Override the fetch method while maintaining the type signature
client.fetch = async function <R = any, Q = any>(query: string, params?: Q, options?: any): Promise<R> {
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

    return originalFetch(query, params as any, options);
};


