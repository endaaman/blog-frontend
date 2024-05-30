<script>
  import { onMount } from 'svelte'

  import mdIt from 'markdown-it'
  import mdItContainer from 'markdown-it-container'
  import mdItKatex from '@traptitech/markdown-it-katex'
  import Prism from 'prismjs'
  import "prismjs/components/prism-python"
  import "prismjs/components/prism-json"
  import "prismjs/components/prism-vim"
  import "prismjs/components/prism-c"
  import "prismjs/components/prism-cpp"
  import "prismjs/components/prism-markdown"
  import "prismjs/components/prism-lua"
  import "prismjs/components/prism-bash"

  import 'katex/dist/katex.min.css'
  import 'prismjs/themes/prism.min.css'

  export let source
  let el = null

  const md = mdIt()
  md.use(mdItKatex)
  md.use(mdItContainer)

  const html = md.render(source)
  // const html = '<strong style="color:red;">HELLO</strong>'

  onMount(()=> {
    el.querySelectorAll('pre > code').forEach((e) => {
      let isCode = false
      let lang = null
      let filename = null
      e.classList.forEach((c) => {
        if (c === 'language-none') {
          return
        }
        const splitted = c.split('language-')
        if (splitted.length !== 2) {
          return
        }
        isCode = true
        const langs = splitted[1].split(':')
        lang = langs[0]
        if (langs.length >= 2) {
          e.dataset.filename = langs[1]
        }
        e.className = `language-${lang}`;
        return false
      })
      console.log(e)
      if (isCode) {
        Prism.highlightElement(e)
      }
    })
  })
</script>

<style lang="scss" global>
  .prose {
    li {
      color: red;
    }
    img {
      max-width: 100%;
    }
    pre code::after {
      content: attr(data-filename);
      width: 100px;
      height: 100px;
      background-color: red;
    }
  }
</style>

<p class="p-32">EXAMPLE</p>

<article class="prose" bind:this={el}>
  {@html html}
</article>

<!-- <hr> -->
<!-- <pre>{ source }</pre> -->
