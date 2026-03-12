export default {
    name: 'post',
    title: 'Artículos de Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug (Identificador)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: { type: 'author' },
        },
        {
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'publishedAt',
            title: 'Fecha de Publicación',
            type: 'datetime',
        },
        {
            name: 'excerpt',
            title: 'Resumen (Extracto)',
            type: 'text',
            rows: 3,
        },
        {
            name: 'body',
            title: 'Contenido del Artículo',
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
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: any) {
            const { author } = selection
            return Object.assign({}, selection, {
                subtitle: author && `por ${author}`,
            })
        },
    },
}
