import {defineArrayMember, defineField, defineType} from 'sanity'

// The order the website shows, saved when Sifna taps "Publish order". Plain ids rather than
// references, so a work in the list can still be deleted. Edited only by the Publish order screen.
export const workOrder = defineType({
  name: 'workOrder',
  title: 'Published order',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'workIds',
      title: 'Works, in website order',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime'}),
  ],
})
