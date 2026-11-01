import {useCallback, useEffect, useState} from 'react'
import {useClient, type SanityClient} from 'sanity'
import {workOrderId, type Work} from '../../lib/work-order'

export type WorkOrderData = {
  /** Every published work, in the order she arranged them in "My work". */
  works: Work[]
  /** The ids in the order the website shows, from the last "Publish order". */
  publishedIds: string[]
  publishedAt: string | null
}

export type WorkOrderState =
  | {kind: 'loading'}
  | {kind: 'ready'; data: WorkOrderData}
  | {kind: 'failed'; message: string}

const apiVersion = '2025-01-01'
const publishedOnly = '!(_id in path("drafts.**")) && !(_id in path("versions.**"))'
const dataQuery = `{
  "works": *[_type == "project" && ${publishedOnly}] | order(orderRank asc){
    _id,
    "title": coalesce(title, "Untitled work"),
    "coverUrl": images[0].asset->url
  },
  "publishedIds": coalesce(*[_id == $orderId][0].workIds, []),
  "publishedAt": *[_id == $orderId][0].publishedAt
}`

/** Loads the order data and reloads it whenever a work or the published order changes. */
export function useWorkOrder() {
  const client = useClient({apiVersion})
  const [state, setState] = useState<WorkOrderState>({kind: 'loading'})

  const reload = useCallback(async () => {
    try {
      const data = await client.fetch<WorkOrderData>(dataQuery, {orderId: workOrderId})
      setState({kind: 'ready', data})
    } catch (error) {
      setState({kind: 'failed', message: errorMessage(error)})
    }
  }, [client])

  useEffect(() => {
    reload()
    const subscription = listenForChanges(client).subscribe({next: () => reload()})
    return () => subscription.unsubscribe()
  }, [client, reload])

  return {state, reload, client}
}

// "query" visibility waits until the change is readable, so the reload sees the new order.
function listenForChanges(client: SanityClient) {
  return client.listen(
    '*[_type == "project" || _id == $orderId]',
    {orderId: workOrderId},
    {events: ['mutation'], includeResult: false, visibility: 'query'},
  )
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}
