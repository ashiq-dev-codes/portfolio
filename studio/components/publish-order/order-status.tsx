import type {MovedWork} from '../../lib/work-order'

type OrderStatusProps = {
  movedWorks: MovedWork[]
  publishedAt: string | null
}

const maxListedWorks = 6
export const accentColor = '#3b6fd8'
const successColor = '#30a46c'
const pendingColor = '#f5a524'

/** The card at the top: either "your website shows this order" or what she moved. */
export function OrderStatus({movedWorks, publishedAt}: OrderStatusProps) {
  if (movedWorks.length === 0) return <UpToDate publishedAt={publishedAt} />

  const hiddenCount = movedWorks.length - maxListedWorks
  return (
    <div style={cardStyle} className="po-rise">
      <StatusLine
        color={pendingColor}
        title={`${movedWorks.length} ${movedWorks.length === 1 ? 'work' : 'works'} moved`}
        detail="Not on your website yet. Publish when you’re happy with the order."
      />
      <ul style={{listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gap: 8}}>
        {movedWorks.slice(0, maxListedWorks).map((moved) => (
          <MovedRow key={moved.work._id} moved={moved} />
        ))}
      </ul>
      {hiddenCount > 0 && (
        <p style={{margin: '10px 0 0', fontSize: 13, opacity: 0.65}}>and {hiddenCount} more</p>
      )}
    </div>
  )
}

function UpToDate({publishedAt}: {publishedAt: string | null}) {
  const detail = publishedAt ? `Last published ${formatDate(publishedAt)}` : 'Nothing to publish.'
  return (
    <div style={cardStyle} className="po-rise">
      <StatusLine color={successColor} title="✓ Your website shows this order" detail={detail} />
    </div>
  )
}

function StatusLine({color, title, detail}: {color: string; title: string; detail: string}) {
  return (
    <div style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
      <span style={{width: 10, height: 10, marginTop: 6, borderRadius: 999, background: color, flexShrink: 0}} />
      <div>
        <strong style={{fontSize: 16}}>{title}</strong>
        <p style={{margin: '4px 0 0', fontSize: 13, opacity: 0.7}}>{detail}</p>
      </div>
    </div>
  )
}

function MovedRow({moved}: {moved: MovedWork}) {
  const {work, position, livePosition} = moved
  return (
    <li style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <span style={thumbStyle}>
        {work.coverUrl && (
          <img
            src={`${work.coverUrl}?w=96&h=96&fit=crop&auto=format`}
            alt=""
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        )}
      </span>
      <span style={{flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        {work.title}
      </span>
      <span style={{fontSize: 13, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
        <strong style={{color: accentColor}}>#{position}</strong>
        <span style={{opacity: 0.55}}> · was #{livePosition}</span>
      </span>
    </li>
  )
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})
}

const cardStyle = {
  padding: 18,
  borderRadius: 14,
  border: '1px solid color-mix(in srgb, currentColor 14%, transparent)',
  background: 'color-mix(in srgb, currentColor 4%, transparent)',
}

const thumbStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  overflow: 'hidden',
  flexShrink: 0,
  background: 'color-mix(in srgb, currentColor 10%, transparent)',
}
