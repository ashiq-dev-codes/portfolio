import type {DocumentActionComponent} from 'sanity'

/**
 * The big button at the bottom of every item. Edits save on their own and go live from the
 * Publish tab, so instead of a Publish button it tells her the edit is safe. Sanity shows the
 * first action as the big button, so this also keeps Duplicate tucked in the ⋯ menu.
 */
export const SavedStatusAction: DocumentActionComponent = (props) => {
  const hasUnpublishedChanges = Boolean(props.draft)
  const isOnWebsite = Boolean(props.published)

  if (!hasUnpublishedChanges && isOnWebsite) {
    return {label: '✓ Published', title: 'This is on your website.', disabled: true}
  }
  return {
    label: '✓ Saved',
    title: 'Saved. Open the Publish tab to put your changes on your website.',
    disabled: true,
  }
}
