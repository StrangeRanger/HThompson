import { useEffect, useState } from "react";
import type { TrackedProject } from "@/app/lib/types";
import {
  fetchAllGists,
  fetchAllRepos,
} from "@/app/project-tracker/lib/fetch-projects";

const HASH_TARGET_HIGHLIGHT_CLASS: string = "project-tracker-hash-target";
const HASH_TARGET_HIGHLIGHT_DURATION_MS: number = 2800;

function handleHashScroll() {
  const hash: string = window.location.hash;

  if (!hash) return;

  const rowId: string = decodeURIComponent(hash.slice(1));

  // DataGrid rows may not be present immediately after refresh,
  // so delay the hash scroll until the row DOM has been mounted.
  setTimeout(() => {
    const selector = `[data-id="${CSS.escape(rowId)}"]`;
    const element = document.querySelector(selector);

    if (element) {
      const previousHighlightedRow = document.querySelector(
        `.${HASH_TARGET_HIGHLIGHT_CLASS}`,
      );

      element.classList.add(HASH_TARGET_HIGHLIGHT_CLASS);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      window.setTimeout(() => {
        element.classList.remove(HASH_TARGET_HIGHLIGHT_CLASS);
      }, HASH_TARGET_HIGHLIGHT_DURATION_MS);
    }
  }, 100);
}

export function useProjectTracker() {
  const [githubProjects, setGithubProjects] = useState<TrackedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled: boolean = false;

    async function run(): Promise<void> {
      try {
        const [repos, gists] = await Promise.all([
          fetchAllRepos(),
          fetchAllGists(),
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
  }, []);

  useEffect(() => {
    if (isLoading || githubProjects.length === 0) return;

    const frameId: number = window.requestAnimationFrame(() => {
      handleHashScroll();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [githubProjects, isLoading]);

  return { githubProjects, isLoading, errorMessage };
}
