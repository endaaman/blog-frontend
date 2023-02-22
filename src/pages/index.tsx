import type { NextPage , GetStaticProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { fetchJson } from '@/middlewares/utils'
import { http } from '@/middlewares/utils'


interface Category {
    priority: number,
    slug: string,
    name: string,
}

interface Article {
    category: Category,
    slug: string,
    title: string,
    date: string,
    digest: string,
    image: string,
    tags: string[],
    special: boolean,
    private: boolean,
}

type Props = {
  articles: Article[]
}

export const getStaticProps = async () => {
  const res = await http('/articles')

  return {
    props:{ articles: res.data }
  }
}

export const Home = (props: Props) => {
  const { articles } = props
  return (
    <div>
      <h2>Articles</h2>
      <ul>
        { articles.map((a) => (
          <li key={a.slug}><Link href="/{a.category.slug}/{a.slug}">{a.title}</Link></li>
        ) ) }
      </ul>
    </div>
  )
}
