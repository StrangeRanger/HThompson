import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SiteShell from "@/app/layout/site-shell";
import theme from "@/app/theme";
import {Suspense} from "react";
import {MatomoAnalytics} from "@/app/layout/matomo-analytics";

export const metadata: Metadata = {
  title: "HThompson",
  description: "Personal website for Hunter T.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <Suspense fallback={null}>
          <MatomoAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
