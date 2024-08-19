// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
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
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: {
        "default-src": ["'self'", "https://analytics.hthompson.dev"],
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "https://analytics.hthompson.dev",
          "https://files.hthompson.dev/scripts/tracking.js",
          "https://static.cloudflareinsights.com",
          "'nonce-{{nonce}}'",
          "'strict-dynamic'",
          "'unsafe-eval'",
        ],
        "style-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "blob:"],
        "base-uri": ["'none'"],
        "object-src": ["'none'"],
        "upgrade-insecure-requests": true
      },
      permissionsPolicy: {
        "camera": [],
        "display-capture": [],
        "fullscreen": [],
        "geolocation": [],
        "microphone": [],
        "web-share": [],
      },
      referrerPolicy: "strict-origin",
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
