import { error } from '@sveltejs/kit'
import { API_BASE } from '$lib/config'
import { compile } from '$lib/markdown'


export async function load({ fetch, url, params }) {
  const categorySlug = params.category
  const articleSlug = params.article
  if (!(categorySlug && articleSlug)) {
      error(404, {
        message: 'Not found'
      })
      return
  }

  const path = `/api/articles/${categorySlug}/${articleSlug}`
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    if (res.status === 404) {
      error(404, {
        message: 'Not found'
      })
      return
    }
  }
  const article = await res.json()
  article.html = compile(article.body)

  return {
    article,
    status: 200,
    headers: {
      'cache-control': 'max-age=0, s-maxage=3600',
    },
  }
}
