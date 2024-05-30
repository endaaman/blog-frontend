export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      // 'corporate',
      // 'light',
      // 'dark',
      // 'cupcake',
      'emerald',
      // 'synthwave',
      // 'corporate',
      // 'winter',
    ]
  },
}
