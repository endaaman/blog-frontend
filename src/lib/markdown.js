import mdIt from 'markdown-it'
import mdItContainer from 'markdown-it-container'
import mdItAlerts from 'markdown-it-github-alerts'
import mdItKatex from '@traptitech/markdown-it-katex'
import mdItFootnote from 'markdown-it-footnote'
import mdItAnchor from 'markdown-it-anchor'


const md = mdIt()
md.use(mdItKatex)
md.use(mdItAlerts)
md.use(mdItFootnote)
md.use(mdItAnchor)

// md.renderer.rules.footnote_anchor = (tokens, idx, options, env, self) => {
//   const id = self.rules.footnote_anchor_name(tokens, idx, options, env, self)
//   if (tokens[idx].meta.subId > 0) {
//     id += ':' + tokens[idx].meta.subId;
//   }
//   return ` <a href="#fnref${id}" class="footnote-backref">&#8617;&#65038;</a>`
// }

export function compile(source) {
  // md.use(mdItContainer, 'note', {
  //   validate: function(params) {
  //     console.log(params, params.trim().match(/^!NOTE\s+(.*)$/))
  //     return params.trim().match(/^!NOTE\s+(.*)$/)
  //   },
  //   render: function (tokens, idx) {
  //     const m = tokens[idx].info.trim().match(/^!NOTE\s+(.*)$/)
  //     if (tokens[idx].nesting === 1) {
  //       return `<div class="note ${md.utils.escapeHtml(m[1])}">\n`
  //     } else {
  //       return '</div>\n'
  //     }
  //   }
  // })

  return md.render(source)
}
