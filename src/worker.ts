import server from '@tanstack/react-start/server-entry'
import { deleteExpiredUploads } from './server/uploads'

export default {
  async fetch(
    request: Request,
    env: Cloudflare.Env,
  ): Promise<Response> {
    const url = new URL(request.url)
    const clientKey = request.headers.get('CF-Connecting-IP') ?? 'unknown'

    if (
      url.pathname === '/' &&
      (request.method === 'GET' || request.method === 'HEAD')
    ) {
      const { success } = await env.MAIN_PAGE_LIMITER.limit({
        key: clientKey,
      })
      if (!success) {
        return rateLimitedResponse()
      }
    }

    if (url.pathname === '/api/uploads' && request.method === 'POST') {
      const { success } = await env.UPLOAD_API_LIMITER.limit({
        key: clientKey,
      })
      if (!success) {
        return rateLimitedResponse()
      }
    }

    if (
      url.pathname.startsWith('/api/uploads/') &&
      request.method === 'GET'
    ) {
      const { success } = await env.UPLOAD_DOWNLOAD_LIMITER.limit({
        key: clientKey,
      })
      if (!success) {
        return rateLimitedResponse()
      }
    }

    return server.fetch(request)
  },
  async scheduled(
    _controller: ScheduledController,
    env: Cloudflare.Env,
  ): Promise<void> {
    await deleteExpiredUploads(env.UPLOADS)
  },
}

function rateLimitedResponse(): Response {
  return new Response('Too many requests. Please try again in a minute.', {
    status: 429,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
      'Retry-After': '60',
    },
  })
}
