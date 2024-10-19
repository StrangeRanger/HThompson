export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== "development") {
    useHead(
      {
        script: [
          {
            src: "/cdn-cgi/challenge-platform/scripts/jsd/main.js",
            crossorigin: "anonymous",
            referrerpolicy: "origin",
          },
        ],
      },
      { mode: "client" },
    );
  }
});
