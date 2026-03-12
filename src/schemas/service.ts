export default {
    name: 'service',
    title: 'Servicio',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'text',
        },
        {
            name: 'icon',
            title: 'Icono (Lucide React: Users, MapPin, MessageCircle, etc)',
            type: 'string',
        },
        {
            name: 'linkText',
            title: 'Texto del enlace',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'content',
            title: 'Contenido Detallado',
            description: 'El contenido exhaustivo de la página de este servicio',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ],
        },
        {
            name: 'price',
            title: 'Precio Display',
            description: 'Ej: 50€/mes o 120€ Pago Único',
            type: 'string',
        },
        {
            name: 'features',
            title: 'Características Destacadas',
            description: 'Lista de beneficios cortos (ej: Asesoramiento 24/7, Videoanálisis)',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'faqs',
            title: 'Preguntas Frecuentes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Pregunta', type: 'string' },
                        { name: 'answer', title: 'Respuesta', type: 'text' }
                    ]
                }
            ]
        }
    ]
}
