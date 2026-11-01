import {useState} from 'react'
import {LexoRank} from 'lexorank'
import {useClient, type DocumentActionComponent, type DocumentActionProps} from 'sanity'

type Edge = 'top' | 'bottom'

const apiVersion = '2025-01-01'

/** "Move to top" in a work's ⋯ menu: a one-tap jump, however long the list is. */
export const MoveToTopAction: DocumentActionComponent = (props) => useMoveToEdge(props, 'top')

/** "Move to bottom" in a work's ⋯ menu. */
export const MoveToBottomAction: DocumentActionComponent = (props) => useMoveToEdge(props, 'bottom')

// Gives the work a rank just before the first (or after the last) work, the same kind of rank
// the drag-and-drop list uses, so both ways of ordering stay in step.
function useMoveToEdge(props: DocumentActionProps, edge: Edge) {
  const client = useClient({apiVersion})
  const [isMoving, setIsMoving] = useState(false)
  const isPublished = Boolean(props.published)

  async function handleMove() {
    setIsMoving(true)
    try {
      const edgeRank = await client.fetch<string | null>(edgeRankQuery(edge), {
        type: props.type,
        ids: [props.id, `drafts.${props.id}`],
      })
      const rank = rankBeyond(edgeRank, edge)
      // Update the draft too, or publishing it later would bring back the old position.
      const transaction = client.transaction().patch(props.id, (patch) => patch.set({orderRank: rank}))
      if (props.draft) transaction.patch(props.draft._id, (patch) => patch.set({orderRank: rank}))
      await transaction.commit()
      props.onComplete()
    } finally {
      setIsMoving(false)
    }
  }

  return {
    label: edge === 'top' ? 'Move to top' : 'Move to bottom',
    title: isPublished ? undefined : 'Publish this work first',
    disabled: !isPublished || isMoving,
    onHandle: handleMove,
  }
}

function edgeRankQuery(edge: Edge): string {
  const direction = edge === 'top' ? 'asc' : 'desc'
  return `*[_type == $type && !(_id in $ids) && defined(orderRank)] | order(orderRank ${direction})[0].orderRank`
}

function rankBeyond(edgeRank: string | null, edge: Edge): string {
  const base = edgeRank ? LexoRank.parse(edgeRank) : LexoRank.middle()
  return (edge === 'top' ? base.genPrev() : base.genNext()).toString()
}
