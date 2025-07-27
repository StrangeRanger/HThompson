import { getRepoStatus } from "~/composables/useRepoStatus";
import { getGistStatus } from "~/composables/useGistStatus";
import type { repoStatus } from "~/composables/useRepoStatus";
import { capitalizeWords } from "~/utils/stringUtils";
import { formatTimeSinceLastCommit } from "~/utils/dateUtils";

export async function fetchAllPublicRepos(username: string): Promise<any[]> {
  const repos: Array<any> = [];

  try {
    let page: number = 1;
    let hasNextPage: boolean = true;

    while (hasNextPage) {
      const { data } = await useFetch(`https://api.github.com/users/${username}/repos`, {
        params: {
          per_page: 100,
          page,
        },
        transform: (response: any) => {
          return response.map((repo: any) => {
            const status: repoStatus = getRepoStatus(repo);
            return {
              name: capitalizeWords(repo.name.replace(/-/g, " ")),
              private: repo.private,
              url: repo.html_url,
              description: repo.description || "No description",
              archived: repo.archived,
              topics: repo.topics || [],
              type: repo.fork ? "Fork" : "Repo",
              status: status,
              lastCommitRelative: formatTimeSinceLastCommit(repo.pushed_at),
            };
          }).filter((repo: any) => !repo.private); // Filter out private repositories.
        },
      });

      repos.push(...data.value)
      hasNextPage = data.value && data.value.length === 100; // If we received 100 items, there might be more.
      page++;
    }

    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export async function fetchAllPublicGists(username: string): Promise<any[]> {
  const gists: Array<any> = [];

  try {
    let page: number = 1;
    let hasNextPage: boolean = true;

    while (hasNextPage) {
      const { data } = await useFetch(`https://api.github.com/users/${username}/gists`, {
        params: {
          per_page: 100,
          page,
        },
        transform: (response: any) => {
          return response.map((gist: any) => {
                const status: repoStatus = getGistStatus(gist);
                const files: string[] = Object.keys(gist.files || "");
                const firstFile: string = files.length > 0 && files[0] !== undefined ? files[0] : "No files found";
                const cleanedDescription = gist.description
                    ? gist.description.replace(/\s*\(status:\s*[^)]*\)\s*$/i, "").trim()
                    : "No description";

                return {
                  name: capitalizeWords(
                      firstFile
                          .replace(/-/g, " ")
                          .replace(/_/g, " ")
                          .replace(/\.(py|md|bash|sh)/g, ""),
                  ),
                  public: gist.public,
                  url: gist.html_url,
                  description: cleanedDescription,
                  type: "Gist",
                  status: status,
                  lastCommitRelative: formatTimeSinceLastCommit(gist.updated_at),
                };
              })
              .filter((gist: any) => gist.public); // Filter out private gists.
        }
      });

      gists.push(...data.value);
      hasNextPage = data.value && data.value.length === 100; // If we received 100 items, there might be more.
      page++;
    }

    return gists;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}
