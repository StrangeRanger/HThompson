import type { Metadata } from "next";
import Script from "next/script";
import SiteShell from "@/app/components/SiteShell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "HThompson",
  description: "Personal website for Hunter Thompson",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NODE_ENV !== "development";

  return (
    <html lang="en">
      <body>
        {isProd && (
          <>
            <Script
              id="matomo"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  var _paq = window._paq = window._paq || [];
                  _paq.push(['trackPageView']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u='https://analytics.hthompson.dev/';
                    _paq.push(['setTrackerUrl', u + 'matomo.php']);
                    _paq.push(['setSiteId', '2']);
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                  })();
                `,
              }}
            />
            <Script
              src="/cdn-cgi/challenge-platform/scripts/jsd/main.js"
              strategy="afterInteractive"
              crossOrigin="anonymous"
              referrerPolicy="origin"
            />
          </>
        )}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
