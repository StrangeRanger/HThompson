export interface TrackedProject {
  id: string | number;
  name: string;
  projectType: string;
  status: RepoStatus;
  starCount: number | null;
  lastCommitRelative: string;
  lastCommitTimestamp: number | null;
  description: string;
  url: string;
}

export interface GithubRepoStatusInput {
  name: string;
  topics: string[];
  archived: boolean;
  lastCommitDate: string | null;
}

export interface GithubGistStatusInput {
  description: string | null;
  lastCommitDate: string | null;
}

export type RepoStatus =
  | "personal"
  | "active"
  | "maintained"
  | "inactive"
  | "finished"
  | "unsupported"
  | "concept"
  | "wip"
  | "suspended"
  | "abandoned"
  | "archived"
  | "moved"
  | "unspecified"
  | "unknown";
