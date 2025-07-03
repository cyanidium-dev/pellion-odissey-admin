import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'pellion-odissey-admin',

  projectId: 'qgwhyrdi',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Тури')
              .child(S.documentList().title('Тури').filter('_type == "tour"')),
            S.divider(),
            S.listItem()
              .title('Відгуки')
              .child(S.documentList().title('Відгуки').filter('_type == "review"')),
            S.divider(),
            S.listItem().title('Засновники').child(
              S.editor().id('founders').schemaType('founders').documentId('foundersSingleton'), // Єдиний екземпляр
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
