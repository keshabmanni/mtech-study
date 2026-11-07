import { createFileRoute } from '@tanstack/react-router'
import type {} from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import { maxUploadSize } from '../features/uploads/constants'
import {
  countTemporaryUploads,
  listTemporaryUploads,
  saveTemporaryUploads,
} from '../server/uploads'

export const Route = createFileRoute('/api/uploads')({
  server: {
    handlers: {
      GET: async () => {
        if (!env.UPLOADS) {
          return Response.json(
            { error: 'Temporary file storage is not configured.' },
            { status: 503 },
          )
        }

        const maxFiles = getMaxUploadFiles()
        const uploads = await listTemporaryUploads(env.UPLOADS)
        return Response.json(
          { uploads, maxFiles },
          { headers: { 'Cache-Control': 'no-store' } },
        )
      },
      POST: async ({ request }) => {
        const maxFiles = getMaxUploadFiles()
        const maxRequestSize = maxUploadSize * maxFiles + 256 * 1024
        const contentLength = Number(request.headers.get('content-length'))
        if (Number.isFinite(contentLength) && contentLength > maxRequestSize) {
          return Response.json(
            {
              error: `Upload up to ${maxFiles} files, with each file 10 MB or smaller.`,
            },
            { status: 413 },
          )
        }

        if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
          return Response.json(
            { error: 'Choose a file to upload.' },
            { status: 400 },
          )
        }

        let form: FormData
        try {
          form = await request.formData()
        } catch {
          return Response.json(
            { error: 'The upload form could not be read.' },
            { status: 400 },
          )
        }

        const formFiles = form.getAll('files')
        if (
          formFiles.length === 0 ||
          formFiles.some((file) => !(file instanceof File))
        ) {
          return Response.json(
            { error: 'Choose at least one file to upload.' },
            { status: 400 },
          )
        }

        if (formFiles.length > maxFiles) {
          return Response.json(
            {
              error: `You can upload a maximum of ${maxFiles} files at a time.`,
            },
            { status: 413 },
          )
        }

        const files = formFiles.filter((file): file is File => file instanceof File)
        if (files.some((file) => file.size > maxUploadSize)) {
          return Response.json(
            { error: 'Each file must be 10 MB or smaller.' },
            { status: 413 },
          )
        }

        if (!env.UPLOADS) {
          return Response.json(
            { error: 'Temporary file storage is not configured.' },
            { status: 503 },
          )
        }

        const currentFileCount = await countTemporaryUploads(env.UPLOADS)
        if (currentFileCount + files.length > maxFiles) {
          return Response.json(
            {
              error: `This folder can hold ${maxFiles} files at a time. It currently has ${currentFileCount} files; remove files or wait for uploads to expire before trying again.`,
              currentFileCount,
              maxFiles,
            },
            { status: 409 },
          )
        }

        await saveTemporaryUploads(env.UPLOADS, files)
        return Response.json(
          { success: true },
          { status: 201, headers: { 'Cache-Control': 'no-store' } },
        )
      },
    },
  },
})

function getMaxUploadFiles(): number {
  const value = env.UPLOADS_MAX_FILES
  if (!/^[1-9]\d*$/.test(value)) {
    throw new Error('UPLOADS_MAX_FILES must be a positive whole number.')
  }

  const maxFiles = Number(value)
  if (!Number.isSafeInteger(maxFiles)) {
    throw new Error('UPLOADS_MAX_FILES must be a safe whole number.')
  }
  return maxFiles
}
