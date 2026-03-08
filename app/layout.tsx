import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SiteShell from "@/app/layout/site-shell";
import theme from "@/app/theme";
import { Suspense } from "react";
import { MatomoAnalytics } from "@/app/layout/matomo-analytics";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { headers } from "next/headers";
import { CspNonceProvider } from "@/app/components/csp-nonce-context";
import { CloudflareRum } from "@/app/layout/cloudflare-rum";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const metadata: Metadata = {
  title: "HThompson",
  description: "Personal website for Hunter T.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders: ReadonlyHeaders = await headers();
  const nonce: string | undefined = requestHeaders.get("x-nonce") ?? undefined;
  const host: string | null =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const isAllowedHost: boolean =
    host === "hthompson.dev" || (host?.endsWith(".hthompson.dev") ?? false);

  return (
    <html lang="en">
      <body>
        <CspNonceProvider nonce={nonce}>
          <AppRouterCacheProvider options={{ enableCssLayer: true, nonce }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SiteShell>{children}</SiteShell>
            </ThemeProvider>
            <Suspense fallback={null}>
              <MatomoAnalytics />
              <CloudflareRum enabled={isAllowedHost} />
            </Suspense>
          </AppRouterCacheProvider>
        </CspNonceProvider>
      </body>
    </html>
  );
}
