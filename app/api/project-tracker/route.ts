import {
  fetchAllGists,
  fetchAllRepos,
} from "@/app/project-tracker/lib/fetch-projects";
import type { TrackedProject } from "@/app/project-tracker/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CACHE_DURATION_MS = 60 * 60 * 1000;

// Shared by all visitors to this server process; cleared on server restart.
let cachedProjects: TrackedProject[] | null = null;
let refreshAfter = 0;
let pendingRefresh: Promise<void> | null = null;

async function refreshProjects(): Promise<void> {
  try {
    // Keep the refresh shared until both requests settle, even if one fails.
    const [repos, gists] = await Promise.allSettled([
      fetchAllRepos(),
      fetchAllGists(),
    ]);
    if (repos.status === "rejected") throw repos.reason;
    if (gists.status === "rejected") throw gists.reason;
    cachedProjects = [...repos.value, ...gists.value];
    refreshAfter = Date.now() + CACHE_DURATION_MS;
  } catch (error) {
    // Preserve any good snapshot and let the next visit retry immediately.
    console.error("Could not refresh the project tracker:", error);
  } finally {
    pendingRefresh = null;
  }
}

export async function GET(): Promise<Response> {
  if (!pendingRefresh && Date.now() >= refreshAfter) {
    pendingRefresh = refreshProjects();
  }

  // Concurrent visitors wait for the same refresh instead of starting more.
  if (pendingRefresh) await pendingRefresh;

  if (cachedProjects === null) {
    return Response.json(
      {
        error:
          "Project data is temporarily unavailable. Please try again later.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return Response.json(cachedProjects, {
    headers: { "Cache-Control": "no-store" },
  });
}
