/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  const path = event.url.pathname

  if (path === '/') {
    response.headers.set(
      'Cache-Control',
      // 1分キャッシュ、5分古いキャッシュ許容
      'public, s-maxage=60, stale-while-revalidate=300'
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
