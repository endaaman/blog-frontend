// import adapter from '@sveltejs/adapter-node'
import adapter from '@sveltejs/adapter-static'

const config = {
  extensions: ['.svelte'],
	// kit: {
    // adapter: adapter({
      // out: 'build',
      // precompress: false,
      // envPrefix: ''
    // })
  // },
  kit: {
    adapter: adapter({
      fallback: '200.html',
    }),
    prerender: {
      entries: ['*'],
    },
  },
}

export default config
