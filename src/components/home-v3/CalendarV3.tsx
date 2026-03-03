"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

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

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase().replace(".", ""),
    year: String(d.getFullYear()),
  };
}

function MatchRow({ match, index }: { match: FFFMatch; index: number }) {
  const isSCBT = (name: string) => name.includes("SCBT") || name.includes("S.C.B.T");
  const isPlayed = match.status === "played";
  const { day, month } = formatDate(match.date);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 8, backgroundColor: "rgba(0,109,166,0.03)" }}
      className="group cursor-pointer border-b border-gray-100 py-3 transition-all sm:py-4 md:py-5"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
        {/* Accent dot */}
        <div className={cn("h-2 w-2 shrink-0 rounded-full", CATEGORY_ACCENTS[match.category] || "bg-blue-primary")} />

        {/* Date */}
        <div className="w-12 shrink-0 text-center sm:w-16 md:w-20">
          <span className="block font-[family-name:var(--font-verbatim)] text-xl font-black leading-none tracking-tighter text-navy-deep sm:text-2xl md:text-3xl">
            {day}
          </span>
          <span className="block font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:text-[10px]">
            {month}
          </span>
        </div>

        {/* Time */}
        <span className="hidden w-14 shrink-0 font-[family-name:var(--font-verbatim)] text-xs font-bold text-gray-400 md:block">
          {match.time?.replace("H", ":")}
        </span>

        {/* Teams — stack on mobile, row on sm+ */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden sm:flex-row sm:items-center sm:gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            {match.homeLogo ? (
              <Image src={match.homeLogo} alt="" width={28} height={28} className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7" unoptimized />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 sm:h-7 sm:w-7">
                <span className="text-[7px] font-black text-gray-400 sm:text-[8px]">{match.homeTeam.substring(0, 3)}</span>
              </div>
            )}
            <span className={cn(
              "truncate font-[family-name:var(--font-verbatim)] text-xs uppercase tracking-wide sm:text-sm md:text-base",
              isSCBT(match.homeTeam) ? "font-black text-navy-deep" : "font-bold text-gray-600"
            )}>
              {match.homeTeam}
            </span>
          </div>

          {isPlayed ? (
            <span className="shrink-0 font-[family-name:var(--font-verbatim)] text-sm font-black tracking-tight text-navy-deep sm:text-lg md:text-xl">
              {match.homeScore} - {match.awayScore}
            </span>
          ) : (
            <span className="shrink-0 font-[family-name:var(--font-verbatim)] text-[10px] font-bold text-gray-300 sm:text-xs">VS</span>
          )}

          <div className="flex items-center gap-2">
            {match.awayLogo ? (
              <Image src={match.awayLogo} alt="" width={28} height={28} className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7" unoptimized />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 sm:h-7 sm:w-7">
                <span className="text-[7px] font-black text-gray-400 sm:text-[8px]">{match.awayTeam.substring(0, 3)}</span>
              </div>
            )}
            <span className={cn(
              "truncate font-[family-name:var(--font-verbatim)] text-xs uppercase tracking-wide sm:text-sm md:text-base",
              isSCBT(match.awayTeam) ? "font-black text-navy-deep" : "font-bold text-gray-600"
            )}>
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Category */}
        <span className="hidden shrink-0 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-400 transition-colors group-hover:text-blue-primary md:block">
          {match.category}
        </span>

        {/* Arrow */}
        <span className="shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-blue-primary">
          &rsaquo;
        </span>
      </div>
    </motion.div>
  );
}

export default function CalendarV3() {
  const [matches, setMatches] = useState<FFFMatch[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        const allMatches: FFFMatch[] = data.matches || [];
        setMatches(allMatches);
        setCategories([...new Set(allMatches.map((m: FFFMatch) => m.category))]);
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

  const filteredMatches = activeCategory === "Toutes"
    ? matches
    : matches.filter((m) => m.category === activeCategory);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-4 py-16 sm:py-28" id="calendrier">
      {/* Background watermark text */}
      <motion.div
        style={{ x: bgX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-gray-50">
          MATCHS
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Saison 2025-2026
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep sm:text-6xl md:text-8xl">
              CALENDRIER
            </h2>
          </div>

          {/* Filter dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center gap-3 border-b-2 border-navy-deep pb-2 transition-colors hover:border-blue-primary"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep">
                {activeCategory === "Toutes" ? "Toutes les équipes" : activeCategory}
              </span>
              <span className="text-xs text-gray-400">
                ({activeCategory === "Toutes" ? matches.length : matches.filter((m) => m.category === activeCategory).length})
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-30 mt-3 w-60 border border-gray-100 bg-white py-1 shadow-xl"
                >
                  <button
                    onClick={() => { setActiveCategory("Toutes"); setDropdownOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${
                      activeCategory === "Toutes" ? "bg-navy-deep text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider">Toutes</span>
                    <span className="text-[10px] opacity-50">({matches.length})</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setDropdownOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${
                        activeCategory === cat ? "bg-navy-deep text-white" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("h-1.5 w-1.5 rounded-full", CATEGORY_ACCENTS[cat] || "bg-blue-primary")} />
                        <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider">{cat}</span>
                      </div>
                      <span className="text-[10px] opacity-50">({matches.filter((m) => m.category === cat).length})</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Match list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-gray-50" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.slice(0, 12).map((match, i) => (
                  <MatchRow key={match.id} match={match} index={i} />
                ))
              ) : (
                <div className="flex h-40 items-center justify-center">
                  <p className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-gray-300">
                    Aucun match programmé
                  </p>
                </div>
              )}

              {filteredMatches.length > 12 && (
                <div className="mt-8 text-center">
                  <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gray-400">
                    +{filteredMatches.length - 12} matchs
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
