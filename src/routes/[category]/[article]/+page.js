import { error } from '@sveltejs/kit'
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

  const res = await fetch(`/api/articles/${categorySlug}/${articleSlug}`)
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
  }
}
