import { error } from '@sveltejs/kit'
import { browser } from "$app/environment"

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost:3000'

export async function load({ url, params }) {
  const response = await fetch(`http://${BACKEND_HOST}/api/data`)
  const data = await response.json()

  const categorySlug = params.category
  const articleSlug = params.article

  let article = null
  if (categorySlug && articleSlug) {
    article = data.articles.find((a) => {
      if (a.category.slug === categorySlug) {
        if (a.slug === articleSlug) {
          return a
        }
      }
      return null
    })

    if (!article) {
      error(404, {
        message: 'Not found'
      })
    }
  }

  return {
    ...data,
    article,
    status: 200,
    headers: {
      'cache-control': 'max-age=0, s-maxage=3600',
    },
  }
}
