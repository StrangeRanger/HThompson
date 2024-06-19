module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/recommended'],
  plugins: ['vue', 'nuxt'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  }
}
