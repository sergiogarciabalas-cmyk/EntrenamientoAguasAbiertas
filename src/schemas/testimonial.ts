export default {
    name: 'testimonial',
    title: 'Testimonio',
    type: 'document',
    fields: [
        {
            name: 'quote',
            title: 'Cita / Opinión',
            type: 'text',
        },
        {
            name: 'authorName',
            title: 'Nombre del autor',
            type: 'string',
        },
        {
            name: 'authorInitials',
            title: 'Iniciales (ej. PD)',
            type: 'string',
        },
        {
            name: 'authorDetails',
            title: 'Detalles (Profesión, Edad, etc.)',
            type: 'string',
        }
    ]
}
