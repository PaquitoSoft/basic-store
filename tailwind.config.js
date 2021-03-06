module.exports = {
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('daisyui')
  ]
}
