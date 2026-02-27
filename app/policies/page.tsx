"use client";

import { useEffect } from "react";

const subprocessorsTable = [
  {
    row: 1,
    subprocessor: "DigitalOcean",
    location: "California, USA",
    service: "File and cloud hosting provider.",
  },
  {
    row: 2,
    subprocessor: "Cloudflare",
    location:
      "Cloudflare, as a subprocessor, processes and stores user data across its global network of data centers, which means the data may be held in multiple locations worldwide.",
    service: "Web performance and security service.",
  },
];

export default function PoliciesPage() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const script = document.createElement("script");
    script.src =
      "https://analytics.hthompson.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="text-left">
      <section className="section-card">
        <h1>Privacy Policies</h1>
        <p>
          This Policy describes the information I collect from you, how I use that information and my legal basis for
          doing so.
        </p>
      </section>

      <section className="section-card">
        <h2>What I collect and Receive</h2>
        <ul>
          <li>
            <strong>Contact me via email</strong> - for support questions, comments, and reports.
          </li>
          <li>
            <strong>Usage data</strong> - website origin, visited pages, visit date, visit duration, anonymized IP, and
            device/browser details.
          </li>
          <li>
            <strong>Cookies</strong> - used for record-keeping and enhancing site functionality.
          </li>
        </ul>
      </section>

      <section className="section-card">
        <h2>Opt Out</h2>
        <p className="info-note">If you do not see the opt out box below, refresh the page.</p>
        <div id="matomo-opt-out" />
      </section>

      <section className="section-card">
        <h2>Your Rights</h2>
        <p>
          You can request information, correction, deletion, and restrictions regarding personal data. Contact:
          <a href="mailto:privacy@hthompson.dev"> privacy@hthompson.dev</a>
        </p>
      </section>

      <section className="section-card">
        <h2>Subprocessors</h2>
        <div className="table-wrap">
          <table className="table-border">
            <thead>
              <tr>
                <th>Subprocessor</th>
                <th>Data location and security</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {subprocessorsTable.map((item) => (
                <tr key={item.row}>
                  <td>{item.subprocessor}</td>
                  <td>{item.location}</td>
                  <td>{item.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card">
        <h2>Contact Me</h2>
        <p>
          If you have questions or comments about this notice, email
          <a href="mailto:privacy@hthompson.dev"> privacy@hthompson.dev</a>.
        </p>
      </section>
    </div>
  );
}
