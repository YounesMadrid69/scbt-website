"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

function formatMatchDate(dateStr: string, time: string): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d
    .toLocaleDateString("fr-FR", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  const formattedTime = time ? time.replace("H", ":") : "";
  return `${day} ${month}.  ${formattedTime}`;
}

export default function MatchCard({ match }: { match: FFFMatch }) {
  const isPlayed = match.status === "played";
  const isSCBT = (name: string) =>
    name.includes("SCBT") || name.includes("S.C.B.T");

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="card-cut-corner flex min-w-[165px] w-[165px] flex-col border border-blue-primary/10 bg-white shadow-md sm:min-w-[300px] sm:w-[300px]"
    >
      <div className="flex flex-col gap-3 px-3 pt-3 pb-4 sm:gap-5 sm:px-5 sm:pt-5 sm:pb-6">
        {/* Header: category badge + date */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="self-start rounded-sm border border-navy-deep/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy-deep sm:px-2.5 sm:text-[11px]">
            {match.category}
          </span>
          <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-medium text-gray-500 sm:text-[13px]">
            {formatMatchDate(match.date, match.time)}
          </span>
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Home team */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-10 sm:w-10">
              {match.homeLogo ? (
                <Image
                  src={match.homeLogo}
                  alt={match.homeTeam}
                  width={36}
                  height={36}
                  className="h-7 w-7 rounded-full object-cover sm:h-9 sm:w-9"
                  unoptimized
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 sm:h-10 sm:w-10">
                  <span className="text-[8px] font-bold text-gray-400 sm:text-[10px]">
                    {match.homeTeam.substring(0, 3)}
                  </span>
                </div>
              )}
            </div>
            <span
              className={cn(
                "flex-1 truncate font-[family-name:var(--font-verbatim)] text-xs uppercase leading-tight tracking-wide sm:text-base",
                isSCBT(match.homeTeam)
                  ? "font-bold text-navy-deep"
                  : "font-medium text-gray-600"
              )}
            >
              {match.homeTeam}
            </span>
            {isPlayed && match.homeScore !== null && (
              <span className="font-[family-name:var(--font-verbatim)] text-base font-black tracking-tight text-navy-deep sm:text-xl">
                {match.homeScore}
              </span>
            )}
          </div>

          {/* Away team */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-10 sm:w-10">
              {match.awayLogo ? (
                <Image
                  src={match.awayLogo}
                  alt={match.awayTeam}
                  width={36}
                  height={36}
                  className="h-7 w-7 rounded-full object-cover sm:h-9 sm:w-9"
                  unoptimized
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 sm:h-10 sm:w-10">
                  <span className="text-[8px] font-bold text-gray-400 sm:text-[10px]">
                    {match.awayTeam.substring(0, 3)}
                  </span>
                </div>
              )}
            </div>
            <span
              className={cn(
                "flex-1 truncate font-[family-name:var(--font-verbatim)] text-xs uppercase leading-tight tracking-wide sm:text-base",
                isSCBT(match.awayTeam)
                  ? "font-bold text-navy-deep"
                  : "font-medium text-gray-600"
              )}
            >
              {match.awayTeam}
            </span>
            {isPlayed && match.awayScore !== null && (
              <span className="font-[family-name:var(--font-verbatim)] text-base font-black tracking-tight text-navy-deep sm:text-xl">
                {match.awayScore}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
