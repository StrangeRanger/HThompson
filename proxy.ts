import { NextRequest, NextResponse } from "next/server";

const isDev: boolean = process.env.NODE_ENV === "development";

function buildContentSecurityPolicy(nonce: string): string {
  const styleSrc: string = isDev
    ? "style-src 'self' https: 'unsafe-inline'"
    : `style-src 'self' https: 'nonce-${nonce}'`;

  const directives: string[] = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://analytics.hthompson.dev https://files.hthompson.dev/scripts/tracking.js${isDev ? " 'unsafe-eval'" : ""}`,
    styleSrc,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' blob: data:",
    `connect-src 'self' https://analytics.hthompson.dev https://api.github.com${isDev ? " ws: http:" : ""}`,
    "font-src 'self' data:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ];

  if (!isDev) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const nonce: string = Buffer.from(crypto.randomUUID()).toString("base64");
  const contentSecurityPolicy: string = buildContentSecurityPolicy(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
