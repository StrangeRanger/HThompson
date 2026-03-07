import type { TrackedProject } from "@/app/lib/types";
import {
  transformGistData,
  transformRepoData,
} from "@/app/lib/github-transformers";

export async function fetchAllRepos(
  username: string,
): Promise<TrackedProject[]> {
  const allRepos: Parameters<typeof transformRepoData>[0] = [];
  let page: number = 1;
  let hasMorePages: boolean = true;

  while (hasMorePages) {
    const response: Response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`GitHub failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.warn("Repos response is not an array:", data);
      break;
    }

    // NOTE: `response.json()` is untyped. After confirming it's an array,
    // we assert the element shape expected by `transformRepoData`.
    // Use a runtime type guard if stronger validation is needed.
    const repoPage = data as Parameters<typeof transformRepoData>[0];
    allRepos.push(...repoPage);
    hasMorePages = repoPage.length === 100;
    page++;
  }

  return transformRepoData(allRepos);
}

export async function fetchAllGists(
  username: string,
): Promise<TrackedProject[]> {
  const allGists: Parameters<typeof transformGistData>[0] = [];
  let page: number = 1;
  let hasMorePages: boolean = true;

  while (hasMorePages) {
    const response: Response = await fetch(
      `https://api.github.com/users/${username}/gists?per_page=100&page=${page}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`GitHub failed: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.warn("Gists response is not an array:", data);
      break;
    }

    // NOTE: `response.json()` is untyped. After confirming it's an array,
    // we assert the element shape expected by `transformGistData`.
    // Use a runtime type guard if stronger validation is needed.
    const gistPage = data as Parameters<typeof transformGistData>[0];
    allGists.push(...gistPage);
    hasMorePages = gistPage.length === 100;
    page++;
  }

  return transformGistData(allGists);
}
