const uploadPrefix = 'mtech-study-files/'
const retentionMs = 60 * 60 * 1000

export type TemporaryUpload = {
  id: string
  name: string
  size: number
  contentType: string
  uploadedAt: string
  expiresAt: string
  downloadUrl: string
}

export async function saveTemporaryUploads(
  bucket: R2Bucket,
  files: File[],
): Promise<TemporaryUpload[]> {
  const uploadedIds: string[] = []
  const uploads: TemporaryUpload[] = []

  try {
    for (const file of files) {
      const upload = await saveTemporaryUpload(bucket, file)
      uploadedIds.push(upload.id)
      uploads.push(upload)
    }
  } catch (error) {
    if (uploadedIds.length > 0) {
      try {
        await bucket.delete(uploadedIds.map((id) => `${uploadPrefix}${id}`))
      } catch (cleanupError) {
        throw new AggregateError(
          [error, cleanupError],
          'The upload batch failed and its partial files could not be removed.',
        )
      }
    }
    throw error
  }

  return uploads
}

export async function listTemporaryUploads(
  bucket: R2Bucket,
  now = Date.now(),
): Promise<TemporaryUpload[]> {
  const uploads: TemporaryUpload[] = []
  let cursor: string | undefined

  do {
    const page = await bucket.list({
      include: ['customMetadata', 'httpMetadata'],
      prefix: uploadPrefix,
      limit: 1000,
      cursor,
    })

    for (const object of page.objects) {
      const id = object.key.slice(uploadPrefix.length)
      if (!isUploadId(id)) continue

      const uploadedAt =
        Number(object.customMetadata?.uploadedAt) || object.uploaded.getTime()
      const expiresAt =
        Number(object.customMetadata?.expiresAt) || uploadedAt + retentionMs
      if (expiresAt <= now) continue

      const encodedName = object.customMetadata?.name
      if (!encodedName) {
        throw new Error(`Temporary upload ${id} is missing its filename metadata.`)
      }

      uploads.push({
        id,
        name: decodeURIComponent(encodedName),
        size: object.size,
        contentType:
          object.httpMetadata?.contentType || 'application/octet-stream',
        uploadedAt: new Date(uploadedAt).toISOString(),
        expiresAt: new Date(expiresAt).toISOString(),
        downloadUrl: `/api/uploads/${id}`,
      })
    }

    cursor = page.truncated ? page.cursor : undefined
  } while (cursor)

  return uploads.sort(
    (first, second) =>
      new Date(second.uploadedAt).getTime() -
      new Date(first.uploadedAt).getTime(),
  )
}

export async function countTemporaryUploads(
  bucket: R2Bucket,
  now = Date.now(),
  stopAt = Number.POSITIVE_INFINITY,
): Promise<number> {
  let count = 0
  let cursor: string | undefined

  do {
    const page = await bucket.list({
      include: ['customMetadata'],
      prefix: uploadPrefix,
      limit: Math.min(1000, Math.max(1, stopAt - count)),
      cursor,
    })

    count += page.objects.filter((object) => {
      const uploadedAt =
        Number(object.customMetadata?.uploadedAt) || object.uploaded.getTime()
      const expiresAt =
        Number(object.customMetadata?.expiresAt) || uploadedAt + retentionMs
      return expiresAt > now
    }).length

    if (count >= stopAt) return count

    cursor = page.truncated ? page.cursor : undefined
  } while (cursor)

  return count
}

async function saveTemporaryUpload(
  bucket: R2Bucket,
  file: File,
): Promise<TemporaryUpload> {
  const uploadedAt = Date.now()
  const expiresAt = uploadedAt + retentionMs
  const id = crypto.randomUUID()
  const name = file.name.trim().slice(0, 255) || 'upload'
  const contentType = /^[\w.+-]+\/[\w.+-]+$/.test(file.type)
    ? file.type
    : 'application/octet-stream'

  await bucket.put(`${uploadPrefix}${id}`, file.stream(), {
    httpMetadata: { contentType },
    customMetadata: {
      name: encodeURIComponent(name),
      size: String(file.size),
      uploadedAt: String(uploadedAt),
      expiresAt: String(expiresAt),
    },
  })

  return {
    id,
    name,
    size: file.size,
    contentType,
    uploadedAt: new Date(uploadedAt).toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
    downloadUrl: `/api/uploads/${id}`,
  }
}

export async function downloadTemporaryUpload(
  bucket: R2Bucket,
  id: string,
): Promise<Response> {
  if (!isUploadId(id)) {
    return new Response('Upload not found.', { status: 404 })
  }

  const key = `${uploadPrefix}${id}`
  const object = await bucket.get(key)
  if (!object) {
    return new Response('Upload not found.', { status: 404 })
  }

  const expiresAt = Number(object.customMetadata?.expiresAt)
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    await bucket.delete(key)
    return new Response('This temporary upload has expired.', {
      status: 410,
    })
  }

  const encodedName = object.customMetadata?.name
  if (!encodedName) {
    throw new Error(`Temporary upload ${id} is missing its filename metadata.`)
  }

  const name = decodeURIComponent(encodedName)
  const fallbackName =
    name.replace(/[\r\n"\\]/g, '_').replace(/[^\x20-\x7e]/g, '_') ||
    'download'
  const contentType =
    object.httpMetadata?.contentType || 'application/octet-stream'

  return new Response(object.body, {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Disposition': `attachment; filename="${fallbackName}"; filename*=UTF-8''${encodeURIComponent(name)}`,
      'Content-Length': String(object.size),
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export async function deleteTemporaryUpload(
  bucket: R2Bucket,
  id: string,
): Promise<boolean> {
  if (!isUploadId(id)) return false

  const key = `${uploadPrefix}${id}`
  const object = await bucket.head(key)
  if (!object) return false

  await bucket.delete(key)
  return true
}

export async function deleteExpiredUploads(
  bucket: R2Bucket,
  now = Date.now(),
): Promise<void> {
  let cursor: string | undefined

  do {
    const page = await bucket.list({
      prefix: uploadPrefix,
      limit: 1000,
      cursor,
    })
    const expiredKeys = page.objects
      .filter((object) => now - object.uploaded.getTime() >= retentionMs)
      .map((object) => object.key)

    if (expiredKeys.length > 0) {
      await bucket.delete(expiredKeys)
    }

    cursor = page.truncated ? page.cursor : undefined
  } while (cursor)
}

function isUploadId(id: string): boolean {
  return /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
    id,
  )
}
