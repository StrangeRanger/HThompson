"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { NavType } from "@/app/lib/definitions";
import SiteHeader from "@/app/layout/site-header";
import SiteNavMenu from "@/app/layout/site-nav-menu";

interface SiteShellProps {
  children: React.ReactNode;
}

const navItems: NavType[] = [
  { name: "Home", href: "/" },
  { name: "Project Tracker", href: "/project-tracker" },
  { name: "About", href: "/about" },
  { name: "My Links", href: "/links" },
  { name: "Web Policies", href: "/policies" },
  {
    name: "Status",
    href: "https://status.hthompson.dev/status/hthompson",
    external: true,
  },
];

export default function SiteShell({ children }: SiteShellProps) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorEl);

  function handleMenuOpen(event: MouseEvent<HTMLElement>) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchorEl(null);
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box sx={{ position: "fixed", inset: 0, zIndex: -2 }}>
        <Image
          src="/images/3996769.jpg"
          alt="Background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(180deg, rgba(7, 7, 7, 0.44) 0%, rgba(7, 7, 7, 0.78) 100%)",
        }}
      />

      <SiteHeader onMenuOpen={handleMenuOpen} />
      <SiteNavMenu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        navItems={navItems}
      />

      {/*TODO: Verify purpose of xs*/}
      <Box component="main" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 } }}>
        <Container disableGutters>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, sm: 5 }, // TODO: Verify purpose
              borderColor: "divider",
              backgroundColor: "background.paper",
              backdropFilter: "blur(10px)",
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
