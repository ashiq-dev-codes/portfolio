import type {StructureResolver} from 'sanity/structure'

// The profile is a single document, so Sifna opens it directly instead of picking from a list.
export const profileId = 'profile'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.listItem()
        .title('Profile')
        .id(profileId)
        .child(S.document().schemaType('profile').documentId(profileId)),
    ])
