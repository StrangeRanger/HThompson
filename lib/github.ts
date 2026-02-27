import { formatTimeSinceLastCommit } from "@/lib/date-utils";
import { getGistStatus, getRepoStatus } from "@/lib/repo-status";
import { capitalizeWords } from "@/lib/string-utils";
import type { GithubProject } from "@/lib/types";

const username = "StrangeRanger";

async function paginatedGithubFetch(endpoint: string): Promise<any[]> {
  const all: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.github.com/users/${username}/${endpoint}?per_page=100&page=${page}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) break;

    all.push(...data);
    hasMore = data.length === 100;
    page += 1;
  }

  return all;
}

function transformRepoData(repos: any[]): GithubProject[] {
  return repos
    .map((repo) => ({
      id: repo.id,
      name: capitalizeWords(repo.name.replace(/-/g, " ")),
      url: repo.html_url,
      description: repo.description || "No description",
      type: repo.fork ? "Fork" : "Repo",
      status: getRepoStatus(repo),
      lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
      private: repo.private,
    }))
    .filter((repo) => !repo.private);
}

function transformGistData(gists: any[]): GithubProject[] {
  return gists
    .map((gist) => {
      const files = Object.keys(gist.files || {});
      const firstFile = files.length > 0 && files[0] ? files[0] : "No files found";
      const cleanedDescription = gist.description
        ? gist.description.replace(/\s*\(status:\s*[^)]*\)\s*$/i, "").trim()
        : "No description";

      return {
        id: gist.id,
        name: capitalizeWords(
          firstFile
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/\.(py|md|bash|sh)/g, ""),
        ),
        url: gist.html_url,
        description: cleanedDescription,
        type: "Gist",
        status: getGistStatus(gist),
        lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
        public: gist.public,
      };
    })
    .filter((gist) => gist.public);
}

export async function fetchGithubProjects(): Promise<GithubProject[]> {
  const [repos, gists] = await Promise.all([
    paginatedGithubFetch("repos"),
    paginatedGithubFetch("gists"),
  ]);

  return [...transformRepoData(repos), ...transformGistData(gists)];
}
