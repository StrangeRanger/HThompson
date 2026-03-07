import type { GithubGistStatusInput, RepoStatus } from "@/app/lib/types";

// NOTE: Many of the statuses aren't used in gists, but this is kept for consistency and future-proofing.
export const getGistStatus = (gist: GithubGistStatusInput): RepoStatus => {
  let status: RepoStatus = "unknown";
  const description: string = gist.description ?? "";

  if (description.includes("(status: personal)")) {
    status = "personal";
  } else if (description.includes("(status: activity-tracked)")) {
    // Represents 90 days in milliseconds:
    //  days * hours * minutes * seconds * milliseconds
    const INACTIVE_THRESHOLD_MS: number = 90 * 24 * 60 * 60 * 1000;
    const lastCommitDate: Date = new Date(gist.updated_at);
    const currentDate: Date = new Date();
    const timeSinceLastCommit: number =
      currentDate.getTime() - lastCommitDate.getTime();
    status =
      timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
  } else if (description.includes("(status: maintained)")) {
    status = "maintained";
  } else if (description.includes("(status: finished)")) {
    status = "finished";
  } else if (description.includes("(status: unsupported)")) {
    status = "unsupported";
  } else if (description.includes("(status: concept)")) {
    status = "concept";
  } else if (description.includes("(status: wip)")) {
    status = "wip";
  } else if (description.includes("(status: suspended)")) {
    status = "suspended";
  } else if (description.includes("(status: abandoned)")) {
    status = "abandoned";
  } else if (description.includes("(status: archived)")) {
    status = "archived";
  } else if (description.includes("(status: moved)")) {
    status = "moved";
  } else if (description.includes("(status: unspecified)")) {
    status = "unspecified";
  }

  return status;
};
