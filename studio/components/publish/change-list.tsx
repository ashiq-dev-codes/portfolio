import type {CSSProperties, ReactNode} from 'react'
import {IntentLink} from 'sanity/router'
import type {PendingChange} from '../../lib/pending-changes'
import type {MovedWork} from '../../lib/work-order'
import {cardStyle, colors} from './publish-styles'

type ChangeListProps = {
  changes: PendingChange[]
  movedWorks: MovedWork[]
}

const maxListedMoves = 5

/** Everything waiting, grouped so she can scan it: needs attention, new, edited, order. */
export function ChangeList({changes, movedWorks}: ChangeListProps) {
  const needsAttention = changes.filter((change) => change.problem)
  const ready = changes.filter((change) => !change.problem)
  const newItems = ready.filter((change) => change.isNew)
  const editedItems = ready.filter((change) => !change.isNew)

  return (
    <div style={{display: 'grid', gap: 14}}>
      {needsAttention.length > 0 && (
        <Section title="Needs your attention" note="These stay unpublished until they're complete. Tap one to fix it.">
          {needsAttention.map((change) => (
            <ChangeRow key={change.draftId} change={change} badge={change.problem ?? ''} badgeColor={colors.pending} />
          ))}
        </Section>
      )}
      {newItems.length > 0 && (
        <Section title="New">
          {newItems.map((change) => (
            <ChangeRow key={change.draftId} change={change} badge="New" badgeColor={colors.success} />
          ))}
        </Section>
      )}
      {editedItems.length > 0 && (
        <Section title="Edited">
          {editedItems.map((change) => (
            <ChangeRow key={change.draftId} change={change} badge="Edited" badgeColor={colors.accent} />
          ))}
        </Section>
      )}
      {movedWorks.length > 0 && <OrderSection movedWorks={movedWorks} />}
    </div>
  )
}

function Section({title, note, children}: {title: string; note?: string; children: ReactNode}) {
  return (
    <section className="pub-rise" style={cardStyle}>
      <h3 style={{margin: 0, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.7}}>{title}</h3>
      {note && <p style={{margin: '4px 0 0', fontSize: 13, opacity: 0.65}}>{note}</p>}
      <ul style={{listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'grid', gap: 2}}>{children}</ul>
    </section>
  )
}

type ChangeRowProps = {change: PendingChange; badge: string; badgeColor: string}

// The whole row opens the item, so fixing or checking something is one tap.
function ChangeRow({change, badge, badgeColor}: ChangeRowProps) {
  return (
    <li>
      <IntentLink
        intent="edit"
        params={{id: change.publishedId, type: change.type}}
        className="pub-row"
        style={rowStyle}
      >
        <Thumbnail url={change.coverUrl} label={change.label} />
        <span style={labelStyle}>{change.label}</span>
        <span style={{fontSize: 12, fontWeight: 600, color: badgeColor, textAlign: 'right'}}>{badge}</span>
      </IntentLink>
    </li>
  )
}

function OrderSection({movedWorks}: {movedWorks: MovedWork[]}) {
  const hiddenCount = movedWorks.length - maxListedMoves
  const title = `Order · ${movedWorks.length} ${movedWorks.length === 1 ? 'work' : 'works'} moved`
  return (
    <Section title={title}>
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

const rowStyle: CSSProperties = {
  display: 'flex',
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
