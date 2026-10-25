import {defineArrayMember, defineField, defineType} from 'sanity'
import {ProfileIcon} from '../components/icons'

export const profile = defineType({
  name: 'profile',
  title: 'My profile',
  type: 'document',
  icon: ProfileIcon,
  groups: [
    {name: 'about', title: 'About', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'skills', title: 'Skills'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'about',
      validation: (rule) => rule.required().error('Your name is shown across the site.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'about',
      description: 'e.g. "Graphic Designer".',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'about',
      description: 'The big line at the top of the home page.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      group: 'about',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'What is in the photo?', type: 'string'})],
    }),
    defineField({name: 'about', title: 'About me', type: 'text', rows: 6, group: 'about'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'contact'}),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'With country code, e.g. +91 8891 937 320.',
    }),
    defineField({name: 'location', title: 'Location', type: 'string', group: 'contact'}),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', description: 'e.g. Instagram'}),
            defineField({name: 'url', title: 'Link', type: 'url'}),
          ],
        }),
      ],
    }),
    defineField({name: 'experience', title: 'Experience', type: 'array', group: 'skills', of: [milestone()]}),
    defineField({name: 'education', title: 'Education', type: 'array', group: 'skills', of: [milestone()]}),
    defineField({
      name: 'software',
      title: 'Software',
      type: 'array',
      group: 'skills',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({
              name: 'level',
              title: 'Level (1–5)',
              type: 'number',
              options: {list: [1, 2, 3, 4, 5], layout: 'radio', direction: 'horizontal'},
              validation: (rule) => rule.integer().min(1).max(5),
            }),
          ],
          preview: {
            select: {title: 'name', level: 'level'},
            prepare: ({title, level}) => ({title, subtitle: '●'.repeat(level ?? 0)}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})

function milestone() {
  return defineArrayMember({
    type: 'object',
    fields: [
      defineField({name: 'title', title: 'Title', type: 'string', description: 'e.g. BA Sociology'}),
      defineField({name: 'place', title: 'Place', type: 'string', description: 'e.g. Calicut University'}),
      defineField({name: 'period', title: 'Years', type: 'string', description: 'e.g. 2021 – 2024'}),
    ],
    preview: {select: {title: 'title', subtitle: 'period'}},
  })
}
