"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/**
 * Hero with scroll-driven zoom-through effect.
 * The title starts huge and zooms past you as you scroll,
 * revealing the full background photo behind it.
 */
export default function HeroV4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Title zooms from scale 1 → 8 and fades out
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, 8]);
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.5], [1, 0]);

  // Background goes from dark to visible
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.75, 0.3]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Subtitle & CTA fade in as title leaves
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);

  // Bottom bar
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with parallax */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-navy-deep"
        />

        {/* Noise */}
        <div className="noise-overlay absolute inset-0 z-10" />

        {/* Logo top-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-8 left-8 z-30 md:left-12"
        >
          <Image src="/images/logo-scbt.png" alt="SCBT" width={60} height={60} className="h-12 w-12 md:h-[60px] md:w-[60px]" priority />
        </motion.div>

        {/* Est. 1964 top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-10 right-8 z-30 md:right-12"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.5em] text-white/30">
            Est. 1964
          </span>
        </motion.div>

        {/* ZOOM-THROUGH TITLE - centered, zooms past camera */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <h1 className="whitespace-nowrap text-center font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-[0.8] tracking-tighter text-white md:text-[14vw]">
            CRÉER LE
            <br />
            CLUB DE
            <br />
            DEMAIN
          </h1>
        </motion.div>

        {/* Content that appears as title zooms away */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-20 flex items-end px-8 pb-28 md:px-16 lg:px-24"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[2px] w-10 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.4em] text-gold">
                Sporting Club Bron Terraillon
              </span>
            </div>
            <p className="mb-8 font-[family-name:var(--font-montserrat)] text-lg leading-relaxed text-white/60 md:text-xl">
              Accompagner les jeunes d&apos;aujourd&apos;hui. Depuis 1964, au coeur du quartier Terraillon.
            </p>
            <div className="flex gap-4">
              <a href="/le-club" className="bg-white px-10 py-4 font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold">
                Découvrir
              </a>
              <a href="#calendrier" className="border border-white/20 px-10 py-4 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-white/50 transition-all hover:border-white hover:text-white">
                Calendrier
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/5">
          <motion.div style={{ width: barWidth }} className="h-full bg-gold" />
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[9px] uppercase tracking-[0.4em] text-white/20">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
