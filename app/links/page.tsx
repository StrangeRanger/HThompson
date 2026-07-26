import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Header1, Paragraph } from "@/app/components/typography";
import Stack from "@mui/material/Stack";
import CardItem from "@/app/components/item-card";
import type LinkCardData from "@/app/components/link-card-data";

export default function MyLinks() {
  const socialLinks: LinkCardData[] = [
    {
      id: "twitter-x",
      title: "Twitter (X)",
      body: "My Twitter (X) account.",
      href: "https://x.com/_Hunter_T_",
      isExternal: true,
      icon: TwitterIcon,
      color: "#1DA1F2",
    },
    {
      id: "github",
      title: "GitHub",
      body: "My GitHub account.",
      href: "https://github.com/StrangeRanger",
      isExternal: true,
      icon: GitHubIcon,
      color: "#ffffff",
    },
    {
      id: "soundcloud",
      title: "SoundCloud",
      body: "My SoundCloud account.",
      href: "https://soundcloud.com/SubDubZero",
      isExternal: true,
      icon: MusicNoteIcon,
      color: "#FF5500",
    },
  ];

  return (
    <Stack component="article" spacing={6}>
      <Stack component="section" spacing={3}>
        <Header1 align="center">My Links</Header1>
        <Paragraph align="center">
          Connect with me on social media and explore my work.
        </Paragraph>
      </Stack>
      <Grid container spacing={3}>
        {socialLinks.map((item: LinkCardData) => (
          <CardItem key={item.id} item={item} titleSpacing={2} />
        ))}
      </Grid>
    </Stack>
  );
}
