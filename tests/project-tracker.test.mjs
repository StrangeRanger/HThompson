import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Use Node's TypeScript support with the same alias as Next.js. The server-only
// marker is enforced by the Next.js build, not by this server-side test runner.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") {
      return { url: "data:text/javascript,export {};", shortCircuit: true };
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

const { GET } = await import("../app/api/project-tracker/route.ts");
const HOUR = 60 * 60 * 1000;

function createProjectListResponse(url, failure, empty) {
  if (failure === "list") return new Response(null, { status: 403 });
  if (failure === "malformed-list") return Response.json({ unexpected: true });
  if (empty) return Response.json([]);
  if (url.includes("/repos?")) {
    const repo = {
      id: 1,
      name: "example",
      private: false,
      html_url: "https://github.com/StrangeRanger/example",
      description: "Example repo",
      topics: ["activity-tracked"],
      archived: false,
      fork: false,
      stargazers_count: 3,
      pushed_at: "2026-09-01T00:00:00Z",
    };
    return Response.json([repo, { ...repo, id: 2, name: "empty" }]);
  }
  return Response.json([
    {
      id: "example-gist",
      public: true,
      html_url: "https://gist.github.com/StrangeRanger/example-gist",
      files: { "example.py": {} },
      description: "Example gist",
      updated_at: "2026-09-01T00:00:00Z",
    },
  ]);
}

function createCommitResponse(url, failure, commitDate) {
  assert.ok(url.endsWith("/commits?per_page=1"));
  if (url.includes("/empty/")) return new Response(null, { status: 409 });
  if (failure === "commit") return new Response(null, { status: 403 });
  if (failure === "malformed-commit")
    return Response.json({ unexpected: true });
  const date = failure === "invalid-date" ? "invalid" : commitDate;
  return Response.json(
    url.includes("/gists/")
      ? [{ committed_at: date }]
      : [{ commit: { committer: { date } } }],
  );
}

test("shared project tracker cache", async (t) => {
  let now = Date.now();
  let commitDate = "2025-01-01T00:00:00Z";
  let failure = "list";
  let empty = false;
  let gate = Promise.resolve();
  const calls = [];

  t.mock.method(Date, "now", () => now);
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push(url);
    assert.ok(url.startsWith("https://api.github.com/"));
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(options.headers, undefined, "No authentication required");
    await gate;

    if (failure === "network") throw new Error("Network unavailable");
    if (url.includes("/users/")) {
      return createProjectListResponse(url, failure, empty);
    }

    return createCommitResponse(url, failure, commitDate);
  });

  await t.test(
    "cold failures return 503 and back off for an hour",
    async () => {
      const response = await GET();
      assert.equal(response.status, 503);
      assert.equal(response.headers.get("Retry-After"), "3600");
      assert.equal(response.headers.get("Cache-Control"), "no-store");
      assert.match((await response.json()).error, /temporarily unavailable/);
      assert.equal(calls.length, 2);
      now += HOUR - 1;
      assert.equal((await GET()).status, 503);
      assert.equal(calls.length, 2);
      now += 1;
    },
  );

  let snapshot;
  await t.test("concurrent visitors share one successful refresh", async () => {
    failure = null;
    let release;
    gate = new Promise((resolve) => {
      release = resolve;
    });
    const before = calls.length;
    const responses = Array.from({ length: 20 }, () => GET());
    assert.equal(
      calls.length - before,
      2,
      "Only one pair of list requests starts",
    );
    release();
    const results = await Promise.all(responses);
    snapshot = await results[0].json();
    for (const response of results.slice(1)) {
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), snapshot);
    }
    assert.equal(
      calls.length - before,
      5,
      "Two lists plus three commit requests",
    );
    assert.equal(snapshot.length, 3);
    assert.equal(snapshot[0].lastCommitTimestamp, Date.parse(commitDate));
    assert.equal(
      snapshot[1].lastCommitTimestamp,
      null,
      "Empty repos remain valid",
    );
    assert.equal(snapshot[2].lastCommitTimestamp, Date.parse(commitDate));
  });

  await t.test(
    "cached visits make no GitHub requests before expiry",
    async () => {
      const before = calls.length;
      now += HOUR - 1;
      for (let visit = 0; visit < 10; visit++) {
        assert.deepEqual(await (await GET()).json(), snapshot);
      }
      assert.equal(calls.length, before);
    },
  );

  await t.test(
    "expiry triggers one refresh with updated commit dates",
    async () => {
      now += 1;
      commitDate = "2026-08-01T00:00:00Z";
      const before = calls.length;
      const responses = await Promise.all(
        Array.from({ length: 20 }, () => GET()),
      );
      snapshot = await responses[0].json();
      assert.equal(snapshot[0].lastCommitTimestamp, Date.parse(commitDate));
      assert.equal(snapshot[2].lastCommitTimestamp, Date.parse(commitDate));
      assert.equal(calls.length - before, 5);
    },
  );

  for (const mode of [
    "list",
    "commit",
    "network",
    "malformed-list",
    "malformed-commit",
    "invalid-date",
  ]) {
    await t.test(
      `${mode} failure preserves the snapshot and backs off`,
      async () => {
        now += HOUR;
        failure = mode;
        const response = await GET();
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), snapshot);
        const afterRefresh = calls.length;
        now += HOUR - 1;
        for (let visit = 0; visit < 5; visit++) {
          assert.deepEqual(await (await GET()).json(), snapshot);
        }
        assert.equal(calls.length, afterRefresh);
      },
    );
  }

  await t.test("recovery can cache a valid empty project list", async () => {
    now += HOUR;
    failure = null;
    empty = true;
    const before = calls.length;
    assert.deepEqual(await (await GET()).json(), []);
    assert.deepEqual(await (await GET()).json(), []);
    assert.equal(calls.length - before, 2);
  });
});
