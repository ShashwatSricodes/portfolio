import Link from "next/link";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";

const FG = "hsl(0 0% 98%)";
const MUTED = "hsl(0 0% 63.9%)";
const BORDER = "hsl(0 0% 20% / 0.5)";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function highlightKeywords(text: string, keywords: string[]) {
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isMatch = sorted.some(k => k.toLowerCase() === part.toLowerCase());
    return isMatch
      ? <span key={i} style={{ color: FG, fontWeight: 400 }}>{part}</span>
      : part;
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div style={{
      maxWidth: "42rem",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      position: "relative",
      zIndex: 20,
    }}>

      {/* Back link */}
      <Link href="/" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.875rem",
        color: MUTED,
        textDecoration: "none",
        marginBottom: "2.5rem",
      }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      {/* Hero image */}
      <div style={{
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "2rem",
        border: `1px solid ${BORDER}`,
        position: "relative",
        background: "hsl(0 0% 8%)",
      }}>
        <img
          src={project.cardBg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div style={{ position: "relative", padding: "20px 20px 0", zIndex: 1 }}>
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{
              width: "100%",
              display: "block",
              borderRadius: "8px 8px 0 0",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </div>

      {/* Project title + description */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 400, color: FG, marginBottom: "0.5rem", lineHeight: 1.3 }}>
          {project.name}
        </h1>
        <p style={{ fontSize: "1rem", color: MUTED, lineHeight: 1.7, fontFamily: "'Bespoke Serif', serif", fontStyle: "italic" }}>
          {project.description}
        </p>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.875rem", color: FG, fontWeight: 400,
          textDecoration: "underline", textUnderlineOffset: "4px",
          textDecorationColor: "hsl(0 0% 98% / 0.35)",
        }}>
          View Live ↗
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.875rem", color: MUTED,
          textDecoration: "underline", textUnderlineOffset: "4px",
          textDecorationColor: "hsl(0 0% 63.9% / 0.35)",
        }}>
          GitHub ↗
        </a>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: "2rem" }} />

      {/* Long description with keyword highlights */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
        {project.longDescription.map((para, i) => (
          <p key={i} style={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.8, fontWeight: 100 }}>
            {highlightKeywords(para, project.keywords)}
          </p>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "0.75rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 400, marginBottom: "0.875rem" }}>
          Tech Stack
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.techStack.map((tech) => (
            <span key={tech} style={{
              fontSize: "0.8125rem",
              color: MUTED,
              border: `1px solid ${BORDER}`,
              borderRadius: "4px",
              padding: "3px 10px",
              fontWeight: 100,
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.8125rem", color: MUTED }}>
          © {new Date().getFullYear()} Shashwat Srivastava. All rights reserved.
        </p>
      </div>
    </div>
  );
}