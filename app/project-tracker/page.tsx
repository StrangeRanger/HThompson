"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
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
import StatusBadge from "@/app/project-tracker/components/status-badge";
import { useCspNonce } from "@/app/components/csp-nonce-context";
import { projectTrackerColumns } from "@/app/project-tracker/components/project-tracker-columns";
import { badgeDescriptions } from "@/app/project-tracker/lib/badge-descriptions";
import { useProjectTracker } from "@/app/project-tracker/lib/use-project-tracker";
import Link from "@mui/material/Link";
import type { TrackedProject } from "@/app/project-tracker/lib/types";
import { Header1, Header2, Paragraph } from "@/app/components/typography";
import Stack from "@mui/material/Stack";

function ProjectTrackerNoRowsOverlay({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography color={errorMessage ? "error" : "text.secondary"}>
        {errorMessage ?? "No rows"}
      </Typography>
    </Box>
  );
}

export default function ProjectTracker() {
  const nonce: string | undefined = useCspNonce();
  const { githubProjects, isLoading, errorMessage } = useProjectTracker();

  return (
    <Stack component="article" spacing={6}>
      <Stack component="section" spacing={3}>
        <Header1 align="center">Project Tracker</Header1>
        <Paragraph>
          This page offers a comprehensive list of all the projects I am working
          on, plan to work on, and have completed. Next to each project, you
          will find details specifying the type of project, its current status,
          and the date of the last commit. For explanations of the badges used
          here, please refer to the{" "}
          <Link href={"#badge-descriptions"} underline="hover">
            Badge Descriptions
          </Link>{" "}
          section at the bottom of this page.
        </Paragraph>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            columns={projectTrackerColumns}
            rows={githubProjects}
            getRowId={(row: TrackedProject) => `project-${row.id}`}
            autoHeight
            loading={isLoading}
            nonce={nonce}
            sx={{
              "& .MuiDataGrid-row": {
                transition:
                  "background-color 320ms ease, box-shadow 320ms ease",
              },
              "& .project-tracker-hash-target": {
                backgroundColor: "rgba(124, 179, 255, 0.18)",
                boxShadow: "inset 0 0 0 1px rgba(124, 179, 255, 0.45)",
              },
              "& .project-tracker-hash-target:hover": {
                backgroundColor: "rgba(124, 179, 255, 0.24)",
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <ProjectTrackerNoRowsOverlay errorMessage={errorMessage} />
              ),
            }}
            hideFooter
          />
        </Paper>
      </Stack>

      <Divider sx={{ my: 6 }} />

      <Stack component="section" spacing={3}>
        <Header2 id="badge-descriptions" align="center">
          Badge Descriptions
        </Header2>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Repo Status</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {badgeDescriptions.map(({ id, status, description }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <StatusBadge status={status}></StatusBadge>
                  </TableCell>
                  <TableCell>{description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
