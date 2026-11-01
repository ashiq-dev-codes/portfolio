import {useState, type CSSProperties, type ReactNode} from 'react'
import {IntentLink} from 'sanity/router'
import type {PendingChange} from '../../lib/pending-changes'
import type {MovedWork} from '../../lib/work-order'
import {buttonStyle, cardStyle, colors} from './publish-styles'

type ChangeListProps = {
  changes: PendingChange[]
  movedWorks: MovedWork[]
  isBusy: boolean
  onUndoChange: (change: PendingChange) => void
  onUndoOrder: () => void
}

const maxListedMoves = 5

/** Everything waiting, grouped so she can scan it, each with its own Undo. */
export function ChangeList({changes, movedWorks, isBusy, onUndoChange, onUndoOrder}: ChangeListProps) {
  const needsAttention = changes.filter((change) => change.problem)
  const ready = changes.filter((change) => !change.problem)
  const groups = [
    {title: 'Needs your attention', note: 'These stay unpublished until they’re complete. Tap one to fix it.', items: needsAttention},
    {title: 'New', note: null, items: ready.filter((change) => change.isNew)},
    {title: 'Edited', note: null, items: ready.filter((change) => !change.isNew)},
  ]

  return (
    <div style={{display: 'grid', gap: 14}}>
      {groups.map(
        (group) =>
          group.items.length > 0 && (
            <Section key={group.title} title={group.title} note={group.note}>
              {group.items.map((change) => (
                <ChangeRow key={change.draftId} change={change} isBusy={isBusy} onUndo={() => onUndoChange(change)} />
              ))}
            </Section>
          ),
      )}
      {movedWorks.length > 0 && <OrderSection movedWorks={movedWorks} isBusy={isBusy} onUndo={onUndoOrder} />}
    </div>
  )
}

type SectionProps = {title: string; note: string | null; action?: ReactNode; children: ReactNode}

function Section({title, note, action, children}: SectionProps) {
  return (
    <section className="pub-rise" style={cardStyle}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8}}>
        <h3 style={{margin: 0, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.7}}>{title}</h3>
        {action}
      </div>
      {note && <p style={{margin: '4px 0 0', fontSize: 13, opacity: 0.65}}>{note}</p>}
      <ul style={{listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'grid', gap: 2}}>{children}</ul>
    </section>
  )
}

type ChangeRowProps = {change: PendingChange; isBusy: boolean; onUndo: () => void}

// The row opens the item (one tap to fix or check it); ↺ undoes just this change, after asking.
function ChangeRow({change, isBusy, onUndo}: ChangeRowProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const question = change.isNew ? 'Delete this new item?' : 'Undo your edits to this?'

  return (
    <li>
      <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
        <IntentLink intent="edit" params={{id: change.publishedId, type: change.type}} className="pub-row" style={rowStyle}>
          <Thumbnail url={change.coverUrl} label={change.label} />
          <span style={labelStyle}>{change.label}</span>
          <Badge change={change} />
        </IntentLink>
        <UndoButton isDisabled={isBusy || isConfirming} label={`Undo ${change.label}`} onClick={() => setIsConfirming(true)} />
      </div>
      {isConfirming && (
        <InlineConfirm
          question={question}
          confirmLabel={change.isNew ? 'Delete' : 'Undo'}
          onConfirm={() => {
            setIsConfirming(false)
            onUndo()
          }}
          onCancel={() => setIsConfirming(false)}
        />
      )}
    </li>
  )
}

function Badge({change}: {change: PendingChange}) {
  if (change.problem) return <span style={{...badgeStyle, color: colors.pending}}>{change.problem}</span>
  if (change.isNew) return <span style={{...badgeStyle, color: colors.success}}>New</span>
  return <span style={{...badgeStyle, color: colors.accent}}>Edited</span>
}

type OrderSectionProps = {movedWorks: MovedWork[]; isBusy: boolean; onUndo: () => void}

function OrderSection({movedWorks, isBusy, onUndo}: OrderSectionProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const hiddenCount = movedWorks.length - maxListedMoves
  const title = `Order · ${movedWorks.length} ${movedWorks.length === 1 ? 'work' : 'works'} moved`
  const undoButton = (
    <UndoButton isDisabled={isBusy || isConfirming} label="Undo the order" onClick={() => setIsConfirming(true)} />
  )

  return (
    <Section title={title} note={null} action={undoButton}>
      {isConfirming && (
        <li>
          <InlineConfirm
            question="Put “My work” back in your website’s order?"
            confirmLabel="Undo"
            onConfirm={() => {
              setIsConfirming(false)
              onUndo()
            }}
            onCancel={() => setIsConfirming(false)}
          />
        </li>
      )}
      {movedWorks.slice(0, maxListedMoves).map(({work, position, livePosition}) => (
        <li key={work._id} style={{...rowStyle, cursor: 'default'}}>
          <Thumbnail url={work.coverUrl} label={work.title} />
          <span style={labelStyle}>{work.title}</span>
          <span style={{fontSize: 13, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
            <strong style={{color: colors.accent}}>#{position}</strong>
            <span style={{opacity: 0.55}}> · was #{livePosition}</span>
          </span>
        </li>
      ))}
      {hiddenCount > 0 && <li style={{padding: '6px 8px', fontSize: 13, opacity: 0.65}}>and {hiddenCount} more</li>}
    </Section>
  )
}

type UndoButtonProps = {isDisabled: boolean; label: string; onClick: () => void}

function UndoButton({isDisabled, label, onClick}: UndoButtonProps) {
  return (
    <button
      type="button"
      className="pub-button pub-undo"
      aria-label={label}
      disabled={isDisabled}
      onClick={onClick}
      style={undoButtonStyle(isDisabled)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
      </svg>
      Undo
    </button>
  )
}

type InlineConfirmProps = {question: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void}

function InlineConfirm({question, confirmLabel, onConfirm, onCancel}: InlineConfirmProps) {
  return (
    <div className="pub-rise" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: '6px 8px 10px'}}>
      <span style={{flex: '1 1 160px', fontSize: 13}}>{question}</span>
      <button type="button" className="pub-button" onClick={onConfirm} style={{...buttonStyle('danger', false), minHeight: 40, fontSize: 14}}>
        {confirmLabel}
      </button>
      <button type="button" className="pub-button" onClick={onCancel} style={{...buttonStyle('secondary', false), minHeight: 40, fontSize: 14}}>
        Cancel
      </button>
    </div>
  )
}

function Thumbnail({url, label}: {url: string | null; label: string}) {
  return (
    <span style={thumbStyle} aria-hidden="true">
      {url ? (
        <img src={`${url}?w=96&h=96&fit=crop&auto=format`} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <span style={{fontWeight: 700, opacity: 0.6}}>{label.charAt(0).toUpperCase()}</span>
      )}
    </span>
  )
}

// A small labelled pill: the word makes it clear at a glance, the 44px height keeps it easy to tap.
function undoButtonStyle(isDisabled: boolean): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    minHeight: 44,
    padding: '0 14px',
    flexShrink: 0,
    borderRadius: 999,
    border: '1px solid color-mix(in srgb, currentColor 20%, transparent)',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    opacity: isDisabled ? 0.4 : 0.85,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }
}

const rowStyle: CSSProperties = {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  alignItems: 'center',
  gap: 12,
  minHeight: 52,
  padding: '4px 8px',
  borderRadius: 10,
  color: 'inherit',
  textDecoration: 'none',
}

const labelStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const badgeStyle: CSSProperties = {fontSize: 12, fontWeight: 600, textAlign: 'right'}

const thumbStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: 40,
  height: 40,
  borderRadius: 8,
  overflow: 'hidden',
  flexShrink: 0,
  background: 'color-mix(in srgb, currentColor 10%, transparent)',
}
