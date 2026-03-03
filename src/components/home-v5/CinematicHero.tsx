"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Cinematic hero:
 * 1. Black screen with "SCBT" typed out letter-by-letter with blinking cursor
 * 2. Horizontal split/wipe reveals the background photo
 * 3. Full hero content fades in
 */

function TypeWriter({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowCursor(false);
          onComplete();
        }, 400);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] translate-y-[2px] bg-gold ml-1"
          style={{ height: "1em" }}
        />
      )}
    </span>
  );
}

export default function CinematicHero() {
  const [phase, setPhase] = useState<"typing" | "split" | "reveal">("typing");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], ["0%", "30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.9]);

  const handleTypeComplete = () => {
    setTimeout(() => setPhase("split"), 200);
    setTimeout(() => setPhase("reveal"), 1200);
  };

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Cinematic intro overlay */}
        <AnimatePresence>
          {phase === "typing" && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-navy-deep"
            >
              <h1 className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black tracking-tighter text-white">
                <TypeWriter text="SCBT" onComplete={handleTypeComplete} />
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split wipe curtains */}
        <AnimatePresence>
          {phase === "split" && (
            <>
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-y-0 left-0 z-40 w-1/2 bg-navy-deep"
              />
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-y-0 right-0 z-40 w-1/2 bg-navy-deep"
              />
              {/* Center line flash */}
              <motion.div
                initial={{ scaleY: 1, opacity: 1 }}
                animate={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute inset-y-0 left-1/2 z-50 w-[2px] -translate-x-1/2 bg-gold"
              />
            </>
          )}
        </AnimatePresence>

        {/* Background photo */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
        </motion.div>

        {/* Dark overlay */}
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-navy-deep" />
        <div className="noise-overlay absolute inset-0 z-10" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "reveal" ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="absolute top-8 left-8 z-30 md:left-12"
        >
          <Image src="/images/logo-scbt.png" alt="SCBT" width={60} height={60} className="h-12 w-12 md:h-[60px] md:w-[60px]" priority />
        </motion.div>

        {/* Year */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "reveal" ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-10 right-8 z-30 md:right-12"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.5em] text-white/30">
            Est. 1964
          </span>
        </motion.div>

        {/* Main content */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-20 flex h-full items-end px-8 pb-28 md:px-16 lg:px-24"
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={phase === "reveal" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="h-[2px] w-10 bg-gold" />
                <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.4em] text-gold">
                  Sporting Club Bron Terraillon
                </span>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: titleOpacity, scale: titleScale }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={phase === "reveal" ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-verbatim)] text-[13vw] font-black uppercase leading-[0.82] tracking-tighter text-white md:text-[10vw] lg:text-[8vw]"
              >
                CRÉER LE
                <br />
                CLUB DE
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.5)" }}>
                  DEMAIN
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={phase === "reveal" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 max-w-lg font-[family-name:var(--font-montserrat)] text-base text-white/45 md:text-lg"
            >
              Accompagner les jeunes d&apos;aujourd&apos;hui. Depuis 1964, au coeur de Terraillon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase === "reveal" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-10 flex gap-4"
            >
              <a href="/le-club" className="bg-white px-10 py-4 font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep transition-all hover:bg-gold hover:scale-105">
                Découvrir
              </a>
              <a href="#calendrier" className="border border-white/15 px-10 py-4 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-white/40 transition-all hover:border-white/40 hover:text-white">
                Calendrier
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "reveal" ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
