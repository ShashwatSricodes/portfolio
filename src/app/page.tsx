"use client";
import Link from "next/link";
import { projects } from "@/lib/projects";
import ScreenflowStats from "./screenflow-stats";
import { useEffect, useState } from "react";

const FG = "hsl(0 0% 98%)";
const MUTED = "hsl(0 0% 63.9%)";
const BORDER = "hsl(0 0% 20% / 0.5)";
const SECONDARY_BG = "hsl(0 0% 8%)";

const experience = [
  {
    company: "Screenflow",
    role: "Partner & Developer",
    period: "Mar 2025 – Present",
    location: "Remote",
    logo: "/screenflow.svg",
    trustmrr: "https://trustmrr.com/startup/screenflow-dev",
    bullets: [
      <>Already at <b style={{color:FG, fontWeight:400}}>$1k MRR</b> with <b style={{color:FG, fontWeight:400}}>5,000+ signups</b>, <b style={{color:FG, fontWeight:400}}>50+ paid users</b>, and <b style={{color:FG, fontWeight:400}}>$2,500+ in lifetime revenue</b>, verified on TrustMRR.</>,
      <>Joined as a building partner on <b style={{color:FG, fontWeight:400}}>screenflow.dev</b>, an AI-powered mobile app design tool that generates beautiful screens from a text description and exports to Figma or reference code.</>,
      <>Built on <b style={{color:FG, fontWeight:400}}>Next.js, Supabase, and Gemini API</b>; contributing to core product development across the full stack.</>,
    ],
  },
  {
    company: "Hastin Energy",
    role: "Software Developer Intern",
    period: "May 2025 – July 2025",
    location: "Bangalore",
    logo: "/hasting.svg",
    bullets: [
      <>Developed a <b style={{color:FG, fontWeight:400}}>React Native</b> application interfacing with a <b style={{color:FG, fontWeight:400}}>Battery Management System</b> via <b style={{color:FG, fontWeight:400}}>CP2112 USB-to-I2C</b> adapter for real-time battery diagnostics on Android.</>,
      <>Built a custom <b style={{color:FG, fontWeight:400}}>Kotlin-to-React Native bridge</b> integrating an open-source I2C library through <b style={{color:FG, fontWeight:400}}>native modules</b> for direct hardware communication.</>,
      <>Implemented <b style={{color:FG, fontWeight:400}}>real-time visualization</b> using Recharts displaying live voltage, current, temperature, and cell metrics with <b style={{color:FG, fontWeight:400}}>500ms polling intervals</b>.</>,
      <>Designed <b style={{color:FG, fontWeight:400}}>offline-first architecture</b> with <b style={{color:FG, fontWeight:400}}>SQLite</b> for local persistence and automatic <b style={{color:FG, fontWeight:400}}>REST API sync</b> upon reconnection.</>,
    ],
  },
  {
    company: "ChartNest",
    role: "Freelance",
    period: "July 2025 – August 2025",
    location: "San Francisco",
    logo: "/chartnest.svg",
    bullets: [
      <>Building a full-stack <b style={{color:FG, fontWeight:400}}>health tracking platform</b> with <b style={{color:FG, fontWeight:400}}>React, Node.js, and Supabase</b> (PostgreSQL), featuring vitals monitoring, medication tracking, and trend visualization using Recharts.</>,
      <>Implemented <b style={{color:FG, fontWeight:400}}>Row Level Security (RLS)</b> and <b style={{color:FG, fontWeight:400}}>role-based access control (RBAC)</b> using Supabase Auth, with separate dashboards for patients, doctors, and administrators.</>,
      <>Architected <b style={{color:FG, fontWeight:400}}>real-time alerts</b> using <b style={{color:FG, fontWeight:400}}>Supabase Realtime</b> subscriptions for critical vitals thresholds, medication reminders, and appointment notifications.</>,
    ],
  },
];

function BrowserMock() {
  return (
    <div style={{
      width: "82%",
      borderRadius: "7px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
      border: "1px solid hsl(0 0% 28%)",
      background: "hsl(0 0% 11%)",
    }}>
      <div style={{
        background: "hsl(0 0% 15%)",
        padding: "7px 10px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        borderBottom: "1px solid hsl(0 0% 22%)",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width:9, height:9, borderRadius:"50%", background:c, flexShrink:0 }} />
        ))}
        <div style={{
          flex:1, marginLeft:6, height:14,
          background:"hsl(0 0% 21%)", borderRadius:3,
          display:"flex", alignItems:"center", paddingLeft:7,
        }}>
          <span style={{ fontSize:8, color:"hsl(0 0% 48%)" }}>example.com</span>
        </div>
      </div>
      <div style={{ padding:"16px 14px 20px" }}>
        <div style={{ width:"55%", height:9, background:"hsl(0 0% 24%)", borderRadius:3, marginBottom:8 }} />
        <div style={{ width:"88%", height:6, background:"hsl(0 0% 19%)", borderRadius:3, marginBottom:5 }} />
        <div style={{ width:"72%", height:6, background:"hsl(0 0% 19%)", borderRadius:3, marginBottom:14 }} />
        <div style={{ width:72, height:22, background:"hsl(0 0% 28%)", borderRadius:4 }} />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <article style={{
      borderRadius: "16px",
      overflow: "hidden",
      border: `1px solid hsl(0 0% 16%)`,
      background: "hsl(0 0% 6%)",
      transition: "transform 0.2s ease, border-color 0.2s ease",
      position: "relative",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 30%)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 16%)";
      }}
    >
      {/* Full-bleed bg photo */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        padding: "12px 12px 0",
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
        <div style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "8px 8px 0 0",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        }}>
          <img
            src={project.thumbnail}
            alt={project.name}
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 16px 16px", borderTop: "1px solid hsl(0 0% 11%)" }}>
        <h3 style={{ fontSize: "0.9375rem", fontWeight: 400, color: FG, marginBottom: "4px" }}>
          {project.name}
        </h3>
        <p style={{ fontSize: "0.8125rem", color: MUTED, lineHeight: 1.6, marginBottom: project.stats ? "6px" : "12px", fontWeight: 100 }}>
          {project.description}
        </p>
        {project.stats && (
          <p style={{ fontSize: "0.75rem", color: MUTED, marginBottom: "12px", lineHeight: 1.5 }}>
            <span style={{
              color: FG,
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "hsl(0 0% 50%)",
              textUnderlineOffset: "3px",
            }}>{project.stats.users}</span>
            {" · "}
            <span style={{
              color: FG,
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "hsl(0 0% 50%)",
              textUnderlineOffset: "3px",
            }}>{project.stats.pdfs}</span>
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href={`/projects/${project.slug}`}
            style={{ fontSize: "0.8125rem", color: MUTED, display: "flex", alignItems: "center", gap: "4px", fontWeight: 100, textDecoration: "none" }}
          >
            View Live
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill={MUTED}>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Accessible full-card link overlay */}
      <Link
        href={`/projects/${project.slug}`}
        style={{ position: "absolute", inset: 0, zIndex: 2, borderRadius: "16px" }}
        aria-label={`View ${project.name} project`}
      >
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
          View {project.name} project
        </span>
      </Link>
    </article>
  );
}

export default function Home() {
  const TYPED_TEXT = "real-world impact";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const delay = 800; // start after 800ms
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(TYPED_TEXT.slice(0, i));
        if (i >= TYPED_TEXT.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    <style>{`
      @keyframes fadeUp {
        0%   { opacity: 0; transform: translateY(6px); }
        5%   { opacity: 1; transform: translateY(0); }
        20%  { opacity: 1; transform: translateY(0); }
        25%  { opacity: 0; transform: translateY(-6px); }
        100% { opacity: 0; transform: translateY(-6px); }
      }
      .role-item {
        position: absolute;
        opacity: 0;
        animation: fadeUp 12s ease-in-out infinite;
      }
      .role-item:nth-child(1) { animation-delay: 0s; }
      .role-item:nth-child(2) { animation-delay: 3s; }
      .role-item:nth-child(3) { animation-delay: 6s; }
      .role-item:nth-child(4) { animation-delay: 9s; }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .nav-desktop {
        display: flex;
        gap: 1rem;
      }
      .nav-mobile {
        display: none;
        flex-wrap: wrap;
        gap: 0.75rem 1rem;
      }
      .header-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 2.5rem;
      }
      @media (max-width: 540px) {
        .nav-desktop { display: none; }
        .nav-mobile { display: flex; }
        .header-wrap {
          flex-direction: column;
          gap: 0.75rem;
        }
      }
    `}</style>
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      maxWidth: "42rem",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      paddingTop: "6rem",
      paddingBottom: "5rem",
      position: "relative",
      zIndex: 20,
    }}>

      {/* ── Header ── */}
      <header className="header-wrap">
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 400, color: FG, lineHeight: 1.4 }}>Shashwat Srivastava</h1>
          {/* Animated role */}
          <div style={{ position: "relative", height: "1.3rem", overflow: "hidden" }}>
            {["Software Developer", "React Native Dev", "Entrepreneur", "Builder"].map((role, i) => (
              <span key={i} className="role-item" style={{
                fontSize: "0.875rem",
                fontWeight: 100,
                color: MUTED,
                fontFamily: "'Bespoke Serif', serif",
                fontStyle: "italic",
                whiteSpace: "nowrap",
              }}>{role}</span>
            ))}
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          <a href="https://github.com/ShashwatSricodes" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>GitHub</a>
          <a href="https://www.linkedin.com/in/shashwatsrihere" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>LinkedIn</a>
          <a href="https://drive.google.com/file/d/1h7r_RlyxG5b6DZ4CG2k4Aa0It5RKKkSQ/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>Resume</a>
          <a href="https://mail.google.com/mail/?view=cm&to=Shashwatdev.builds@gmail.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>Email</a>
        </nav>

        {/* Mobile nav */}
        <nav className="nav-mobile">
          <a href="https://github.com/ShashwatSricodes" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>GitHub</a>
          <a href="https://www.linkedin.com/in/shashwatsrihere" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>LinkedIn</a>
          <a href="https://drive.google.com/file/d/1h7r_RlyxG5b6DZ4CG2k4Aa0It5RKKkSQ/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>Resume</a>
          <a href="https://mail.google.com/mail/?view=cm&to=Shashwatdev.builds@gmail.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: FG, textDecoration: "none" }}>Email</a>
        </nav>
      </header>

      {/* ── Main ── */}
      <main id="main-content" style={{ display: "flex", flexDirection: "column", flex: 1, gap: "3.5rem" }}>

        {/* Bio */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <p style={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.75 }}>
            Hey, I&apos;m <span style={{ color: FG }}>Shashwat Srivastava</span>, a 21 yo
            Software Developer who finds satisfaction in <span style={{ color: FG }}>complex systems</span>, the craft of engineering things that actually scale, and the overlap of{" "}
            <span style={{ fontFamily: "'Bespoke Serif', serif", fontStyle: "italic", color: FG }}>clean architecture</span>{" "}
            and <span style={{ fontFamily: "'Bespoke Serif', serif", fontStyle: "italic", color: FG }}>
              {typed}<span style={{ borderRight: done ? "none" : "1.5px solid hsl(0 0% 70%)", marginLeft: "1px", animation: done ? "none" : "blink 0.7s step-end infinite" }}/>
            </span>.
          </p>
          <p style={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.75 }}>
            I&apos;ve worked at <span style={{ color: FG }}>startups</span> and taken on{" "}
            <span style={{ color: FG, fontStyle: "italic" }}>freelance projects</span> across the stack.
            I&apos;m a <span style={{ color: FG }}>gym rat</span>, a{" "}
            <span style={{ color: FG, fontStyle: "italic" }}>React Native</span> lover, and always neck-deep in a <span style={{ color: FG }}>side project</span>.
          </p>
          <p style={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.75 }}>
            Currently focused on scaling{" "}
            <span style={{
              color: FG,
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "hsl(0 0% 55%)",
              textUnderlineOffset: "4px",
            }}>ScreenFlow</span>{" "}
            to{" "}
            <span style={{
              color: FG,
              textDecoration: "underline",
              textDecorationStyle: "wavy",
              textDecorationColor: "hsl(0 0% 55%)",
              textUnderlineOffset: "4px",
            }}>$5k MRR</span>{" "}
            in the next 6 months.
          </p>
          <ScreenflowStats />
        </section>

        {/* ── Experience ── */}
        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "0.5rem 0" }} />
        <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 400, color: FG }}>Experience</h2>
            <span style={{ fontSize: "0.75rem", color: MUTED }}>(Open to opportunities)</span>
          </div>
          <ol style={{ display: "flex", flexDirection: "column", gap: "1.75rem", listStyle: "none" }}>
            {experience.map((job) => (
              <li key={job.company}>
                <article style={{ display: "flex", gap: "0.75rem" }}>
                  <div style={{
                    flexShrink: 0, width: "2.25rem", height: "2.25rem",
                    borderRadius: "0.375rem", backgroundColor: SECONDARY_BG,
                    border: `1px solid ${BORDER}`, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "0.6rem", color: MUTED, fontWeight: 600,
                    marginTop: "0.125rem", letterSpacing: "0.05em",
                    overflow: "hidden",
                  }}>
                    {job.logo ? (
                      <img src={job.logo} alt={`${job.company} logo`} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} />
                    ) : (
                      job.company.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 300, color: FG, fontFamily: "'Bespoke Serif', serif" }}>{job.company}</h3>
                    <p style={{ fontSize: "0.875rem", color: MUTED, marginBottom: "0.5rem" }}>{job.role} , {job.period} · {job.location}</p>
                    <ol style={{ paddingLeft: "1rem" }}>
                      {job.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: "0.875rem", color: MUTED, lineHeight: 1.65, fontWeight: 300, listStyleType: "lower-roman", marginBottom: "0.25rem" }}>{b}</li>
                      ))}
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Projects ── */}
        <hr style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "0.5rem 0" }} />
        <section id="projects" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 400, color: FG }}>Projects</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ paddingTop: "1.5rem", marginTop: "2rem", borderTop: `1px solid ${BORDER}` }}>
        <p style={{ fontSize: "0.8125rem", color: MUTED }}>
          © {new Date().getFullYear()} Shashwat Srivastava. All rights reserved.
        </p>
      </footer>
    </div>
    </>
  );
}
