// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  plugins: [
    process.env.NODE_ENV !== "development"
      ? "plugins/production/vue-matomo.client.js"
      : "",
    process.env.NODE_ENV !== "development"
      ? "plugins/production/cloudflare.js"
      : "",
  ].filter(Boolean),
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
    strict: true,
    nonce: true,
    corsHandler: {
      origin: ["https://hthompson.dev", "https://*.hthompson.dev"],
    },
    allowedMethodsRestricter: {
      methods: ["GET"],
    },
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
      contentSecurityPolicy: {
        "default-src": ["'self'", "https://analytics.hthompson.dev"],
        "img-src": ["'self'", "blob:"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "https://analytics.hthompson.dev",
          "https://files.hthompson.dev/scripts/tracking.js",
          "https://static.cloudflareinsights.com",
        ],
      },
      referrerPolicy: "same-origin",
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      xContentTypeOptions: "nosniff",
      xFrameOptions: "SAMEORIGIN",
      xXSSProtection: "1; mode=block",
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
