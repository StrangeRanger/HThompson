"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { TrackedProject } from "@/app/lib/types";
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
import StatusBadge from "@/app/components/status-badge";
import { useCspNonce } from "@/app/components/csp-nonce-context";
import NextLink from "next/link";
import { projectTrackerColumns } from "@/app/project-tracker/components/project-tracker-columns";
import { badgeDescriptions } from "@/app/project-tracker/lib/badge-descriptions";
import { useProjectTracker } from "@/app/project-tracker/lib/use-project-tracker";

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
  const githubUsername: string = "StrangeRanger";
  const { githubProjects, isLoading, errorMessage } =
    useProjectTracker(githubUsername);

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
          here, please refer to the{" "}
          <NextLink href="#badge-descriptions">Badge Descriptions</NextLink>{" "}
          section at the bottom of this page.
        </Typography>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            columns={projectTrackerColumns}
            rows={githubProjects}
            getRowId={(row: TrackedProject) => `project-${row.id}`}
            autoHeight
            loading={isLoading}
            nonce={nonce}
            slots={{
              noRowsOverlay: () => (
                <ProjectTrackerNoRowsOverlay errorMessage={errorMessage} />
              ),
            }}
          />
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      <Box>
        <Typography
          id="badge-descriptions"
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 3 }}
        >
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
      </Box>
    </Box>
  );
}
