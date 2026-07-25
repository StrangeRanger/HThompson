import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert } from "@mui/material";
import { Header1, Paragraph } from "@/app/components/typography";
import Stack from "@mui/material/Stack";

export default function About() {
  return (
    <Stack component="article" spacing={6}>
      <Stack component="section" spacing={3}>
        <Header1 align="center">About Me and This Website</Header1>
        <Paragraph align="center">
          Learn more about my background, interests, and the story behind this
          website.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={2}>
        <Accordion variant="outlined">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Who am I?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph>
              My name is Hunter, a Computer Science major specializing in Cyber
              Security at Eastern Washington University. My passion for
              computers and technology, particularly software security, drives
              my academic and professional goals.
            </Paragraph>
            <Paragraph>
              Beyond my core studies, I have a deep fascination with the
              infinite wonders of space, which once inspired me to consider a
              career in Astrophysics. I&apos;m also an avid music enthusiast and
              enjoy immersing myself in the diverse worlds of anime.
            </Paragraph>
            <Alert severity="info">
              This information is outdated and will be updated in the future.
            </Alert>
          </AccordionDetails>
        </Accordion>
        <Accordion variant="outlined">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              What is this website and what is its purpose?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph>
              My journey with hthompson.dev, formerly known as randomserver.xyz,
              began as a simple project aimed at honing my skills in HTML and
              CSS. It was more than just about building a website; it was about
              mastering the intricacies of web server administration. In 2019,
              the site quickly transcended its initial purpose. It morphed into
              a dynamic repository where I could curate and showcase my
              creations, discoveries, and favorites.
            </Paragraph>
            <Paragraph>
              The year 2023 marked a pivotal moment for the site. Faced with
              circumstances that necessitated a complete overhaul of my web
              server, I seized this challenge as an opportunity for reinvention.
              This led to a significant rebranding: transitioning from
              randomserver.xyz to hthompson.dev. Embracing this change, I
              redeveloped the main webpage with Vue.js, aligning the site&apos;s
              aesthetic with a more professional outlook.
            </Paragraph>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
}
