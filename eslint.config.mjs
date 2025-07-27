// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Configuration for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: await import("@typescript-eslint/parser"),
      globals: {
        defineNuxtConfig: "readonly",
      },
    },
  },
  // Configuration for Vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      // Allow Vuetify's v-slot syntax with modifiers
      "vue/valid-v-slot": "off",
    },
  },
  // Global rules
  {
    rules: {
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      // Allow v-html for trusted content
      "vue/no-v-html": "warn",
    },
  },
);
