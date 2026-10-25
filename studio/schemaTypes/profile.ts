import {defineArrayMember, defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Graphic Designer".',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The big line on the home page.',
    }),
    defineField({name: 'about', title: 'About me', type: 'text', rows: 6}),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Image description', type: 'string'})],
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      description: 'With country code, e.g. +91 8891 937 320.',
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
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
    defineField({name: 'education', title: 'Education', type: 'array', of: [milestone()]}),
    defineField({name: 'experience', title: 'Experience', type: 'array', of: [milestone()]}),
    defineField({
      name: 'software',
      title: 'Software',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({
              name: 'level',
              title: 'Level (1–5)',
              type: 'number',
              validation: (rule) => rule.integer().min(1).max(5),
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'level'}},
        }),
      ],
    }),
  ],
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
