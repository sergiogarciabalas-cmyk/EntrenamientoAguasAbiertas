import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/schemas'

export default defineConfig({
    name: 'default',
    title: 'Entrenamiento Aguas Abiertas',

    projectId: 't01yxrzf',
    dataset: 'production',
    basePath: '/studio',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
})
