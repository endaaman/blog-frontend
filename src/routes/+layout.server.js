import { error } from '@sveltejs/kit'
import { API_BASE } from '$lib/config'

export async function load({ fetch, url, params }) {
  const response = await fetch(`${API_BASE}/api/data`)
  const data = await response.json()

  return {
    ...data,
    status: 200,
    headers: {
      'cache-control': 'max-age=0, s-maxage=3600',
    },
  }
}
