import { GridColDef } from "@mui/x-data-grid";
import type { RepoStatus, TrackedProject } from "@/app/lib/types";
import StatusBadge from "@/app/component/status-badge";

type StrictProjectCol = Omit<GridColDef<TrackedProject>, "field"> & {
  field: keyof TrackedProject;
};

export const projectTrackerColumns: StrictProjectCol[] = [
  { field: "name", headerName: "Project Name", flex: 1, minWidth: 200 },
  { field: "projectType", headerName: "Type", width: 120 },
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
