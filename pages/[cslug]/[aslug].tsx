import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig, mutate } from 'swr'
import MarkdownIt from 'markdown-it'
// import markdownItPrism from 'markdown-it-prism'

import { fetcher } from '@/middlewares/utils'
import type { Article } from '@/middlewares/models'


export const getStaticPaths = async () => {
  const aa: Article[] = await fetcher('/articles')
  return {
    paths: aa.map((a) => `/${a.category.slug}/${a.slug}`),
    fallback: 'blocking',
  }
}

function to_path(cslug:string, aslug:string) {
  return `/articles/${cslug}/${aslug}`
}

export const getStaticProps = async ({ params:{ cslug, aslug } }) => {
  const path = to_path(cslug, aslug)
  const res: Response = await fetcher(path, false)
  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  const a: Article = await res.json()
  return {
    props:{
      path: path,
      fallback: {
        [path]: a,
      }
    }
  }
}

function Article({cslug, aslug}) {
  const router = useRouter()
  const path = to_path(cslug, aslug)
  const { data:article } = useSWR(path, fetcher)

  const updateArticle = async (e) => {
    const a = await fetcher(path)
    mutate(path, a)
    e.preventDefault()
  }

  const markdownIt = new MarkdownIt()

  // markdownIt.use(markdownItPrism, {})
  const innerHtml = markdownIt.render(article.body)

  return (
    <div>
      <hr />
      <Link href={router.asPath} onClick={updateArticle}><h1>{article.title}</h1></Link>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
    </div>
  )
}



export default function({ fallback, path }) {
  const router = useRouter()
  const { cslug, aslug } = router.query

  return (
    <SWRConfig value={{ fallback }}>
      <pre>{JSON.stringify(path)}</pre>
      <pre>{JSON.stringify(fallback)}</pre>
      <Article cslug={cslug} aslug={aslug}/>
    </SWRConfig>
  )
}
