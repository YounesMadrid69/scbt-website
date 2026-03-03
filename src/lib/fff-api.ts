// ============================================================
// FFF API Service - Real data from Fédération Française de Football
// Uses the public DOFA API: https://api-dofa.fff.fr/api/
// ============================================================

const FFF_API_BASE = "https://api-dofa.fff.fr/api";
const SCBT_CL_NO = "163564"; // Internal FFF club number

export const SCBT_CL_COD = "590385";
export const SCBT_LOGO =
  "https://cdn-transverse.azureedge.net/phlogos/BC590385.jpg";

// ---- Types ----

export type FFFTeam = {
  number: number;
  categoryCode: string;
  categoryLabel: string;
  gender: string; // "M", "F", "I"
  competitions: string[];
  displayName: string; // Label from FFF API as-is
};

export type FFFMatch = {
  id: number;
  date: string;
  time: string;
  status: "played" | "upcoming" | "stopped" | "postponed";
  competition: string;
  competitionType: string; // "CH" = Championship, "CP" = Cup
  journee: string;
  category: string; // Display category from FFF
  homeTeam: string;
  homeLogo: string;
  homeScore: number | null;
  awayTeam: string;
  awayLogo: string;
  awayScore: number | null;
  venue: string;
};

// ---- Helpers ----

/**
 * Clean up category_label to match the FFF website display.
 * e.g. "U17 - U16 Libre" → "U17 - U16", "Foot Loisir Foot Loisir" → "Foot Loisir"
 */
function cleanCategoryLabel(label: string): string {
  // Remove trailing "Libre" suffix
  let cleaned = label.replace(/\s+Libre$/i, "").trim();
  // Deduplicate repeated words (e.g. "Foot Loisir Foot Loisir" → "Foot Loisir")
  const half = Math.floor(cleaned.length / 2);
  const firstHalf = cleaned.substring(0, half).trim();
  const secondHalf = cleaned.substring(half).trim();
  if (firstHalf === secondHalf) {
    cleaned = firstHalf;
  }
  return cleaned;
}

function normalizeStatus(
  homeScore: number | null,
  awayScore: number | null,
  postponed: string
): FFFMatch["status"] {
  if (postponed) return "postponed";
  if (homeScore !== null && awayScore !== null) return "played";
  return "upcoming";
}

// ---- API calls ----

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Fetch all teams for SCBT, filtered to only those with active competitions
 */
export async function fetchTeams(): Promise<FFFTeam[]> {
  const res = await fetch(`${FFF_API_BASE}/clubs/${SCBT_CL_NO}/equipes`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    console.error("FFF API error (teams):", res.status);
    return [];
  }

  const data: any[] = await res.json();

  return data
    .filter(
      (t: any) =>
        t.engagements && t.engagements.length > 0 &&
        t.engagements.some((e: any) => e.competition?.name)
    )
    .map((t: any) => ({
      number: t.number,
      categoryCode: t.category_code,
      categoryLabel: t.category_label,
      gender: t.category_gender,
      competitions: (t.engagements || [])
        .map((e: any) => e.competition?.name)
        .filter(Boolean),
      displayName: cleanCategoryLabel(t.category_label),
    }));
}

/**
 * Fetch all matches for a specific team
 */
export async function fetchTeamMatches(
  teamNumber: number
): Promise<FFFMatch[]> {
  const res = await fetch(
    `${FFF_API_BASE}/clubs/${SCBT_CL_NO}/equipes/${teamNumber}/matchs`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!res.ok) {
    console.error("FFF API error (matches):", res.status, "team:", teamNumber);
    return [];
  }

  const data: any[] = await res.json();

  return data.map((m: any) => {
    const homeScore =
      m.home_score !== undefined && m.home_score !== null
        ? m.home_score
        : null;
    const awayScore =
      m.away_score !== undefined && m.away_score !== null
        ? m.away_score
        : null;

    return {
      id: m.ma_no,
      date: m.date,
      time: m.time || "",
      status: normalizeStatus(homeScore, awayScore, m.seems_postponed),
      competition: m.competition?.name || "Inconnu",
      competitionType: m.competition?.type || "CH",
      journee: m.poule_journee?.name || "",
      category: "", // Will be overridden by fetchAllMatches
      homeTeam: m.home?.short_name || "?",
      homeLogo: m.home?.club?.logo || "",
      homeScore,
      awayTeam: m.away?.short_name || "?",
      awayLogo: m.away?.club?.logo || "",
      awayScore,
      venue: m.terrain?.name || "",
    };
  });
}

/**
 * Fetch matches for ALL active teams and merge them
 */
export async function fetchAllMatches(): Promise<FFFMatch[]> {
  const teams = await fetchTeams();

  // Only fetch competitive teams (not Animation/FA)
  const competitiveTeams = teams.filter((t) => t.categoryCode !== "FA");

  const allMatchesArrays = await Promise.all(
    competitiveTeams.map(async (t) => {
      const matches = await fetchTeamMatches(t.number);
      // Use the FFF category_label directly as category
      return matches.map((m) => ({ ...m, category: t.displayName }));
    })
  );

  // Merge and deduplicate by match ID
  const matchMap = new Map<number, FFFMatch>();
  for (const matches of allMatchesArrays) {
    for (const match of matches) {
      if (!matchMap.has(match.id)) {
        matchMap.set(match.id, match);
      }
    }
  }

  // Sort by date
  return Array.from(matchMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Get all unique display categories from matches
 */
export function getCategories(matches: FFFMatch[]): string[] {
  return [...new Set(matches.map((m) => m.category))];
}
