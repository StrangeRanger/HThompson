import type { SocialLink } from "@/lib/types";

const links: SocialLink[] = [
  {
    title: "Twitter (X)",
    text: "My Twitter (X) account.",
    link: "https://x.com/_Hunter_T_",
    color: "#1DA1F2",
  },
  {
    title: "GitHub",
    text: "My GitHub account.",
    link: "https://github.com/StrangeRanger",
    color: "#ffffff",
  },
  {
    title: "SoundCloud",
    text: "My SoundCloud account.",
    link: "https://soundcloud.com/SubDubZero",
    color: "#FF5500",
  },
];

export default function LinksPage() {
  return (
    <div>
      <section className="section-card">
        <h1>My Links</h1>
        <p>Connect with me on various social media platforms and explore my work.</p>
      </section>

      <section className="section-card">
        <div className="card-grid">
          {links.map((item) => (
            <article key={item.title} className="card-link" style={{ borderColor: item.color }}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
