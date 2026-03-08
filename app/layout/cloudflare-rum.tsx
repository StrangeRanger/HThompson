import Script from "next/script";

const CF_BEACON_TOKEN = "9b19e46d62334121a6ddd4133f232767";

interface CloudflareRumProps {
  enabled: boolean;
  nonce?: string;
}

export function CloudflareRum({ enabled, nonce }: CloudflareRumProps) {
  if (!enabled || !nonce) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${CF_BEACON_TOKEN}"}`}
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}
