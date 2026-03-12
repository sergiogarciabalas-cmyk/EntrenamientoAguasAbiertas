export default {
    name: 'author',
    title: 'Autores',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'image',
            title: 'Imagen de Perfil',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'bio',
            title: 'Biografía',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                },
            ],
        },
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
}
