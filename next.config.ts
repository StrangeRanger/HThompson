import type { NextConfig } from "next";

const isDev: boolean = process.env.NODE_ENV === "development";

const securityHeaders: Array<{ key: string; value: string }> = [
  {
    key: "Cross-Origin-Embedder-Policy",
    value: isDev ? "unsafe-none" : "credentialless",
  },
  { key: "Referrer-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
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
  async headers(): Promise<
    Array<{ source: string; headers: Array<{ key: string; value: string }> }>
  > {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
