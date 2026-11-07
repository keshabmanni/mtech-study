import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type FormEvent } from 'react'
import { maxUploadSize } from '../features/uploads/constants'

type UploadReceipt = {
  id: string
  name: string
  size: number
  contentType: string
  uploadedAt: string
  expiresAt: string
  downloadUrl: string
}

type UploadState = 'idle' | 'uploading' | 'complete'

export const Route = createFileRoute('/upload')({
  head: () => ({
    meta: [
      { title: 'Temporary file upload | MTech Study' },
      {
        name: 'description',
        content: 'Upload a file for temporary storage and sharing.',
      },
    ],
  }),
  component: UploadPage,
})

function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploads, setUploads] = useState<UploadReceipt[]>([])
  const [state, setState] = useState<UploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [maxTotalFiles, setMaxTotalFiles] = useState<number>()
  const [deletingId, setDeletingId] = useState<string>()
  const availableSlots =
    maxTotalFiles === undefined
      ? 0
      : Math.max(0, maxTotalFiles - uploads.length)
  const maxFilesPerBatch = availableSlots

  useEffect(() => {
    let active = true

    void fetchTemporaryUploads()
      .then((result) => {
        if (active) {
          setUploads(result.uploads)
          setMaxTotalFiles(result.maxFiles)
        }
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(
            cause instanceof Error
              ? cause.message
              : 'Files could not be loaded from R2.',
          )
        }
      })
      .finally(() => {
        if (active) setIsLoadingUploads(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectedFiles.length === 0) {
      setError('Choose at least one file first.')
      return
    }
    if (selectedFiles.length > maxFilesPerBatch) {
      setError(
        `Only ${maxFilesPerBatch} more files can be added to this folder.`,
      )
      return
    }
    if (selectedFiles.some((file) => file.size > maxUploadSize)) {
      setError('Each file must be 10 MB or smaller.')
      return
    }

    setError('')
    setState('uploading')
    setProgress(0)

    const formData = new FormData()
    for (const file of selectedFiles) {
      formData.append('files', file)
    }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/uploads')
    xhr.responseType = 'json'
    xhr.upload.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100))
      }
    }
    xhr.onerror = () => {
      setState('idle')
      setError('The upload could not reach the server. Please try again.')
    }
    xhr.onabort = () => {
      setState('idle')
      setError('The upload was cancelled.')
    }
    xhr.onload = () => {
      const body: unknown = xhr.response
      if (xhr.status < 200 || xhr.status >= 300) {
        setState('idle')
        setError(getServerError(body) ?? 'The upload failed. Please try again.')
        return
      }

      if (!isUploadSuccess(body)) {
        setState('idle')
        setError('The server returned an invalid upload response.')
        return
      }

      void fetchTemporaryUploads()
        .then((result) => {
          setUploads(result.uploads)
          setMaxTotalFiles(result.maxFiles)
          setState('complete')
          setProgress(100)
        })
        .catch((cause: unknown) => {
          setState('complete')
          setError(
            cause instanceof Error
              ? `Upload succeeded, but R2 files could not be refreshed: ${cause.message}`
              : 'Upload succeeded, but R2 files could not be refreshed.',
          )
        })
    }
    xhr.send(formData)
  }

  const handleDelete = async (upload: UploadReceipt) => {
    setDeletingId(upload.id)
    setError('')

    try {
      const response = await fetch(upload.downloadUrl, { method: 'DELETE' })
      const body: unknown = await response.json()
      if (!response.ok || !isUploadSuccess(body)) {
        throw new Error(getServerError(body) ?? 'The file could not be deleted.')
      }

      const result = await fetchTemporaryUploads()
      setUploads(result.uploads)
      setMaxTotalFiles(result.maxFiles)
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'The file could not be deleted.',
      )
    } finally {
      setDeletingId(undefined)
    }
  }

  return (
    <main className="gazette-shell upload-shell">
      <div aria-hidden="true" className="gazette-hatch" />
      <header className="upload-header">
        <Link className="ui-button ui-button--plain upload-back" to="/">
          <span aria-hidden="true">←</span> Back to study
        </Link>
        <span className="ui-badge ui-badge--ink">Files in R2</span>
      </header>

      <section aria-labelledby="upload-title" className="upload-content">
        <p className="upload-kicker">One-hour file transfer</p>
        <h1 id="upload-title">Drop it off. Pick it up.</h1>
        <p className="upload-intro">
          The folder holds up to {maxTotalFiles ?? '…'} unexpired files. Each
          file can be up to 10 MB and is removed after one hour.
        </p>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            className="upload-input"
            disabled={
              state === 'uploading' ||
              isLoadingUploads ||
              maxFilesPerBatch === 0
            }
            onChange={(event) => {
              const files = Array.from(event.currentTarget.files ?? [])
              setSelectedFiles(files.length <= maxFilesPerBatch ? files : [])
              const tooManyFiles = files.length > maxFilesPerBatch
              const oversizedFile = files.some(
                (file) => file.size > maxUploadSize,
              )
              setError(
                tooManyFiles
                  ? `Only ${maxFilesPerBatch} more ${maxFilesPerBatch === 1 ? 'file can' : 'files can'} be added to this folder.`
                  : oversizedFile
                    ? 'Each file must be 10 MB or smaller.'
                    : '',
              )
              setState('idle')
              event.currentTarget.value = ''
            }}
            id="upload-file-input"
            multiple
            type="file"
          />
          <label className="upload-dropzone" htmlFor="upload-file-input">
            <span aria-hidden="true" className="upload-icon">↑</span>
            <strong>
              {selectedFiles.length > 0
                ? `${selectedFiles.length} of ${maxFilesPerBatch} available slots selected`
                : 'Choose files'}
            </strong>
            <span>
              {selectedFiles.length > 0
                ? 'Select again to replace this list'
                : `Any file type · ${maxFilesPerBatch} available · 10 MB each`}
            </span>
            <span className="ui-button ui-button--plain upload-browse">
              Browse files
            </span>
          </label>

          {selectedFiles.length > 0 && (
            <ul aria-label="Selected files" className="upload-file-list">
              {selectedFiles.map((file, index) => (
                <li
                  className="upload-file-list__item"
                  key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                >
                  <span className="upload-file-list__name" title={file.name}>
                    {file.name}
                  </span>
                  <span className="upload-file-list__size">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    aria-label={`Remove ${file.name}`}
                    className="upload-file-list__remove"
                    disabled={state === 'uploading'}
                    onClick={() => {
                      setSelectedFiles((current) =>
                        current.filter((_, fileIndex) => fileIndex !== index),
                      )
                      setError('')
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {state === 'uploading' && (
            <div aria-live="polite" className="upload-progress" role="status">
              <div className="upload-progress__label">
                <span>
                  Uploading {selectedFiles.length}{' '}
                  {selectedFiles.length === 1 ? 'file' : 'files'}
                </span>
                <span>{progress}%</span>
              </div>
              <progress max={100} value={progress}>
                {progress}%
              </progress>
            </div>
          )}

          {error && (
            <p className="upload-message upload-message--error" role="alert">
              {error}
            </p>
          )}

          <button
            className="ui-button upload-submit"
            disabled={
              selectedFiles.length === 0 ||
              selectedFiles.length > maxFilesPerBatch ||
              selectedFiles.some((file) => file.size > maxUploadSize) ||
              state === 'uploading' ||
              isLoadingUploads ||
              maxTotalFiles === undefined
            }
            type="submit"
          >
            {state === 'uploading' ? 'Uploading…' : 'Upload file'}
          </button>
        </form>

        <section aria-labelledby="upload-success-title" className="upload-result">
          <div className="upload-result__heading">
            {uploads.length > 0 && (
              <span aria-hidden="true" className="upload-result__check">✓</span>
            )}
            <div>
              <p className="upload-kicker">R2 folder contents</p>
              <h2 id="upload-success-title">
                {isLoadingUploads
                  ? 'Loading files…'
                  : `${uploads.length} ${uploads.length === 1 ? 'file' : 'files'}`}
              </h2>
            </div>
          </div>
          {isLoadingUploads ? (
            <p aria-live="polite" className="upload-message" role="status">
              Fetching unexpired files from R2…
            </p>
          ) : uploads.length > 0 ? (
            <>
              <ul aria-label="Files stored in R2" className="upload-receipt-list">
                {uploads.map((upload) => (
                  <li className="upload-receipt" key={upload.downloadUrl}>
                    <div className="upload-receipt__file">
                      <strong title={upload.name}>{upload.name}</strong>
                      <span>
                        {formatFileSize(upload.size)} · {upload.contentType}
                      </span>
                    </div>
                    <div className="upload-receipt__time">
                      <span>
                        Uploaded{' '}
                        <time dateTime={upload.uploadedAt}>
                          {new Date(upload.uploadedAt).toLocaleString()}
                        </time>
                      </span>
                      <span>
                        Expires{' '}
                        <time dateTime={upload.expiresAt}>
                          {new Date(upload.expiresAt).toLocaleString()}
                        </time>
                      </span>
                    </div>
                    <div className="upload-receipt__actions">
                      <button
                        aria-label={`Delete ${upload.name}`}
                        className="ui-button ui-button--plain upload-delete"
                        disabled={deletingId !== undefined}
                        onClick={() => void handleDelete(upload)}
                        type="button"
                      >
                        {deletingId === upload.id ? 'Deleting…' : 'Delete'}
                      </button>
                      <a
                        className="ui-button ui-button--ink upload-download"
                        href={upload.downloadUrl}
                      >
                        Download <span aria-hidden="true">↓</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="upload-message">
                Anyone with a download link can access that file until it expires.
              </p>
            </>
          ) : (
            <p className="upload-message">
              No unexpired files are currently stored in this R2 folder.
            </p>
          )}
        </section>
      </section>
      <footer className="gazette-footer">
        <span>MTech Study &bull; Temporary file transfer</span>
        <span>Files expire after one hour</span>
      </footer>
      <div aria-hidden="true" className="gazette-hatch gazette-hatch--bottom" />
    </main>
  )
}

function getServerError(body: unknown): string | undefined {
  if (
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof body.error === 'string'
  ) {
    return body.error
  }
}

async function fetchTemporaryUploads(): Promise<{
  uploads: UploadReceipt[]
  maxFiles: number
}> {
  const response = await fetch('/api/uploads', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  })
  const body: unknown = await response.json()

  if (!response.ok) {
    throw new Error(
      getServerError(body) ?? 'Files could not be loaded from R2.',
    )
  }

  const result = parseUploadList(body)
  if (!result) {
    throw new Error('The server returned an invalid R2 file list.')
  }
  return result
}

function isUploadSuccess(body: unknown): boolean {
  if (
    typeof body !== 'object' ||
    body === null ||
    !('success' in body) ||
    body.success !== true
  ) {
    return false
  }

  return true
}

function parseUploadList(body: unknown):
  | { uploads: UploadReceipt[]; maxFiles: number }
  | undefined {
  if (
    typeof body !== 'object' ||
    body === null ||
    !('uploads' in body) ||
    !Array.isArray(body.uploads) ||
    !('maxFiles' in body) ||
    typeof body.maxFiles !== 'number' ||
    !Number.isSafeInteger(body.maxFiles) ||
    body.maxFiles < 1
  ) {
    return undefined
  }

  const receipts = body.uploads.filter(isUploadReceipt)
  return receipts.length === body.uploads.length
    ? { uploads: receipts, maxFiles: body.maxFiles }
    : undefined
}

function isUploadReceipt(value: unknown): value is UploadReceipt {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'size' in value &&
    typeof value.size === 'number' &&
    'contentType' in value &&
    typeof value.contentType === 'string' &&
    'uploadedAt' in value &&
    typeof value.uploadedAt === 'string' &&
    'expiresAt' in value &&
    typeof value.expiresAt === 'string' &&
    'downloadUrl' in value &&
    typeof value.downloadUrl === 'string'
  )
}

function formatFileSize(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
