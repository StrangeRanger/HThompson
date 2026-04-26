import Typography from "@mui/material/Typography";
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

interface SubprocessorTable {
  id: number;
  subprocessor: string;
  location: string;
  service: string;
}

export default function PrivacyPolicy() {
  const subprocessorsTable: SubprocessorTable[] = [
    {
      id: 1,
      subprocessor: "DigitalOcean",
      location: "California, USA",
      service: "File and cloud hosting provider.",
    },
    {
      id: 2,
      subprocessor: "Cloudflare",
      location:
        "Cloudflare, as a subprocessor, processes and stores user data across its global network of data centers, which means the data may be held in multiple locations worldwide.",
      service: "Web performance and security service.",
    },
  ];

  const shouldRenderMatomoOptOut: boolean =
    process.env.NODE_ENV !== "development";

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
          Privacy Policies
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          This Policy describes the information I collect from you, how I use
          that information and my legal basis for doing so. It also covers
          whether and how that information may be shared and your rights and
          choices regarding the information you provide to me. This Privacy
          Policy applies to the information that I obtain through your use of
          HThompson websites including all of its subdomains.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          What I collect and Receive
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          In order to provide you the best possible experience on my websites, I
          need to collect and process certain information. Depending on your use
          of the Services, that may include:
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Contact me via email
            </Typography>
            {" — "}
            <Typography component="span">
              For example, when you ask for support, send me questions or
              comments, or report a problem, I will collect your name, email
              address, message, etc. I use this data solely in connection with
              answering the queries I receive.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Usage data
            </Typography>
            {" — "}
            <Typography component="span">
              When you visit my site, I will store: the website from which you
              visited me from, the parts of my site you visit, the date and
              duration of your visit, your anonymized IP address, information
              from the device (device type, operating system, screen resolution,
              language, country you are located in, and web browser type) you
              used during your visit, and more. I process this usage data in
              Matomo Analytics for statistical purposes, to improve my site and
              to recognize and stop any misuse.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", py: 0 }}>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Cookies
            </Typography>
            {" — "}
            <Typography component="span">
              I use cookies (small data files transferred onto computers or
              devices by sites) for record-keeping purposes and to enhance
              functionality on my site. You may deactivate or restrict the
              transmission of cookies by changing the settings of your web
              browser. Cookies that are already stored may be deleted at any
              time.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Opt Out
        </Typography>
        <Alert severity="info" sx={{ mb: 4 }}>
          If you don&apos;t see the opt out box below, please refresh the page
          or disable your ad blocker.
        </Alert>
        {shouldRenderMatomoOptOut ? (
          <>
            <Script
              src="https://analytics.hthompson.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1"
              strategy="afterInteractive"
            />
            <Box id="matomo-opt-out" />
          </>
        ) : null}
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Your Rights
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          You have the right to be informed of Personal Data processed by
          HThompson, a right to rectification/correction, erasure and
          restriction of processing. You also have the right to ask from me a
          structured, common and machine-readable format of Personal Data you
          provided to me. I can only identify you via your email address and I
          can only adhere to your request and provide information if I have
          Personal Data about you through you having made contact with me
          directly and/or you using my site and/or service. I cannot provide,
          rectify or delete any data that I store on behalf of my users or
          customers. To exercise any of the rights mentioned in this Privacy
          Policy and/or in the event of questions or comments relating to the
          use of Personal Data you may contact me:{" "}
          <Link href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</Link>
          . In addition, you have the right to lodge a complaint with the data
          protection authority in your jurisdiction.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Subprocessors
        </Typography>
        <Typography variant="body1" sx={{ mt: 4 }}>
          I use a select number of trusted external service providers for
          certain technical data processing and/or service offerings. These
          service providers are carefully selected and meet high data protection
          and security standards. I only share information with them that is
          required for the services offered. HThompson uses the following
          subprocessors to process the data collected by our websites:
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ my: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subprocessor</TableCell>
                <TableCell align="left">Data location and security</TableCell>
                <TableCell align="left">Service</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subprocessorsTable.map((subprocessor: SubprocessorTable) => (
                <TableRow key={subprocessor.id}>
                  <TableCell component="th" scope="row">
                    {subprocessor.subprocessor}
                  </TableCell>
                  <TableCell align="left">{subprocessor.location}</TableCell>
                  <TableCell align="left">{subprocessor.service}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Data Retention
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          I will retain your information as long as your account is active, as
          necessary to provide you with the services or as otherwise set forth
          in this Policy. I will also retain and use this information as
          necessary for the purposes set out in this Policy and to the extent
          necessary to comply with my legal obligations, resolve disputes,
          enforce my agreements and protect HThompson&apos;s legal rights. I
          also collect and maintain aggregated, anonymized or pseudonymized
          information which I may retain indefinitely to protect the safety and
          security of my Site, improve my Services or comply with legal
          obligations.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Contact Me
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          If you have questions or comments about this notice, you may email me
          at{" "}
          <Link href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</Link>
          . I will{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            NEVER
          </Typography>{" "}
          sell your personal data to anyone.
        </Typography>
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Reusing this Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ my: 4 }}>
          Before reading further, please, note that I am not a lawyer and do not
          provide legal or business advice. You are welcome to reuse and be
          inspired by this Privacy Policy (published under license CC BY) after
          making sure it complies with the way your website tracks, uses and
          discloses users information. The accuracy, completeness, adequacy of
          this privacy policy cannot be warranted or guaranteed.
        </Typography>
      </Box>
    </Box>
  );
}
