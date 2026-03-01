"use client";

import { MouseEvent, useState } from "react";
import { NavType } from "@/app/lib/definitions";
import NextLink from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

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

  function toggleMenu(event: MouseEvent<HTMLElement>) {
    setMenuAnchorEl(event.currentTarget);
  }

  function toggleMenuClose() {
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

      <AppBar>
        <Toolbar
          sx={{
            minHeight: 64,
            px: { xs: 2, sm: 3 }, // TODO: Verify purpose
            justifyContent: "space-between",
          }}
        >
          <Link
            component={NextLink}
            href="/public"
            underline="none"
            color="inherit"
            variant="h5"
          >
            HThompson
          </Link>
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleMenu}
            sx={{
              borderColor: "divider",
            }}
          >
            Menu
          </Button>
        </Toolbar>
      </AppBar>

      <Menu
        id="site-menu"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={toggleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "min(64vw, 280px)", sm: 280 }, // TODO: Verify purpose
              p: 2,
              borderLeft: "1px solid",
              borderColor: "divider",
              backgroundColor: "rgba(24, 24, 24, 0.98)",
            },
          },
        }}
      >
        <Typography
          color="text.secondary"
          sx={{ px: 1.5, paddingBottom: 1.5, fontWeight: 500 }}
        >
          Navigation
        </Typography>
        <List disablePadding sx={{ mt: 1, display: "grid", gap: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={item.external ? "a" : NextLink}
                href={item.href}
                onClick={toggleMenuClose}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2.5,
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Menu>

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
