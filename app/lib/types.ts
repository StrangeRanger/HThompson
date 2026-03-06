export interface NavItem {
  name: string;
  link: string;
  externalLink?: boolean;
}

export interface TrackedProject {
  id: string | number;
  name: string;
  type: string;
  status: RepoStatus;
  lastCommitRelative: string;
  lastCommitTimestamp: number;
  description: string;
  url: string;
}

export interface GithubRepoStatusInput {
  name: string;
  topics: string[];
  archived: boolean;
  pushed_at: string;
}

export interface GithubGistStatusInput {
  description: string | null;
  updated_at: string;
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
