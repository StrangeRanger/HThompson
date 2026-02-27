"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SiteShellProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/project-tracker", label: "Project Tracker" },
  { href: "/about", label: "About" },
  { href: "/links", label: "My Links" },
  { href: "/policies", label: "Web Policy" },
  { href: "https://status.hthompson.dev/status/hthompson", label: "Status", external: true },
];

export default function SiteShell({ children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-root">
      <div className="bg-wrap">
        <Image
          src="/images/3996769.jpg"
          alt="Background"
          fill
          priority
          className="bg-image"
        />
      </div>

      <header className="toolbar">
        <Link href="/" className="brand">
          HThompson
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </header>

      <aside className={`drawer ${menuOpen ? "open" : ""}`}>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {menuOpen && <button type="button" aria-label="Close menu" className="backdrop" onClick={() => setMenuOpen(false)} />}

      <main className="main-wrap">
        <section className="content-panel">{children}</section>
      </main>

      <footer className="site-footer">
        <small>
          Site made by{" "}
          <a href="https://github.com/StrangeRanger" target="_blank" rel="noopener noreferrer">
            Hunter T.
          </a>
        </small>
      </footer>
    </div>
  );
}
