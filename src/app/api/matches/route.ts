import { NextResponse } from "next/server";
import { fetchAllMatches, fetchTeams } from "@/lib/fff-api";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  const [matches, teams] = await Promise.all([
    fetchAllMatches(),
    fetchTeams(),
  ]);

  return NextResponse.json({
    matches,
    teams: teams.map((t) => ({
      number: t.number,
      category: t.displayName,
      competitions: t.competitions,
    })),
    total: matches.length,
  });
}
