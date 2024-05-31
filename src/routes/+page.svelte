<script>
  import { getContext } from 'svelte'
  import { page } from '$app/stores'
  import { browser } from "$app/environment"

  const articles = getContext('articles')
  const categories = getContext('categories')
  const tags = getContext('tags')

  let filtering = false
  let tagQuery = null
  let categoryQuery = null

  let aa = []
  let curatedTags = []

  $: {
    tagQuery = null
    categoryQuery = null
    aa = $articles.filter((a) => {
      filtering = false
      if (a.category.hidden) {
        return false
      }
      const searchParams = browser && $page.url.searchParams
      let q
      if (searchParams) {
        q = searchParams.get('tag')
        if (q) {
          filtering = true
          tagQuery = q
          if (!a.tags.includes(q)) {
            return false
          }
        }
        q = searchParams.get('category')
        if (q) {
          filtering = true
          categoryQuery = q
          if (a.category.slug !== q) {
            return false
          }
        }
      }
      return true
    })

    curatedTags = []
    aa.forEach((a) => {
      a.tags.forEach((t) => {
        const tag = curatedTags.find((tag) => tag.name == t)
        if (tag) {
          tag.count += 1
        } else {
          curatedTags.push({
            name: t,
            count: 1,
          })
        }
      })
    })
  }

  function withQuery(q) {
    const url = new URL($page.url)
    for (const [key, value] of Object.entries(q)) {
      if (value) {
        url.searchParams.set(key, value)
      } else {
        url.searchParams.delete(key)
      }
    }
    return url.toString()
  }
</script>

<svelte:head>
  <title>endaaman.com</title>
</svelte:head>

<h1 class="text-xl my-6">
  <a href="/" class="hover:text-secondary">endaaman.com</a>
</h1>

<h2 class="mt-2 text-sm">Category</h2>
<div class="flex flex-wrap gap-x-2 gap-y-1">
  {#each $categories as c}
    {#if !c.hidden}
      <a href={ categoryQuery !== c.slug ? withQuery({category: c.slug, tag: null}) : withQuery({category: null})  }>
        {#if categoryQuery !== c.slug}
          <span class="badge hover:badge-secondary text-xs">{c.label}</span>
        {:else}
          <span class="badge badge-secondary hover:badge-outline text-xs">{c.label}</span>
        {/if}
      </a>
    {/if}
  {/each}
</div>

<h2 class="mt-2 text-sm">Tag</h2>
<div class="flex flex-wrap gap-x-2 gap-y-1">
  {#each curatedTags as tag}
    <a href={ tagQuery !== tag.name ? withQuery({tag: tag.name}) : withQuery({tag: null}) } class="">
      {#if tagQuery !== tag.name}
        <span class="badge hover:badge-secondary text-xs">{tag.name} ({tag.count})</span>
      {:else}
        <span class="badge badge-secondary hover:badge-outline text-xs">{tag.name} ({tag.count})</span>
      {/if}
    </a>
  {/each}
</div>

{#if filtering}
  <p class="my-4 text-secondary">{aa.length} articles found.</p>
{/if}

<div class="mt-4">
  {#each aa as a, i}
    {@const curYear = a.date.slice(0, 4)}
    {@const lastYear = i >= 1 ? aa[i-1].date.slice(0, 4) : null }
    {@const showYear = i == 0 || curYear !== lastYear}
    {#if showYear}
    <div class="mt-6 mb-2 badge badge-ghost">{ curYear }年</div>
    {/if}
    <div class="my-2">
      <a class="hover:text-secondary" href="/{a.category.slug}/{a.slug}">{ a.title }</a>
    </div>
  {/each}
</div>
