import { Octokit } from "@octokit/rest";

const octokit = new Octokit();
type repoStatus =
  | "personal"
  | "active"
  | "maintained"
  | "inactive"
  | "unsupported"
  | "concept"
  | "wip"
  | "suspended"
  | "abandoned"
  | "archived"
  | "moved"
  | "unspecified"
  | "unknown";
const hardCodedStatuses: Record<string, repoStatus> = {
  "fafb-powershell-tool": "abandoned",
  "web-note-app": "abandoned",
  "periodic-table": "abandoned",
  "identify-root-user-logins-mac-os-x": "abandoned",
  "identify-root-user-logins": "moved",
};

const getRepoStatus = (repo: any): repoStatus => {
  let status: repoStatus = "unknown";

  if (repo.name in hardCodedStatuses) {
      status = hardCodedStatuses[repo.name.toLowerCase()];
    } else if (repo.topics.includes("status-personal")) {
      status = "personal";
    } else if (repo.topics.includes("activity-tracked")) {
      // Represents 90 days in milliseconds:
      //  days * hours * minutes * seconds * milliseconds
      const INACTIVE_THRESHOLD_MS = 90 * 24 * 60 * 60 * 1000;
      const lastCommitDate = new Date(repo.pushed_at);
      const currentDate = new Date();
      const timeSinceLastCommit =
        currentDate.getTime() - lastCommitDate.getTime();
      status =
        timeSinceLastCommit > INACTIVE_THRESHOLD_MS ? "inactive" : "active";
    } else if (repo.topics.includes("status-maintained")) {
      status = "maintained";
    } else if (repo.topics.includes("status-unsupported")) {
      status = "unsupported";
    } else if (repo.topics.includes("status-concept")) {
      status = "concept";
    } else if (repo.topics.includes("status-wip")) {
      status = "wip";
    } else if (repo.topics.includes("status-suspended")) {
      status = "suspended";
    } else if (repo.topics.includes("status-abandoned")) {
      status = "abandoned";
    } else if (repo.archived || repo.topics.includes("status-archived")) {
      status = "archived";
    } else if (repo.topics.includes("status-moved")) {
      status = "moved";
    } else if (repo.topics.includes("status-unspecified")) {
      status = "unspecified";
    }

    return status;
};

const captializeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const formatTimeSinceLastCommit = (dateString: string): string => {
  const lastCommitDate = new Date(dateString);
  const currentDate = new Date();
  const timeDiffMs = currentDate.getTime() - lastCommitDate.getTime();
  const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

  if (timeDiffDays < 1) {
    return "Today";
  } else if (timeDiffDays === 1) {
    return "1 day ago";
  } else if (timeDiffDays < 30) {
    return `${timeDiffDays} days ago`;
  } else if (timeDiffDays < 365) {
    const months = Math.floor(timeDiffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(timeDiffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function getStatusColors(status: string): string {
  const colorMap: Record<string, string> = {
    personal: "teal",
    active: "green",
    maintained: "green-lighten-1",
    inactive: "amber-darken-2",
    finished: "blue",
    unsupported: "deep-orange",
    concept: "purple",
    wip: "cyan",
    suspended: "red-darken-3",
    abandoned: "red",
    archived: "grey-darken-1",
    moved: "blue-darken-2",
    unspecified: "grey-lighten-1",
    unknown: "blue-grey-darken-1",
  };

  return colorMap[status] || "grey";
}

export async function fetchAllPublicRepos(username: string) {
  const repos: Array<any> = [];

  try {
    let page: number = 1;
    let hasNextPage: boolean = true;

    while (hasNextPage) {
      const response = await octokit.rest.repos.listForUser({
        username,
        per_page: 100,
        page,
      });

      repos.push(...response.data);
      hasNextPage = response.data.length === 100; // If we received 100 items, there might be more.
      page++;
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }

  return repos
    .map((repo) => {
      const status: repoStatus = getRepoStatus(repo);

      return {
        name: captializeWords(repo.name.replace(/-/g, " ")),
        private: repo.private,
        url: repo.html_url,
        description: repo.description || "No description",
        archived: repo.archived,
        topics: repo.topics || [],
        type: repo.fork ? "Repo/Fork" : "Repo",
        status: status,
        lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
      };
    })
    .filter((repo) => !repo.private); // Filter out private and archived repositories.
}
