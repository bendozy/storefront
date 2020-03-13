module.exports = {
  theme: {
    backgroundColor: {
      primary: 'var(--color-bg-primary)',
      secondary: 'var(--color-bg-secondary)',
      ternary: 'var(--color-bg-ternary)',
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    extend: {},
  },
  variants: {},
  plugins: [],
}
