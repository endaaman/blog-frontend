<script>
	import { page } from '$app/stores';
</script>

<p><a href="/">Top</a></p>

<h1>{ $page.error.message }</h1>
<p>Code: { $page.status }</p>
<!-- <pre>{ JSON.stringify($page, 0, 2) }</pre> -->
