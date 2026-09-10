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
    const [repos, gists] = await Promise.all([
      fetchAllRepos(),
      fetchAllGists(),
    ]);
    cachedProjects = [...repos, ...gists];
  } catch (error) {
    console.error("Could not refresh the project tracker:", error);
  } finally {
    // Back off after failures too, retaining the last successful snapshot.
    refreshAfter = Date.now() + CACHE_DURATION_MS;
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
          "Retry-After": String(
            Math.max(1, Math.ceil((refreshAfter - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  return Response.json(cachedProjects, {
    headers: { "Cache-Control": "no-store" },
  });
}
