import {useCallback, useEffect, useState} from 'react'
import {useClient, type SanityClient} from 'sanity'
import {draftSummaryProjection, publishableTypes, type DraftSummary} from '../../lib/pending-changes'
import {workOrderId, type Work} from '../../lib/work-order'

export type PendingData = {
  drafts: DraftSummary[]
  publishedIds: string[]
  /** Works on the website, in the order she has arranged them now (her drafts included). */
  works: Work[]
  /** The order the website shows, from the last publish. */
  publishedWorkIds: string[]
  publishedAt: string | null
}

export type PendingState =
  | {kind: 'loading'}
  | {kind: 'ready'; data: PendingData}
  | {kind: 'failed'; message: string}

const apiVersion = '2025-01-01'
const publishedOnly = '!(_id in path("drafts.**")) && !(_id in path("versions.**"))'

// A work's draft holds her latest edits and drag, so its title and rank win over the published one.
const pendingQuery = `{
  "drafts": *[_id in path("drafts.**") && _type in $types]${draftSummaryProjection},
  "publishedIds": *[_type in $types && ${publishedOnly}]._id,
  "works": *[_type == "project" && ${publishedOnly}]{
    _id,
    "title": coalesce(*[_id == "drafts." + ^._id][0].title, title, "Untitled work"),
    "coverUrl": images[0].asset->url,
    "rank": coalesce(*[_id == "drafts." + ^._id][0].orderRank, orderRank)
  } | order(rank asc),
  "publishedWorkIds": coalesce(*[_id == $orderId][0].workIds, []),
  "publishedAt": *[_id == $orderId][0].publishedAt
}`

/** Loads everything waiting to be published and reloads whenever her content changes. */
export function usePendingChanges() {
  const client = useClient({apiVersion})
  const [state, setState] = useState<PendingState>({kind: 'loading'})

  const reload = useCallback(async () => {
    try {
      const data = await client.fetch<PendingData>(pendingQuery, {types: publishableTypes, orderId: workOrderId})
      setState({kind: 'ready', data})
    } catch (error) {
      setState({kind: 'failed', message: error instanceof Error ? error.message : 'Unknown error'})
    }
  }, [client])

  useEffect(() => {
    reload()
    const subscription = listenForChanges(client).subscribe({next: () => reload()})
    return () => subscription.unsubscribe()
  }, [client, reload])

  return {state, client}
}

// "query" visibility waits until the change is readable, so the reload sees it.
function listenForChanges(client: SanityClient) {
  return client.listen(
    '*[_type in $types || _id == $orderId]',
    {types: publishableTypes, orderId: workOrderId},
    {events: ['mutation'], includeResult: false, visibility: 'query'},
  )
}
