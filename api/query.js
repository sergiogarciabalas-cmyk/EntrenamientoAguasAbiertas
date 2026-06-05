export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        let query, params;
        if (req.method === 'POST') {
            // Vercel parses JSON bodies automatically
            const body = req.body || {};
            query = body.query;
            params = body.params;
        } else {
            query = req.query.query;
            try {
                params = req.query.params ? JSON.parse(req.query.params) : undefined;
            } catch (e) {
                params = undefined;
            }
        }

        if (!query) {
            res.status(400).json({ error: 'Query parameter is required' });
            return;
        }

        const projectId = 't01yxrzf';
        const dataset = 'production';
        const apiVersion = '2024-01-01';

        let url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
            }
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.errors) {
            res.status(500).json({ errors: data.errors });
            return;
        }

        res.status(200).json(data.result);
    } catch (error) {
        console.error('Error in /api/query:', error);
        res.status(500).json({ error: error.message });
    }
}
