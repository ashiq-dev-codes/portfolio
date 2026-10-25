import {useEffect, useState} from 'react'
import {set, useClient, type ObjectInputProps, type Reference} from 'sanity'

type CategoryOption = {_id: string; title: string}

const apiVersion = '2025-01-01'
const categoriesQuery =
  '*[_type == "category" && !(_id in path("drafts.**"))] | order(order asc){_id, title}'
const selectedColor = '#3b6fd8'

/**
 * All categories as tap-to-pick buttons, instead of Sanity's search box that shows nothing
 * until you type. Falls back to the standard input if the categories can't be loaded.
 */
export function CategoryPicker(props: ObjectInputProps<Reference>) {
  const {value, onChange, readOnly} = props
  const client = useClient({apiVersion})
  const [categories, setCategories] = useState<CategoryOption[] | null>(null)
  const [hasLoadFailed, setHasLoadFailed] = useState(false)

  useEffect(() => {
    let isCurrent = true
    client
      .fetch<CategoryOption[]>(categoriesQuery)
      .then((result) => isCurrent && setCategories(result))
      .catch(() => isCurrent && setHasLoadFailed(true))
    return () => {
      isCurrent = false
    }
  }, [client])

  function handlePick(categoryId: string) {
    onChange(set({_type: 'reference', _ref: categoryId}))
  }

  if (hasLoadFailed || categories?.length === 0) return props.renderDefault(props)
  if (!categories) return <p style={{margin: 0, opacity: 0.6}}>Loading categories…</p>

  return (
    <div role="radiogroup" style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
      {categories.map((category) => (
        <CategoryButton
          key={category._id}
          title={category.title}
          isSelected={value?._ref === category._id}
          isDisabled={Boolean(readOnly)}
          onPick={() => handlePick(category._id)}
        />
      ))}
    </div>
  )
}

type CategoryButtonProps = {
  title: string
  isSelected: boolean
  isDisabled: boolean
  onPick: () => void
}

// Plain button styled to sit well in both light and dark mode: transparent until picked.
function CategoryButton({title, isSelected, isDisabled, onPick}: CategoryButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={isDisabled}
      onClick={onPick}
      style={{
        minHeight: 44,
        padding: '0 18px',
        borderRadius: 999,
        border: `1px solid ${isSelected ? selectedColor : 'currentColor'}`,
        background: isSelected ? selectedColor : 'transparent',
        color: isSelected ? '#ffffff' : 'inherit',
        opacity: isSelected ? 1 : 0.85,
        font: 'inherit',
        fontWeight: 500,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {isSelected ? '✓ ' : ''}
      {title}
    </button>
  )
}
