import type {ReactNode} from 'react'

// Outline icons drawn on Sanity's own 25×25 grid with its thin stroke, so they sit naturally next
// to Studio's built-in icons in light and dark mode, without adding an icon package.

export function WorkIcon() {
  return (
    <Outline>
      <rect x="4.5" y="6.5" width="16" height="12" rx="1.5" />
      <circle cx="15.5" cy="10.5" r="1.5" />
      <path d="M4.5 16.5l4.5-4.5 4 4 2-2 5.5 4.5" />
    </Outline>
  )
}

export function StarIcon() {
  return (
    <Outline>
      <path d="M12.5 4.5l2.35 4.76 5.25.77-3.8 3.7.9 5.23-4.7-2.47-4.7 2.47.9-5.23-3.8-3.7 5.25-.77z" />
    </Outline>
  )
}

export function ProfileIcon() {
  return (
    <Outline>
      <circle cx="12.5" cy="9.5" r="3.5" />
      <path d="M5.5 19.5c1.2-3 3.8-4.5 7-4.5s5.8 1.5 7 4.5" />
    </Outline>
  )
}

export function CategoryIcon() {
  return (
    <Outline>
      <path d="M4.5 8.5v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-7l-2-2h-5a1 1 0 0 0-1 1z" />
    </Outline>
  )
}

function Outline({children}: {children: ReactNode}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}
