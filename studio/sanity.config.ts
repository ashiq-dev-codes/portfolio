import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {profileId, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Sifna Portfolio',

  projectId: 'dfjdl2zn',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Hide "new profile" so there is only ever one.
    templates: (templates) => templates.filter((template) => template.schemaType !== 'profile'),
  },

  document: {
    // The profile can be edited and published, but never deleted or duplicated.
    actions: (actions, context) =>
      context.documentId === profileId
        ? actions.filter((action) => action.action === 'publish' || action.action === 'discardChanges')
        : actions,
  },
})
