import type {StructureResolver} from 'sanity/structure'
import {CategoryIcon, ProfileIcon, ProjectsIcon, StarIcon, WorkIcon} from './components/icons'
import {projectInCategoryTemplate} from './templates'

// The profile is a single document, so Sifna opens it directly instead of picking from a list.
export const profileId = 'profile'

const byOrder = [{field: 'order', direction: 'asc' as const}]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sifna’s portfolio')
    .items([
      // Her work, one tap per category. "+" inside a category starts a project already in it.
      S.listItem()
        .title('My work')
        .icon(WorkIcon)
        .child(
          S.documentTypeList('category')
            .title('Pick a category')
            .defaultOrdering(byOrder)
            .child((categoryId) =>
              S.documentList()
                .title('Projects')
                .schemaType('project')
                .filter('_type == "project" && category._ref == $categoryId')
                .params({categoryId})
                .defaultOrdering(byOrder)
                .initialValueTemplates([
                  S.initialValueTemplateItem(projectInCategoryTemplate.id, {categoryId}),
                ]),
            ),
        ),
      S.listItem()
        .title('On the home page')
        .icon(StarIcon)
        .child(
          S.documentList()
            .title('On the home page')
            .schemaType('project')
            .filter('_type == "project" && isFeatured == true')
            .defaultOrdering(byOrder),
        ),
      S.documentTypeListItem('project').title('All projects').icon(ProjectsIcon),
      S.divider(),
      S.listItem()
        .title('My profile')
        .id(profileId)
        .icon(ProfileIcon)
        .child(S.document().schemaType('profile').documentId(profileId).title('My profile')),
      S.documentTypeListItem('category').title('Categories').icon(CategoryIcon),
    ])
