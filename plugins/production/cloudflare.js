export default defineNuxtPlugin(() => {
  useHead({
    script: [
      { src: "/cdn-cgi/challenge-platform/scripts/jsd/main.js", crossorigin: true, referrerpolicy: "origin" }
    ]
  }, { mode: 'client' })
})
