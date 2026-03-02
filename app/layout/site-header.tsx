"use client";

import { MouseEvent } from "react";
import NextLink from "next/link";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

interface SiteHeaderProps {
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void;
}

export default function SiteHeader({ onMenuOpen }: SiteHeaderProps) {
  return (
    <AppBar>
      <Toolbar
        sx={{
          minHeight: 64,
          px: { xs: 2, sm: 3 },
          justifyContent: "space-between",
        }}
      >
        <Link
          component={NextLink}
          href="/"
          underline="none"
          color="inherit"
          variant="h5"
        >
          HThompson
        </Link>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onMenuOpen}
          sx={{
            borderColor: "divider",
          }}
        >
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
}
