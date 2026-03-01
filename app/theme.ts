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
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.04,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
    },
    h4: {
      fontWeight: 580,
      lineHeight: 1.12,
    },
    h5: {
      fontWeight: 580,
      lineHeight: 1.16,
    },
    h6: {
      fontWeight: 560,
      lineHeight: 1.2,
    },
    overline: {
      fontWeight: 700,
      letterSpacing: "0.16em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth", // TODO: see if this can be removed.
        },
        body: {
          minHeight: "100vh", // TODO: See if this can be removed.
          lineHeight: 1.6,
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "[id]": {
          scrollMarginTop: "74px", // TODO: Verify I still need this.
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        position: "sticky", // TODO: Maybe make position fixed.
      },
      styleOverrides: {
        root: {
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(20, 20, 20, 0.88)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
          minHeight: 44,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
