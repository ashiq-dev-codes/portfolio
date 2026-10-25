import {defineArrayMember, defineField, defineType} from 'sanity'
import {StarIcon} from '../components/icons'

/** The site shows at most this many featured works on the home page. */
const maxFeaturedWorks = 8

// One document that lists the works on the home page, so Sifna picks them in one place
// instead of switching a setting inside every project.
export const homePage = defineType({
  name: 'homePage',
  title: 'On the home page',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'featuredProjects',
      title: 'Featured work',
      type: 'array',
      description: `Tap “Add item” and pick from your work. Up to ${maxFeaturedWorks}.`,
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'project'}],
          options: {disableNew: true},
        }),
      ],
      validation: (rule) =>
        rule
          .unique()
          .max(maxFeaturedWorks)
          .error(`The home page shows up to ${maxFeaturedWorks} works.`),
    }),
  ],
  preview: {
    prepare: () => ({title: 'On the home page'}),
  },
})
