<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import Markdown from '$lib/components/markdown.svelte'

  export let data
  const article = data.article
  const pathname = `/${article.category.slug}/${article.slug}`

  onMount(() => {
    if (browser) {
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.setAttribute('data-repo', 'endaaman/blog-frontend')
      script.setAttribute('data-repo-id', 'R_kgDOJA50wQ')
      script.setAttribute('data-category', 'General')
      script.setAttribute('data-category-id', 'DIC_kwDOJA50wc4CkWxV')
      script.setAttribute('data-mapping', 'pathname')
      script.setAttribute('data-strict', '0')
      script.setAttribute('data-reactions-enabled', '1')
      script.setAttribute('data-emit-metadata', '0')
      script.setAttribute('data-input-position', 'bottom')
      script.setAttribute('data-theme', 'light_protanopia')
      script.setAttribute('data-lang', 'ja')
      script.setAttribute('data-loading', 'lazy')
      script.setAttribute('data-description', 'Comments for')
      script.crossOrigin = 'anonymous'
      script.async = true
      document.getElementById('comments')?.appendChild(script)
      script.onload = () => {
        console.log('Giscus loaded')
      }
    }
  })
</script>

<svelte:head>
  <title>endaaman.com - {article.title}</title>
  <meta name="description" content={article.digest} />
  <meta property="og:title" content={article.title} />
  <meta property="og:image" content={ article.image || `${$page.url.origin}/favicon.png` } />
  <meta property="og:description" content={article.digest} />
  <meta name="giscus:backlink" content={`https://endaaman.com${pathname}`}>
</svelte:head>

<style>
  .giscus {
    width: 100%;
    margin: 2rem 0;
  }
  /* Not work */
  /* :global(.gsc-reactions-count) { */
  /*   display: none !important; */
  /* } */
</style>

{#if article}

<div class="my-2 flex gap-4 justify-middle">
  <p>{ article.date }</p>
  <a href="/?category={article.category.slug}">
    <span class="badge hover:badge-secondary text-xs">{article.category.label}</span>
  </a>
</div>

<h1 class="text-2xl mt-2">
  <a href={pathname} class="hover:text-secondary">{ article.title }</a>
</h1>

<p class="my-2 text-sm">{ article.digest }</p>

<div class="my-2 flex flex-wrap gap-x-2">
  {#if article.tags.length > 0}
    {#each article.tags as tag}
      <a href="/?tag={tag}">
        <span class="badge hover:badge-secondary text-xs">{tag}</span>
      </a>
    {/each}
  {:else}
    <p class="text-sm text-base-300">No tags</p>
  {/if}
</div>

<div class="my-6">
  <Markdown html={article.html}></Markdown>
</div>
<!-- <pre>{ JSON.stringify(article.tags, 0, 2) }</pre> -->

<div class="comments-wrapper">
  <div id="comments" class="giscus" />
</div>

{/if}
