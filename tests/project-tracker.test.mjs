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
const { fetchAllRepos, fetchAllGists } =
  await import("../app/project-tracker/lib/fetch-projects.ts");
const { getRepoStatus, getGistStatus } =
  await import("../app/project-tracker/lib/project-status.ts");
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

for (const [resource, fetchProjects] of [
  ["repos", fetchAllRepos],
  ["gists", fetchAllGists],
]) {
  for (const count of [0, 100, 101, 201]) {
    test(`${resource}: paginate ${count} items before fetching public commits`, async (t) => {
      const [template] = await createProjectListResponse(
        `/${resource}?`,
        null,
        false,
      ).json();
      const items = Array.from({ length: count }, (_, id) => ({
        ...template,
        id: resource === "repos" ? id : String(id),
        name: `example-${id}`,
        private: id === 0,
        public: id !== 0,
      }));
      const pages = [];
      const commits = [];
      const expectedPages = Array.from(
        { length: Math.floor(count / 100) + 1 },
        (_, index) => index + 1,
      );

      t.mock.method(globalThis, "fetch", async (url, options) => {
        const parsed = new URL(url);
        assert.equal(parsed.origin, "https://api.github.com");
        assert.equal(options.cache, "no-store");
        assert.ok(options.signal instanceof AbortSignal);

        if (parsed.pathname === `/users/StrangeRanger/${resource}`) {
          assert.equal(parsed.searchParams.get("per_page"), "100");
          const page = Number(parsed.searchParams.get("page"));
          pages.push(page);
          assert.ok(pages.length <= expectedPages.length);
          return Response.json(items.slice((page - 1) * 100, page * 100));
        }

        assert.deepEqual(pages, expectedPages);
        commits.push(url);
        return createCommitResponse(url, null, "2026-09-01T00:00:00Z");
      });

      const projects = await fetchProjects();
      assert.deepEqual(pages, expectedPages);
      assert.deepEqual(
        projects.map((project) => project.id),
        items.slice(1).map((item) => item.id),
      );
      assert.deepEqual(
        commits,
        items
          .slice(1)
          .map((item) =>
            resource === "repos"
              ? `https://api.github.com/repos/StrangeRanger/${item.name}/commits?per_page=1`
              : `https://api.github.com/gists/${item.id}/commits?per_page=1`,
          ),
      );
    });
  }

  for (const failure of ["http", "malformed", "network"]) {
    test(`${resource}: reject ${failure} failures on later pages`, async (t) => {
      const pages = [];
      t.mock.method(globalThis, "fetch", async (url) => {
        const parsed = new URL(url);
        assert.equal(parsed.pathname, `/users/StrangeRanger/${resource}`);
        const page = Number(parsed.searchParams.get("page"));
        pages.push(page);
        if (page === 1) return Response.json(Array(100).fill({}));
        if (failure === "http") return new Response(null, { status: 403 });
        if (failure === "malformed") return Response.json({ unexpected: true });
        throw new Error("Network unavailable");
      });

      const message =
        failure === "http"
          ? "GitHub failed: 403"
          : failure === "malformed"
            ? `Invalid GitHub ${resource === "repos" ? "repositories" : "gists"} response`
            : "Network unavailable";
      await assert.rejects(fetchProjects(), { message });
      assert.deepEqual(pages, [1, 2]);
    });
  }
}

test("repository overrides match names regardless of case", () => {
  for (const name of ["web-note-app", "Web-Note-App", "WEB-NOTE-APP"]) {
    assert.equal(
      getRepoStatus({
        name,
        topics: ["status-personal"],
        archived: true,
        lastCommitDate: null,
      }),
      "abandoned",
      name,
    );
  }
});

test("repository overrides ignore inherited property names", () => {
  for (const name of ["constructor", "toString", "__proto__"]) {
    const repo = { name, topics: [], archived: false, lastCommitDate: null };
    assert.equal(getRepoStatus(repo), "unknown", name);
    assert.equal(
      getRepoStatus({ ...repo, topics: ["status-maintained"] }),
      "maintained",
      name,
    );
  }
});

test("project statuses preserve markers, precedence, and the activity boundary", (t) => {
  const now = Date.parse("2026-09-11T00:00:00Z");
  t.mock.timers.enable({ apis: ["Date"], now });
  const repo = {
    name: "example",
    topics: [],
    archived: false,
    lastCommitDate: null,
  };
  const gist = { description: null, lastCommitDate: null };
  const markersToTopics = (markers) =>
    markers.map((marker) =>
      marker === "activity-tracked" ? marker : `status-${marker}`,
    );

  const checkBoth = (markers, lastCommitDate, expected) => {
    assert.equal(
      getRepoStatus({
        ...repo,
        topics: markersToTopics(markers),
        lastCommitDate,
      }),
      expected,
    );
    assert.equal(
      getGistStatus({
        ...gist,
        description: markers.map((marker) => `(status: ${marker})`).join(" "),
        lastCommitDate,
      }),
      expected,
    );
  };

  for (const status of [
    "personal",
    "maintained",
    "finished",
    "unsupported",
    "concept",
    "wip",
    "suspended",
    "abandoned",
    "archived",
    "moved",
    "unspecified",
  ]) {
    checkBoth([status], null, status);
  }
  checkBoth([], null, "unknown");
  checkBoth(["unrecognized"], null, "unknown");
  checkBoth(["maintained", "activity-tracked", "personal"], null, "personal");
  checkBoth(["finished", "maintained"], null, "maintained");
  checkBoth(["maintained", "activity-tracked"], null, "unknown");
  assert.equal(getGistStatus(gist), "unknown");
  assert.equal(
    getGistStatus({ ...gist, description: "(status: Maintained)" }),
    "unknown",
  );

  for (const [age, expected] of [
    [0, "active"],
    [90 * 24 * HOUR, "active"],
    [90 * 24 * HOUR + 1, "inactive"],
  ]) {
    checkBoth(
      ["maintained", "activity-tracked"],
      new Date(now - age).toISOString(),
      expected,
    );
  }

  for (const [topics, expected] of [
    [[], "archived"],
    [["status-maintained"], "maintained"],
    [["status-moved"], "archived"],
    [["activity-tracked"], "unknown"],
  ]) {
    assert.equal(getRepoStatus({ ...repo, archived: true, topics }), expected);
  }
  for (const [name, expected] of [
    ["fafb-powershell-tool", "abandoned"],
    ["identify-root-user-logins", "moved"],
  ]) {
    assert.equal(
      getRepoStatus({
        ...repo,
        name,
        archived: true,
        topics: ["status-personal"],
      }),
      expected,
    );
  }
});
