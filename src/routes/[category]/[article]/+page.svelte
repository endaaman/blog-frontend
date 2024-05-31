<script>
  import { page } from '$app/stores'
  import { error } from '@sveltejs/kit'
  import { getContext } from 'svelte'

  import Markdown from '$lib/components/markdown.svelte';

  // const articles = getContext('articles')
  // const category_slug = $page.params.category
  // const article_slug = $page.params.article
  // $: article = $articles.find((a) => {
  //   if (a.category.slug === category_slug) {
  //     if (a.slug === article_slug) {
  //       return a
  //     }
  //   }
  //   return null
  // })

  export let data
  const article = data.article
</script>

<svelte:head>
  <title>endaaman.com - {article.title}</title>
</svelte:head>

<p class="text-lg my-6">
  <a href="/" class="hover:text-secondary">endaaman.com</a>
</p>

{#if article}

<div class="my-2 flex gap-4 justify-middle">
  <p>{ article.date }</p>
  <a href="/?category={article.category.slug}">
    <span class="badge hover:badge-secondary text-xs">{article.category.label}</span>
  </a>
</div>

<h1 class="text-2xl mt-2">
  <a href="/{article.category.slug}/{article.slug}" class="hover:text-secondary">{ article.title }</a>
</h1>

{#if article}
  <p class="my-2 text-sm">{ article.digest }</p>
{/if}

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
  <Markdown source={article.body}></Markdown>
</div>
<!-- <pre>{ JSON.stringify(article.tags, 0, 2) }</pre> -->

{/if}
