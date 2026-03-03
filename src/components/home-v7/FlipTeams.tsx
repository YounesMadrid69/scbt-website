"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { TEAMS_PREVIEW } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  FlipCard                                                          */
/* ------------------------------------------------------------------ */

function FlipCard({
  team,
  index,
}: {
  team: (typeof TEAMS_PREVIEW)[number];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  /* Spring for buttery flip rotation */
  const rotateY = useSpring(0, { stiffness: 200, damping: 26 });

  const handlePointerEnter = () => {
    setIsFlipped(true);
    rotateY.set(180);
  };

  const handlePointerLeave = () => {
    setIsFlipped(false);
    rotateY.set(0);
  };

  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="aspect-[3/4]"
      style={{ perspective: 1000 }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative h-full w-full cursor-pointer"
        style={{
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ========== FRONT FACE ========== */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Dark navy background */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep to-navy-deep" />
          <div className="noise-overlay absolute inset-0" />

          {/* Large index number watermark */}
          <span className="pointer-events-none absolute top-4 right-5 select-none font-[family-name:var(--font-verbatim)] text-[120px] font-black leading-none tracking-tighter text-white/[0.04]">
            {number}
          </span>

          {/* Content: vertical team name */}
          <div className="relative z-10 flex h-full flex-col items-start justify-between p-6">
            {/* Top: small index */}
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold tracking-[0.2em] text-gold/60">
              {number}
            </span>

            {/* Bottom: vertical team name + gold accent line */}
            <div className="flex items-end gap-4">
              <div className="h-12 w-[2px] bg-gold" />
              <h3
                className="origin-bottom-left font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-white md:text-4xl"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                }}
              >
                {team.name}
              </h3>
            </div>
          </div>

          {/* Gold bottom edge */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gold/60" />

          {/* Inset shadow for depth */}
          <div className="pointer-events-none absolute inset-0 rounded-sm shadow-[inset_0_-60px_60px_-30px_rgba(0,0,0,0.3)]" />
        </div>

        {/* ========== BACK FACE ========== */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Light bg with blue-primary tint */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-blue-primary/[0.06]" />

          {/* Faint number watermark */}
          <span className="pointer-events-none absolute top-4 right-5 select-none font-[family-name:var(--font-verbatim)] text-[120px] font-black leading-none tracking-tighter text-navy-deep/[0.04]">
            {number}
          </span>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div>
              {/* Gold accent */}
              <div className="mb-4 h-[2px] w-10 bg-gold" />
              <h3 className="mb-3 font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tight text-navy-deep md:text-3xl">
                {team.name}
              </h3>
              <p className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Saison 2025-2026
              </p>
            </div>

            <div>
              {/* Gold divider */}
              <div className="mb-5 h-[1px] w-full bg-gold/20" />

              {/* CTA */}
              <a
                href="#equipes"
                className="group flex items-center gap-2 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-blue-primary transition-colors hover:text-navy-deep"
              >
                Voir l&apos;effectif
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* Blue bottom edge */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-blue-primary" />

          {/* Subtle border */}
          <div className="pointer-events-none absolute inset-0 rounded-sm border border-gray-100" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FlipTeams                                                         */
/* ------------------------------------------------------------------ */

export default function FlipTeams() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-28 md:py-36">
      {/* Noise overlay on section */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0 lion-watermark"
        style={{ backgroundSize: "45%", opacity: 0.02 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
            <div className="h-[2px] w-8 bg-gold" />
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-8xl">
            NOS
            <br />
            EQUIPES
          </h2>
        </motion.div>

        {/* Cards in a horizontal flex row */}
        <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap md:gap-5">
          {TEAMS_PREVIEW.map((team, index) => (
            <div key={team.name} className="w-[calc(50%-8px)] md:w-full">
              <FlipCard team={team} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="#equipes"
            className="group inline-flex items-center gap-2 border-b border-white/15 pb-1 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/40 transition-all hover:border-gold hover:text-gold"
          >
            Voir toutes les equipes
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rsaquo;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
