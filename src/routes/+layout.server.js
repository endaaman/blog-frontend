// import { BACKEND_HOST, PATH } from '$env/static/private'
// BACKEND_HOST = BACKEND_HOST || 'localhost:3000'

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost:3000'

export async function load({ url }) {
  const response = await fetch(`http://${BACKEND_HOST}/api/data`)
  const data = await response.json()
  return {
    ...data,
    status: 200,
    headers: {
      'cache-control': 'max-age=0, s-maxage=3600',
    },
  }
}
