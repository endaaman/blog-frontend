<script>
  import { getContext } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from "$app/environment"

  const articles = getContext('articles')
  const categories = getContext('categories')
  const tags = getContext('tags')


  $: filteredArticles = $articles.filter((a) => {
    if (a.category.hidden) {
      return false
    }
    const searchParams = browser && $page.url.searchParams
    if (searchParams) {
      if (searchParams.get('tag')) {
        if (!a.tags.find((t) => t.name == searchParams.get('tag') )) {
          return false
        }
      }

      if (searchParams.get('category')) {
        if (a.category.slug !== searchParams.get('category')) {
          return false
        }
      }
    }
    return true
  })

</script>

<style>
.link {
  margin-right: 8px;
}
</style>

<h1><a href="/">endaaman.com</a></h1>

<table>
  <tr>
    <th>Category</th>
    <td>
      {#each $categories as category}
        {#if !category.hidden}
          <a href="/?category={category.slug}" class="link">{category.label}</a>
        {/if}
      {/each}
    </td>
  </tr>
  <tr>
    <th>Tags</th>
    <td>
      {#each $tags as tag}
        <a href="/?tag={tag.name}" class="link">{tag.name}({tag.count})</a>
      {/each}
    </td>
  </tr>
</table>

<ul>
  {#each filteredArticles as a}
    <li><a href="/{a.category.slug}/{a.slug}">{ a.title }</a></li>
  {/each}
</ul>
