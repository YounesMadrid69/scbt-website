"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TEAMS_PREVIEW } from "@/lib/constants";

/* ─── Single team row that expands on hover ─── */
function TeamRow({
  team,
  index,
  isActive,
  onHover,
}: {
  team: (typeof TEAMS_PREVIEW)[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer border-b border-white/5"
    >
      {/* Background slide on hover */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 origin-left bg-blue-primary/15"
      />

      <div className="relative z-10 flex items-center gap-6 px-8 py-5 md:gap-10 md:px-16 md:py-6">
        {/* Index */}
        <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold tabular-nums text-white/15 transition-colors group-hover:text-gold/50">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Team name */}
        <motion.h3
          animate={{ x: isActive ? 12 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tighter text-white/60 transition-colors group-hover:text-white md:text-5xl"
        >
          {team.name}
        </motion.h3>

        {/* Season label */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="hidden font-[family-name:var(--font-montserrat)] text-xs text-white/30 md:block"
            >
              Saison 2025-2026
            </motion.span>
          )}
        </AnimatePresence>

        {/* Arrow */}
        <motion.span
          animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="font-[family-name:var(--font-verbatim)] text-2xl text-gold"
        >
          &rsaquo;
        </motion.span>

        {/* Gold accent line bottom */}
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gold"
        />
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function HoverTeams() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-deep">
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Background marquee */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.015]">
          NOS ÉQUIPES &mdash; SAISON 2025-2026 &mdash; NOS ÉQUIPES &mdash;
        </span>
      </motion.div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-24 pb-4 md:px-16">
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
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-8xl">
            NOS ÉQUIPES
          </h2>
        </motion.div>
      </div>

      {/* Team list */}
      <div
        className="relative z-10 py-8"
        onMouseLeave={() => setActiveIndex(-1)}
      >
        {TEAMS_PREVIEW.map((team, index) => (
          <TeamRow
            key={team.name}
            team={team}
            index={index}
            isActive={index === activeIndex}
            onHover={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 px-8 pb-20 md:px-16">
        <motion.a
          href="#equipes"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-3 border-b border-white/15 pb-1 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/30 transition-all hover:border-gold hover:text-gold"
        >
          Voir toutes les équipes
          <span className="text-lg">&rsaquo;</span>
        </motion.a>
      </div>
    </section>
  );
}
