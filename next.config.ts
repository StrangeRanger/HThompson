import type { NextConfig } from "next";

const isDev: boolean = process.env.NODE_ENV === "development";

const contentSecurityPolicy: string = [
  "default-src 'self'",
  "img-src 'self' blob:",
  "style-src 'self' https: 'unsafe-inline'",
  `connect-src 'self' https://analytics.hthompson.dev https://api.github.com${isDev ? " ws: http:" : ""}`,
  `script-src 'self' https: 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://analytics.hthompson.dev https://files.hthompson.dev/scripts/tracking.js https://static.cloudflareinsights.com https://challenges.cloudflare.com`,
  "script-src-attr 'unsafe-inline'",
].join("; ");

const securityHeaders: Array<{ key: string; value: string }> = [
  {
    key: "Cross-Origin-Embedder-Policy",
    value: isDev ? "unsafe-none" : "credentialless",
  },
  { key: "Referrer-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Permissions-Policy", value: 'picture-in-picture=(self "https://challenges.cloudflare.com")' },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

if (!isDev) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers(): Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>> {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
