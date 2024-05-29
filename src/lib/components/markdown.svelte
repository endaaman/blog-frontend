<script>
  import mdIt from 'markdown-it'
  import mdItContainer from 'markdown-it-container'
  import mdItKatex from '@traptitech/markdown-it-katex'
  import 'katex/dist/katex.min.css'

  export let source

  const md = mdIt()
  md.use(mdItKatex)

  const html = md.render(source)
  // const html = '<strong style="color:red;">HELLO</strong>'
</script>

<style>
  .prose :global(img) {
    max-width: 100%;
  }
</style>

<article class="prose">
  {@html html}
</article>

<!-- <hr> -->
<!-- <pre>{ source }</pre> -->
