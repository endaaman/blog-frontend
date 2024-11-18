<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import Markdown from '$lib/components/markdown.svelte'
  import Giscus from '@giscus/svelte'

  export let data
  const article = data.article
  const pathname = `/${article.category.slug}/${article.slug}`

  const giscusConfig = {
    id: 'giscus-widget',
    host: 'https://giscus.app',
    repo: 'endaaman/blog-frontend',
    repoId: 'R_kgDOJA50wQ',
    category: 'General',
    categoryId: 'DIC_kwDOJA50wc4CkWxV',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    inputPosition: 'bottom',
    loading: 'lazy',
    lang: 'ja',
    term: '',
    // theme: 'light_protanopia',
    theme: 'light',
  }
</script>

<svelte:head>
  <title>endaaman.com - {article.title}</title>
  <meta name="description" content={article.digest} />
  <meta property="og:title" content={article.title} />
  <meta property="og:image" content={ article.image || `${$page.url.origin}/favicon.png` } />
  <meta property="og:description" content={article.digest} />
  <meta name="giscus:backlink" content={`https://endaaman.com${pathname}`}>
  <meta name="giscus:description" content="Comments for">
</svelte:head>

<style>
  .giscus-wrapper {
    width: 100%;
    margin: 2rem 0;
  }
  /* Not work */
  :global(.gsc-reactions-count::part(iframe)) {
    display: none !important;
  }
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

<div class="giscus-wrapper">
  <Giscus {...giscusConfig}></Giscus>
</div>

{/if}
