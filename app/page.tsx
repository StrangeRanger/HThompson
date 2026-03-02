import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Divider} from "@mui/material";

export default function Home() {
  interface ServiceCard {
    title: string;
    body: string;
    link: string;
    icon: string;
    type: "service" | "doc-and-tools";
  }

  const itemArray: ServiceCard[] = [
    {
      title: "Image Gallery",
      body: "Publicly hosts an assortment of images, videos, gifs, and so on.",
      link: "https://images.hthompson.dev/",
      icon: "mdi-view-gallery-outline",
      type: "service",
    },
    {
      title: "Private Bin",
      body: "A minimalist, open source online pastebin where the server has zero knowledge of pasted data.",
      link: "https://privatebin.hthompson.dev/",
      icon: "mdi-content-paste",
      type: "service",
    },
    {
      title: "File Server",
      body: "Files that aren't located anywhere else on my website.",
      link: "https://files.hthompson.dev/",
      icon: "mdi-file",
      type: "service",
    },
    {
      title: "RSS Bridge",
      body: "The RSS feed for websites missing it.",
      link: "https://rss-bridge.hthompson.dev/",
      icon: "mdi-rss",
      type: "service",
    },
    {
      title: "Project Tracker",
      body: "A comprehensive list of projects I'm working on, have completed, or have abandoned.",
      link: "/project-tracker",
      icon: "mdi-source-branch",
      type: "doc-and-tools",
    },
    {
      title: "Custom Unix Terminal",
      body: "Configurations that went in to custumizing the look, feel, and functionality of my terminal.",
      link: "https://cut.hthompson.dev/",
      icon: "mdi-console",
      type: "doc-and-tools",
    },
    {
      title: "Bash Style Guide",
      body: "A style guide for writing safe, predictable, and maintainable bash scripts.",
      link: "https://bsg.hthompson.dev/",
      icon: "mdi-bash",
      type: "doc-and-tools",
    },
  ];

  const docAndToolsCards: ServiceCard[] = itemArray.filter(
    (item) => item.type === "doc-and-tools",
  );
  const serviceCards: ServiceCard[] = itemArray.filter(
    (item) => item.type === "service",
  );

  return (
    <Box>
      <Box>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
          Welcome to HThompson
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          I'm Hunter, and this is the central hub of my online presence. Here,
          you can track my current projects, access the services I host, explore
          my documentation and tools, and learn more about who I am and what I
          do. Feel free to browse around and enjoy your visit!
        </Typography>
      </Box>

      <Divider sx={{ m: 6 }} />

      <Box>
        <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
          Documentation & Tools
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          Unlike my traditional software repositories, these are comprehensive
          documentation projects, small web applications, and curated resources.
          They include extensive guides, style documentation, terminal
          customizations, and tools like the Project Tracker which dynamically
          pulls data from my GitHub repositories using TypeScript to provide
          real-time project status updates.
        </Typography>
        <Grid container spacing={3}>
          {docAndToolsCards.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card variant="outlined">
                <Button
                  href={item.link}
                  sx={{
                    display: "block",
                    textAlign: "left",
                    color: "inherit",
                    p: 0,
                    borderRadius: 0,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.body}</Typography>
                  </CardContent>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ m: 6 }} />

      <Box>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Self-Hosted Services
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          Below are the self-hosted services and applications I run on
          DigitalOcean. These are web applications and tools I maintain for
          personal use and to share with others, ranging from content management
          systems like my image gallery, to privacy-focused utilities like
          PrivateBin, and developer tools like RSS Bridge for generating feeds.
        </Typography>
        <Grid container spacing={3} >
          {serviceCards.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card variant="outlined">
                <Button
                  href={item.link}
                  sx={{
                    display: "block",
                    textAlign: "left",
                    color: "inherit",
                    p: 0,
                    borderRadius: 0,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.body}</Typography>
                  </CardContent>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
