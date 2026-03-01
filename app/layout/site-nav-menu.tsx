"use client";

import NextLink from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { NavItem } from "@/app/lib/definitions";

interface SiteNavMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function SiteNavMenu({
  anchorEl,
  open,
  onClose,
  navItems,
}: SiteNavMenuProps) {
  return (
    <Menu
      id="site-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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
            width: { xs: "min(64vw, 280px)", sm: 280 },
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
              onClick={onClose}
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
  );
}
