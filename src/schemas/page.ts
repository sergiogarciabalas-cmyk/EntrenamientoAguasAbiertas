export default {
    name: 'page',
    title: 'Páginas Generales',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título de la Página',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Descripción SEO (Meta Description)',
            type: 'text',
            description: 'Resumen de la página de entre 140 y 160 caracteres para Google y redes sociales.',
        },
        {
            name: 'content',
            title: 'Contenido',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
                {
                    type: 'object',
                    name: 'htmlBlock',
                    title: 'HTML Crudo (Tablas/Iframes)',
                    fields: [
                        {
                            name: 'html',
                            title: 'Código HTML',
                            type: 'text',
                        }
                    ]
                }
            ],
        },
    ],
}
