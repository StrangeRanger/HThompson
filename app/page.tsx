import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SourceIcon from "@mui/icons-material/Source";
import TerminalIcon from "@mui/icons-material/Terminal";
import CodeIcon from "@mui/icons-material/Code";
import Stack from "@mui/material/Stack";
import { Header1, Header2, Paragraph } from "@/app/components/typography";
import CardItem from "@/app/components/item-card";
import type LinkCardData from "@/app/components/link-card-data";

interface ServiceSectionProps {
  title: string;
  description: string;
  items: LinkCardData[];
  titleSpacing: number;
}

function ServiceSection({
  title,
  description,
  items,
  titleSpacing,
}: ServiceSectionProps) {
  return (
    <Box>
      <Header2 align="center">{title}</Header2>
      <Paragraph>{description}</Paragraph>
      <Grid container spacing={3}>
        {items.map((item: LinkCardData) => (
          <CardItem key={item.id} item={item} titleSpacing={titleSpacing} />
        ))}
      </Grid>
    </Box>
  );
}

export default function Home() {
  const serviceCards: LinkCardData[] = [
    {
      id: "image-gallery",
      title: "Image Gallery",
      body: "Publicly hosts an assortment of images, videos, gifs, and so on.",
      href: "https://images.hthompson.dev/",
      isExternal: true,
      icon: CollectionsIcon,
      category: "service",
    },
    {
      id: "private-bin",
      title: "Private Bin",
      body: "A minimalist, open source online pastebin where the server has zero knowledge of pasted data.",
      href: "https://privatebin.hthompson.dev/",
      isExternal: true,
      icon: ContentPasteIcon,
      category: "service",
    },
    {
      id: "file-server",
      title: "File Server",
      body: "Files that aren't located anywhere else on my website.",
      href: "https://files.hthompson.dev/",
      isExternal: true,
      icon: InsertDriveFileIcon,
      category: "service",
    },
    {
      id: "rss-bridge",
      title: "RSS Bridge",
      body: "The RSS feed for websites missing it.",
      href: "https://rss-bridge.hthompson.dev/",
      isExternal: true,
      icon: RssFeedIcon,
      category: "service",
    },
    {
      id: "project-tracker",
      title: "Project Tracker",
      body: "A comprehensive list of projects I'm working on, have completed, or have abandoned.",
      href: "/project-tracker",
      isExternal: false,
      icon: SourceIcon,
      category: "doc-and-tools",
    },
    {
      id: "custom-unix-terminal",
      title: "Custom Unix Terminal",
      body: "Configurations that went into customizing the look, feel, and functionality of my terminal.",
      href: "https://cut.hthompson.dev/",
      isExternal: true,
      icon: TerminalIcon,
      category: "doc-and-tools",
    },
    {
      id: "bash-style-guide",
      title: "Bash Style Guide",
      body: "A style guide for writing safe, predictable, and maintainable bash scripts.",
      href: "https://bsg.hthompson.dev/",
      isExternal: true,
      icon: CodeIcon,
      category: "doc-and-tools",
    },
  ];

  const docAndToolsItems: LinkCardData[] = serviceCards.filter(
    (item: LinkCardData): boolean => item.category === "doc-and-tools",
  );
  const serviceItems: LinkCardData[] = serviceCards.filter(
    (item: LinkCardData): boolean => item.category === "service",
  );

  return (
    <Stack component="article" spacing={6}>
      <Stack component="section" spacing={3}>
        <Header1 align="center">Welcome to HThompson</Header1>
        <Paragraph>
          I&apos;m Hunter, and this is the central hub of my online presence.
          Here, you can track my current projects, access the services I host,
          explore my documentation and tools, and learn more about who I am and
          what I do. Feel free to browse around and enjoy your visit!
        </Paragraph>
      </Stack>

      <Divider />

      <Stack component="section" spacing={3}>
        <ServiceSection
          title="Documentation & Tools"
          description="Unlike my traditional software repositories, these are comprehensive documentation projects, small web applications, and curated resources. They include extensive guides, style documentation, terminal customizations, and tools like the Project Tracker which dynamically pulls data from my GitHub repositories using TypeScript to provide real-time project status updates."
          items={docAndToolsItems}
          titleSpacing={2}
        />
      </Stack>

      <Divider />

      <Stack component="section" spacing={3}>
        <ServiceSection
          title="Self-Hosted Services"
          description="Below are the self-hosted services and applications I run on DigitalOcean. These are web applications and tools I maintain for personal use and to share with others, ranging from content management systems like my image gallery, to privacy-focused utilities like PrivateBin, and developer tools like RSS Bridge for generating feeds."
          items={serviceItems}
          titleSpacing={1}
        />
      </Stack>
    </Stack>
  );
}
