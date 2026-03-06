import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SiteShell from "@/app/layout/site-shell";
import theme from "@/app/theme";
import { Suspense } from "react";
import { MatomoAnalytics } from "@/app/layout/matomo-analytics";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { headers } from "next/headers";
import { CspNonceProvider } from "@/app/layout/csp-nonce-context";

export const metadata: Metadata = {
  title: "HThompson",
  description: "Personal website for Hunter T.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce: string | undefined =
    (await headers()).get("x-nonce") ?? undefined;

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
            </Suspense>
          </AppRouterCacheProvider>
        </CspNonceProvider>
      </body>
    </html>
  );
}
