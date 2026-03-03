"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TEAMS_PREVIEW } from "@/lib/constants";

/**
 * Teams as a horizontal scroll strip with huge hover reveals.
 */
export default function TeamsV4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-deep py-28">
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Background marquee text */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-white/[0.02]">
          NOS ÉQUIPES &mdash; NOS ÉQUIPES &mdash; NOS ÉQUIPES
        </span>
      </motion.div>

      {/* Header */}
      <div className="relative z-10 mb-16 px-8 md:px-16">
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

      {/* Teams row - full width */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {TEAMS_PREVIEW.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative h-[50vh] cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0 md:h-[60vh]"
          >
            {/* BG */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/20 to-navy-deep transition-all duration-700 group-hover:from-blue-primary/40" />
            <div className="noise-overlay absolute inset-0 opacity-50" />

            {/* Index number */}
            <div className="absolute top-4 left-4">
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold text-white/10">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Team name - rotated on desktop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tight text-white/80 transition-all duration-500 group-hover:text-white group-hover:scale-110 md:text-3xl md:[writing-mode:vertical-lr] md:rotate-180">
                {team.name}
              </h3>
            </div>

            {/* Gold bar on hover */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

            {/* Expand overlay on hover */}
            <div className="absolute inset-0 bg-blue-primary/0 transition-colors duration-500 group-hover:bg-blue-primary/10" />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-12 text-center">
        <a
          href="#equipes"
          className="inline-block border-b border-white/20 pb-1 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/40 transition-all hover:border-gold hover:text-gold"
        >
          Voir toutes les équipes
        </a>
      </div>
    </section>
  );
}
