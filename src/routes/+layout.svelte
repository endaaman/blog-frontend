<script>
  import '../app.css';
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import Title from '$lib/components/title.svelte';

  export let data

  const articles = writable()
  $articles = data.articles
  setContext('articles', articles)

  const categories = writable()
  $categories = data.categories
  setContext('categories', categories)

  const tt = writable()
  $tt = data.tags
  setContext('tags', tt)
</script>


<div class="mx-auto px-4 lg:w-[960px] md:w-[720px] sm:w-full md:px-0">
  <Title/>
  <slot></slot>
</div>

<hr>

<div class="mx-auto px-4 lg:w-[960px] md:w-[720px] sm:w-full md:px-0">
  <p class="my-6 text-base-300">©2024 endaaman.com</p>
</div>
