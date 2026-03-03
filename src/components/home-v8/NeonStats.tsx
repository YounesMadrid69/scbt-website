"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { KEY_STATS } from "@/lib/constants";

/* ─── Animated counter with morphing digits ─── */
function MorphCounter({
  value,
  suffix,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;
    const timer = setTimeout(() => {
      function tick(now: number) {
        const elapsed = now - start - delay;
        if (elapsed < 0) {
          requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  const formatted = display.toLocaleString("fr-FR") + suffix;

  return (
    <span className="tabular-nums">
      {formatted.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: delay / 1000 + i * 0.04, duration: 0.4 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Horizontal progress bar per stat ─── */
function StatBar({
  stat,
  index,
  maxValue,
  inView,
}: {
  stat: (typeof KEY_STATS)[number];
  index: number;
  maxValue: number;
  inView: boolean;
}) {
  const percentage = stat.value / maxValue;
  const targetWidth = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        targetWidth.set(percentage * 100);
      }, index * 250);
      return () => clearTimeout(timer);
    }
  }, [inView, percentage, index, targetWidth]);

  const width = useTransform(targetWidth, (v) => `${v}%`);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group"
    >
      {/* Number + label row */}
      <div className="mb-3 flex items-end justify-between">
        <div className="font-[family-name:var(--font-verbatim)] text-6xl font-black tracking-tighter text-white md:text-8xl">
          <MorphCounter
            value={stat.value}
            suffix={stat.suffix}
            inView={inView}
            delay={index * 250}
          />
        </div>
        <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-gold">
          {stat.label}
        </span>
      </div>

      {/* Bar track */}
      <div className="relative h-[2px] w-full bg-white/10">
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 bg-gold"
        />
        {/* Glow dot at end */}
        <motion.div
          style={{ left: width }}
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,168,67,0.6)]"
        />
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function NeonStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const maxValue = Math.max(...KEY_STATS.map((s) => s.value));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep py-32 px-8 md:px-16"
    >
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Lion watermark */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark"
        style={{ backgroundSize: "60%", opacity: 0.04 }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Le SCBT en chiffres
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-7xl">
            NOS CHIFFRES
          </h2>
        </motion.div>

        {/* Stats list */}
        <div className="space-y-12">
          {KEY_STATS.map((stat, index) => (
            <StatBar
              key={stat.label}
              stat={stat}
              index={index}
              maxValue={maxValue}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-[1px] origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent"
        />
      </div>
    </section>
  );
}
