<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
  <title>endaaman.com - {$page.status}</title>
</svelte:head>

<p class="mt-6 mb-4">
  <a href="/" class="hover:text-secondary">Top</a>
</p>

<h1 class="my-4">{ $page.error.message }</h1>

<p>Code: { $page.status }</p>
{#if $page.status !== 400}
  <pre>{ JSON.stringify($page.error, 0, 2) }</pre>
{/if}
