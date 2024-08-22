// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  plugins: [
    process.env.NODE_ENV !== "development" ? "plugins/production/vue-matomo.client.js" : "",
    process.env.NODE_ENV !== "development" ? "plugins/production/cloudflare.js" : "",
  ].filter(Boolean),
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxt/eslint",
    "nuxt-security",
    "@nuxt/devtools",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error - Error exception specified in the Vuetify installation guide...
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  security: {
    ssg: {
      meta: true, // Enables CSP as a meta tag in SSG mode
      hashScripts: true, // Enables CSP hash support for scripts in SSG mode
      hashStyles: false, // Disables CSP hash support for styles in SSG mode (recommended)
      exportToPresets: true // Export security headers to Nitro presets
    },
    sri: true,
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        "default-src": ["'self'", "https://analytics.hthompson.dev"],
        "img-src": ["'self'", "blob:"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": [
          "'self'",
          "https:",
          "strict-dynamic",
          "https://analytics.hthompson.dev",
          "https://files.hthompson.dev/scripts/tracking.js",
          "https://static.cloudflareinsights.com",
        ],
      },
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-08-18",
});
