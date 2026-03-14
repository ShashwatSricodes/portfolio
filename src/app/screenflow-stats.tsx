"use client";
import { useEffect, useState } from "react";

const FG = "hsl(0 0% 98%)";
const MUTED = "hsl(0 0% 63.9%)";
const BORDER = "hsl(0 0% 20% / 0.5)";
const SECONDARY_BG = "hsl(0 0% 8%)";

interface Stats {
  mrr: string | null;
  last30Days: string | null;
  allTimeRevenue: string | null;
  activeSubscriptions: string | null;
}

export default function ScreenflowStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/screenflow")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const items = [
    { label: "MRR", value: stats?.mrr },
    { label: "Last 30 days", value: stats?.last30Days },
    { label: "Lifetime revenue", value: stats?.allTimeRevenue },
    { label: "Subscribers", value: stats?.activeSubscriptions },
  ];

  return (
    <a
      href="https://trustmrr.com/startup/screenflow-dev"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div style={{
        marginTop: "0.75rem",
        borderRadius: "0.5rem",
        border: `1px solid ${BORDER}`,
        backgroundColor: SECONDARY_BG,
        padding: "0.75rem 1rem",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "0.5rem",
        cursor: "pointer",
      }}>
        {items.map(({ label, value }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <span style={{ fontSize: "0.65rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {label}
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: 400, color: FG }}>
              {loading ? "..." : (value ?? "N/A")}
            </span>
          </div>
        ))}
        <div style={{
          gridColumn: "1 / -1",
          marginTop: "0.35rem",
          paddingTop: "0.35rem",
          borderTop: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "0.7rem", color: MUTED }}>Verified via Stripe on TrustMRR</span>
          <span style={{ fontSize: "0.7rem", color: MUTED }}>View live ↗</span>
        </div>
      </div>
    </a>
  );
}