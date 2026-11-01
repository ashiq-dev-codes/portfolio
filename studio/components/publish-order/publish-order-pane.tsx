import {useState, type CSSProperties, type ReactNode} from 'react'
import type {SanityClient} from 'sanity'
import {liveOrder, movedWorks, ranksInOrder, workOrderId, type Work} from '../../lib/work-order'
import {OrderStatus, accentColor} from './order-status'
import {useWorkOrder, type WorkOrderData, type WorkOrderState} from './use-work-order'

type Task =
  | {kind: 'idle'}
  | {kind: 'publishing'}
  | {kind: 'undoing'}
  | {kind: 'done'; message: string}
  | {kind: 'failed'; message: string}

type ButtonKind = 'primary' | 'secondary' | 'danger'

/**
 * Sidebar screen "Publish order". Dragging works in "My work" never changes the website on its
 * own; this screen shows what moved, publishes the new order in one go, or undoes the changes.
 */
export function PublishOrderPane() {
  const {state, client} = useWorkOrder()

  return (
    <div style={{padding: 'max(20px, 4%)', maxWidth: 560}}>
      <style>{screenStyles}</style>
      <h2 style={{margin: 0, fontSize: 22}}>Publish order</h2>
      <p style={{margin: '6px 0 20px', fontSize: 14, opacity: 0.7}}>
        Drag your work into order in “My work”, then publish it here. Your changes are saved until
        you do.
      </p>
      <ScreenBody state={state} client={client} />
    </div>
  )
}

function ScreenBody({state, client}: {state: WorkOrderState; client: SanityClient}) {
  switch (state.kind) {
    case 'loading':
      return <p style={{opacity: 0.7}}>Checking your order…</p>
    case 'failed':
      return <ErrorNote message={state.message} />
    case 'ready':
      return <OrderEditor data={state.data} client={client} />
  }
}

function OrderEditor({data, client}: {data: WorkOrderData; client: SanityClient}) {
  const [task, setTask] = useState<Task>({kind: 'idle'})
  const [isConfirmingUndo, setIsConfirmingUndo] = useState(false)
  const live = liveOrder(data.works, data.publishedIds)
  const moved = movedWorks(data.works, live)
  const hasChanges = moved.length > 0
  const isBusy = task.kind === 'publishing' || task.kind === 'undoing'

  async function handlePublish() {
    setTask({kind: 'publishing'})
    setTask(await runTask(() => publishOrder(client, data.works), 'Published! Your website updates in about 2 minutes.'))
  }

  async function handleUndo() {
    setIsConfirmingUndo(false)
    setTask({kind: 'undoing'})
    setTask(await runTask(() => restoreOrder(client, live), 'Done. “My work” is back in your website’s order.'))
  }

  return (
    <>
      <OrderStatus movedWorks={moved} publishedAt={data.publishedAt} />
      <div style={{display: 'grid', gap: 10, marginTop: 16}}>
        <ActionButton kind="primary" isDisabled={!hasChanges || isBusy} onClick={handlePublish}>
          {task.kind === 'publishing' ? 'Publishing…' : 'Publish order'}
        </ActionButton>
        {hasChanges && !isConfirmingUndo && (
          <ActionButton kind="secondary" isDisabled={isBusy} onClick={() => setIsConfirmingUndo(true)}>
            {task.kind === 'undoing' ? 'Undoing…' : 'Undo changes'}
          </ActionButton>
        )}
        {isConfirmingUndo && <UndoConfirm onConfirm={handleUndo} onCancel={() => setIsConfirmingUndo(false)} />}
      </div>
      {task.kind === 'done' && (
        <p className="po-rise" style={{marginTop: 14, color: '#30a46c'}}>
          {task.message}
        </p>
      )}
      {task.kind === 'failed' && <ErrorNote message={task.message} />}
    </>
  )
}

function UndoConfirm({onConfirm, onCancel}: {onConfirm: () => void; onCancel: () => void}) {
  return (
    <div className="po-rise" style={{display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr'}}>
      <p style={{gridColumn: '1 / -1', margin: '4px 0', fontSize: 14}}>
        Put “My work” back in your website’s order?
      </p>
      <ActionButton kind="danger" isDisabled={false} onClick={onConfirm}>
        Yes, undo
      </ActionButton>
      <ActionButton kind="secondary" isDisabled={false} onClick={onCancel}>
        Keep my changes
      </ActionButton>
    </div>
  )
}

type ActionButtonProps = {kind: ButtonKind; isDisabled: boolean; onClick: () => void; children: ReactNode}

function ActionButton({kind, isDisabled, onClick, children}: ActionButtonProps) {
  return (
    <button type="button" className="po-button" disabled={isDisabled} onClick={onClick} style={buttonStyle(kind, isDisabled)}>
      {children}
    </button>
  )
}

function ErrorNote({message}: {message: string}) {
  return (
    <p style={{marginTop: 14, color: '#e5484d'}}>
      Something went wrong. Check your internet and try again. ({message})
    </p>
  )
}

// ------------------- PRIVATE HELPERS -------------------

async function runTask(work: () => Promise<unknown>, doneMessage: string): Promise<Task> {
  try {
    await work()
    return {kind: 'done', message: doneMessage}
  } catch (error) {
    return {kind: 'failed', message: error instanceof Error ? error.message : 'Unknown error'}
  }
}

// Saving the order document is what the Sanity webhook listens for: one publish, one deploy.
function publishOrder(client: SanityClient, works: Work[]) {
  return client.createOrReplace({
    _id: workOrderId,
    _type: 'workOrder',
    workIds: works.map((work) => work._id),
    publishedAt: new Date().toISOString(),
  })
}

// Re-ranks every work in website order. Drafts get the same rank, or publishing one later
// would bring back its old place. Only orderRank changes, so the webhook ignores it.
async function restoreOrder(client: SanityClient, live: Work[]) {
  const draftIds = new Set(
    await client.fetch<string[]>('*[_type == "project" && _id in path("drafts.**")]._id'),
  )
  const ranks = ranksInOrder(live.length)
  const transaction = client.transaction()
  live.forEach((work, index) => {
    const orderRank = ranks[index]
    transaction.patch(work._id, (patch) => patch.set({orderRank}))
    const draftId = `drafts.${work._id}`
    if (draftIds.has(draftId)) transaction.patch(draftId, (patch) => patch.set({orderRank}))
  })
  return transaction.commit()
}

function buttonStyle(kind: ButtonKind, isDisabled: boolean): CSSProperties {
  return {
    minHeight: 48,
    padding: '0 20px',
    borderRadius: 12,
    font: 'inherit',
    fontWeight: 600,
    fontSize: 15,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.45 : 1,
    ...buttonColors(kind),
  }
}

function buttonColors(kind: ButtonKind): CSSProperties {
  switch (kind) {
    case 'primary':
      return {border: 'none', background: accentColor, color: '#ffffff'}
    case 'secondary':
      return {
        border: '1px solid color-mix(in srgb, currentColor 25%, transparent)',
        background: 'transparent',
        color: 'inherit',
      }
    case 'danger':
      return {border: 'none', background: '#e5484d', color: '#ffffff'}
  }
}

// Cards and messages fade and rise in; pressed buttons sink slightly. Off for reduced motion.
const screenStyles = `
  .po-rise { animation: po-rise 300ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  @keyframes po-rise { from { opacity: 0; transform: translateY(6px); } }
  .po-button { transition: transform 150ms ease-out, opacity 150ms ease-out; }
  .po-button:not(:disabled):active { transform: scale(0.98); }
  @media (prefers-reduced-motion: reduce) {
    .po-rise { animation: none; }
    .po-button:not(:disabled):active { transform: none; }
  }
`
