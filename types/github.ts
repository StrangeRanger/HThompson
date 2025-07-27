export interface GithubProject {
  name: string;
  type: string;
  status: string;
  lastCommitRelative: string;
  description: string;
  url: string;
}

export interface BadgeDescription {
  row: number;
  statusBadge: string;
  description: string;
}

export interface TableHeader {
  title: string;
  key: string;
  sortable: boolean;
}
