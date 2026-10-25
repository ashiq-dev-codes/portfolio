// Her "sifna." mark in the top corner, instead of the generic "SP" initials.
export function StudioIcon() {
  return (
    <span
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 6,
        background: '#27507c',
        color: '#ffffff',
        fontFamily: 'ui-monospace, monospace',
        fontWeight: 700,
        fontSize: '0.8em',
      }}
    >
      s.
    </span>
  )
}
