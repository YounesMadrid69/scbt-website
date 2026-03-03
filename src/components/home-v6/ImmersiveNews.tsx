"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NEWS = [
  {
    id: 1,
    title: "Victoire éclatante des Seniors face à l'AS Rillieux",
    category: "Match",
    date: "2026-02-20",
  },
  {
    id: 2,
    title: "Label Jeunes FFF : le SCBT récompensé",
    category: "Club",
    date: "2026-02-15",
  },
  {
    id: 3,
    title: "Les U17 qualifiés pour la phase régionale",
    category: "Formation",
    date: "2026-02-12",
  },
  {
    id: 4,
    title: "Nouveau partenariat avec Kappa",
    category: "Partenaire",
    date: "2026-02-08",
  },
  {
    id: 5,
    title: "Stage de détection : inscriptions ouvertes",
    category: "Formation",
    date: "2026-02-01",
  },
];

const CAT_COLORS: Record<string, string> = {
  Match: "bg-blue-accent",
  Club: "bg-gold",
  Formation: "bg-emerald-500",
  Partenaire: "bg-purple-500",
};

/** Per-slide gradient variations for visual interest */
const SLIDE_GRADIENTS = [
  "from-navy-deep via-[#0d1a33] to-navy-deep",
  "from-[#0e1b35] via-navy-deep to-[#111d30]",
  "from-navy-deep via-[#0a1628] to-[#0f1c32]",
  "from-[#101e34] via-[#0b1527] to-navy-deep",
  "from-navy-deep via-[#0d192e] to-[#0e1a30]",
];

const COUNT = NEWS.length;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Clamp a 0-1 progress value into a per-slide local progress (0-1). */
function slideProgress(global: number, index: number, total: number) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;
  return Math.max(0, Math.min(1, (global - start) / (end - start)));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ImmersiveNews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothed master progress 0 -> 1
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.0001,
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${COUNT * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Slides */}
        {NEWS.map((article, i) => (
          <Slide
            key={article.id}
            article={article}
            index={i}
            total={COUNT}
            progress={smoothProgress}
            gradient={SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length]}
          />
        ))}

        {/* Right-side progress indicator */}
        <ProgressIndicator progress={smoothProgress} total={COUNT} />

        {/* Article counter - top left */}
        <ArticleCounter progress={smoothProgress} total={COUNT} />

        {/* Deco element */}
        <div className="pointer-events-none absolute bottom-8 left-8 hidden opacity-10 md:block">
          <Image
            src="/images/deco-chevrons.svg"
            alt=""
            width={60}
            height={50}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide                                                              */
/* ------------------------------------------------------------------ */

interface SlideProps {
  article: (typeof NEWS)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  gradient: string;
}

function Slide({ article, index, total, progress, gradient }: SlideProps) {
  // Derive per-slide opacity & y transform from master progress
  const opacity = useTransform(progress, (p: number) => {
    const local = slideProgress(p, index, total);
    // Fade in during first 20% of segment, stay visible, fade out during last 20%
    if (local < 0.15) return local / 0.15;
    if (local > 0.85) return (1 - local) / 0.15;
    return 1;
  });

  const y = useTransform(progress, (p: number) => {
    const local = slideProgress(p, index, total);
    // Slide up from 60px, hold, then slide up to -60px
    if (local < 0.15) return (1 - local / 0.15) * 60;
    if (local > 0.85) return -((local - 0.85) / 0.15) * 60;
    return 0;
  });

  const titleY = useTransform(progress, (p: number) => {
    const local = slideProgress(p, index, total);
    if (local < 0.2) return (1 - local / 0.2) * 30;
    if (local > 0.8) return -((local - 0.8) / 0.2) * 30;
    return 0;
  });

  const scale = useTransform(progress, (p: number) => {
    const local = slideProgress(p, index, total);
    if (local < 0.15) return 0.97 + (local / 0.15) * 0.03;
    if (local > 0.85) return 1 - ((local - 0.85) / 0.15) * 0.03;
    return 1;
  });

  const numberStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, y, scale }}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          gradient
        )}
      />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,109,166,0.08),transparent_70%)]" />

      {/* Giant watermark number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-8 md:pr-20">
        <span className="font-[family-name:var(--font-verbatim)] text-[30vw] font-black leading-none tracking-tighter text-white/[0.025] select-none md:text-[25vw]">
          {numberStr}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-16">
        <motion.div style={{ y: titleY }} className="max-w-3xl">
          {/* Category badge */}
          <span
            className={cn(
              "mb-6 inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white",
              CAT_COLORS[article.category] || "bg-blue-accent"
            )}
          >
            {article.category}
          </span>

          {/* Title */}
          <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.88] tracking-tight text-white md:text-7xl">
            {article.title}
          </h2>

          {/* Date with gold line prefix */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-gold" />
            <time className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              {formatDate(article.date)}
            </time>
          </div>

          {/* Read article link */}
          <div className="mt-10">
            <a
              href="#"
              className="group/link inline-flex items-center gap-3 font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wide text-white/30 transition-colors duration-300 hover:text-gold"
            >
              <span>Lire l&apos;article</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative stripe at the very bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Indicator (vertical dots on right)                        */
/* ------------------------------------------------------------------ */

interface ProgressIndicatorProps {
  progress: ReturnType<typeof useSpring>;
  total: number;
}

function ProgressIndicator({ progress, total }: ProgressIndicatorProps) {
  return (
    <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

interface ProgressDotProps {
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}

function ProgressDot({ index, total, progress }: ProgressDotProps) {
  const isActive = useTransform(progress, (p: number) => {
    const segmentSize = 1 / total;
    const center = (index + 0.5) * segmentSize;
    return Math.abs(p - center) < segmentSize * 0.5;
  });

  const dotScale = useTransform(isActive, (active: boolean) =>
    active ? 1 : 0.6
  );

  const dotOpacity = useTransform(isActive, (active: boolean) =>
    active ? 1 : 0.3
  );

  return (
    <motion.div className="relative flex items-center justify-center">
      {/* Active ring */}
      <motion.div
        className="absolute h-5 w-5 rounded-full border border-gold/50"
        style={{
          scale: useTransform(isActive, (a: boolean) => (a ? 1 : 0)),
          opacity: useTransform(isActive, (a: boolean) => (a ? 1 : 0)),
        }}
      />
      {/* Dot */}
      <motion.div
        className="h-2 w-2 rounded-full bg-white"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Article Counter                                                    */
/* ------------------------------------------------------------------ */

interface ArticleCounterProps {
  progress: ReturnType<typeof useSpring>;
  total: number;
}

function ArticleCounter({ progress, total }: ArticleCounterProps) {
  const currentIndex = useTransform(progress, (p: number) => {
    const idx = Math.floor(p * total);
    return Math.min(idx, total - 1);
  });

  const currentLabel = useTransform(currentIndex, (idx: number) =>
    String(idx + 1).padStart(2, "0")
  );

  const totalLabel = String(total).padStart(2, "0");

  return (
    <div className="absolute left-8 top-8 z-20 flex items-baseline gap-1 md:left-16 md:top-12">
      <motion.span className="font-[family-name:var(--font-verbatim)] text-2xl font-black tracking-tight text-white">
        {currentLabel}
      </motion.span>
      <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold tracking-tight text-white/20">
        {" "}
        / {totalLabel}
      </span>
    </div>
  );
}
