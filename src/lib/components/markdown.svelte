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
  // import 'prismjs/themes/prism.min.css'
  import "prism-themes/themes/prism-material-dark.min.css"
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

    element.querySelectorAll('table').forEach((table) => {
      const wrapper = document.createElement('div')
      wrapper.className = "table-wrapper"
      const parent = table.parentNode
      parent.replaceChild(wrapper, table)
      wrapper.appendChild(table)
    })
  })
</script>

<style lang="postcss">
  :global(.article-main pre) {
    position: relative;
  }
  :global(.article-main pre[data-filename]::before) {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px 8px;
    background-color: #ddd;
    color: #444;
    content: attr(data-filename);
  }

  :global(.article-main pre code), :global(.article-main pre) {
    @apply text-sm md:text-base;
    /* Use theme bg color */
    background-color: oklch(var(--n));
  }

  :global(.article-main .table-wrapper) {
    /* @apply overflow-x-auto; */
    @apply overflow-x-auto
  }

  :global(.article-main img) {
    @apply min-w-[256px];
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.article-main img~em) {
    display: block;
    margin: -1.5rem auto 0;
    line-height: 1.3;
    text-align: center;
    color: #93a5b1;
    font-size: .95rem;
  }

  :global(.article-main .katex-display) {
    /* overflow: auto hidden */
    overflow-x: auto;
  }
</style>

<div>
  <article class="article-main prose prose-md  max-w-none" bind:this={ element }>
    {@html html}
  </article>
</div>

<!-- <hr> -->
<!-- <pre>{ source }</pre> -->
