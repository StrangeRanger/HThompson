import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

interface SocialLink {
  id: string;
  title: string;
  body: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

export default function MyLinks() {
  const socialLinks: SocialLink[] = [
    {
      id: "twitter-x",
      title: "Twitter (X)",
      body: "My Twitter (X) account.",
      href: "https://x.com/_Hunter_T_",
      icon: TwitterIcon,
      color: "#1DA1F2",
    },
    {
      id: "github",
      title: "GitHub",
      body: "My GitHub account.",
      href: "https://github.com/StrangeRanger",
      icon: GitHubIcon,
      color: "#ffffff",
    },
    {
      id: "soundcloud",
      title: "SoundCloud",
      body: "My SoundCloud account.",
      href: "https://soundcloud.com/SubDubZero",
      icon: MusicNoteIcon,
      color: "#FF5500",
    },
  ];

  return (
    <Box>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
        My Links
      </Typography>
      <Typography variant="body1" sx={{ my: 4, textAlign: "center" }}>
        Connect with me on social media and explore my work.
      </Typography>
      <Grid container spacing={3}>
        {socialLinks.map((item: SocialLink) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              sx={{
                color: item.color,
                borderColor: item.color,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                component="a"
                href={item.href}
                sx={{
                  display: "block",
                  textAlign: "left",
                  color: "inherit",
                  p: 0,
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                    <item.icon
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: "text-bottom" }}
                    />
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.body}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
