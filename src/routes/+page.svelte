<script>
  import { getContext } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from "$app/environment"

  const articles = getContext('articles')
  const categories = getContext('categories')
  const tags = getContext('tags')

  let query = null

  $: filteredArticles = $articles.filter((a) => {
    query = null
    if (a.category.hidden) {
      return false
    }
    const searchParams = browser && $page.url.searchParams
    let q
    if (searchParams) {
      q = searchParams.get('tag')
      if (q) {
        query = `tag: "${q}"`
        if (!a.tags.find((t) => t.name == q)) {
          return false
        }
      }
      q = searchParams.get('category')
      if (q) {
        query = `category: "${q}"`
        if (a.category.slug !== q) {
          return false
        }
      }
    }
    return true
  })

</script>

<h1 class="text-xl my-6">
  <a href="/">endaaman.com</a>
</h1>

<div class="my-6 overflow-x-auto w-full border border-primary">
  <table class="table table-auto">
    <tr>
      <th class="w-24">Category</th>
      <td>
        {#each $categories as category}
          {#if !category.hidden}
            <a href="/?category={category.slug}" class="link mr-2 whitespace-nowrap">{category.label}</a>
          {/if}
        {/each}
      </td>
    </tr>
    <tr>
      <th class="">Tags</th>
      <td>
        {#each $tags as tag}
          <a href="/?tag={tag.name}" class="link mr-2 whitespace-nowrap">{tag.name}({tag.count})</a>
        {/each}
      </td>
    </tr>
  </table>
</div>

{#if query}
  <p class="my-4 text-secondary">{query} - {filteredArticles.length} articles found</p>
{/if}

<ul class="mt-6">
  {#each filteredArticles as a}
    <li class="my-2">
      <a class="link" href="/{a.category.slug}/{a.slug}">{ a.title }</a>
    </li>
  {/each}
</ul>
