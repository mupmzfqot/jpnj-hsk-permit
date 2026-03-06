export default {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary:        '#2d6a2d',
        'primary-dark': '#1a3d1a',
        'primary-light':'#3a7d3a',
        accent:         '#c8a227',
        surface:        '#f0f7f0',
        border:         '#d4e4d4',
        text:           '#1c2b1c',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      }
    }
  },
  plugins: []
}
