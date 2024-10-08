import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMatomo, {
    host: "https://analytics.hthompson.dev",
    siteId: 2,
    trackerFileName: "matomo",
    router: nuxtApp.vueRouter, // Nuxt 3 provides the router instance
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: false,
    requireCookieConsent: false,
    enableHeartBeatTimer: true,
    heartBeatTimerInterval: 15,
    debug: false,
    userId: undefined,
    cookieDomain: "*.hthompson.dev",
    domains: undefined,
    preInitActions: [],
    trackSiteSearch: false,
    crossOrigin: undefined,
  });

  window._paq.push(["trackPageView"]);
  window._paq.push(["enableLinkTracking"]);
});
