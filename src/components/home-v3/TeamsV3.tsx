"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TEAMS_PREVIEW } from "@/lib/constants";

export default function TeamsV3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-28 px-4">
      {/* Background watermark */}
      <motion.div
        style={{ x: bgX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-gray-50">
          ÉQUIPES
        </span>
      </motion.div>

      {/* Lion watermark */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{ backgroundSize: "40%", backgroundPosition: "90% center", opacity: 0.05 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
            NOS ÉQUIPES
          </h2>
        </motion.div>

        {/* Full-height team cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {TEAMS_PREVIEW.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -12 }}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[3/5] overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/40 via-navy-deep/80 to-navy-deep transition-all duration-700 group-hover:from-blue-primary/60" />
                <div className="noise-overlay absolute inset-0" />

                {/* Deco top */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <div className="h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-gold/50" />
                  <div className="h-4 w-4 border-r-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-gold/50" />
                </div>

                {/* Team number */}
                <div className="absolute top-6 right-4">
                  <span className="font-[family-name:var(--font-verbatim)] text-5xl font-black tracking-tighter text-white/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom gradient + name */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                  <div className="mb-2 h-[2px] w-6 bg-gold transition-all duration-300 group-hover:w-10" />
                  <h3 className="font-[family-name:var(--font-verbatim)] text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                    {team.name}
                  </h3>
                </div>

                {/* Bottom deco */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                  <div className="h-4 w-4 border-b-2 border-l-2 border-transparent transition-colors duration-300 group-hover:border-gold/50" />
                  <div className="h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-gold/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#equipes"
            className="inline-block border-b-2 border-navy-deep pb-1 font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep transition-all hover:border-blue-primary hover:text-blue-primary"
          >
            Voir toutes les équipes
          </a>
        </motion.div>
      </div>

      {/* Deco dots */}
      <div className="pointer-events-none absolute bottom-8 right-8 hidden opacity-20 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={60} height={60} />
      </div>
    </section>
  );
}
