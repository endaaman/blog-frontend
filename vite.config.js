import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  server: {
    proxy: {
      // '/static': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
   fs: {
      allow: ['static'],
    },
  }
})
