import type { GridColDef } from "@mui/x-data-grid";
import type { RepoStatus, TrackedProject } from "@/app/lib/types";
import StatusBadge from "@/app/components/status-badge";
import Link from "@mui/material/Link";

type StrictProjectCol = Omit<GridColDef<TrackedProject>, "field"> & {
  field: keyof TrackedProject;
};

const textSortCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function compareTextValues(valueA: unknown, valueB: unknown): number {
  return textSortCollator.compare(
    String(valueA ?? "").trim(),
    String(valueB ?? "").trim(),
  );
}

function compareNumberValues(valueA: unknown, valueB: unknown): number {
  const numberA = typeof valueA === "number" ? valueA : 0;
  const numberB = typeof valueB === "number" ? valueB : 0;

  return numberA - numberB;
}

function getNullableNumberComparator(
  sortDirection: "asc" | "desc" | null | undefined,
) {
  return (valueA: unknown, valueB: unknown): number => {
    const hasNumberA = typeof valueA === "number";
    const hasNumberB = typeof valueB === "number";

    if (!hasNumberA && !hasNumberB) return 0;
    if (!hasNumberA) return 1;
    if (!hasNumberB) return -1;

    return sortDirection === "desc" ? valueB - valueA : valueA - valueB;
  };
}

export const projectTrackerColumns: StrictProjectCol[] = [
  {
    field: "name",
    headerName: "Project Name",
    flex: 1,
    minWidth: 200,
    sortComparator: compareTextValues,
    renderCell: (params) => {
      return (
        <Link
          href={params.row.url}
          target="_blank"
          rel="noreferrer noopener"
          underline="hover"
        >
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "projectType",
    headerName: "Type",
    width: 120,
    sortComparator: compareTextValues,
  },
  {
    field: "starCount",
    headerName: "Stars",
    type: "number",
    width: 100,
    align: "left",
    headerAlign: "left",
    getSortComparator: getNullableNumberComparator,
    renderCell: (params) => {
      return params.row.starCount === null
        ? "-"
        : params.row.starCount.toLocaleString();
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    sortComparator: compareTextValues,
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
    type: "number",
    width: 180,
    align: "left",
    headerAlign: "left",
    sortComparator: compareNumberValues,
    renderCell: (params) => params.row.lastCommitRelative,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
    minWidth: 300,
    sortComparator: compareTextValues,
  },
];
