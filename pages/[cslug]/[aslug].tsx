import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig, mutate } from 'swr'
import MarkdownIt from 'markdown-it'
import mdItContainer from 'markdown-it-container'
import Prism from 'prismjs'
import { parse as shellSplit } from 'shell-quote'

import { fetcher } from '@/libs/utils'
import type { Article } from '@/libs/models'




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

function cusmizeMarkdownIt(md: MarkdownIt) {
  md.use(mdItContainer, 'message', {
    validate: function(param: string) {
      const splitted = shellSplit(param.trim())
      return splitted[0] === 'message'
    },
    render(tokens, idx, options, env, self) {
      if (tokens[idx].nesting === 1) {
        const param = tokens[idx].info.trim()
        const [_, title, mode, icon] = shellSplit(param)
        const modeClass = mode ? ` is-${mode}` : ''
        let opening = `<article class="message${modeClass}">`
        if (title) {
          opening += `<div class="message-header"><p>`
          if (icon) {
            opening += `<i class="mdi mdi-18px mdi-${icon}"></i> `
          }
          opening += `${md.utils.escapeHtml(String(title))}</p></div>`
        }
        return opening + `<div class="message-body">`
      } else {
        return '</div></article>'
      }
    }
  })


}

function ArticleComponent({cslug, aslug}) {
  const router = useRouter()
  const path = to_path(cslug, aslug)
  const { data:article } = useSWR(path, fetcher)

  const md = new MarkdownIt()
  cusmizeMarkdownIt(md)

  useEffect(() => {
    Prism.manual = true;
    Prism.highlightAll()
  })

  const updateArticle = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const a = await fetcher(path)
    mutate(path, a)
    e.preventDefault()
  }

  const innerHtml = md.render(article.body)

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
      {/* <pre>{JSON.stringify(path)}</pre> */}
      {/* <pre>{JSON.stringify(fallback)}</pre> */}
      <ArticleComponent cslug={cslug} aslug={aslug}/>
    </SWRConfig>
  )
}
