import adapter from '@sveltejs/adapter-node'
// import adapter from '@sveltejs/adapter-static'

const config = {
  extensions: ['.svelte'],
	kit: {
    adapter: adapter({
      out: 'build',
      precompress: false,
      envPrefix: ''
    })
  },

  // SSG
  // kit: {
  //   adapter: adapter({
  //     pages: 'build',
  //     assets: 'build',
  //     fallback: null,
  //     precompress: false,
  //     strict: true
  //   }),
  //   prerender: {
  //     handleHttpError: ({ path, referrer, message }) => {
  //       console.log(path, path.startsWith('/static/'))
  //       if (path.startsWith('/static/')) {
  //         return 'ignore'
  //       }
  //       throw new Error(message)
  //     }
  //   }
  // },

}

export default config
