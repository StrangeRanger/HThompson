import { getStatusColors } from "@/app/lib/statusColors";
import type { RepoStatus } from "@/app/lib/types";
import Box from "@mui/material/Box";

export default function StatusBadge({ status }: { status: RepoStatus }) {
  const color: string = getStatusColors(status);

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 108,
        height: 38,
        px: 2,
        border: "1px solid",
        borderColor: color,
        borderRadius: 9999,
        color,
        fontWeight: 500,
        lineHeight: 1,
        backgroundColor: "transparent",
        textTransform: "lowercase",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </Box>
  );
}
