import { getRepoStatus } from "@/app/lib/repoStatus";
import { getGistStatus } from "@/app/lib/gistStatus";
import type {
  GithubGistStatusInput,
  GithubRepoStatusInput,
  RepoStatus,
} from "@/app/lib/types";
import { capitalizeWords } from "@/app/lib/stringUtils";
import { formatTimeSinceLastCommit } from "@/app/lib/dateUtils";
import type { TrackedProject } from "@/app/lib/types";

type GithubRepoTransformInput = GithubRepoStatusInput & {
  id: number;
  private: boolean;
  html_url: string;
  description: string | null;
  topics: string[];
  fork: boolean;
};

type GithubGistTransformInput = GithubGistStatusInput & {
  id: string;
  public: boolean;
  html_url: string;
  files: Record<string, unknown>;
};

export function transformRepoData(
  repos: GithubRepoTransformInput[],
): TrackedProject[] {
  if (!Array.isArray(repos)) {
    console.warn("Repo data is not an array:", repos);
    return [];
  }

  return repos
    .map((repo: GithubRepoTransformInput) => {
      const status: RepoStatus = getRepoStatus(repo);
      return {
        id: repo.id,
        name: capitalizeWords(repo.name.replace(/-/g, " ")),
        private: repo.private,
        url: repo.html_url,
        description: repo.description || "No description",
        archived: repo.archived,
        topics: repo.topics || [],
        projectType: repo.fork ? "Fork" : "Repo",
        status,
        lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
        lastCommitTimestamp: new Date(repo.pushed_at).getTime(),
      };
    })
    .filter((repo) => !repo.private); // Filter out private repositories
}

export function transformGistData(
  gists: GithubGistTransformInput[],
): TrackedProject[] {
  if (!Array.isArray(gists)) {
    console.warn("Gist data is not an array:", gists);
    return [];
  }

  return gists
    .map((gist) => {
      const status: RepoStatus = getGistStatus(gist);
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
        projectType: "Gist",
        status,
        lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
        lastCommitTimestamp: new Date(gist.updated_at).getTime(),
      };
    })
    .filter((gist) => gist.public); // Filter out private gists
}
