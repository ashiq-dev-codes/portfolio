import type {SanityClient, SanityDocument} from 'sanity'
import {
  draftSummaryProjection,
  pendingChanges,
  publishableTypes,
  type DraftSummary,
  type PendingChange,
} from '../../lib/pending-changes'
import {slugify, uniqueSlug} from '../../lib/slug'
import {ranksInOrder, workOrderId, type Work} from '../../lib/work-order'

export type PublishResult = {publishedCount: number; skippedCount: number}

type PublishData = {
  drafts: {doc: SanityDocument; summary: DraftSummary}[]
  publishedIds: string[]
  takenSlugs: {_id: string; _type: string; slug: string}[]
  workRanks: {_id: string; orderRank: string | null}[]
}

// Categories first and the home page last, so every reference points at something published.
const publishSequence = ['category', 'project', 'profile', 'homePage']
const typesWithSlug = ['project', 'category']
const draftOnlyFields = ['_rev', '_updatedAt']
const publishedOnly = '!(_id in path("drafts.**")) && !(_id in path("versions.**"))'

const publishQuery = `{
  "drafts": *[_id in path("drafts.**") && _type in $types]{"doc": @, "summary": ${draftSummaryProjection}},
  "publishedIds": *[_type in $types && ${publishedOnly}]._id,
  "takenSlugs": *[_type in $slugTypes && ${publishedOnly} && defined(slug.current)]{_id, _type, "slug": slug.current},
  "workRanks": *[_type == "project" && !(_id in path("versions.**"))]{_id, orderRank}
}`

/**
 * Publishes every ready draft and the current order in one transaction, so it is all or nothing.
 * Saving the order document is the one change the Sanity webhook deploys on: one tap, one deploy.
 */
export async function publishAll(client: SanityClient): Promise<PublishResult> {
  const data = await client.fetch<PublishData>(publishQuery, {
    types: publishableTypes,
    slugTypes: typesWithSlug,
  })
  const publishedIds = new Set(data.publishedIds)
  const changes = pendingChanges(data.drafts.map((draft) => draft.summary), publishedIds)
  const ready = changes.filter((change) => !change.problem)
  const draftsById = new Map(data.drafts.map((draft) => [draft.doc._id, draft.doc]))
  const takenSlugs = takenSlugsByType(data.takenSlugs)

  const transaction = client.transaction()
  for (const change of [...ready].sort(byPublishSequence)) {
    const draft = draftsById.get(change.draftId)
    if (!draft) continue
    transaction.createOrReplace(publishedVersion(draft, change, takenSlugs))
    transaction.delete(change.draftId)
  }
  transaction.createOrReplace({
    _id: workOrderId,
    _type: 'workOrder',
    workIds: workIdsInOrder(data.workRanks, publishedIds, ready),
    publishedAt: new Date().toISOString(),
  })
  await transaction.commit()
  return {publishedCount: ready.length, skippedCount: changes.length - ready.length}
}

/**
 * Throws away every draft (new works included) and puts "My work" back in the website's order.
 * Nothing here changes the website, so nothing deploys.
 */
export async function undoAll(client: SanityClient, live: Work[]): Promise<void> {
  const draftIds = await client.fetch<string[]>('*[_id in path("drafts.**") && _type in $types]._id', {
    types: publishableTypes,
  })
  const ranks = ranksInOrder(live.length)
  const transaction = client.transaction()
  draftIds.forEach((draftId) => transaction.delete(draftId))
  live.forEach((work, index) => transaction.patch(work._id, (patch) => patch.set({orderRank: ranks[index]})))
  await transaction.commit()
}

// ------------------- PRIVATE HELPERS -------------------

function byPublishSequence(first: PendingChange, second: PendingChange): number {
  return publishSequence.indexOf(first.type) - publishSequence.indexOf(second.type)
}

// The draft as a published document: its own id, no draft bookkeeping, and a link name if empty.
function publishedVersion(draft: SanityDocument, change: PendingChange, takenSlugs: Map<string, Set<string>>) {
  const content = Object.fromEntries(Object.entries(draft).filter(([key]) => !draftOnlyFields.includes(key)))
  const published = {...content, _id: change.publishedId, _type: draft._type}
  if (!typesWithSlug.includes(change.type) || readSlug(draft)) return published

  const taken = takenSlugs.get(change.type) ?? new Set<string>()
  const slug = uniqueSlug(slugify(change.label) || 'untitled', taken)
  taken.add(slug)
  takenSlugs.set(change.type, taken)
  return {...published, slug: {_type: 'slug', current: slug}}
}

function takenSlugsByType(slugs: PublishData['takenSlugs']): Map<string, Set<string>> {
  const byType = new Map<string, Set<string>>()
  for (const {_type, slug} of slugs) byType.set(_type, (byType.get(_type) ?? new Set()).add(slug))
  return byType
}

// Every work that will be on the website after this publish, in the order she arranged them.
// A work's draft holds her latest drag, so its rank wins over the published one.
function workIdsInOrder(workRanks: PublishData['workRanks'], publishedIds: Set<string>, ready: PendingChange[]) {
  const publishedWorkIds = workRanks
    .map((work) => work._id)
    .filter((id) => !id.startsWith('drafts.') && publishedIds.has(id))
  const liveIds = new Set([
    ...publishedWorkIds,
    ...ready.filter((change) => change.type === 'project').map((change) => change.publishedId),
  ])
  const rankById = new Map<string, string>()
  for (const {_id, orderRank} of workRanks) {
    const id = _id.replace(/^drafts\./, '')
    if (orderRank && (_id.startsWith('drafts.') || !rankById.has(id))) rankById.set(id, orderRank)
  }
  // Ranks compare as plain text (not locale-aware), the same way Sanity's order() sorts them.
  // A work without a rank goes last instead of disappearing.
  const unranked = '~'
  const rankOf = (id: string) => rankById.get(id) ?? unranked
  return [...liveIds].sort((first, second) => {
    if (rankOf(first) === rankOf(second)) return 0
    return rankOf(first) < rankOf(second) ? -1 : 1
  })
}

function readSlug(document: SanityDocument): string {
  const slug = document.slug
  if (!slug || typeof slug !== 'object' || !('current' in slug)) return ''
  return typeof slug.current === 'string' ? slug.current.trim() : ''
}
