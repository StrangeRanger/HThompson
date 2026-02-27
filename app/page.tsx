import Link from "next/link";
import type { ServiceCard } from "@/lib/types";

const cards: ServiceCard[] = [
  {
    title: "Image Gallery",
    text: "Publicly hosts an assortment of images, videos, gifs, and so on.",
    link: "https://images.hthompson.dev/",
    type: "service",
  },
  {
    title: "Private Bin",
    text: "A minimalist, open source online pastebin where the server has zero knowledge of pasted data.",
    link: "https://privatebin.hthompson.dev/",
    type: "service",
  },
  {
    title: "File Server",
    text: "Files that aren't located anywhere else on my website.",
    link: "https://files.hthompson.dev/",
    type: "service",
  },
  {
    title: "RSS Bridge",
    text: "The RSS feed for websites missing it.",
    link: "https://rss-bridge.hthompson.dev/",
    type: "service",
  },
  {
    title: "Project Tracker",
    text: "A comprehensive list of projects I'm working on, have completed, or have abandoned.",
    link: "/project-tracker",
    type: "doc-and-tools",
  },
  {
    title: "Custom Unix Terminal",
    text: "Configurations that went in to custumizing the look, feel, and functionality of my terminal.",
    link: "https://cut.hthompson.dev/",
    type: "doc-and-tools",
  },
  {
    title: "Bash Style Guide",
    text: "A style guide for writing safe, predictable, and maintainable bash scripts.",
    link: "https://bsg.hthompson.dev/",
    type: "doc-and-tools",
  },
];

function CardGrid({ type, title, description }: { type: ServiceCard["type"]; title: string; description: string }) {
  const data = cards.filter((item) => item.type === type);

  return (
    <section className="section-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="card-grid">
        {data.map((item) => (
          <article key={item.title} className="card-link">
            {item.link.startsWith("http") ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </a>
            ) : (
              <Link href={item.link}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <section className="section-card">
        <h1>Welcome to HThompson</h1>
        <p>
          I&apos;m Hunter, and this is the central hub of my online presence. Here, you can track my current projects,
          access the services I host, explore my documentation and tools, and learn more about who I am and what I do.
          Feel free to browse around and enjoy your visit.
        </p>
      </section>

      <CardGrid
        type="doc-and-tools"
        title="Documentation & Tools"
        description="Unlike my traditional software repositories, these are comprehensive documentation projects, small web applications, and curated resources."
      />

      <CardGrid
        type="service"
        title="Self-Hosted Services"
        description="Below are the self-hosted services and applications I run on DigitalOcean."
      />
    </div>
  );
}
