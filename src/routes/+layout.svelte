<script>
  import '../app.css';
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

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

<div class="mx-auto pb-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
  <slot></slot>
</div>

<hr>

<div class="mx-auto my-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
  <p>©2024 endaaman.com</p>
</div>
