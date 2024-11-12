import { error } from '@sveltejs/kit'

export async function load({ fetch, url, params }) {
  const res = await fetch('/api/data')
  const data = await res.json()

  return data
}
