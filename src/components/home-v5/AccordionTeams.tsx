"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TEAMS_PREVIEW } from "@/lib/constants";

/**
 * Accordion teams - one panel is expanded, others are collapsed thin strips.
 * Hovering expands that panel and collapses the current one.
 * Creates a dynamic, interactive explore feel.
 */
export default function AccordionTeams() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-deep">
      <div className="noise-overlay absolute inset-0" />

      {/* Background marquee */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.015]">
          NOS ÉQUIPES &mdash; SAISON 2025-2026 &mdash;
        </span>
      </motion.div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-24 pb-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-white md:text-8xl">
            NOS ÉQUIPES
          </h2>
        </motion.div>
      </div>

      {/* Accordion panels */}
      <div className="relative z-10 flex h-[70vh] min-h-[500px]">
        {TEAMS_PREVIEW.map((team, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={team.name}
              onMouseEnter={() => setActiveIndex(index)}
              animate={{ flex: isActive ? 4 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/30 to-navy-deep transition-all duration-700">
                <div className="noise-overlay absolute inset-0 opacity-50" />
              </div>

              {/* Hover brightening */}
              <motion.div
                animate={{ opacity: isActive ? 0.15 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-blue-primary"
              />

              {/* Index number */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold text-white/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Team name - vertical when collapsed, horizontal when active */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.h3
                  animate={{
                    rotate: isActive ? 0 : -90,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="whitespace-nowrap font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white md:text-5xl"
                >
                  {team.name}
                </motion.h3>
              </div>

              {/* Active content - only visible when expanded */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
                className="absolute inset-x-0 bottom-0 p-6 md:p-10"
              >
                <div className="mb-3 h-[2px] w-8 bg-gold" />
                <p className="font-[family-name:var(--font-montserrat)] text-sm text-white/40">
                  Équipe {team.name} &mdash; Saison 2025-2026
                </p>
                <span className="mt-3 inline-block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gold/60 transition-colors hover:text-gold">
                  Voir l&apos;effectif &rsaquo;
                </span>
              </motion.div>

              {/* Gold bottom bar */}
              <motion.div
                animate={{ width: isActive ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-[3px] bg-gold"
              />
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="relative z-10 py-10 text-center">
        <a
          href="#equipes"
          className="inline-block border-b border-white/15 pb-1 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/30 transition-all hover:border-gold hover:text-gold"
        >
          Voir toutes les équipes
        </a>
      </div>
    </section>
  );
}
