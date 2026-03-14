"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home",       href: "/" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects",   href: "/projects" },
  { label: "Resume",     href: "/resume.pdf", external: true },
  { label: "Contact",    href: "/#contact" },
];

export default function Nav() {
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingTop: "40px",
        paddingBottom: "0",
      }}
    >
      {/* Left — name + tagline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Link
          href="/"
          style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "#e8e8e8",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Your Name
        </Link>
        <span
          style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            color: "#555555",
          }}
        >
          Your Tagline
        </span>
      </div>

      {/* Right — links */}
      <ul style={{ display: "flex", alignItems: "center", gap: "20px", listStyle: "none", margin: 0, padding: 0, paddingTop: "2px" }}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const isHovered = hovered === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  fontFamily: "'Satoshi', system-ui, sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: isActive || isHovered ? "#e8e8e8" : "#555555",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}