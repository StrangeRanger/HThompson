"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchGithubProjects } from "@/lib/github";
import { getStatusClass } from "@/lib/repo-status";
import type { BadgeDescription, GithubProject } from "@/lib/types";

const badgeDescriptions: BadgeDescription[] = [
  {
    row: 1,
    statusBadge: "personal",
    description:
      "Indicates that the project or document is tailored to my personal needs and will be updated as required.",
  },
  { row: 2, statusBadge: "active", description: "The project is stable and fully functional, with ongoing development." },
  { row: 3, statusBadge: "maintained", description: "The project is stable and functional, receiving updates mainly for fixes." },
  { row: 4, statusBadge: "inactive", description: "Development has paused, but the project remains stable and usable." },
  { row: 5, statusBadge: "finished", description: "The project is complete and fully functional." },
  { row: 6, statusBadge: "unsupported", description: "The project is stable and usable, but active development has ceased." },
  { row: 7, statusBadge: "concept", description: "Represents an early-stage project or proof-of-concept." },
  { row: 8, statusBadge: "wip", description: "Development is actively underway and not yet stable." },
  { row: 9, statusBadge: "suspended", description: "Development has been temporarily halted after initial progress." },
  { row: 10, statusBadge: "abandoned", description: "The project has been discontinued and will no longer receive updates." },
  { row: 11, statusBadge: "archived", description: "The project has been officially archived and is no longer maintained." },
  { row: 12, statusBadge: "moved", description: "The project has been relocated to a new repository or platform." },
  {
    row: 13,
    statusBadge: "unspecified",
    description:
      "The project status is not explicitly defined; some repositories do not need status metadata.",
  },
  { row: 14, statusBadge: "unknown", description: "The project status is not known or has not been determined." },
];

function sanitizeBadgeDescription(status: string, description: string): string {
  if (status !== "unspecified") return description;
  return `${description} For example, a GitHub profile repository may not be a traditional software project.`;
}

export default function ProjectTrackerPage() {
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await fetchGithubProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash);
      if (window.location.hash) {
        setTimeout(() => {
          document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => b.type.localeCompare(a.type));
  }, [projects]);

  return (
    <div>
      <section className="section-card">
        <h1>Project Tracker</h1>
        <p>
          This page offers a comprehensive list of all the projects I am working on, plan to work on, and have
          completed. For badge explanations, see the <Link href="#badge-descriptions">Badge Descriptions</Link>{" "}
          section.
        </p>
      </section>

      <section className="section-card">
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="table-wrap">
            <table className="table-border">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Commit</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((item) => {
                  const rowId = `project-${item.id}`;
                  return (
                    <tr id={rowId} key={item.id} className={activeHash === `#${rowId}` ? "highlighted" : ""}>
                      <td>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.name}
                        </a>
                      </td>
                      <td>{item.type}</td>
                      <td>
                        <span className={`badge ${getStatusClass(item.status)}`}>{item.status}</span>
                      </td>
                      <td>
                        <span className="badge badge-neutral">{item.lastCommitRelative}</span>
                      </td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="section-card">
        <h2 id="badge-descriptions">Badge Descriptions</h2>
        <div className="table-wrap">
          <table className="table-border">
            <thead>
              <tr>
                <th>Repo Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {badgeDescriptions.map((item) => (
                <tr key={item.row}>
                  <td>
                    <span className={`badge ${getStatusClass(item.statusBadge)}`}>{item.statusBadge}</span>
                  </td>
                  <td>{sanitizeBadgeDescription(item.statusBadge, item.description)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
