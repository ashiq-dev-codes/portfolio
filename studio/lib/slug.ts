const maxSlugLength = 96

/** A link name from a title: "Lay's Tomato Tango" → "lays-tomato-tango". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, maxSlugLength)
}

/** `base`, or `base-2`, `base-3`… — the first one not already in `taken`. */
export function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base
  for (let suffix = 2; taken.has(slug); suffix++) slug = `${base}-${suffix}`
  return slug
}
