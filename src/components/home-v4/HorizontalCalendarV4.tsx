"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

/**
 * Horizontal scroll calendar.
 * Vertical scroll is converted into horizontal movement.
 */

const CATEGORY_ACCENTS: Record<string, string> = {
  "Senior": "bg-blue-primary",
  "U19 - U18": "bg-blue-light",
  "U17 - U16": "bg-emerald-500",
  "U15 - U14": "bg-amber-500",
  "U15 F - U14 F": "bg-pink-500",
  "U13 - U12": "bg-purple-500",
  "U13 F - U12 F": "bg-pink-400",
  "U13 - U12 Futsal": "bg-orange-500",
  "Foot Loisir": "bg-teal-500",
};

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase().replace(".", ""),
  };
}

function HorizontalMatchCard({ match }: { match: FFFMatch }) {
  const isSCBT = (name: string) => name.includes("SCBT") || name.includes("S.C.B.T");
  const isPlayed = match.status === "played";
  const { day, month } = formatDate(match.date);

  return (
    <div className="group relative flex h-[340px] w-[280px] shrink-0 flex-col justify-between border-r border-gray-100 bg-white p-6 transition-colors hover:bg-gray-50 md:w-[320px]">
      {/* Top accent */}
      <div className={cn("absolute top-0 left-0 h-1 w-full", CATEGORY_ACCENTS[match.category] || "bg-blue-primary")} />

      <div>
        {/* Date */}
        <div className="mb-6">
          <span className="block font-[family-name:var(--font-verbatim)] text-5xl font-black leading-none tracking-tighter text-navy-deep">
            {day}
          </span>
          <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-gray-300">
            {month} &mdash; {match.time?.replace("H", ":")}
          </span>
        </div>

        {/* Teams */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {match.homeLogo ? (
              <Image src={match.homeLogo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" unoptimized />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="text-[8px] font-black text-gray-400">{match.homeTeam.substring(0, 3)}</span>
              </div>
            )}
            <span className={cn(
              "font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wide",
              isSCBT(match.homeTeam) ? "font-black text-navy-deep" : "font-bold text-gray-500"
            )}>
              {match.homeTeam}
            </span>
            {isPlayed && match.homeScore !== null && (
              <span className="ml-auto font-[family-name:var(--font-verbatim)] text-xl font-black text-navy-deep">{match.homeScore}</span>
            )}
          </div>

          <div className="mx-10 h-[1px] bg-gray-100" />

          <div className="flex items-center gap-3">
            {match.awayLogo ? (
              <Image src={match.awayLogo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" unoptimized />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="text-[8px] font-black text-gray-400">{match.awayTeam.substring(0, 3)}</span>
              </div>
            )}
            <span className={cn(
              "font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wide",
              isSCBT(match.awayTeam) ? "font-black text-navy-deep" : "font-bold text-gray-500"
            )}>
              {match.awayTeam}
            </span>
            {isPlayed && match.awayScore !== null && (
              <span className="ml-auto font-[family-name:var(--font-verbatim)] text-xl font-black text-navy-deep">{match.awayScore}</span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <span className={cn("px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white", CATEGORY_ACCENTS[match.category] || "bg-blue-primary")}>
          {match.category}
        </span>
        <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-blue-primary opacity-0 transition-opacity group-hover:opacity-100">
          Détails &rsaquo;
        </span>
      </div>
    </div>
  );
}

export default function HorizontalCalendarV4() {
  const [matches, setMatches] = useState<FFFMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Convert vertical scroll to horizontal
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  // Calculate scroll width once matches load
  useEffect(() => {
    if (scrollRef.current) {
      const total = scrollRef.current.scrollWidth;
      const visible = window.innerWidth;
      setScrollWidth(Math.max(0, total - visible + 100));
    }
  }, [matches]);

  const cardCount = matches.length || 8;
  // Height proportional to number of cards for smooth scroll
  const sectionHeight = `${Math.max(150, cardCount * 18)}vh`;

  return (
    <section ref={containerRef} className="relative bg-white" style={{ height: sectionHeight }} id="calendrier">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-10 flex items-end justify-between px-8 pt-16 pb-8 md:px-16">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Saison 2025-2026
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-7xl">
              CALENDRIER
            </h2>
          </div>
          <span className="hidden font-[family-name:var(--font-verbatim)] text-sm font-bold text-gray-300 md:block">
            {matches.length} matchs
          </span>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative flex-1">
          {loading ? (
            <div className="flex h-full items-center gap-4 px-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[340px] w-[280px] shrink-0 animate-pulse bg-gray-50" />
              ))}
            </div>
          ) : (
            <motion.div
              ref={scrollRef}
              style={{ x }}
              className="flex h-full items-center"
            >
              {/* Leading spacer */}
              <div className="w-8 shrink-0 md:w-16" />

              {matches.map((match) => (
                <HorizontalMatchCard key={match.id} match={match} />
              ))}

              {/* Trailing spacer */}
              <div className="flex h-[340px] w-[280px] shrink-0 items-center justify-center">
                <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-gray-200">
                  Fin du calendrier
                </span>
              </div>
            </motion.div>
          )}

          {/* Scroll progress line */}
          <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gray-100 md:left-16 md:right-16">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-navy-deep"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
