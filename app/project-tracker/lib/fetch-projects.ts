import {
  transformGistData,
  transformRepoData,
} from "@/app/project-tracker/lib/github-transformers";
import type { TrackedProject } from "@/app/project-tracker/lib/types";

const GITHUB_USERNAME: string = "StrangeRanger";

async function fetchLastCommitDate(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);

    // Empty repositories have no commit history.
    if (response.status === 409) return null;
    if (!response.ok) throw new Error(`GitHub failed: ${response.status}`);

    const commits = (await response.json()) as {
      commit?: { committer?: { date?: string } };
      committed_at?: string;
    }[];
    const date =
      commits[0]?.commit?.committer?.date ?? commits[0]?.committed_at;

    return date && Number.isFinite(Date.parse(date)) ? date : null;
  } catch (error) {
    console.warn(`Could not fetch the last commit from ${url}:`, error);
    return null;
  }
}

export async function fetchAllRepos(): Promise<TrackedProject[]> {
  const allRepos: Omit<
    Parameters<typeof transformRepoData>[0][number],
    "lastCommitDate"
  >[] = [];
  let page: number = 1;
  let hasMorePages: boolean = true;

  while (hasMorePages) {
    const response: Response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
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
    const repoPage = data as typeof allRepos;
    allRepos.push(...repoPage);
    hasMorePages = repoPage.length === 100;
    page++;
  }

  const reposWithCommits = await Promise.all(
    allRepos
      .filter((repo) => !repo.private)
      .map(async (repo) => ({
        ...repo,
        // Omitting sha asks GitHub for the default branch's latest commit.
        lastCommitDate: await fetchLastCommitDate(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(repo.name)}/commits?per_page=1`,
        ),
      })),
  );

  return transformRepoData(reposWithCommits);
}

export async function fetchAllGists(): Promise<TrackedProject[]> {
  const allGists: Omit<
    Parameters<typeof transformGistData>[0][number],
    "lastCommitDate"
  >[] = [];
  let page: number = 1;
  let hasMorePages: boolean = true;

  while (hasMorePages) {
    const response: Response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/gists?per_page=100&page=${page}`,
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
    const gistPage = data as typeof allGists;
    allGists.push(...gistPage);
    hasMorePages = gistPage.length === 100;
    page++;
  }

  const gistsWithCommits = await Promise.all(
    allGists
      .filter((gist) => gist.public)
      .map(async (gist) => ({
        ...gist,
        lastCommitDate: await fetchLastCommitDate(
          `https://api.github.com/gists/${encodeURIComponent(gist.id)}/commits?per_page=1`,
        ),
      })),
  );

  return transformGistData(gistsWithCommits);
}
