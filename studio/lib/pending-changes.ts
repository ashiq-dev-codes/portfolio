/** The content types that wait in drafts until Sifna taps Publish. */
export const publishableTypes = ['category', 'project', 'profile', 'homePage']

/** The most works the home page can feature; the website shows this many. */
export const maxFeaturedWorks = 8

/** What the Publish screen needs to know about one draft. */
export type DraftSummary = {
  _id: string
  _type: string
  label: string
  coverUrl: string | null
  hasCategory: boolean
  imageCount: number
  featuredIds: string[]
}

/** One item waiting to be published. `problem` is set when it isn't ready yet. */
export type PendingChange = {
  draftId: string
  publishedId: string
  type: string
  label: string
  coverUrl: string | null
  isNew: boolean
  problem: string | null
}

/** GROQ projection that turns a draft into a DraftSummary. */
export const draftSummaryProjection = `{
  _id,
  _type,
  "label": coalesce(title, name, ""),
  "coverUrl": images[0].asset->url,
  "hasCategory": defined(category._ref),
  "imageCount": count(images[defined(asset._ref)]),
  "featuredIds": coalesce(featuredProjects[]._ref, [])
}`

export function publishedIdOf(draftId: string): string {
  return draftId.replace(/^drafts\./, '')
}

/**
 * Every draft as a pending change, new works first. Works are checked before the home page,
 * because the home page may only feature works that are (or are about to be) on the website.
 */
export function pendingChanges(drafts: DraftSummary[], publishedIds: Set<string>): PendingChange[] {
  const changes = drafts.map((draft) => toChange(draft, publishedIds))
  const readyWorkIds = new Set([
    ...publishedIds,
    ...changes.filter((change) => change.type === 'project' && !change.problem).map((change) => change.publishedId),
  ])
  return changes
    .map((change, index) => withHomePageCheck(change, drafts[index], readyWorkIds))
    .sort((first, second) => Number(second.isNew) - Number(first.isNew))
}

function toChange(draft: DraftSummary, publishedIds: Set<string>): PendingChange {
  const publishedId = publishedIdOf(draft._id)
  return {
    draftId: draft._id,
    publishedId,
    type: draft._type,
    label: labelFor(draft),
    coverUrl: draft.coverUrl,
    isNew: !publishedIds.has(publishedId),
    problem: problemWith(draft),
  }
}

function labelFor(draft: DraftSummary): string {
  switch (draft._type) {
    case 'profile':
      return 'My profile'
    case 'homePage':
      return 'On the home page'
    default:
      return draft.label.trim() || 'Untitled'
  }
}

// The same rules the website needs: a work without these would be skipped or look broken.
function problemWith(draft: DraftSummary): string | null {
  const hasTitle = draft.label.trim().length > 0
  switch (draft._type) {
    case 'project':
      if (!hasTitle) return 'Add a title'
      if (!draft.hasCategory) return 'Pick a category'
      if (draft.imageCount === 0) return 'Add at least one image'
      return null
    case 'category':
      return hasTitle ? null : 'Add a title'
    case 'profile':
      return hasTitle ? null : 'Add your name'
    case 'homePage':
      return draft.featuredIds.length > maxFeaturedWorks ? `Pick up to ${maxFeaturedWorks} works` : null
    default:
      return null
  }
}

function withHomePageCheck(change: PendingChange, draft: DraftSummary | undefined, readyWorkIds: Set<string>) {
  if (change.type !== 'homePage' || change.problem || !draft) return change
  const isWaitingForWork = draft.featuredIds.some((id) => !readyWorkIds.has(id))
  return isWaitingForWork ? {...change, problem: 'A picked work isn’t ready to publish yet'} : change
}
