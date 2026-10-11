import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";
import "next/dist/server/node-environment-baseline.js";
import { NextRequest } from "next/server.js";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server.js";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "next/server") {
      return nextResolve("next/server.js", context);
    }
    if (specifier.startsWith("@/")) {
      return nextResolve(
        new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href,
        context,
      );
    }
    return nextResolve(specifier, context);
  },
});

const { isHoneypotPath } = await import("../app/lib/honeypot.ts");
const { proxy, config } = await import("../proxy.ts");
const { default: nextConfig } = await import("../next.config.ts");

function request(path, options) {
  return new NextRequest(`https://hthompson.test${path}`, options);
}

// Direct proxy calls do not run Next.js's preceding URL normalization/redirects.
test("reserved paths reaching the proxy return uncached 418s before CSP", async () => {
  for (const path of [
    "/.env",
    "/.env.local",
    "/.env.production",
    "/.env.production.local",
    "/.aws/credentials",
    "/.vscode/sftp.json",
    "/wp-login.php",
    "/wp-config.php",
    "/xmlrpc.php",
    "/phpinfo.php",
    "/info.php",
    "/.git",
    "/wp-admin",
    "/wp-includes",
    "/.git/config",
    "/.git/HEAD",
    "/wp-admin/install.php",
    "/wp-includes/js/example.js",
    "/.env/",
    "/wp-admin/",
    "/.env?download=1",
    "/%2eenv",
    "/.git%2fconfig",
    "/.git/%invalid",
  ]) {
    assert.equal(
      unstable_doesMiddlewareMatch({ config, nextConfig, url: path }),
      true,
      path,
    );
    const response = proxy(request(path));
    assert.equal(response.status, 418, path);
    assert.equal(response.headers.get("Cache-Control"), "no-store", path);
    assert.equal(
      response.headers.get("Content-Type"),
      "text/plain; charset=utf-8",
    );
    assert.equal(response.headers.get("Location"), null, path);
    assert.equal(response.headers.get("Content-Security-Policy"), null, path);
    assert.equal(await response.text(), "I'm a teapot\n", path);
  }
});

test("all methods and prefetch headers reach trap detection", async () => {
  for (const method of [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ]) {
    for (const headers of [
      {},
      { "next-router-prefetch": "1" },
      { purpose: "prefetch" },
      { "next-router-prefetch": "1", purpose: "prefetch" },
    ]) {
      const url = "/wp-admin";
      assert.equal(
        unstable_doesMiddlewareMatch({ config, nextConfig, url, headers }),
        true,
      );
      const response = proxy(request(url, { method, headers }));
      assert.equal(response.status, 418);
      assert.equal(
        await response.text(),
        method === "HEAD" ? "" : "I'm a teapot\n",
      );
    }
  }
});

test("similar names, legitimate URLs, and malformed escapes are not traps", () => {
  for (const path of [
    "/",
    "/about",
    "/links",
    "/policies",
    "/project-tracker",
    "/api/project-tracker",
    "/images/3996769.jpg",
    "/_next/static/example.js",
    "/_next/image",
    "/.well-known/security.txt",
    "/.well-known/acme-challenge/token",
    "/robots.txt",
    "/sitemap.xml",
    "/ads.txt",
    "/admin",
    "/login",
    "/blog",
    "/ordinary-missing-page",
    "/.github/config",
    "/.gitignore",
    "/wp-administer",
    "/wp-login.php.txt",
    "/.environment",
    "/.env/documentation",
    "/docs/.env",
    "/.ENV",
    "/%252eenv",
    "/%invalid",
  ]) {
    assert.equal(isHoneypotPath(path), false, path);
    assert.equal(
      proxy(request(path)).headers.get("x-middleware-next"),
      "1",
      path,
    );
  }
  assert.notEqual(proxy(request("/?next=/.env")).status, 418);
});

test("configuration can disable traps or reserve additional paths", () => {
  const customConfig = {
    enabled: true,
    exactPaths: ["/api/private-config"],
    directoryPaths: ["/private-source"],
  };
  assert.equal(isHoneypotPath("/api/private-config", customConfig), true);
  assert.equal(isHoneypotPath("/private-source/file", customConfig), true);
  assert.equal(isHoneypotPath("/private-source-other", customConfig), false);
  assert.equal(isHoneypotPath("/.env", customConfig), false);

  const disabledConfig = { ...customConfig, enabled: false };
  assert.equal(isHoneypotPath("/api/private-config", disabledConfig), false);
  assert.equal(isHoneypotPath("/private-source/file", disabledConfig), false);
  assert.equal(isHoneypotPath("/.env"), true);
});

test("normal page responses still forward a matching CSP nonce", () => {
  const first = proxy(request("/about"));
  const second = proxy(request("/about"));
  const nonce = first.headers.get("x-middleware-request-x-nonce");
  const csp = first.headers.get("Content-Security-Policy");
  assert.ok(nonce);
  assert.ok(csp.includes(`'nonce-${nonce}'`));
  assert.equal(
    first.headers.get("x-middleware-request-content-security-policy"),
    csp,
  );
  assert.notEqual(second.headers.get("x-middleware-request-x-nonce"), nonce);
});

test("the matcher excludes API routes and Next.js assets from the proxy", () => {
  for (const url of [
    "/api/project-tracker",
    "/_next/static/example.js",
    "/_next/image?url=%2Fimages%2F3996769.jpg&w=640&q=75",
    "/favicon.ico",
  ]) {
    assert.equal(
      unstable_doesMiddlewareMatch({ config, nextConfig, url }),
      false,
      url,
    );
  }
});

test("page prefetches reach the proxy but skip CSP processing", () => {
  const path = "/about";
  for (const headers of [
    { "next-router-prefetch": "1" },
    { purpose: "prefetch" },
  ]) {
    assert.equal(
      unstable_doesMiddlewareMatch({ config, nextConfig, url: path, headers }),
      true,
    );
    const response = proxy(request(path, { headers }));
    assert.equal(response.headers.get("x-middleware-next"), "1", path);
    assert.equal(response.headers.get("Content-Security-Policy"), null, path);
    assert.equal(
      response.headers.get("x-middleware-request-x-nonce"),
      null,
      path,
    );
  }
});
