"use client";

import Script from "next/script";
import { useCspNonce } from "@/app/components/csp-nonce-context";

const CF_BEACON_TOKEN = "9b19e46d62334121a6ddd4133f232767";

export function CloudflareRum({ enabled }: { enabled: boolean }) {
  const nonce: string | undefined = useCspNonce();

  if (!enabled) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${CF_BEACON_TOKEN}"}`}
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}
