<script>
  import { page } from '$app/stores'
  import { getContext } from 'svelte'

  import Markdown from '$lib/components/markdown.svelte';

  const articles = getContext('articles')

  const category_slug = $page.params.category
  const article_slug = $page.params.article

  const article = $articles.find((a) => {
    if (a.category.slug === category_slug) {
      if (a.slug === article_slug) {
        return a
      }
    }
    return null
  })
</script>

<p class="my-6">
  <a href="/" class="link">Top</a>
</p>

{#if article}

<h1 class="text-xl mt-6 mb-4">
  <a href="/{article.category.slug}/{article.slug}" class="link">{ article.title }</a>
</h1>

{#if article}
  <p class="my-4">{ article.digest }</p>
{/if}

<div class=" my-4 overflow-x-auto w-full border border-secondary">
  <table class="table table-auto">
    <tr>
      <th class="w-24">Category</th>
      <td>
        <a href="/?category={article.category.slug}" class="link whitespace-nowrap">{article.category.label}</a>
      </td>
    </tr>
    <tr>
      <th>Tags</th>
      <td>
        {#if article.tags.length > 0}
          {#each article.tags as tag}
            <a href="/?tag={tag.name}" class="link mr-2 whitespace-nowrap">{tag.name}({tag.count})</a>
          {/each}
        {:else}
          No tags
        {/if}
      </td>
    </tr>
  </table>
</div>

<Markdown source={article.body}></Markdown>
<!-- <pre>{ JSON.stringify(article.tags, 0, 2) }</pre> -->

{/if}
