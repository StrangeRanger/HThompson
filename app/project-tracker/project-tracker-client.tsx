"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { TrackedProject, RepoStatus } from "@/app/lib/types";
import {
  transformGistData,
  transformRepoData,
} from "@/app/lib/githubTransformers";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StatusBadge from "@/app/component/status-badge";

interface ProjectTrackerClientProps {
  nonce?: string;
}

interface BadgeDescription {
  row: number;
  statusBadge: RepoStatus;
  description: string;
}

type StrictProjectCol = Omit<GridColDef<TrackedProject>, "field"> & {
  field: keyof TrackedProject;
};

export default function ProjectTrackerClient({
  nonce,
}: ProjectTrackerClientProps) {
  const username: string = "StrangeRanger";
  const [githubProjects, setGithubProjects] = useState<TrackedProject[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAllRepos(): Promise<TrackedProject[]> {
    const allRepos: Parameters<typeof transformRepoData>[0] = [];
    let page: number = 1;
    let hasMore: boolean = true;

    while (hasMore) {
      const response: Response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error(`GitHub failed: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        console.warn("Repos response is not an array:", data);
        break;
      }

      // NOTE: `response.json()` is untyped. After confirming it's an array,
      // we assert the element shape expected by `transformRepoData`.
      // Use a runtime type guard if stronger validation is needed.
      const repoPage = data as Parameters<typeof transformRepoData>[0];
      allRepos.push(...repoPage);
      hasMore = repoPage.length === 100;
      page++;
    }

    return transformRepoData(allRepos);
  }

  async function fetchAllGists(): Promise<TrackedProject[]> {
    const allGists: Parameters<typeof transformGistData>[0] = [];
    let page: number = 1;
    let hasMore: boolean = true;

    while (hasMore) {
      const response: Response = await fetch(
        `https://api.github.com/users/${username}/gists?per_page=100&page=${page}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error(`GitHub failed: ${response.status}`);
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        console.warn("Gists response is not an array:", data);
        break;
      }

      // NOTE: `response.json()` is untyped. After confirming it's an array,
      // we assert the element shape expected by `transformGistData`.
      // Use a runtime type guard if stronger validation is needed.
      const gistPage = data as Parameters<typeof transformGistData>[0];
      allGists.push(...gistPage);
      hasMore = gistPage.length === 100;
      page++;
    }

    return transformGistData(allGists);
  }

  function handleHashScroll() {
    const hash = window.location.hash;

    if (hash) {
      // Wait a bit to ensure the browser has fully rendered the page.
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }

  useEffect(() => {
    let cancelled: boolean = false;

    // TODO: Determine if I even need this as a separate function.
    async function run(): Promise<void> {
      try {
        const [repos, gists] = await Promise.all([
          fetchAllRepos(),
          fetchAllGists(),
        ]);
        if (!cancelled) setGithubProjects([...repos, ...gists]);
      } finally {
        if (!cancelled) {
          setLoading(false);
          handleHashScroll();
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const columns: StrictProjectCol[] = [
    { field: "name", headerName: "Project Name", flex: 1, minWidth: 200 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        // NOTE: DataGrid cell values are broadly typed; this cast narrows the
        // `status` cell value to our `RepoStatus` union for `StatusBadge`.
        // Prefer typed render params if we want to avoid assertions entirely.
        const status = params.value as RepoStatus;
        return <StatusBadge status={status} />;
      },
    },
    {
      field: "lastCommitTimestamp",
      headerName: "Last Commit",
      width: 180,
      renderCell: (params) => params.row.lastCommitRelative,
    },
    { field: "description", headerName: "Description", flex: 2, minWidth: 300 },
  ];

  const badgeDescriptions: BadgeDescription[] = [
    {
      row: 1,
      statusBadge: "personal",
      description:
        "Indicates that the project or document is tailored to my personal needs and will be updated as required. Typically, it reflects my current setup, usage, or preferences.",
    },
    {
      row: 2,
      statusBadge: "active",
      description:
        "The project is stable and fully functional, with ongoing development and regular updates. New features and improvements are continuously being added.",
    },
    {
      row: 3,
      statusBadge: "maintained",
      description:
        "The project is stable and functional, receiving updates primarily for bug fixes and minor improvements. Active development is minimal but ongoing as needed.",
    },
    {
      row: 4,
      statusBadge: "inactive",
      description:
        "Development on the project has paused, but it remains in a stable and usable state. Future work may resume, but there are currently no active updates or enhancements.",
    },
    {
      row: 5,
      statusBadge: "finished",
      description:
        "The project is complete and fully functional. While no active development is planned, updates may occur if essential fixes or changes are necessary. Combines aspects of both Maintained and Unsupported statuses.",
    },
    {
      row: 6,
      statusBadge: "unsupported",
      description:
        "The project is stable and usable, but active development has ceased. No further updates are planned, and users may need to seek alternative maintainers or solutions if issues arise.",
    },
    // NOTE: Disabled for now, though it may be reintroduced later.
    // {
    //   row: 7,
    //   statusBadge: "continuous",
    //   description: "The project is under ongoing development with a focus on gradual improvements and enhancements. The development pace is steady but less rapid than that of active projects, blending elements of active and maintained statuses.",
    // },
    {
      row: 7,
      statusBadge: "concept",
      description:
        "Represents an early-stage project or proof-of-concept with minimal implementation. Intended for demonstration, experimentation, or initial exploration without full functionality.",
    },
    {
      row: 8,
      statusBadge: "wip",
      description:
        "Development is actively underway, but the project has yet to reach a stable or publicly usable state. Ongoing work is focused on achieving initial functionality and stability.",
    },
    {
      row: 9,
      statusBadge: "suspended",
      description:
        "Development has been temporarily halted after initial progress. The project remains in a usable state, with intentions to resume work in the future, pending circumstances.",
    },
    {
      row: 10,
      statusBadge: "abandoned",
      description:
        "The project has been discontinued and will no longer receive updates or support. Users are encouraged to seek alternatives or fork the project if continued development is desired. Assume the project has been archived.",
    },
    {
      row: 11,
      statusBadge: "archived",
      description:
        "The project has been officially archived, meaning it is no longer maintained or supported. It serves as a historical reference, and no further changes will be made unless specified otherwise.",
    },
    {
      row: 12,
      statusBadge: "moved",
      description:
        "The project has been relocated to a new repository or platform. The new location is the authoritative source, and all future updates and maintenance will occur there. Assume the project has been archived.",
    },
    {
      row: 13,
      statusBadge: "unspecified",
      description:
        "The project status is not explicitly defined or documented. This status is usually reserved for projects that don't need a specific status. For example, a <a href='https://github.com/StrangeRanger/StrangeRanger' target='_blank'>GitHub user's public profile page</a> will have this status, as it's not a traditional software project.",
    },
    {
      row: 14,
      statusBadge: "unknown",
      description:
        "The project status is not known or has not been determined. This status is typically used when the project is new, lacks documentation, is a fork, or has not been categorized yet.",
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
          Project Tracker
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          This page offers a comprehensive list of all the projects I am working
          on, plan to work on, and have completed. Next to each project, you
          will find details specifying the type of project, its current status,
          and the date of the last commit. For explanations of the badges used
          here, please refer to the Badge Descriptions section at the bottom of
          this page.
        </Typography>
        <Paper sx={{ width: "100%" }}>
          {/* TODO: Ensure 'loading' is used correctly. */}
          <DataGrid
            columns={columns}
            rows={githubProjects}
            autoHeight
            loading={loading}
            nonce={nonce}
          />
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box>
        <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
          Badge Descriptions
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Repo Status</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {badgeDescriptions.map(({ row, statusBadge, description }) => (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <StatusBadge status={statusBadge}></StatusBadge>
                  </TableCell>
                  <TableCell>{description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
