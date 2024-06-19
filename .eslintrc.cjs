module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/recommended'],
  plugins: ['vue', 'nuxt'],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/multi-word-component-names': 'off' // Disable multi-word component names rule.
  }
}
