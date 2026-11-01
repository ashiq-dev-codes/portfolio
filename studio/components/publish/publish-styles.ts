import type {CSSProperties} from 'react'

// Colours that read well on Studio's dark and light backgrounds. Neutral surfaces mix the
// text colour (currentColor) so they follow whichever theme is on.
export const colors = {
  accent: '#3b6fd8',
  success: '#30a46c',
  pending: '#f5a524',
  danger: '#e5484d',
}

export type ButtonKind = 'primary' | 'secondary' | 'danger'

export const cardStyle: CSSProperties = {
  padding: 18,
  borderRadius: 14,
  border: '1px solid color-mix(in srgb, currentColor 14%, transparent)',
  background: 'color-mix(in srgb, currentColor 4%, transparent)',
}

export function buttonStyle(kind: ButtonKind, isDisabled: boolean): CSSProperties {
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
      return {border: 'none', background: colors.accent, color: '#ffffff'}
    case 'secondary':
      return {
        border: '1px solid color-mix(in srgb, currentColor 25%, transparent)',
        background: 'transparent',
        color: 'inherit',
      }
    case 'danger':
      return {border: 'none', background: colors.danger, color: '#ffffff'}
  }
}

/** Fade-and-rise for cards and messages, a press effect for buttons, rows that light up on hover. */
export const screenCss = `
  .pub-rise { animation: pub-rise 320ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  @keyframes pub-rise { from { opacity: 0; transform: translateY(6px); } }
  .pub-button { transition: transform 150ms ease-out, opacity 150ms ease-out; }
  .pub-button:not(:disabled):active { transform: scale(0.98); }
  .pub-row { transition: background 150ms ease-out, transform 150ms ease-out; }
  .pub-row:hover { background: color-mix(in srgb, currentColor 7%, transparent); }
  .pub-row:active { transform: scale(0.99); }
  @media (prefers-reduced-motion: reduce) {
    .pub-rise { animation: none; }
    .pub-button:not(:disabled):active, .pub-row:active { transform: none; }
  }
`
