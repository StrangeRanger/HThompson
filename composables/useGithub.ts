import { Octokit } from "@octokit/rest";
import {getRepoStatus} from "~/composables/useRepoStatus";
import {getGistStatus} from "~/composables/useGistStatus";
import type { repoStatus } from "~/composables/useRepoStatus";
import { capitalizeWords } from "~/utils/stringUtils";
import { formatTimeSinceLastCommit } from "~/utils/dateUtils";

const octokit = new Octokit();

export async function fetchAllPublicRepos(username: string): Promise<any[]> {
  const repos: Array<any> = [];

  try {
    let page: number = 1;
    let hasNextPage: boolean = true;

    while (hasNextPage) {
      const response = await octokit.rest.repos.listForUser({
        username,
        per_page: 100,
        page,
      });

      repos.push(...response.data);
      hasNextPage = response.data.length === 100; // If we received 100 items, there might be more.
      page++;
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }

  return repos
    .map((repo) => {
      const status: repoStatus = getRepoStatus(repo);

      return {
        name: capitalizeWords(repo.name.replace(/-/g, " ")),
        private: repo.private,
        url: repo.html_url,
        description: repo.description || "No description",
        archived: repo.archived,
        topics: repo.topics || [],
        type: repo.fork ? "Repo/Fork" : "Repo",
        status: status,
        lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
      };
    })
    .filter((repo) => !repo.private); // Filter out private repositories.
}

export async function fetchAllPublicGists(username: string): Promise<any[]> {
  const gists: Array<any> = [];

  try {
    let page: number = 1;
    let hasNextPage: boolean = true;

    while (hasNextPage) {
      const response = await octokit.rest.gists.listForUser({
        username,
        per_page: 100,
        page,
      });

      gists.push(...response.data);
      hasNextPage = response.data.length === 100; // If we received 100 items, there might be more.
      page++;
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }

  return gists
    .map((gist) => {
      const status: repoStatus = getGistStatus(gist);
      const files: string[] = Object.keys(gist.files || "");
      const firstFile: string | null = files.length > 0 ? files[0] : null;
      const cleanedDescription = gist.description ? gist.description.replace(/\s*\(status:\s*[^)]*\)\s*$/i, "").trim() : "No description";

      return {
        name: firstFile ?? gist.id,
        public: gist.public,
        url: gist.html_url,
        description: cleanedDescription,
        type: "Gist",
        status: status,
        lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
      };
    }).filter((gist) => gist.public); // Filter out private gists.
}
