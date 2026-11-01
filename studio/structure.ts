import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {CategoryIcon, ProfileIcon, PublishIcon, StarIcon, WorkIcon} from './components/icons'
import {PublishPane} from './components/publish/publish-pane'

// Single documents: Sifna opens them directly instead of picking from a list.
export const profileId = 'profile'
export const homePageId = 'homePage'

const byOrder = [{field: 'order', direction: 'asc' as const}]

// "detail" rows show a bigger cover and three lines of text: easier to see and tap on a phone.
const listLayout = 'detail'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Sifna’s portfolio')
    .items([
      // Every work, in the order she wants: hold and drag to reorder.
      orderableDocumentListDeskItem({type: 'project', title: 'My work', icon: WorkIcon, S, context}),
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
      S.divider(),
      // Every change above waits here as a draft until she publishes them all at once.
      S.listItem()
        .title('Publish')
        .id('publish')
        .icon(PublishIcon)
        .child(S.component(PublishPane).id('publishPane').title('Publish')),
    ])
