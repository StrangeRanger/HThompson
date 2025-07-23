import type {repoStatus} from "~/composables/useRepoStatus";

// NOTE: Many of the statuses aren't used in gists, but this is kept for consistency and future-proofing.
export const getGistStatus = (gist: any): repoStatus => {
  let status: repoStatus = "unknown";

  if (gist.description.includes("(status: personal)")) {
    status = "personal";
  } else if (gist.description.includes("(status: activity-tracked)")) {
    // Represents 90 days in milliseconds:
    //  days * hours * minutes * seconds * milliseconds
    const INACTIVE_THRESHOLD_MS: number = 90 * 24 * 60 * 60 * 1000;
    const lastCommitDate: Date = new Date(gist.updated_at);
    const currentDate: Date = new Date();
    const timeSinceLastCommit: number =
      currentDate.getTime() - lastCommitDate.getTime();
    status =
      timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
  } else if (gist.description.includes("(status: maintained)")) {
    status = "maintained";
  } else if (gist.description.includes("(status: finished)")) {
    status = "finished";
  } else if (gist.description.includes("(status: unsupported)")) {
    status = "unsupported";
  } else if (gist.description.includes("(status: concept)")) {
    status = "concept";
  } else if (gist.description.includes("(status: wip)")) {
    status = "wip";
  } else if (gist.description.includes("(status: suspended)")) {
    status = "suspended";
  } else if (gist.description.includes("(status: abandoned)")) {
    status = "abandoned";
  } else if (gist.description.includes("(status: archived)")) {
    status = "archived";
  } else if (gist.description.includes("(status: moved)")) {
    status = "moved";
  } else if (gist.description.includes("(status: unspecified)")) {
    status = "unspecified";
  }

  return status;
};