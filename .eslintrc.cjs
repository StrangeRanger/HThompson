module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@nuxtjs',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        tabWidth: 2,
        singleQuote: true,
        printWidth: 100,
        trailingComma: 'none'
      }
    ]
    // Add any additional rules here
  }
}
