import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

interface SocialLink {
  id: string;
  title: string;
  body: string;
  link: string;
  icon: string;
  color: string;
}

export default function MyLinks() {
  const socialLinks: SocialLink[] = [
    {
      id: "twitter-x",
      title: "Twitter (X)",
      body: "My Twitter (X) account.",
      link: "https://x.com/_Hunter_T_",
      icon: "mdi-twitter",
      color: "#1DA1F2",
    },
    {
      id: "github",
      title: "GitHub",
      body: "My GitHub account.",
      link: "https://github.com/StrangeRanger",
      icon: "mdi-github",
      color: "#ffffff",
    },
    {
      id: "soundcloud",
      title: "SoundCloud",
      body: "My SoundCloud account.",
      link: "https://soundcloud.com/SubDubZero",
      icon: "mdi-soundcloud",
      color: "#FF5500",
    },
  ];

  return (
    <Box>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
        My Links
      </Typography>
      <Typography variant="body1" sx={{ my: 4, textAlign: "center" }}>
        Connect with me on various social media platforms and explore my work.
      </Typography>
      <Grid container spacing={3}>
        {socialLinks.map((item: SocialLink) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ color: item.color, borderColor: item.color }}>
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
  );
}
