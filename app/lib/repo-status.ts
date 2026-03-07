import type { GithubRepoStatusInput, RepoStatus } from "@/app/lib/types";

const hardCodedStatuses: Record<string, RepoStatus> = {
  "fafb-powershell-tool": "abandoned",
  "web-note-app": "abandoned",
  "periodic-table": "abandoned",
  "identify-root-user-logins-mac-os-x": "abandoned",
  "identify-root-user-logins": "moved",
};

export const getRepoStatus = (repo: GithubRepoStatusInput): RepoStatus => {
  let status: RepoStatus = "unknown";

  if (repo.name in hardCodedStatuses) {
    status = hardCodedStatuses[repo.name.toLowerCase()];
  } else if (repo.topics.includes("status-personal")) {
    status = "personal";
  } else if (repo.topics.includes("activity-tracked")) {
    // Represents 90 days in milliseconds:
    //  days * hours * minutes * seconds * milliseconds
    const INACTIVE_THRESHOLD_MS: number = 90 * 24 * 60 * 60 * 1000;
    const lastCommitDate: Date = new Date(repo.pushed_at);
    const currentDate: Date = new Date();
    const timeSinceLastCommit: number =
      currentDate.getTime() - lastCommitDate.getTime();
    status =
      timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
  } else if (repo.topics.includes("status-maintained")) {
    status = "maintained";
  } else if (repo.topics.includes("status-finished")) {
    status = "finished";
  } else if (repo.topics.includes("status-unsupported")) {
    status = "unsupported";
  } else if (repo.topics.includes("status-concept")) {
    status = "concept";
  } else if (repo.topics.includes("status-wip")) {
    status = "wip";
  } else if (repo.topics.includes("status-suspended")) {
    status = "suspended";
  } else if (repo.topics.includes("status-abandoned")) {
    status = "abandoned";
  } else if (repo.archived || repo.topics.includes("status-archived")) {
    status = "archived";
  } else if (repo.topics.includes("status-moved")) {
    status = "moved";
  } else if (repo.topics.includes("status-unspecified")) {
    status = "unspecified";
  }

  return status;
};
