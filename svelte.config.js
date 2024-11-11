import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: [vitePreprocess()],
  extensions: ['.svelte'],
	kit: {
    // preload: false,
    adapter: adapter({
      out: 'build',
      precompress: false,
      envPrefix: ''
    }),
    files: {
      assets: 'public',
    }
  },
}
