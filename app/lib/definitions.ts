export interface NavType {
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

export interface ServiceCard {
  title: string;
  text: string;
  link: string;
  type: "service" | "doc-and-tools";
}

export interface SocialLink {
  title: string;
  text: string;
  link: string;
  color: string;
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
