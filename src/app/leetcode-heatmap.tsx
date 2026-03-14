"use client";
import { useEffect, useState } from "react";

const MUTED = "hsl(0 0% 63.9%)";
const BORDER = "hsl(0 0% 20% / 0.5)";
const FG = "hsl(0 0% 98%)";

// Generate all weeks of 2026
function get2026Weeks() {
  const weeks: Date[][] = [];
  // Start from Jan 1 2026, go back to nearest Sunday
  const start = new Date(2026, 0, 1);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(2026, 11, 31);

  let current = new Date(start);
  while (current <= end) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getColor(count: number) {
  if (count === 0) return "hsl(0 0% 13%)";
  if (count <= 2) return "hsl(142 50% 25%)";
  if (count <= 5) return "hsl(142 55% 35%)";
  if (count <= 9) return "hsl(142 60% 45%)";
  return "hsl(142 65% 55%)";
}

export default function LeetcodeHeatmap() {
  const [calendar, setCalendar] = useState<Record<string, number>>({});
  const [totalActiveDays, setTotalActiveDays] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode")
      .then(r => r.json())
      .then(data => {
        const parsed = JSON.parse(data.submissionCalendar || "{}");
        setCalendar(parsed);
        setTotalActiveDays(data.totalActiveDays);
        setStreak(data.streak);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const weeks = get2026Weeks();
  const today = new Date();

  // Month labels: find first week where month changes
  const monthLabels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, i) => {
    const firstDay2026 = week.find(d => d.getFullYear() === 2026);
    if (!firstDay2026) return;
    if (i === 0 || firstDay2026.getDate() <= 7) {
      const month = firstDay2026.getMonth();
      if (!monthLabels.find(m => m.label === MONTHS[month])) {
        monthLabels.push({ label: MONTHS[month], weekIndex: i });
      }
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Stats row */}
      <div style={{ display: "flex", gap: "1.25rem" }}>
        <span style={{ fontSize: "0.8rem", color: MUTED }}>
          <span style={{ color: FG, fontWeight: 400 }}>{loading ? "..." : totalActiveDays}</span> active days
        </span>
        <span style={{ fontSize: "0.8rem", color: MUTED }}>
          <span style={{ color: FG, fontWeight: 400 }}>{loading ? "..." : streak}</span> day streak
        </span>
      </div>

      {/* Heatmap */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "fit-content" }}>
          {/* Month labels */}
          <div style={{ display: "flex", gap: "3px", paddingLeft: "0px" }}>
            {weeks.map((week, i) => {
              const label = monthLabels.find(m => m.weekIndex === i);
              return (
                <div key={i} style={{ width: "11px", fontSize: "0.55rem", color: MUTED, textAlign: "left", whiteSpace: "nowrap" }}>
                  {label ? label.label : ""}
                </div>
              );
            })}
          </div>

          {/* Grid: 7 rows (days) x N cols (weeks) */}
          {[0,1,2,3,4,5,6].map(dayOfWeek => (
            <div key={dayOfWeek} style={{ display: "flex", gap: "3px" }}>
              {weeks.map((week, wi) => {
                const date = week[dayOfWeek];
                const isFuture = date > today;
                const is2026 = date.getFullYear() === 2026;
                const ts = Math.floor(date.getTime() / 1000).toString();
                const count = calendar[ts] ?? 0;

                return (
                  <div
                    key={wi}
                    title={is2026 && !isFuture ? `${date.toDateString()}: ${count} submission${count !== 1 ? "s" : ""}` : ""}
                    style={{
                      width: "11px",
                      height: "11px",
                      borderRadius: "2px",
                      backgroundColor: !is2026 || isFuture ? "transparent" : getColor(count),
                      border: is2026 && !isFuture ? `1px solid hsl(0 0% 18%)` : "none",
                      flexShrink: 0,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "0.65rem", color: MUTED }}>Less</span>
        {[0, 2, 5, 9, 10].map(v => (
          <div key={v} style={{ width: "11px", height: "11px", borderRadius: "2px", backgroundColor: getColor(v), border: "1px solid hsl(0 0% 18%)" }} />
        ))}
        <span style={{ fontSize: "0.65rem", color: MUTED }}>More</span>
      </div>
    </div>
  );
}