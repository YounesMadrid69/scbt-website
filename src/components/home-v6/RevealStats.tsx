"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 1964, label: "Annee de fondation", suffix: "" },
  { value: 450, label: "Licencies", suffix: "+" },
  { value: 15, label: "Equipes", suffix: "" },
  { value: 12000, label: "Jeunes formes", suffix: "+" },
] as const;

/* ------------------------------------------------------------------ */
/*  Spring-animated number                                            */
/* ------------------------------------------------------------------ */

function SpringNumber({
  value,
  suffix,
  delay = 0,
}: {
  value: number;
  suffix: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hasTriggered, setHasTriggered] = useState(false);

  /* Trigger once after a staggered delay */
  useEffect(() => {
    if (isInView && !hasTriggered) {
      const timer = setTimeout(() => setHasTriggered(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasTriggered, delay]);

  const spring = useSpring(0, { stiffness: 80, damping: 15 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (hasTriggered) spring.set(value);
  }, [hasTriggered, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v: number) => {
      setDisplay(
        Math.round(v).toLocaleString("fr-FR")
      );
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  RevealStats                                                       */
/* ------------------------------------------------------------------ */

export default function RevealStats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Curtain reveal: clip-path bottom inset goes from 0 % -> 100 % */
  const clipBottom = useTransform(scrollYProgress, [0.1, 0.55], [0, 100]);
  const smoothClip = useSpring(clipBottom, { stiffness: 120, damping: 30 });

  /* Progress indicator on the side */
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ============================================ */}
        {/*  REVEALED LAYER (white, underneath)          */}
        {/* ============================================ */}
        <div className="absolute inset-0 bg-white">
          {/* Lion watermark */}
          <div
            className="pointer-events-none absolute inset-0 lion-watermark-light"
            style={{ backgroundSize: "55%", opacity: 0.025 }}
          />

          {/* Deco dots */}
          <Image
            src="/images/deco-dots.svg"
            alt=""
            width={180}
            height={180}
            className="pointer-events-none absolute right-8 bottom-12 opacity-[0.04]"
            aria-hidden
          />

          {/* Stats content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="mx-auto w-full max-w-7xl">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-16 flex items-center justify-center gap-3"
              >
                <div className="h-[2px] w-8 bg-gold" />
                <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  Le SCBT en chiffres
                </span>
                <div className="h-[2px] w-8 bg-gold" />
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4">
                {STATS.map((stat, index) => (
                  <div key={stat.label} className="relative text-center">
                    {/* Gold divider line between stats */}
                    {index !== 0 && (
                      <div className="absolute top-1/2 left-0 hidden h-28 w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/30 to-transparent md:block" />
                    )}

                    {/* Number */}
                    <div className="font-[family-name:var(--font-verbatim)] text-8xl font-black tracking-tighter text-navy-deep md:text-9xl">
                      <SpringNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        delay={index * 180}
                      />
                    </div>

                    {/* Label */}
                    <div className="mt-5">
                      <div className="mx-auto mb-2 h-[2px] w-6 bg-gold" />
                      <p className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/*  DARK CURTAIN LAYER (on top, retracting)     */}
        {/* ============================================ */}
        <motion.div
          className="absolute inset-0 z-20 bg-navy-deep"
          style={{
            clipPath: useTransform(
              smoothClip,
              (v: number) => `inset(0 0 ${v}% 0)`
            ),
          }}
        >
          <div className="noise-overlay absolute inset-0" />

          {/* Giant faint text */}
          <div className="pointer-events-none flex h-full items-center justify-center overflow-hidden">
            <h2 className="select-none whitespace-nowrap font-[family-name:var(--font-verbatim)] text-[10vw] font-black uppercase leading-none tracking-tighter text-white/[0.03] md:text-[8vw]">
              LE SCBT EN CHIFFRES
            </h2>
          </div>

          {/* Deco chevrons */}
          <Image
            src="/images/deco-chevrons.svg"
            alt=""
            width={120}
            height={120}
            className="pointer-events-none absolute bottom-20 left-10 opacity-[0.06]"
            aria-hidden
          />

          {/* Scroll hint */}
          <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-[0.35em] text-white/20">
                Scroll
              </span>
              <div className="h-6 w-[1px] bg-gradient-to-b from-gold/40 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/*  Progress indicator (gold, left side)        */}
        {/* ============================================ */}
        <div className="absolute top-1/2 left-6 z-30 hidden h-32 w-[2px] -translate-y-1/2 bg-white/10 md:block">
          <motion.div
            className="w-full origin-top bg-gold"
            style={{ height: progressHeight }}
          />
        </div>

        {/* Gold flash line at the boundary of the reveal */}
        <motion.div
          className="absolute left-0 z-30 h-[2px] w-full bg-gold/40"
          style={{
            bottom: useTransform(smoothClip, (v: number) => `${v}%`),
            opacity: useTransform(smoothClip, [0, 5, 95, 100], [0, 1, 1, 0]),
          }}
        />
      </div>
    </section>
  );
}
