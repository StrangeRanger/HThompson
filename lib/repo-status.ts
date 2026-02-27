import type { RepoStatus } from "@/lib/types";

const hardCodedStatuses: Record<string, RepoStatus> = {
  "fafb-powershell-tool": "abandoned",
  "web-note-app": "abandoned",
  "periodic-table": "abandoned",
  "identify-root-user-logins-mac-os-x": "abandoned",
  "identify-root-user-logins": "moved",
};

export const getRepoStatus = (repo: any): RepoStatus => {
  if (repo.name in hardCodedStatuses) {
    return hardCodedStatuses[repo.name.toLowerCase()] ?? "unknown";
  }

  if (repo.topics.includes("status-personal")) return "personal";
  if (repo.topics.includes("activity-tracked")) {
    const INACTIVE_THRESHOLD_MS = 90 * 24 * 60 * 60 * 1000;
    const timeSinceLastCommit = Date.now() - new Date(repo.pushed_at).getTime();
    return timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
  }
  if (repo.topics.includes("status-maintained")) return "maintained";
  if (repo.topics.includes("status-finished")) return "finished";
  if (repo.topics.includes("status-unsupported")) return "unsupported";
  if (repo.topics.includes("status-concept")) return "concept";
  if (repo.topics.includes("status-wip")) return "wip";
  if (repo.topics.includes("status-suspended")) return "suspended";
  if (repo.topics.includes("status-abandoned")) return "abandoned";
  if (repo.archived || repo.topics.includes("status-archived")) return "archived";
  if (repo.topics.includes("status-moved")) return "moved";
  if (repo.topics.includes("status-unspecified")) return "unspecified";
  return "unknown";
};

export const getGistStatus = (gist: any): RepoStatus => {
  const desc = gist.description ?? "";
  if (desc.includes("(status: personal)")) return "personal";
  if (desc.includes("(status: activity-tracked)")) {
    const INACTIVE_THRESHOLD_MS = 90 * 24 * 60 * 60 * 1000;
    const timeSinceLastCommit = Date.now() - new Date(gist.updated_at).getTime();
    return timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
  }
  if (desc.includes("(status: maintained)")) return "maintained";
  if (desc.includes("(status: finished)")) return "finished";
  if (desc.includes("(status: unsupported)")) return "unsupported";
  if (desc.includes("(status: concept)")) return "concept";
  if (desc.includes("(status: wip)")) return "wip";
  if (desc.includes("(status: suspended)")) return "suspended";
  if (desc.includes("(status: abandoned)")) return "abandoned";
  if (desc.includes("(status: archived)")) return "archived";
  if (desc.includes("(status: moved)")) return "moved";
  if (desc.includes("(status: unspecified)")) return "unspecified";
  return "unknown";
};

export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    personal: "badge-personal",
    active: "badge-active",
    maintained: "badge-maintained",
    inactive: "badge-inactive",
    finished: "badge-finished",
    unsupported: "badge-unsupported",
    concept: "badge-concept",
    wip: "badge-wip",
    suspended: "badge-suspended",
    abandoned: "badge-abandoned",
    archived: "badge-archived",
    moved: "badge-moved",
    unspecified: "badge-unspecified",
    unknown: "badge-unknown",
  };

  return map[status] ?? "badge-unknown";
}
