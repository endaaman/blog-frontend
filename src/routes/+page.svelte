<script>
  import { getContext } from 'svelte'

  const articles = getContext('articles')
  const categories = getContext('categories')
  const tags = getContext('tags')

  export let data

  $: filteredArticles = $articles.filter((a) => {
    if (data.tag) {
      if (!a.tags.find((t) => t.name == data.tag )) {
        console.log(a.title)
        return false
      }
    }

    if (data.category) {
      if (a.category.slug != data.category) {
        return false
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
        <a href="/?category={category.slug}" class="link">{category.label}</a>
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
