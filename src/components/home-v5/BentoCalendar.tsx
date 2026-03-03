"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

/**
 * Bento grid calendar with 3D perspective tilt on hover.
 * Cards have different sizes based on importance.
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

function TiltCard({ match, featured = false }: { match: FFFMatch; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const isSCBT = (name: string) => name.includes("SCBT") || name.includes("S.C.B.T");
  const isPlayed = match.status === "played";
  const { day, month } = formatDate(match.date);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateY(0deg) rotateX(0deg)");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={cn(
        "group relative cursor-pointer overflow-hidden bg-white transition-shadow duration-300 hover:shadow-2xl",
        featured ? "col-span-2 row-span-2" : ""
      )}
    >
      {/* Top accent */}
      <div className={cn("h-1 w-full", CATEGORY_ACCENTS[match.category] || "bg-blue-primary")} />

      <div className={cn("flex flex-col justify-between p-5", featured ? "p-7 min-h-[300px]" : "min-h-[200px]")}>
        <div>
          {/* Date + time */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className={cn(
                "block font-[family-name:var(--font-verbatim)] font-black leading-none tracking-tighter text-navy-deep",
                featured ? "text-6xl" : "text-4xl"
              )}>
                {day}
              </span>
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gray-300">
                {month}
              </span>
            </div>
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold text-gray-300">
              {match.time?.replace("H", ":")}
            </span>
          </div>

          {/* Teams */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {match.homeLogo ? (
                <Image src={match.homeLogo} alt="" width={24} height={24} className="h-6 w-6 rounded-full" unoptimized />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-[7px] font-black text-gray-400">{match.homeTeam.substring(0, 3)}</span>
                </div>
              )}
              <span className={cn(
                "font-[family-name:var(--font-verbatim)] uppercase tracking-wide",
                featured ? "text-base" : "text-sm",
                isSCBT(match.homeTeam) ? "font-black text-navy-deep" : "font-bold text-gray-500"
              )}>
                {match.homeTeam}
              </span>
              {isPlayed && match.homeScore !== null && (
                <span className="ml-auto font-[family-name:var(--font-verbatim)] text-lg font-black text-navy-deep">{match.homeScore}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {match.awayLogo ? (
                <Image src={match.awayLogo} alt="" width={24} height={24} className="h-6 w-6 rounded-full" unoptimized />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-[7px] font-black text-gray-400">{match.awayTeam.substring(0, 3)}</span>
                </div>
              )}
              <span className={cn(
                "font-[family-name:var(--font-verbatim)] uppercase tracking-wide",
                featured ? "text-base" : "text-sm",
                isSCBT(match.awayTeam) ? "font-black text-navy-deep" : "font-bold text-gray-500"
              )}>
                {match.awayTeam}
              </span>
              {isPlayed && match.awayScore !== null && (
                <span className="ml-auto font-[family-name:var(--font-verbatim)] text-lg font-black text-navy-deep">{match.awayScore}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between">
          <span className={cn("px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white", CATEGORY_ACCENTS[match.category] || "bg-blue-primary")}>
            {match.category}
          </span>
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
            Détails &rsaquo;
          </span>
        </div>
      </div>

      {/* 3D shine effect on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 transition-all duration-300 group-hover:from-blue-primary/[0.02] group-hover:via-transparent group-hover:to-gold/[0.03]" />
    </div>
  );
}

export default function BentoCalendar() {
  const [matches, setMatches] = useState<FFFMatch[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/matches");
        const data = await res.json();
        const all: FFFMatch[] = data.matches || [];
        setMatches(all);
        setCategories([...new Set(all.map((m) => m.category))]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = activeCategory === "Toutes" ? matches : matches.filter((m) => m.category === activeCategory);

  return (
    <section className="relative overflow-hidden bg-bg-alt py-28 px-4" id="calendrier">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
              CALENDRIER
            </h2>
          </div>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center gap-3 border-b-2 border-navy-deep pb-2"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep">
                {activeCategory === "Toutes" ? "Toutes" : activeCategory}
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
                  className="absolute right-0 top-full z-30 mt-3 w-60 border border-gray-100 bg-white py-1 shadow-xl"
                >
                  <button
                    onClick={() => { setActiveCategory("Toutes"); setDropdownOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left ${activeCategory === "Toutes" ? "bg-navy-deep text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider">Toutes</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setDropdownOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left ${activeCategory === cat ? "bg-navy-deep text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider">{cat}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bento grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`h-[200px] animate-pulse bg-white ${i === 1 ? "col-span-2 row-span-2 h-[300px]" : ""}`} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
            >
              {filtered.slice(0, 9).map((match, i) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={i === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <TiltCard match={match} featured={i === 0} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
