// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        /* @ts-expect-error: 'config.plugins' is possibly 'undefined'.ts(18048) */
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  plugins: [{ src: '~/plugins/vue-matomo.js', mode: 'client' }],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  css: ['~/assets/css/main.css']
})
