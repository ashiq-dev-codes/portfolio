import {useState, type ChangeEvent, type CSSProperties, type DragEvent} from 'react'
import {insert, setIfMissing, useClient, type ArrayOfObjectsInputProps} from 'sanity'

type UploadStatus =
  | {kind: 'idle'}
  | {kind: 'uploading'; done: number; total: number}
  | {kind: 'failed'; message: string}

const apiVersion = '2025-01-01'

/**
 * One big "add images" area that opens the photo picker straight away and uploads several
 * images at once. The images already added show below it, where they can be reordered.
 */
export function ImagesInput(props: ArrayOfObjectsInputProps) {
  const {value, onChange, readOnly} = props
  const client = useClient({apiVersion})
  const [status, setStatus] = useState<UploadStatus>({kind: 'idle'})
  const [isDragOver, setIsDragOver] = useState(false)
  const hasImages = (value?.length ?? 0) > 0
  const isUploading = status.kind === 'uploading'

  async function uploadFiles(files: File[]) {
    const images = files.filter((file) => file.type.startsWith('image/'))
    if (images.length === 0 || readOnly) return

    setStatus({kind: 'uploading', done: 0, total: images.length})
    try {
      for (const [index, file] of images.entries()) {
        const asset = await client.assets.upload('image', file, {filename: file.name})
        const item = {_type: 'image', _key: newKey(), asset: {_type: 'reference', _ref: asset._id}}
        // Each image is added as soon as it is uploaded, so a slow upload never hides the others.
        onChange([setIfMissing([]), insert([item], 'after', [-1])])
        setStatus({kind: 'uploading', done: index + 1, total: images.length})
      }
      setStatus({kind: 'idle'})
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown error'
      setStatus({kind: 'failed', message: `Upload failed. Check your internet and try again. (${reason})`})
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    uploadFiles(Array.from(event.target.files ?? []))
    // Clear it so picking the same file again still counts as a change.
    event.target.value = ''
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragOver(false)
    uploadFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <div style={{display: 'grid', gap: 16}}>
      <label
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        style={dropZoneStyle(isDragOver, hasImages, Boolean(readOnly) || isUploading)}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={Boolean(readOnly) || isUploading}
          onChange={handleFileChange}
          style={{display: 'none'}}
        />
        <UploadIcon />
        <DropZoneText status={status} hasImages={hasImages} />
      </label>
      {hasImages && props.renderDefault(props)}
    </div>
  )
}

function DropZoneText({status, hasImages}: {status: UploadStatus; hasImages: boolean}) {
  switch (status.kind) {
    case 'uploading':
      return (
        <strong style={{fontSize: 16}}>
          Uploading {Math.min(status.done + 1, status.total)} of {status.total}…
        </strong>
      )
    case 'failed':
      return (
        <>
          <strong style={{fontSize: 16}}>Tap to try again</strong>
          <span style={{fontSize: 13, color: '#e5484d'}}>{status.message}</span>
        </>
      )
    case 'idle':
      return (
        <>
          <strong style={{fontSize: 16}}>{hasImages ? 'Add more images' : 'Tap to add images'}</strong>
          <span style={{fontSize: 13, opacity: 0.65}}>
            Pick one or many · or drop them here · the first image is the cover
          </span>
        </>
      )
  }
}

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="M21 16l-5-5-8 8" />
      <path d="M17 1.5v5M14.5 4h5" />
    </svg>
  )
}

// A smaller zone once images exist, so the images themselves stay the focus.
function dropZoneStyle(isDragOver: boolean, hasImages: boolean, isDisabled: boolean): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: hasImages ? 96 : 180,
    padding: 20,
    textAlign: 'center',
    borderRadius: 14,
    border: `2px dashed ${isDragOver ? '#3b6fd8' : 'color-mix(in srgb, currentColor 30%, transparent)'}`,
    background: isDragOver ? 'rgba(59, 111, 216, 0.12)' : 'color-mix(in srgb, currentColor 4%, transparent)',
    cursor: isDisabled ? 'progress' : 'pointer',
    transition: 'border-color 150ms ease-out, background 150ms ease-out',
  }
}

function newKey() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}
