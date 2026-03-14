import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query userProfileCalendar($username: String!, $year: Int) {
            matchedUser(username: $username) {
              userCalendar(year: $year) {
                submissionCalendar
                totalActiveDays
                streak
              }
            }
          }
        `,
        variables: { username: "ShashwatSri", year: 2026 },
      }),
      next: { revalidate: 86400 },
    });

    const data = await res.json();
    const calendar = data?.data?.matchedUser?.userCalendar;

    return NextResponse.json({
      submissionCalendar: calendar?.submissionCalendar ?? "{}",
      totalActiveDays: calendar?.totalActiveDays ?? 0,
      streak: calendar?.streak ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}