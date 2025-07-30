import { getRepoStatus } from "~/composables/useRepoStatus";
import { getGistStatus } from "~/composables/useGistStatus";
import type { repoStatus } from "~/composables/useRepoStatus";
import { capitalizeWords } from "~/utils/stringUtils";
import { formatTimeSinceLastCommit } from "~/utils/dateUtils";
import type { GithubProject } from "~~/types/github";

export function transformRepoData(repos: any[]): GithubProject[] {
  if (!Array.isArray(repos)) {
    console.warn("Repo data is not an array:", repos);
    return [];
  }

  return repos
    .map((repo: any) => {
      const status: repoStatus = getRepoStatus(repo);
      return {
        id: repo.id,
        name: capitalizeWords(repo.name.replace(/-/g, " ")),
        private: repo.private,
        url: repo.html_url,
        description: repo.description || "No description",
        archived: repo.archived,
        topics: repo.topics || [],
        type: repo.fork ? "Fork" : "Repo",
        status: status,
        lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
      };
    })
    .filter((repo: any) => !repo.private); // Filter out private repositories
}

export function transformGistData(gists: any[]): GithubProject[] {
  if (!Array.isArray(gists)) {
    console.warn("Gist data is not an array:", gists);
    return [];
  }

  return gists
    .map((gist: any) => {
      const status: repoStatus = getGistStatus(gist);
      const files: string[] = Object.keys(gist.files || {});
      const firstFile: string =
        files.length > 0 && files[0] !== undefined
          ? files[0]
          : "No files found";
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
        public: gist.public,
        url: gist.html_url,
        description: cleanedDescription,
        type: "Gist",
        status: status,
        lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
      };
    })
    .filter((gist: any) => gist.public); // Filter out private gists
}
