/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  const path = event.url.pathname
  response.headers.set(
    'Cache-Control',
    // caching while 1 week
    'public, s-maxage=2592000, stale-while-revalidate=2592000'
  )
  return response
}
