import {defineField, defineType} from 'sanity'
import {CategoryIcon} from '../components/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: CategoryIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown on the filter tabs, e.g. "Posters".',
      validation: (rule) => rule.required().error('Give the category a name.'),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'One line shown above the work in this category.',
    }),
    defineField({
      name: 'slug',
      title: 'Link name',
      type: 'slug',
      description: 'Filled in from the title when you publish. Only change it if you need to.',
      options: {source: 'title'},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 10,
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', description: 'description'},
    prepare: ({title, description}) => ({
      title: title || 'Untitled category',
      subtitle: description || 'Tap to see the projects',
    }),
  },
})
