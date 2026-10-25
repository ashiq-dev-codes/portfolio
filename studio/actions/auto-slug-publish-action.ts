import {
  useClient,
  useDocumentOperation,
  type DocumentActionComponent,
  type SanityClient,
  type SanityDocument,
} from 'sanity'

const apiVersion = '2025-01-01'

/**
 * Wraps the normal Publish button: if the link name (slug) is empty, it is made from the title
 * first, so Sifna never has to press "Generate".
 */
export function withAutoSlug(publishAction: DocumentActionComponent): DocumentActionComponent {
  const AutoSlugPublishAction: DocumentActionComponent = (props) => {
    const original = publishAction(props)
    const {patch} = useDocumentOperation(props.id, props.type)
    const client = useClient({apiVersion})
    const document = props.draft ?? props.published

    if (!original) return original

    return {
      ...original,
      onHandle: async () => {
        const title = readString(document?.title)
        if (title && !readSlug(document)) {
          const slug = await uniqueSlug(client, slugify(title), props.id, props.type)
          patch.execute([{set: {slug: {_type: 'slug', current: slug}}}])
        }
        original.onHandle?.()
      },
    }
  }
  // Keeps it recognised as the Publish action, so Studio's publish shortcut still works.
  AutoSlugPublishAction.action = publishAction.action
  return AutoSlugPublishAction
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96)
}

// Adds -2, -3, … when another document of the same type already uses the link name.
async function uniqueSlug(client: SanityClient, base: string, id: string, type: string) {
  const publishedId = id.replace(/^drafts\./, '')
  const taken = await client.fetch<string[]>(
    '*[_type == $type && !(_id in [$id, $draftId]) && slug.current match $pattern].slug.current',
    {type, id: publishedId, draftId: `drafts.${publishedId}`, pattern: `${base}*`},
  )
  let slug = base
  for (let suffix = 2; taken.includes(slug); suffix++) slug = `${base}-${suffix}`
  return slug
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readSlug(document: SanityDocument | null | undefined): string {
  const slug = document?.slug
  if (!slug || typeof slug !== 'object' || !('current' in slug)) return ''
  return readString(slug.current)
}
