import { createFileRoute } from '@tanstack/react-router'
import type {} from '@tanstack/react-start'
import { env } from 'cloudflare:workers'
import {
  deleteTemporaryUpload,
  downloadTemporaryUpload,
} from '../server/uploads'

export const Route = createFileRoute('/api/uploads/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        if (!env.UPLOADS) {
          return new Response('Temporary file storage is not configured.', {
            status: 503,
          })
        }

        return downloadTemporaryUpload(env.UPLOADS, params.id)
      },
      DELETE: async ({ params }) => {
        if (!env.UPLOADS) {
          return Response.json(
            { error: 'Temporary file storage is not configured.' },
            { status: 503 },
          )
        }

        const deleted = await deleteTemporaryUpload(env.UPLOADS, params.id)
        if (!deleted) {
          return Response.json({ error: 'File not found.' }, { status: 404 })
        }

        return Response.json(
          { success: true },
          { headers: { 'Cache-Control': 'no-store' } },
        )
      },
    },
  },
})
