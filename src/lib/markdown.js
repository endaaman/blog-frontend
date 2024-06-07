import mdIt from 'markdown-it'
import mdItContainer from 'markdown-it-container'
import mdItAlerts from 'markdown-it-github-alerts'
import mdItKatex from '@traptitech/markdown-it-katex'


const md = mdIt()
md.use(mdItKatex)
md.use(mdItAlerts)

export function compile(source) {
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

  return md.render(source)
}
