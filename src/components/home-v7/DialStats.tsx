"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { KEY_STATS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const RADIUS = 54;
const STROKE_WIDTH = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 339.29
const MAX_VALUE = Math.max(...KEY_STATS.map((s) => s.value));

/* ------------------------------------------------------------------ */
/*  StatDial                                                          */
/* ------------------------------------------------------------------ */

function StatDial({
  stat,
  index,
}: {
  stat: (typeof KEY_STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hasTriggered, setHasTriggered] = useState(false);

  /* Stagger trigger ------------------------------------------------ */
  useEffect(() => {
    if (isInView && !hasTriggered) {
      const timer = setTimeout(() => setHasTriggered(true), index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasTriggered, index]);

  /* ---- Number counter ---- */
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (!hasTriggered) return;

    const duration = 1800;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(eased * stat.value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasTriggered, stat.value]);

  /* ---- Ring progress spring ---- */
  const percentage = stat.value / MAX_VALUE;
  const targetOffset = (1 - percentage) * CIRCUMFERENCE;

  const ringSpring = useSpring(CIRCUMFERENCE, { stiffness: 50, damping: 18 });
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (hasTriggered) ringSpring.set(targetOffset);
  }, [hasTriggered, ringSpring, targetOffset]);

  useEffect(() => {
    const unsubscribe = ringSpring.on("change", (v: number) => {
      setDashOffset(v);
    });
    return unsubscribe;
  }, [ringSpring]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={hasTriggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      {/* SVG Gauge */}
      <div className="relative">
        <svg viewBox="0 0 120 120" width={120} height={120} className="-rotate-90">
          {/* Track circle */}
          <circle
            cx={60}
            cy={60}
            r={RADIUS}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Fill circle */}
          <circle
            cx={60}
            cy={60}
            r={RADIUS}
            fill="none"
            stroke="#D4A843"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "none" }}
          />
        </svg>

        {/* Number in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[family-name:var(--font-verbatim)] text-2xl font-black tracking-tight text-navy-deep tabular-nums md:text-3xl">
            {displayNumber.toLocaleString("fr-FR")}
            {stat.suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-5 text-center">
        <div className="mx-auto mb-2 h-[2px] w-5 bg-gold" />
        <p className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DialStats                                                         */
/* ------------------------------------------------------------------ */

export default function DialStats() {
  return (
    <section className="relative overflow-hidden bg-white py-28 md:py-36">
      {/* Lion watermark */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{ backgroundSize: "55%", opacity: 0.02 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              SCBT en chiffres
            </span>
            <div className="h-[2px] w-8 bg-gold" />
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-7xl font-black uppercase leading-[0.85] tracking-tighter text-navy-deep md:text-8xl">
            NOS
            <br />
            CHIFFRES
          </h2>
        </motion.div>

        {/* Dials grid with gold dividers */}
        <div className="grid grid-cols-2 gap-y-14 gap-x-6 md:grid-cols-4 md:gap-x-0">
          {KEY_STATS.map((stat, index) => (
            <div key={stat.label} className="relative flex justify-center">
              {/* Gold accent divider between gauges (not on first) */}
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-16 w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block" />
              )}
              <StatDial stat={stat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
