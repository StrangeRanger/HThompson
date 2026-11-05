import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Script from "next/script";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Header1, Header2, Paragraph } from "@/app/components/typography";

interface ServiceProvider {
  id: number;
  name: string;
  location: string;
  service: string;
  privacyPolicyUrl: string;
}

export default function PrivacyPolicy() {
  const serviceProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "DigitalOcean",
      location: "San Francisco, California, United States",
      service: "Hosts my website and related services.",
      privacyPolicyUrl: "https://www.digitalocean.com/legal/privacy-policy",
    },
    {
      id: 2,
      name: "Cloudflare",
      location: "Global network. Data may be processed in multiple countries.",
      service: "Website delivery, security, and traffic analytics.",
      privacyPolicyUrl: "https://www.cloudflare.com/privacypolicy/",
    },
  ];

  const shouldRenderMatomoOptOut: boolean =
    process.env.NODE_ENV !== "development";

  return (
    <Stack component="article" spacing={6}>
      <Stack component="section" spacing={3}>
        <Header1 align="center">Privacy Policy</Header1>
        <Paragraph>
          Last updated <time dateTime="2026-11-05">November 5, 2026</time>
        </Paragraph>
        <Paragraph>
          This policy covers hthompson.dev and its subdomains. It explains what
          information I collect, how I use and retain it, who helps me process
          it, and how you can exercise your privacy choices and rights.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Matomo Analytics</Header2>
        <Paragraph>
          I use Matomo as my primary analytics tool on hthompson.dev and most of
          its subdomains. It helps me understand how people use the sites and
          where I can improve them. PrivateBin (privatebin.hthompson.dev) does
          not use Matomo.
        </Paragraph>
        <Paragraph>
          Matomo records information about visits, such as the pages you view,
          when and how long you visit, the referring website when available, and
          information about your browser and device. Matomo masks IPv4 and IPv6
          addresses before storing them in its analytics database. For IPv4, it
          replaces the last byte with zero. Matomo uses the masked IP address to
          estimate your location.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Cloudflare Traffic and Security</Header2>
        <Paragraph>
          I use Cloudflare to deliver and protect my sites. When a request
          passes through Cloudflare, it processes your full IP address and other
          request data. Cloudflare also generates traffic and security metrics
          from these requests.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Server Security Logs</Header2>
        <Paragraph>
          My servers record full visitor IP addresses in security logs to detect
          and investigate abuse. These logs are separate from Matomo analytics.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Email Correspondence</Header2>
        <Paragraph>
          When you email me, I receive your email address, your message, and any
          other information you choose to include. I use this information to
          respond to your inquiry.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Opt out of Matomo Analytics</Header2>
        <Paragraph>
          Matomo may set cookies to distinguish visits and remember your opt-out
          choice. You can manage or delete cookies in your browser settings.
          Clearing cookies may reset your opt-out choice.
        </Paragraph>
        <Paragraph>
          You can use the Matomo opt-out on this page to stop future Matomo
          tracking in this browser on hthompson.dev. Cloudflare traffic
          processing and server security logging still occur.
        </Paragraph>
        {shouldRenderMatomoOptOut ? (
          <>
            <Alert severity="info" sx={{ mb: 4 }}>
              If the opt-out control does not appear, your browser settings or a
              content blocker may have blocked it.
            </Alert>
            <Script
              src="https://analytics.hthompson.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1"
              strategy="afterInteractive"
            />
            <Box id="matomo-opt-out" />
          </>
        ) : null}
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Your Rights</Header2>
        <Paragraph>
          Depending on the law that applies, you may have the right to access,
          correct, or delete your personal data, restrict or object to its
          processing, receive a portable copy, or lodge a complaint with a data
          protection authority. To exercise your rights, email me at{" "}
          <Link href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</Link>
          . I may ask for information needed to verify your identity or locate
          the data your request concerns.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Service Providers</Header2>
        <Paragraph>
          I use the following providers to host, deliver, and protect my sites.
        </Paragraph>
        <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Provider</TableCell>
                <TableCell align="left">Processing location</TableCell>
                <TableCell align="left">Service</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell component="th" scope="row">
                    <Link href={provider.privacyPolicyUrl}>
                      {provider.name}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{provider.location}</TableCell>
                  <TableCell align="left">{provider.service}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Data Retention</Header2>
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            Individual Matomo visit records are kept for 180 days in the active
            database.
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            Aggregate Matomo reports are kept for 12 months.
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            Database backups are kept for up to 7 days. A backup may contain
            records that have since been deleted from the active database.
          </ListItem>
        </List>
        <Paragraph>
          Cloudflare retention varies by service and plan. See{" "}
          <Link href="https://www.cloudflare.com/privacypolicy/">
            Cloudflare&apos;s privacy policy
          </Link>{" "}
          for how it handles the data it processes.
        </Paragraph>
      </Stack>

      <Stack component="section" spacing={3}>
        <Header2>Contact Me</Header2>
        <Paragraph>
          If you have questions or comments about this notice, you may email me
          at{" "}
          <Link href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</Link>
          . I do not sell your personal data.
        </Paragraph>
      </Stack>
    </Stack>
  );
}
