"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SplitHero({ preloaderDone = false }: { preloaderDone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0%", "0%"]);
  const gapWidth = useTransform(scrollYProgress, [0, 0.5], [4, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const textY = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "-20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.6]);

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Left: Image */}
        <motion.div
          style={{ x: leftX }}
          className="absolute inset-y-0 left-0 right-1/2 overflow-hidden"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0 bg-cover bg-center"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/hero-bg.png)" }}
            />
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-navy-deep"
            />
          </motion.div>

          {/* Year watermark */}
          <div className="absolute bottom-8 left-8">
            <span className="font-[family-name:var(--font-verbatim)] text-[15vw] font-black leading-none text-white/5">
              1964
            </span>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          style={{ x: rightX }}
          className="absolute inset-y-0 left-1/2 right-0 flex items-center bg-navy-deep"
        >
          <div className="noise-overlay absolute inset-0" />

          <motion.div
            style={{ y: textY }}
            className="relative z-10 px-8 md:px-16"
          >
            {/* Gold accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={preloaderDone ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="mb-6 h-[3px] bg-gold"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold/60">
                Depuis 1964 &mdash; Bron Terraillon
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-7xl lg:text-8xl"
            >
              CR&Eacute;ER
              <br />
              LE CLUB
              <br />
              <span className="text-transparent [-webkit-text-stroke:2px_white]">
                DE DEMAIN
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 max-w-sm font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-white/40"
            >
              Accompagner les jeunes d&apos;aujourd&apos;hui, construire l&apos;avenir du football &agrave; Bron.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-8"
            >
              <a
                href="#decouvrir"
                className="inline-flex items-center gap-3 border-b border-gold/30 pb-2 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gold transition-all hover:border-gold hover:text-gold"
              >
                D&eacute;couvrir le club
                <span className="text-lg">&rsaquo;</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Center gold gap */}
        <motion.div
          style={{ width: gapWidth }}
          className="absolute inset-y-0 left-1/2 z-10 -translate-x-1/2 bg-gold"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
