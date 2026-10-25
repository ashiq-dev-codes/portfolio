import {defineArrayMember, defineField, defineType} from 'sanity'
import {CategoryPicker} from '../components/category-picker'
import {WorkIcon} from '../components/icons'
import {newProjectOrder} from '../lib/new-project-order'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: WorkIcon,
  // Tabs keep the phone screen short: what she fills in every time comes first.
  groups: [
    {name: 'main', title: 'Main', default: true},
    {name: 'details', title: 'Details'},
    {name: 'settings', title: 'Settings'},
  ],
  initialValue: async (_params, {getClient}) => ({
    order: await newProjectOrder(getClient),
  }),
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required().error('Give the project a name.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'main',
      options: {disableNew: true},
      components: {input: CategoryPicker},
      validation: (rule) => rule.required().error('Pick a category.'),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'main',
      description: 'The first image is the cover. Hold and drag to reorder.',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'What is in the image?',
              type: 'string',
              description: 'Optional. Helps people who can’t see the image.',
            }),
          ],
        }),
      ],
      options: {layout: 'grid'},
      validation: (rule) => rule.required().min(1).error('Add at least one image.'),
    }),
    // Replaced by the "On the home page" picker. Hidden, not removed, until the old values are
    // cleared from Sanity, so Studio doesn't warn about an unknown field in the meantime.
    defineField({name: 'isFeatured', type: 'boolean', hidden: true}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
      description: 'Optional. The brief, the idea or the client.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'slug',
      title: 'Link name',
      type: 'slug',
      group: 'settings',
      description: 'Filled in from the title when you publish. Only change it if you need to.',
      options: {source: 'title'},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'settings',
      description: 'Lower numbers show first. New projects get the lowest one automatically.',
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      year: 'year',
      media: 'images.0',
      // Previews can't read a whole array, so check the first few images one by one.
      image0: 'images.0.asset',
      image1: 'images.1.asset',
      image2: 'images.2.asset',
      image3: 'images.3.asset',
    },
    // The third line shows in the bigger "detail" rows: a quick summary without opening it.
    prepare: ({title, category, year, media, image0, image1, image2, image3}) => {
      const imageCount = [image0, image1, image2, image3].filter(Boolean).length
      const facts = [imageCountLabel(imageCount), year]
      return {
        title: title || 'Untitled project',
        subtitle: category || 'No category yet',
        description: facts.filter(Boolean).join(' · '),
        media,
      }
    },
  },
})

// Only the first four images are counted, so a fourth means "4 or more".
function imageCountLabel(imageCount: number): string {
  if (imageCount === 0) return 'No images yet'
  if (imageCount === 1) return '1 image'
  if (imageCount === 4) return '4+ images'
  return `${imageCount} images`
}
