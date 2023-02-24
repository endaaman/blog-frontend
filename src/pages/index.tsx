import type { NextPage , GetStaticProps } from 'next'
import Link from 'next/link'
import useSWR, { SWRConfig } from 'swr'
import { fetcher } from '@/middlewares/utils'
import type { Category, Article } from '@/middlewares/models'
import { plainToClass } from 'class-transformer'


export const getStaticProps = async (params) => {
  const articles = await fetcher('/articles')
  return {
    props:{
      fallback: {
        '/articles': articles,
      }
    }
  }
}

function ArticleList() {
  // const { data } = useSWR('/articles', typedFetcher(Article))
  const { data: articles } = useSWR('/articles', fetcher)
  return (<div>
    <ul>
      { articles.map((a: Article) => (
        <li key={a.slug}><Link href={a.category.slug + "/" + a.slug}>{a.title}</Link></li>
      ) ) }
    </ul>
  </div>)
}

export default function({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <h2>Articles</h2>
      <ArticleList />
    </SWRConfig>
  )
}
