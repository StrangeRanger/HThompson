var idSite = 1;
var matomoTrackingApiUrl = "https://analytics.randomserver.xyz/matomo.php";
var _paq = (window._paq = window._paq || []);
_paq.push(["setTrackerUrl", matomoTrackingApiUrl]);
_paq.push(["setSiteId", idSite]);

// ..........
_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
// Enable the use of navigator.sendBeacon()
//_paq.push(["alwaysUseSendBeacon"]);
// Enable the tracking of bots
_paq.push(["appendToTrackingUrl", "bots=1"]);
// Share the tracking cookie across example.com, www.example.com, subdomain.example.com, ...
_paq.push(["setCookieDomain", "*.randomserver.xyz"]);
// Tell Matomo the website domain so that clicks on these domains are not tracked as 'Outlinks'
_paq.push(["setDomains", ["*.randomserver.xyz"]]);

/* Tracker methods like "setCustomDimension" should be called before "trackPageView" */
// ..........
_paq.push(["trackPageView"]);
// Enable Download & Outlink tracking
_paq.push(["enableLinkTracking"]);
// ..........
//_paq.push(["trackVisibleContentImpressions"]);
// Accurately measure the time spent in the visit
//_paq.push(["enableHeartBeatTimer"]);
