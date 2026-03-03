"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

const CATEGORY_COLORS: Record<string, string> = {
  "Senior": "bg-blue-primary text-white",
  "U19 - U18": "bg-blue-light text-white",
  "U17 - U16": "bg-emerald-500 text-white",
  "U15 - U14": "bg-amber-500 text-white",
  "U15 F - U14 F": "bg-pink-500 text-white",
  "U13 - U12": "bg-purple-500 text-white",
  "U13 F - U12 F": "bg-pink-400 text-white",
  "U13 - U12 Futsal": "bg-orange-500 text-white",
  "Foot Loisir": "bg-teal-500 text-white",
};

function formatMatchDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase().replace(".", ""),
  };
}

function StreetMatchCard({ match }: { match: FFFMatch }) {
  const isPlayed = match.status === "played";
  const isSCBT = (name: string) =>
    name.includes("SCBT") || name.includes("S.C.B.T");
  const { day, month } = formatMatchDate(match.date);

  return (
    <motion.div
      whileHover={{ y: -8, rotate: -0.5 }}
      transition={{ duration: 0.2 }}
      className="card-cut-lg relative min-w-[270px] w-[270px] bg-white shadow-xl sm:min-w-[320px] sm:w-[320px]"
    >
      {/* Top accent bar */}
      <div className={cn(
        "h-1.5",
        CATEGORY_COLORS[match.category]?.split(" ")[0] || "bg-blue-primary"
      )} />

      <div className="p-5">
        {/* Date block + category */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-navy-deep px-3 py-2 text-center">
              <span className="block font-[family-name:var(--font-verbatim)] text-2xl font-black leading-none text-white">
                {day}
              </span>
              <span className="block font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gold">
                {month}
              </span>
            </div>
            <div>
              <span className="block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gray-400">
                {match.time?.replace("H", ":")}
              </span>
              <span className="block font-[family-name:var(--font-montserrat)] text-[11px] text-gray-400">
                {match.competition}
              </span>
            </div>
          </div>
          <span
            className={cn(
              "card-cut-corner px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
              CATEGORY_COLORS[match.category] || "bg-blue-primary text-white"
            )}
          >
            {match.category}
          </span>
        </div>

        {/* Teams - street layout */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              {match.homeLogo ? (
                <Image src={match.homeLogo} alt="" width={36} height={36} className="rounded-full object-cover" unoptimized />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                  <span className="text-[9px] font-black text-gray-400">{match.homeTeam.substring(0, 3)}</span>
                </div>
              )}
            </div>
            <span className={cn(
              "flex-1 font-[family-name:var(--font-verbatim)] text-base uppercase tracking-wide",
              isSCBT(match.homeTeam) ? "font-black text-navy-deep" : "font-bold text-gray-700"
            )}>
              {match.homeTeam}
            </span>
            {isPlayed && match.homeScore !== null && (
              <span className="font-[family-name:var(--font-verbatim)] text-2xl font-black text-navy-deep">
                {match.homeScore}
              </span>
            )}
          </div>

          {/* VS divider */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gray-200" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-black text-blue-primary/40">VS</span>
            <div className="h-[1px] flex-1 bg-gray-200" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              {match.awayLogo ? (
                <Image src={match.awayLogo} alt="" width={36} height={36} className="rounded-full object-cover" unoptimized />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                  <span className="text-[9px] font-black text-gray-400">{match.awayTeam.substring(0, 3)}</span>
                </div>
              )}
            </div>
            <span className={cn(
              "flex-1 font-[family-name:var(--font-verbatim)] text-base uppercase tracking-wide",
              isSCBT(match.awayTeam) ? "font-black text-navy-deep" : "font-bold text-gray-700"
            )}>
              {match.awayTeam}
            </span>
            {isPlayed && match.awayScore !== null && (
              <span className="font-[family-name:var(--font-verbatim)] text-2xl font-black text-navy-deep">
                {match.awayScore}
              </span>
            )}
          </div>
        </div>

        {/* Bottom link */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-blue-primary transition-colors hover:text-blue-light cursor-pointer">
            Match Center &rsaquo;
          </span>
          {isPlayed && (
            <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Terminé
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CalendarV2() {
  const [matches, setMatches] = useState<FFFMatch[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        const allMatches: FFFMatch[] = data.matches || [];
        setMatches(allMatches);
        const cats = [...new Set(allMatches.map((m: FFFMatch) => m.category))];
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load matches:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredMatches =
    activeCategory === "Toutes"
      ? matches
      : matches.filter((m) => m.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24" id="calendrier">
      {/* Deco dots background */}
      <div className="pointer-events-none absolute top-12 right-12 hidden opacity-10 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={100} height={100} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto max-w-7xl"
      >
        {/* Section header - street style */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            <Image src="/images/deco-chevrons.svg" alt="" width={36} height={36} className="hidden opacity-20 md:block" />
            <div>
              <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                Saison 2025-2026
              </span>
              <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.85] tracking-tight text-navy-deep sm:text-5xl md:text-7xl">
                CALENDRIER
              </h2>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="card-cut-corner flex items-center gap-3 bg-navy-deep px-5 py-3 transition-colors hover:bg-blue-primary"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-white">
                {activeCategory === "Toutes" ? "Toutes" : activeCategory}
              </span>
              <span className="text-xs text-white/50">
                ({activeCategory === "Toutes" ? matches.length : matches.filter((m) => m.category === activeCategory).length})
              </span>
              <ChevronDown className={`h-4 w-4 text-white/60 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-20 mt-2 w-64 bg-navy-deep py-1 shadow-2xl"
                >
                  <button
                    onClick={() => { setActiveCategory("Toutes"); setDropdownOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      activeCategory === "Toutes"
                        ? "bg-blue-primary/20 font-bold text-white"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-verbatim)] text-xs uppercase tracking-wider">Toutes les équipes</span>
                    <span className="text-xs text-gray-500">({matches.length})</span>
                  </button>
                  {categories.map((cat) => {
                    const count = matches.filter((m) => m.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setDropdownOpen(false); }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                          activeCategory === cat
                            ? "bg-blue-primary/20 font-bold text-white"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span className="font-[family-name:var(--font-verbatim)] text-xs uppercase tracking-wider">{cat}</span>
                        <span className="text-xs text-gray-500">({count})</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-5 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card-cut-lg min-w-[320px] w-[320px] h-[260px] animate-pulse bg-gray-100" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
              >
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <StreetMatchCard key={match.id} match={match} />
                  ))
                ) : (
                  <div className="flex h-52 w-full items-center justify-center">
                    <p className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-gray-300">
                      Aucun match programmé
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </section>
  );
}
