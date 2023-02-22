import type { NextPage , GetStaticProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { fetchJson } from '@/middlewares/utils'
import { http } from '@/middlewares/utils'


type Category = {
    priority: int,
    slug: string,
    name: string,
}

type Article = {
    category: Category,
    slug: string,
    title: string,
    date: string,
    digest: string,
    image: string,
    tags: string[],
    special: bool,
    private: bool,
}

type Props = {
  articles: Articles[]
}

export const getStaticProps = async () => {
  const res = await http('/articles')

  return {
    props:{ articles: res.data }
  }
}

const Home:NextPage<Props> = (props) => {
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

export default Home
