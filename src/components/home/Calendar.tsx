"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import MatchCard from "@/components/ui/MatchCard";
import type { FFFMatch } from "@/lib/fff-api";

export default function Calendar() {
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

        // Extract unique categories as returned by the FFF API
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

  // Close dropdown on click outside
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
    <section className="bg-bg-alt px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        <SectionTitle title="CALENDRIER" subtitle="Saison 2025-2026" />

        {/* Category dropdown */}
        <div className="relative mb-6 inline-block sm:mb-8" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg border border-blue-primary/15 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-blue-primary/30 sm:gap-3 sm:px-5 sm:py-3"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-navy-deep sm:text-sm">
              {activeCategory === "Toutes" ? "Toutes les équipes" : activeCategory}
            </span>
            <span className="text-[10px] text-text-secondary sm:text-xs">
              ({activeCategory === "Toutes" ? matches.length : matches.filter((m) => m.category === activeCategory).length})
            </span>
            <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-blue-primary/10 bg-white py-2 shadow-lg"
              >
                <button
                  onClick={() => { setActiveCategory("Toutes"); setDropdownOpen(false); }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                    activeCategory === "Toutes"
                      ? "bg-blue-accent/10 font-semibold text-blue-accent"
                      : "text-text-primary hover:bg-bg-alt"
                  }`}
                >
                  <span>Toutes les équipes</span>
                  <span className="text-xs text-text-secondary">({matches.length})</span>
                </button>
                {categories.map((cat) => {
                  const count = matches.filter((m) => m.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setDropdownOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-blue-accent/10 font-semibold text-blue-accent"
                          : "text-text-primary hover:bg-bg-alt"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-xs text-text-secondary">({count})</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Match cards horizontal scroll */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="min-w-[260px] w-[260px] h-[200px] animate-pulse rounded-xl bg-bg-alt"
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
        </div>
      </motion.div>
    </section>
  );
}
