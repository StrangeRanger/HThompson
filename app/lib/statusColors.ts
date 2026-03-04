import type { RepoStatus } from "@/app/lib/types";

export function getStatusColors(status: RepoStatus): string {
  const colorMap: Record<RepoStatus, string> = {
    personal: "#00897b",
    active: "#2e7d32",
    maintained: "#66bb6a",
    inactive: "#ff8f00",
    finished: "#1976d2",
    unsupported: "#e64a19",
    concept: "#8e24aa",
    wip: "#00acc1",
    suspended: "#b71c1c",
    abandoned: "#d32f2f",
    archived: "#616161",
    moved: "#1565c0",
    unspecified: "#9e9e9e",
    unknown: "#455a64",
  };

  return colorMap[status];
}
