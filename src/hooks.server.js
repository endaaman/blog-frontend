/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  const path = event.url.pathname

  if (path === '/') {
    response.headers.set(
      'Cache-Control',
      // 10分キャッシュ、30分古いキャッシュ許容
      'public, s-maxage=600, stale-while-revalidate=1800'
    )
  } else {
    response.headers.set(
      'Cache-Control',
      // 1時間キャッシュ、24時間古いキャッシュ許容
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
  }
  return response
}
