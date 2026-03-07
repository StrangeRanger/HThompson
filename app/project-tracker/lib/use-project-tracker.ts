import { useEffect, useState } from "react";
import { TrackedProject } from "@/app/lib/types";
import {
  fetchAllGists,
  fetchAllRepos,
} from "@/app/project-tracker/lib/fetch-projects";

function handleHashScroll() {
  const hash: string = window.location.hash;

  if (!hash) {
    console.log("No hash found in URL, skipping scroll");
    return;
  }

  const rowId: string = decodeURIComponent(hash.slice(1));

  // DataGrid rows may not be present immediately after refresh,
  // so delay the hash scroll until the row DOM has been mounted.
  setTimeout(() => {
    const selector = `[data-id="${CSS.escape(rowId)}"]`;
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
}

export function useProjectTracker(username: string) {
  const [githubProjects, setGithubProjects] = useState<TrackedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled: boolean = false;

    async function run(): Promise<void> {
      try {
        const [repos, gists] = await Promise.all([
          fetchAllRepos(username),
          fetchAllGists(username),
        ]);
        if (!isCancelled) {
          setGithubProjects([...repos, ...gists]);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isCancelled) {
          const message: string =
            error instanceof Error ? error.message : "Unknown error";
          setErrorMessage(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void run();
    return () => {
      isCancelled = true;
    };
  }, [username]);

  useEffect(() => {
    if (isLoading || githubProjects.length === 0) return;

    console.log("Running hash scroll effect");

    const frameId: number = window.requestAnimationFrame(() => {
      handleHashScroll();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [githubProjects, isLoading]);

  return { githubProjects, isLoading, errorMessage };
}
