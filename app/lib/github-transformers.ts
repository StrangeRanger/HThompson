import { getRepoStatus } from "@/app/lib/repo-status";
import { getGistStatus } from "@/app/lib/gist-status";
import type {
  GithubGistStatusInput,
  GithubRepoStatusInput,
  RepoStatus,
} from "@/app/lib/types";
import { capitalizeWords } from "@/app/lib/string-utils";
import { formatTimeSinceLastCommit } from "@/app/lib/date-utils";
import type { TrackedProject } from "@/app/lib/types";

type GithubRepoTransformInput = GithubRepoStatusInput & {
  id: number;
  private: boolean;
  html_url: string;
  description: string | null;
  topics: string[];
  fork: boolean;
  stargazers_count: number;
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
    .filter((repo: GithubRepoTransformInput) => !repo.private)
    .map((repo: GithubRepoTransformInput) => {
      const status: RepoStatus = getRepoStatus(repo);
      return {
        id: repo.id,
        name: capitalizeWords(repo.name.replace(/-/g, " ").trim()),
        url: repo.html_url,
        description: repo.description || "No description",
        projectType: repo.fork ? "Fork" : "Repo",
        status,
        starCount: repo.stargazers_count,
        lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
        lastCommitTimestamp: new Date(repo.pushed_at).getTime(),
      };
    });
}

export function transformGistData(
  gists: GithubGistTransformInput[],
): TrackedProject[] {
  if (!Array.isArray(gists)) {
    console.warn("Gist data is not an array:", gists);
    return [];
  }

  return gists
    .filter((gist) => gist.public)
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
            .replace(/\.(py|md|bash|sh)/g, "")
            .trim(),
        ),
        url: gist.html_url,
        description: cleanedDescription,
        projectType: "Gist",
        status,
        starCount: null,
        lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
        lastCommitTimestamp: new Date(gist.updated_at).getTime(),
      };
    });
}
