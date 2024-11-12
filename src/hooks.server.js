

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost:3000'

export async function handleFetch({ request, fetch }) {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/api')) {
    request = new Request(
      `http://${BACKEND_HOST}${url.pathname}${url.search}`,
      request
    )
  }
  const headers = new Headers(request.headers)
  headers.set('Cache-Control', 'no-cache')
  return fetch(request)
}
