export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface GithubProject {
  id: string | number;
  name: string;
  type: string;
  status: RepoStatus;
  lastCommitRelative: string;
  description: string;
  url: string;
}

export interface GithubRepo {
  name: string;
  topics: string[];
  archived: boolean;
  pushed_at: string;
}

export interface GithubGist {
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
