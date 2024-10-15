const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    iconsPlugin({
      collections: getIconCollections(['mdi', 'lucide']),
    }),
  ],
  daisyui: {
    themes: [
      // 'light',
      // 'dark',
      // 'cupcake',
      // 'synthwave',
      // 'corporate',
      'emerald',
      // 'winter',
    ]
  },
}
