"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7cb3ff",
    },
    background: {
      default: "#0d0d0d",
      paper: "rgba(23, 23, 23, 0.94)",
    },
    text: {
      primary: "#f6f7f9",
      secondary: "rgba(246, 247, 249, 0.72)",
    },
    divider: "rgba(255, 255, 255, 0.18)",
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
