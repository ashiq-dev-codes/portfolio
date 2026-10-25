import type {InitialValueResolverContext, Template} from 'sanity'
import {newProjectOrder} from './lib/new-project-order'

/** A new project started inside a category, with that category already picked. */
export const projectInCategoryTemplate: Template = {
  id: 'project-in-category',
  title: 'Project',
  schemaType: 'project',
  parameters: [{name: 'categoryId', type: 'string'}],
  value: async (params: {categoryId: string}, {getClient}: InitialValueResolverContext) => ({
    category: {_type: 'reference', _ref: params.categoryId},
    isFeatured: false,
    order: await newProjectOrder(getClient),
  }),
}
