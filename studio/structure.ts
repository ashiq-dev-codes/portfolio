import type {StructureResolver} from 'sanity/structure'
import {CategoryIcon, ProfileIcon, StarIcon, WorkIcon} from './components/icons'

// Single documents: Sifna opens them directly instead of picking from a list.
export const profileId = 'profile'
export const homePageId = 'homePage'

const byOrder = [{field: 'order', direction: 'asc' as const}]

// "detail" rows show a bigger cover and three lines of text: easier to see and tap on a phone.
const listLayout = 'detail'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sifna’s portfolio')
    .items([
      // Every project, newest first: where she adds and edits her posters, mockups and logos.
      S.listItem()
        .title('My work')
        .icon(WorkIcon)
        .child(
          S.documentTypeList('project')
            .title('My work')
            .defaultOrdering(byOrder)
            .defaultLayout(listLayout),
        ),
      S.listItem()
        .title('On the home page')
        .id(homePageId)
        .icon(StarIcon)
        .child(S.document().schemaType('homePage').documentId(homePageId).title('On the home page')),
      S.divider(),
      S.listItem()
        .title('My profile')
        .id(profileId)
        .icon(ProfileIcon)
        .child(S.document().schemaType('profile').documentId(profileId).title('My profile')),
      S.listItem()
        .title('Categories')
        .icon(CategoryIcon)
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering(byOrder)
            .defaultLayout(listLayout),
        ),
    ])
