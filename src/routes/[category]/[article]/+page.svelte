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

<style>
.link {
  margin-right: 8px;
}
</style>

<p><a href="/">Top</a></p>

<h1>{ article.title }</h1>

<table>
  <tr>
    <th>Category</th>
    <td>
      <a href="/?category={article.category.slug}">{ article.category.label }</a>
    </td>
  </tr>
  <tr>
    <th>Tags</th>
    <td>
      {#if article.tags.length > 0}
        {#each article.tags as tag}
          <a href="/?tag={tag.name}" class="link">{tag.name}</a>
        {/each}
      {:else}
        No tags
      {/if}
    </td>
  </tr>
</table>

<Markdown source={article.body}></Markdown>
<!-- <pre>{ JSON.stringify(article.tags, 0, 2) }</pre> -->

<hr>
<p>©2024 endaaman.com</p>
