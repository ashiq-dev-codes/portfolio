import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {withAutoSlug} from './actions/auto-slug-publish-action'
import {StudioIcon} from './components/studio-icon'
import {setDarkSchemeAsDefault} from './lib/default-dark-scheme'
import {schemaTypes} from './schemaTypes'
import {homePageId, profileId, structure} from './structure'

const siteUrl = 'https://sifna.web.app'
const typesWithSlug = ['project', 'category']
const singletonIds = [profileId, homePageId]
const singletonTypes = ['profile', 'homePage']

setDarkSchemeAsDefault()

export default defineConfig({
  name: 'default',
  title: 'Sifna’s Portfolio',
  icon: StudioIcon,

  projectId: 'dfjdl2zn',
  dataset: 'production',

  plugins: [structureTool({structure, title: 'Content'}), visionTool()],

  // Vision (a query tool) is only for Ashiq; Sifna's menu shows just her content.
  tools: (tools, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
    return isAdmin ? tools : tools.filter((tool) => tool.name !== 'vision')
  },

  // Releases and scheduled drafts add extra screens she doesn't need.
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},

  schema: {
    types: schemaTypes,
    // No "new profile" or "new home page", so there is only ever one of each.
    templates: (templates) =>
      templates.filter((template) => !singletonTypes.includes(template.schemaType)),
  },

  document: {
    // The global "+" button only offers what she creates: a project or a category.
    newDocumentOptions: (options) =>
      options.filter((option) => option.templateId === 'project' || option.templateId === 'category'),

    actions: (actions, context) => {
      // Single documents can be edited and published, but never deleted or duplicated.
      if (context.documentId && singletonIds.includes(context.documentId)) {
        return actions.filter((action) => action.action === 'publish' || action.action === 'discardChanges')
      }
      if (!typesWithSlug.includes(context.schemaType)) return actions
      return actions.map((action) => (action.action === 'publish' ? withAutoSlug(action) : action))
    },

    // "Open preview" in a project's menu jumps to its live page.
    productionUrl: async (previous, {document}) => {
      const slug = document.slug
      const hasSlug = slug && typeof slug === 'object' && 'current' in slug && typeof slug.current === 'string'
      if (document._type !== 'project' || !hasSlug) return previous
      return `${siteUrl}/projects/${slug.current}`
    },
  },
})
