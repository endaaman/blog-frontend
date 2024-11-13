<script>
  import { onMount } from 'svelte'
  import Prism from 'prismjs'
  import 'prismjs/components/prism-python'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-vim'
  import 'prismjs/components/prism-c'
  import 'prismjs/components/prism-cpp'
  import 'prismjs/components/prism-markdown'
  import 'prismjs/components/prism-lua'
  import 'prismjs/components/prism-bash'

  import 'katex/dist/katex.min.css'
  // import 'prismjs/themes/prism.min.css'
  import 'prism-themes/themes/prism-material-dark.min.css'
  import 'markdown-it-github-alerts/styles/github-base.css'
  import 'markdown-it-github-alerts/styles/github-colors-light.css'

  let element = null
  export let html

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
          filename = langs[1]
        }
        e.className = `language-${lang}`;
        return false
      })
      if (isCode) {
        Prism.highlightElement(e)
      }

      if (filename) {
        // e.parentElement.dataset.filename = filename
        // スクロールでずれるのでwrapするelementを差し込む
        const parentElement = e.parentNode
        const wrapper = document.createElement('div')
        wrapper.className = 'pre-wrapper'
        wrapper.dataset.filename = filename || lang
        e.parentNode.parentNode.insertBefore(wrapper, e.parentNode)
        wrapper.appendChild(e.parentNode)
      }
    })

    element.querySelectorAll('table').forEach((table) => {
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'
      const parent = table.parentNode
      parent.replaceChild(wrapper, table)
      wrapper.appendChild(table)
    })
  })
</script>

<style lang="postcss">
  :global(.article-main h2) {
    /* @apply pb-2 mb-4; */
    /* border-bottom: 0.8px solid var(--base-300); */
    border-bottom: 0.8px solid oklch(var(--b3));
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  :global(.article-main .footnote-backref) {
    /* &#8617; が絵文字になるのを回避する */
    font-family: sans-serif;
    font-variant: none;
    text-decoration: none;
  }

  :global(.article-main .pre-wrapper) {
    position: relative;
  }
  :global(.article-main .pre-wrapper[data-filename]:after) {
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

  :global(.article-main .markdown-alert) {
    @apply bg-neutral-content;
  }
</style>

<article class="article-main prose prose-md  max-w-none" bind:this={ element }>
  {@html html}
</article>
