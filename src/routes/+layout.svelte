<script>
  import '../app.css'
  import Title from '$lib/components/title.svelte'
</script>


<div class="mx-auto px-4 lg:w-[960px] md:w-[720px] sm:w-full md:px-0">
  <Title/>
  <slot></slot>
</div>

<hr>

<div class="mx-auto px-4 lg:w-[960px] md:w-[720px] sm:w-full md:px-0">
  <p class="my-6 text-base-300">©2024 endaaman.com</p>
</div>
