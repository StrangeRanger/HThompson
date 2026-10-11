import { NextRequest, NextResponse } from "next/server";
import { isHoneypotPath } from "@/app/lib/honeypot";

const isDev: boolean = process.env.NODE_ENV === "development";

function buildContentSecurityPolicy(nonce: string): string {
  const styleSrc: string = isDev
    ? "style-src 'self' https: 'unsafe-inline'"
    : `style-src 'self' https: 'nonce-${nonce}'`;

  const directives: string[] = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://analytics.hthompson.dev https://files.hthompson.dev${isDev ? " 'unsafe-eval'" : ""}`,
    `connect-src 'self' https://analytics.hthompson.dev https://api.github.com${isDev ? " ws: http:" : ""}`,
    styleSrc,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' blob: data:",
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
  const { pathname } = request.nextUrl;

  if (isHoneypotPath(pathname)) {
    return new NextResponse(
      request.method === "HEAD" ? null : "I'm a teapot\n",
      {
        status: 418,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  // Keep prefetches out of CSP processing after checking honeypot paths.
  if (
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  ) {
    return NextResponse.next();
  }

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
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
