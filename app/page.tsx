import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SourceIcon from "@mui/icons-material/Source";
import TerminalIcon from "@mui/icons-material/Terminal";
import CodeIcon from "@mui/icons-material/Code";
import NextLink from "next/link";

interface ServiceCard {
  id: string;
  title: string;
  body: string;
  href: string;
  isExternal: boolean;
  icon: React.ElementType;
  category: "service" | "doc-and-tools";
}

interface ServiceCardItemProps {
  item: ServiceCard;
  titleSpacing: number;
}

interface ServiceSectionProps {
  title: string;
  description: string;
  items: ServiceCard[];
  titleSpacing: number;
}

function ServiceCardItem({ item, titleSpacing }: ServiceCardItemProps) {
  const Icon = item.icon;
  const buttonSx = {
    display: "block",
    textAlign: "left",
    color: "inherit",
    p: 0,
    borderRadius: 0,
  };
  const cardContent = (
    <CardContent>
      <Typography variant="h6" component="h3" sx={{ mb: titleSpacing }}>
        <Icon fontSize="small" sx={{ mr: 1, verticalAlign: "text-bottom" }} />
        {item.title}
      </Typography>
      <Typography variant="body2">{item.body}</Typography>
    </CardContent>
  );

  return (
    <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
      <Card
        sx={{
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        {item.isExternal ? (
          <Button
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={buttonSx}
          >
            {cardContent}
          </Button>
        ) : (
          <NextLink
            href={item.href}
            style={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Button component="span" sx={buttonSx}>
              {cardContent}
            </Button>
          </NextLink>
        )}
      </Card>
    </Grid>
  );
}

function ServiceSection({
  title,
  description,
  items,
  titleSpacing,
}: ServiceSectionProps) {
  return (
    <Box>
      <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ my: 4 }}>
        {description}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item: ServiceCard) => (
          <ServiceCardItem
            key={item.id}
            item={item}
            titleSpacing={titleSpacing}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default function Home() {
  const serviceCards: ServiceCard[] = [
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

  const docAndToolsItems: ServiceCard[] = serviceCards.filter(
    (item: ServiceCard): boolean => item.category === "doc-and-tools",
  );
  const serviceItems: ServiceCard[] = serviceCards.filter(
    (item: ServiceCard): boolean => item.category === "service",
  );

  return (
    <Box>
      <Box>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
          Welcome to HThompson
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          I&apos;m Hunter, and this is the central hub of my online presence.
          Here, you can track my current projects, access the services I host,
          explore my documentation and tools, and learn more about who I am and
          what I do. Feel free to browse around and enjoy your visit!
        </Typography>
      </Box>

      <Divider sx={{ m: 6 }} />

      <ServiceSection
        title="Documentation & Tools"
        description="Unlike my traditional software repositories, these are comprehensive documentation projects, small web applications, and curated resources. They include extensive guides, style documentation, terminal customizations, and tools like the Project Tracker which dynamically pulls data from my GitHub repositories using TypeScript to provide real-time project status updates."
        items={docAndToolsItems}
        titleSpacing={2}
      />

      <Divider sx={{ m: 6 }} />

      <ServiceSection
        title="Self-Hosted Services"
        description="Below are the self-hosted services and applications I run on DigitalOcean. These are web applications and tools I maintain for personal use and to share with others, ranging from content management systems like my image gallery, to privacy-focused utilities like PrivateBin, and developer tools like RSS Bridge for generating feeds."
        items={serviceItems}
        titleSpacing={1}
      />
    </Box>
  );
}
