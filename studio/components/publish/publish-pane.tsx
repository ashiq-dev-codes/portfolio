import {useState, type ReactNode} from 'react'
import type {SanityClient} from 'sanity'
import {pendingChanges} from '../../lib/pending-changes'
import {liveOrder, movedWorks} from '../../lib/work-order'
import {ChangeList} from './change-list'
import {publishAll, undoAll} from './publish-operations'
import {buttonStyle, cardStyle, colors, screenCss, type ButtonKind} from './publish-styles'
import {usePendingChanges, type PendingData, type PendingState} from './use-pending-changes'

type Task =
  | {kind: 'idle'}
  | {kind: 'publishing'}
  | {kind: 'undoing'}
  | {kind: 'done'; message: string}
  | {kind: 'failed'; message: string}

/**
 * The "Publish" tab. Every change in Studio waits here as a draft; one tap publishes them all,
 * with the current order, in one transaction and one website deploy.
 */
export function PublishPane() {
  const {state, client} = usePendingChanges()

  return (
    <div style={{padding: 'max(20px, 4%)', maxWidth: 600}}>
      <style>{screenCss}</style>
      <h2 style={{margin: 0, fontSize: 24}}>Publish</h2>
      <p style={{margin: '6px 0 20px', fontSize: 14, opacity: 0.7}}>
        Your changes are saved here as you go. Nothing goes on your website until you publish.
      </p>
      <PaneBody state={state} client={client} />
    </div>
  )
}

function PaneBody({state, client}: {state: PendingState; client: SanityClient}) {
  switch (state.kind) {
    case 'loading':
      return <p style={{opacity: 0.7}}>Checking your changes…</p>
    case 'failed':
      return <ErrorNote message={state.message} />
    case 'ready':
      return <PublishEditor data={state.data} client={client} />
  }
}

function PublishEditor({data, client}: {data: PendingData; client: SanityClient}) {
  const [task, setTask] = useState<Task>({kind: 'idle'})
  const [isConfirmingUndo, setIsConfirmingUndo] = useState(false)
  const changes = pendingChanges(data.drafts, new Set(data.publishedIds))
  const live = liveOrder(data.works, data.publishedWorkIds)
  const moved = movedWorks(data.works, live)
  const readyCount = changes.filter((change) => !change.problem).length + (moved.length > 0 ? 1 : 0)
  const hasAnything = changes.length > 0 || moved.length > 0
  const isBusy = task.kind === 'publishing' || task.kind === 'undoing'

  async function handlePublish() {
    setTask({kind: 'publishing'})
    try {
      const {skippedCount} = await publishAll(client)
      setTask({kind: 'done', message: publishedMessage(skippedCount)})
    } catch (error) {
      setTask({kind: 'failed', message: errorText(error)})
    }
  }

  async function handleUndo() {
    setIsConfirmingUndo(false)
    setTask({kind: 'undoing'})
    try {
      await undoAll(client, live)
      setTask({kind: 'done', message: 'Done. Everything is back to what’s on your website.'})
    } catch (error) {
      setTask({kind: 'failed', message: errorText(error)})
    }
  }

  return (
    <>
      <Summary hasAnything={hasAnything} waitingCount={changes.length + (moved.length > 0 ? 1 : 0)} publishedAt={data.publishedAt} />
      {hasAnything && (
        <div style={{marginTop: 14}}>
          <ChangeList changes={changes} movedWorks={moved} />
        </div>
      )}
      <div style={{display: 'grid', gap: 10, marginTop: 16}}>
        <ActionButton kind="primary" isDisabled={readyCount === 0 || isBusy} onClick={handlePublish}>
          {task.kind === 'publishing' ? 'Publishing…' : publishLabel(readyCount)}
        </ActionButton>
        {hasAnything && !isConfirmingUndo && (
          <ActionButton kind="secondary" isDisabled={isBusy} onClick={() => setIsConfirmingUndo(true)}>
            {task.kind === 'undoing' ? 'Undoing…' : 'Undo all changes'}
          </ActionButton>
        )}
        {isConfirmingUndo && (
          <UndoConfirm
            newCount={changes.filter((change) => change.isNew && change.type === 'project').length}
            onConfirm={handleUndo}
            onCancel={() => setIsConfirmingUndo(false)}
          />
        )}
      </div>
      <TaskMessage task={task} />
    </>
  )
}

function Summary({hasAnything, waitingCount, publishedAt}: {hasAnything: boolean; waitingCount: number; publishedAt: string | null}) {
  const color = hasAnything ? colors.pending : colors.success
  const title = hasAnything ? `${waitingCount} ${waitingCount === 1 ? 'change' : 'changes'} waiting` : '✓ Everything is live'
  const detail = hasAnything
    ? 'Check them below, then publish when you’re ready.'
    : `Your website shows all your work.${publishedAt ? ` Last published ${formatDate(publishedAt)}.` : ''}`
  return (
    <div className="pub-rise" style={{...cardStyle, display: 'flex', gap: 12, alignItems: 'flex-start'}}>
      <span style={{width: 10, height: 10, marginTop: 7, borderRadius: 999, background: color, flexShrink: 0}} />
      <div>
        <strong style={{fontSize: 17}}>{title}</strong>
        <p style={{margin: '4px 0 0', fontSize: 13, opacity: 0.7}}>{detail}</p>
      </div>
    </div>
  )
}

function UndoConfirm({newCount, onConfirm, onCancel}: {newCount: number; onConfirm: () => void; onCancel: () => void}) {
  const deletesNew = newCount > 0 ? ` Your ${newCount} new ${newCount === 1 ? 'work' : 'works'} will be deleted.` : ''
  return (
    <div className="pub-rise" style={{display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr'}}>
      <p style={{gridColumn: '1 / -1', margin: '4px 0', fontSize: 14}}>
        Undo every change and go back to what’s on your website?{deletesNew}
      </p>
      <ActionButton kind="danger" isDisabled={false} onClick={onConfirm}>
        Yes, undo all
      </ActionButton>
      <ActionButton kind="secondary" isDisabled={false} onClick={onCancel}>
        Keep my changes
      </ActionButton>
    </div>
  )
}

function TaskMessage({task}: {task: Task}) {
  if (task.kind === 'done') {
    return (
      <p className="pub-rise" style={{marginTop: 14, color: colors.success}}>
        {task.message}
      </p>
    )
  }
  if (task.kind === 'failed') return <ErrorNote message={task.message} />
  return null
}

type ActionButtonProps = {kind: ButtonKind; isDisabled: boolean; onClick: () => void; children: ReactNode}

function ActionButton({kind, isDisabled, onClick, children}: ActionButtonProps) {
  return (
    <button type="button" className="pub-button" disabled={isDisabled} onClick={onClick} style={buttonStyle(kind, isDisabled)}>
      {children}
    </button>
  )
}

function ErrorNote({message}: {message: string}) {
  return (
    <p style={{marginTop: 14, color: colors.danger}}>
      Something went wrong. Check your internet and try again. ({message})
    </p>
  )
}

function publishLabel(readyCount: number): string {
  if (readyCount === 0) return 'Nothing to publish'
  return `Publish ${readyCount} ${readyCount === 1 ? 'change' : 'changes'}`
}

function publishedMessage(skippedCount: number): string {
  const skipped = skippedCount > 0 ? ` ${skippedCount} unfinished ${skippedCount === 1 ? 'item stays' : 'items stay'} here.` : ''
  return `Published! Your website updates in about 2 minutes.${skipped}`
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error'
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})
}
