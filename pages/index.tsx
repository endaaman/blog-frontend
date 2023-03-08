import type { NextPage , GetStaticProps } from 'next'
import Link from 'next/link'
import useSWR, { SWRConfig } from 'swr'

import { fetcher } from '@/libs/utils'
import type { Category, Article } from '@/libs/models'


export const getStaticProps = async (params) => {
  const articles: Article[] = await fetcher('/articles')
  return {
    props:{
      fallback: {
        '/articles': articles,
      }
    }
  }
}

function ArticleList() {
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
