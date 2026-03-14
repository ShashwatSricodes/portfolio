import { NextResponse } from "next/server";

export const revalidate = 86400; // cache for 24 hours

export async function GET() {
  try {
    const res = await fetch("https://trustmrr.com/startup/screenflow-dev", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const html = await res.text();

    const mrr = html.match(/MRR \(estimated\)[^$]*\$([\d,]+)/)?.[1] ?? null;
    const allTime = html.match(/All-time revenue[^$]*\$([\d,]+)/)?.[1] ?? null;
    const subs = html.match(/(\d+)\s+active subscriptions/)?.[1] ?? null;
    const last30 = html.match(/\$([\d,]+)\s+last 30 days/)?.[1] ?? null;

    return NextResponse.json({
      mrr: mrr ? `$${mrr}` : null,
      last30Days: last30 ? `$${last30}` : null,
      allTimeRevenue: allTime ? `$${allTime}` : null,
      activeSubscriptions: subs ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}