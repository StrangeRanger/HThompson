import type {
  GithubGistStatusInput,
  GithubRepoStatusInput,
  RepoStatus,
} from "@/app/project-tracker/lib/types";

// The first matching marker wins, regardless of its position in the source data.
const statusPriority = [
  "personal",
  "activity-tracked",
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
] as const;

type StatusMarker = (typeof statusPriority)[number];

const INACTIVE_THRESHOLD_MS = 90 * 24 * 60 * 60 * 1000;

const hardCodedStatuses: Record<string, RepoStatus> = {
  "fafb-powershell-tool": "abandoned",
  "web-note-app": "abandoned",
  "periodic-table": "abandoned",
  "identify-root-user-logins-mac-os-x": "abandoned",
  "identify-root-user-logins": "moved",
};

function resolveProjectStatus(
  matches: (marker: StatusMarker) => boolean,
  lastCommitDate: string | null,
  now = Date.now(),
): RepoStatus {
  const status = statusPriority.find(matches);

  if (!status) return "unknown";
  if (status !== "activity-tracked") return status;
  if (!lastCommitDate) return "unknown";

  return now - Date.parse(lastCommitDate) > INACTIVE_THRESHOLD_MS
    ? "inactive"
    : "active";
}

export const getRepoStatus = (repo: GithubRepoStatusInput): RepoStatus => {
  if (repo.name in hardCodedStatuses) {
    return hardCodedStatuses[repo.name.toLowerCase()];
  }

  return resolveProjectStatus((marker) => {
    if (marker === "activity-tracked") {
      return repo.topics.includes("activity-tracked");
    }

    return (
      (marker === "archived" && repo.archived) ||
      repo.topics.includes(`status-${marker}`)
    );
  }, repo.lastCommitDate);
};

export const getGistStatus = (gist: GithubGistStatusInput): RepoStatus => {
  const description: string = gist.description ?? "";

  return resolveProjectStatus(
    (marker) => description.includes(`(status: ${marker})`),
    gist.lastCommitDate,
  );
};
