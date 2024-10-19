// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
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
      methods: ["GET", "HEAD", "OPTIONS"],
    },
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
      contentSecurityPolicy: {
        "default-src": ["'none'"],
        "img-src": ["'self'", "blob:"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
        "connect-src": ["'self'", "https://analytics.hthompson.dev"],
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
    hidePoweredBy: true,
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["~/assets/css/main.css"],
  telemetry: false,
});
