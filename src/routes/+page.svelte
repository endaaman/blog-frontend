<script>
  import '../app.css'
  import { page } from '$app/stores'
  import { browser } from '$app/environment'

  export let data

  const articles = data.articles
  const categories = data.categories
  const tags = data.tags

  const NO_TAG = 'タグなし'

  let filtering = false
  let tagQuery = null
  let tagSortRuleIndex = 0
  let categoryQuery = null

  let aa = []
  let curatedTags = []
  const tagSortRules = [
    // {
    //   icon: 'i-lucide-arrow-down-narrow-wide',
    //   rule: 'ascend',
    // },
    {
      icon: 'i-lucide-arrow-down-wide-narrow',
      rule: 'descending',
      func: (a,b) => (
        b.count-a.count ||
        a.name.localeCompare(b.name)
      )
    },
    {
      icon: 'i-lucide-arrow-down-a-z',
      rule: 'az',
      func: (a,b) => (
        a.name.localeCompare(b.name) ||
        b.count-a.count
      )
    },
    // {
    //   icon: 'i-lucide-arrow-down-z-a',
    //   rule: 'za',
    // }
  ]

  function toggleTagSortRule() {
    tagSortRuleIndex = (tagSortRuleIndex+1) % tagSortRules.length
  }

  $: {
    tagQuery = null
    categoryQuery = null
    aa = articles.filter((a) => {
      filtering = false
      if (a.category.hidden) {
        return false
      }
      if (a.draft) {
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
    articles.forEach((a) => {
      if (categoryQuery) {
        if (a.category.slug !== categoryQuery) {
          return
        }
      }
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
    curatedTags.sort((a,b)=> {
      return (
        (a.name===NO_TAG ? 1 : 0) ||
        (b.name===NO_TAG ? -1 : 0) ||
        tagSortRules[tagSortRuleIndex].func(a,b)
      )
    })
  }

  function Q(q) {
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
  <meta name="description" content="endaaman's homepage" />
  <meta property="og:title" content="endaaman.com" />
  <meta property="og:image" content={`${$page.url.origin}/favicon.png`} />
  <meta property="og:description" content="endaaman's homepage" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<h2 class="mt-2 text-md">Category</h2>
<div class="flex flex-wrap gap-x-2 gap-y-1">
  {#each categories as c}
    {#if !c.hidden}
      <a href={ categoryQuery === c.slug ? Q({category:null, tag:null}) : Q({category:c.slug, tag:null}) }>
        {#if categoryQuery !== c.slug}
          <span class="badge hover:badge-secondary text-xs">{c.label}</span>
        {:else}
          <span class="badge badge-secondary hover:badge-outline text-xs">{c.label}</span>
        {/if}
      </a>
    {/if}
  {/each}
</div>

<div class="mt-2 flex items-center">
  <h2 class="text-md">Tag</h2>
  <!-- <div class="ml-2 badge hover:badge-outline items-center"> -->
  <button class="ml-1 btn btn-primary btn-xs btn-ghost btn-circle" on:click={ toggleTagSortRule }>
    <span class={tagSortRules[tagSortRuleIndex].icon}></span>
    <!-- <span class="i-lucide-arrow-down-a-z"></span> -->
    <!-- <span class="i-lucide-arrow-down-z-a"></span> -->
    <!-- <span class="i-lucide-arrow-down-narrow-wide"></span> -->
    <!-- <span class="i-lucide-arrow-down-wide-narrow"></span> -->
  </button>
</div>
<!-- max-md:overflow-x-auto -->
<div class="w-full max-md:max-h-[100px] max-md:overflow-x-auto">
  <div class="flex flex-wrap gap-x-2 gap-y-1">
    {#each curatedTags as tag}
      <a href={ tagQuery === tag.name ? Q({tag:null}) : Q({tag:tag.name}) } class="">
        {#if tagQuery !== tag.name}
          <span class="badge hover:badge-secondary text-xs">{tag.name} ({tag.count})</span>
        {:else}
          <span class="badge badge-secondary hover:badge-outline text-xs">{tag.name} ({tag.count})</span>
        {/if}
      </a>
    {/each}
  </div>
</div>

{#if filtering}
  <p class="my-4 text-secondary text-sm">{aa.length} articles found.</p>
{/if}

<div class="mt-4">
  {#each aa as a, i}
    {@const curYear = a.date.slice(0, 4)}
    {@const lastYear = i >= 1 ? aa[i-1].date.slice(0, 4) : null }
    {@const showYear = i == 0 || curYear !== lastYear}
    {#if showYear}
    <div class="mt-6 mb-3 badge badge-ghost">{ curYear }年</div>
    {/if}
    <div class="my-3">
      <a class="hover:text-secondary" href="/{a.category.slug}/{a.slug}">{ a.title }</a>
    </div>
  {/each}
</div>
