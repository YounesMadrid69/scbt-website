"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import MatchCard from "@/components/ui/MatchCard";
import type { FFFMatch } from "@/lib/fff-api";

export default function CalendarFinal() {
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
        const upcoming = allMatches.filter(
          (m) => m.status === "upcoming" && m.homeTeam !== "?" && m.awayTeam !== "?"
        );
        setMatches(upcoming);
        setCategories([...new Set(upcoming.map((m: FFFMatch) => m.category))]);
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
    <section className="relative overflow-hidden bg-bg-alt px-4 py-16 sm:py-24" id="calendrier">
      {/* Deco dots */}
      <div className="pointer-events-none absolute top-12 right-12 hidden opacity-10 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={100} height={100} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-7xl"
      >
        {/* Header V2 style */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            <Image src="/images/deco-chevrons.svg" alt="" width={36} height={36} className="hidden opacity-20 md:block" />
            <div>
              <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                Saison 2025-2026
              </span>
              <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.85] tracking-tight text-navy-deep sm:text-5xl md:text-7xl">
                PROCHAINS
                <br />
                MATCHS
              </h2>
            </div>
          </div>

          {/* Dropdown V2 style */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="card-cut-corner flex items-center gap-2 bg-navy-deep px-4 py-2.5 transition-colors hover:bg-blue-primary sm:gap-3 sm:px-5 sm:py-3"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
                {activeCategory === "Toutes" ? "Toutes" : activeCategory}
              </span>
              <span className="text-[10px] text-white/50 sm:text-xs">
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

        {/* Cards V1 style (MatchCard) */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[200px] w-[260px] min-w-[260px] animate-pulse rounded-xl bg-white/50 sm:w-[300px] sm:min-w-[300px]"
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))
                ) : (
                  <div className="flex h-40 w-full items-center justify-center">
                    <p className="font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider text-gray-400">
                      Aucun match programmé
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Swipe indicator - mobile */}
          {!loading && filteredMatches.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 text-navy-deep/40"
              >
                <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em]">
                  Glisser
                </span>
                <span>&rarr;</span>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
