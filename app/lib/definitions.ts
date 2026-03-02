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

export interface BadgeDescription {
  row: number;
  statusBadge: RepoStatus;
  description: string;
}

export interface TableHeader {
  title: string;
  key: string;
  sortable: boolean;
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
