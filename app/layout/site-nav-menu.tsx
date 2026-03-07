"use client";

import NextLink from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import type { NavItem } from "@/app/lib/types";
import Link from "@mui/material/Link";

interface SiteNavMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function SiteNavMenu({
  anchorEl,
  isOpen,
  onClose,
  navItems,
}: SiteNavMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
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
      <Typography color="text.secondary" sx={{ px: 1.5, fontWeight: 500 }}>
        Navigation
      </Typography>
      <List sx={{ mt: 1, display: "grid", gap: 1 }}>
        {navItems.map((item: NavItem) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={item.isExternal ? Link : NextLink}
              href={item.href}
              onClick={onClose}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
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
