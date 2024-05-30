<script>
  import { onMount } from 'svelte'

  import mdIt from 'markdown-it'
  import mdItContainer from 'markdown-it-container'
  import mdItAlerts from 'markdown-it-github-alerts'
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
  import 'markdown-it-github-alerts/styles/github-base.css'
  import 'markdown-it-github-alerts/styles/github-colors-light.css'


  export let source
  let element = null

  const md = mdIt()
  md.use(mdItKatex)
  md.use(mdItAlerts)

  // md.use(mdItContainer, 'note', {
  //   validate: function(params) {
  //     console.log(params, params.trim().match(/^!NOTE\s+(.*)$/))
  //     return params.trim().match(/^!NOTE\s+(.*)$/)
  //   },
  //   render: function (tokens, idx) {
  //     const m = tokens[idx].info.trim().match(/^!NOTE\s+(.*)$/);
  //     if (tokens[idx].nesting === 1) {
  //       return `<div class="note ${md.utils.escapeHtml(m[1])}">\n`;
  //     } else {
  //       return '</div>\n';
  //     }
  //   }
  // });

  const html = md.render(source)
  // const html = '<strong style="color:red;">HELLO</strong>'

  onMount(()=> {
    element.querySelectorAll('pre > code').forEach((e) => {
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
          e.parentElement.dataset.filename = langs[1]
        }
        e.className = `language-${lang}`;
        return false
      })
      if (isCode) {
        Prism.highlightElement(e)
      }
    })
  })
</script>

<style lang="scss">
  :global(.article-main pre) {
    position: relative;
    border-radius: 0;
  }
  :global(.article-main pre[data-filename]::before) {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px 8px;
    background-color: #ddd;
    content: attr(data-filename);
  }
</style>

<div>
  <article class="article-main prose prose-md min-w-full" bind:this={ element }>
    {@html html}
  </article>
</div>

<!-- <hr> -->
<!-- <pre>{ source }</pre> -->
