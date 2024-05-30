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

<slot></slot>

<hr>
<p>©2024 endaaman.com</p>
