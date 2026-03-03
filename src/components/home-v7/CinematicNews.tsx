"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { NEWS_ARTICLES, CATEGORY_COLORS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const NEWS = NEWS_ARTICLES;
const COUNT = NEWS.length;

/** Width of each film frame in px */
const FRAME_W = 400;
/** Gap between frames (thin film separator) */
const FRAME_GAP = 2;
/** Horizontal padding at strip edges */
const STRIP_PADDING = 200;
/** Total strip width */
const TOTAL_STRIP_W = COUNT * (FRAME_W + FRAME_GAP) + STRIP_PADDING * 2;

/** Per-frame gradient variations for visual depth */
const FRAME_GRADIENTS = [
  "from-blue-primary/20 to-navy-deep",
  "from-navy-deep via-blue-primary/10 to-[#0d1a33]",
  "from-[#0e1b35] via-navy-deep to-blue-primary/15",
  "from-blue-primary/15 via-[#0b1527] to-navy-deep",
  "from-navy-deep via-[#0d192e] to-blue-primary/20",
];

/* ------------------------------------------------------------------ */
/*  Sprocket Hole Row                                                  */
/* ------------------------------------------------------------------ */

function SprocketRow({ position }: { position: "top" | "bottom" }) {
  const holeCount = Math.ceil(TOTAL_STRIP_W / 28);

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 z-20 flex items-center gap-4 px-4",
        position === "top" ? "top-0 h-10" : "bottom-0 h-10"
      )}
      style={{ width: TOTAL_STRIP_W }}
    >
      {Array.from({ length: holeCount }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-5 shrink-0 rounded-sm bg-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Film Frame (single news card)                                      */
/* ------------------------------------------------------------------ */

interface FilmFrameProps {
  article: (typeof NEWS)[number];
  index: number;
  gradient: string;
}

function FilmFrame({ article, index, gradient }: FilmFrameProps) {
  const frameNum = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group relative shrink-0 overflow-hidden"
      style={{ width: FRAME_W, height: "100%" }}
    >
      {/* Gradient placeholder background (image area) */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-125",
          gradient
        )}
      />

      {/* Subtle noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Faint radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(0,109,166,0.08),transparent_70%)]" />

      {/* Frame number watermark */}
      <div className="pointer-events-none absolute right-4 top-4 select-none">
        <span className="font-[family-name:var(--font-verbatim)] text-[90px] font-black leading-none tracking-tighter text-white/[0.03]">
          {frameNum}
        </span>
      </div>

      {/* Registration marks (corner crosses) */}
      <div className="pointer-events-none absolute inset-5">
        <div className="absolute left-0 top-0">
          <div className="h-[1px] w-4 bg-white/[0.08]" />
          <div className="h-4 w-[1px] bg-white/[0.08]" />
        </div>
        <div className="absolute bottom-0 right-0">
          <div className="absolute bottom-0 right-0 h-[1px] w-4 bg-white/[0.08]" />
          <div className="absolute bottom-0 right-0 h-4 w-[1px] bg-white/[0.08]" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-7">
        {/* Top: Category badge */}
        <div>
          <span
            className={cn(
              "inline-block rounded-none px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]",
              "bg-gold text-navy-deep"
            )}
          >
            {article.category}
          </span>
        </div>

        {/* Bottom: Title + Date */}
        <div>
          {/* Gold accent line */}
          <div className="mb-4 h-[2px] w-10 bg-gold/60 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />

          <h3 className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-3xl">
            {article.title}
          </h3>

          <p className="mt-3 font-[family-name:var(--font-montserrat)] text-xs text-white/40">
            {formatDate(article.date)}
          </p>

          {/* Read link - appears on hover */}
          <div className="mt-5 translate-y-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <a
              href="#"
              className="group/link inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-xs font-medium tracking-wide text-gold/70 transition-colors duration-300 hover:text-gold"
            >
              <span>Lire l&apos;article</span>
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
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
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Hover gold glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_60px_rgba(212,168,67,0.08)] transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Film Strip (perspective container + track)                         */
/* ------------------------------------------------------------------ */

interface FilmStripProps {
  scrollX: MotionValue<number>;
}

function FilmStrip({ scrollX }: FilmStripProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: 1.5,
          transformStyle: "preserve-3d",
        }}
      >
        {/* The film strip container */}
        <div
          className="relative overflow-hidden border-y border-white/[0.06]"
          style={{ height: "70vh" }}
        >
          {/* Sprocket hole rows */}
          <SprocketRow position="top" />
          <SprocketRow position="bottom" />

          {/* Horizontal scrolling track */}
          <motion.div
            className="absolute inset-0 flex items-stretch"
            style={{
              x: scrollX,
              width: TOTAL_STRIP_W,
              paddingLeft: STRIP_PADDING,
              paddingRight: STRIP_PADDING,
              paddingTop: 40,
              paddingBottom: 40,
            }}
          >
            {NEWS.map((article, i) => (
              <div key={article.id} className="flex shrink-0 items-stretch">
                <FilmFrame
                  article={article}
                  index={i}
                  gradient={FRAME_GRADIENTS[i % FRAME_GRADIENTS.length]}
                />
                {/* Frame separator line */}
                {i < COUNT - 1 && (
                  <div
                    className="shrink-0 self-stretch bg-white/[0.06]"
                    style={{ width: FRAME_GAP }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Left/right edge vignettes for cinematic feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-40 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-40 bg-gradient-to-l from-navy-deep via-navy-deep/80 to-transparent" />

          {/* Film grain overlay on the strip */}
          <div className="noise-overlay pointer-events-none absolute inset-0 z-20" />
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress indicator + frame counter                                 */
/* ------------------------------------------------------------------ */

interface ProgressBarProps {
  progress: MotionValue<number>;
}

function ProgressBar({ progress }: ProgressBarProps) {
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.0001,
  });

  return (
    <div className="absolute bottom-12 left-1/2 z-40 -translate-x-1/2">
      <div className="flex flex-col items-center gap-3">
        <FrameCounter progress={progress} />
        <div className="h-[2px] w-40 overflow-hidden bg-white/[0.06]">
          <motion.div
            className="h-full origin-left bg-gold"
            style={{ scaleX }}
          />
        </div>
      </div>
    </div>
  );
}

interface FrameCounterProps {
  progress: MotionValue<number>;
}

function FrameCounter({ progress }: FrameCounterProps) {
  const currentLabel = useTransform(progress, (p: number) => {
    const idx = Math.min(Math.floor(p * COUNT), COUNT - 1);
    return String(Math.max(idx + 1, 1)).padStart(2, "0");
  });
  const totalLabel = String(COUNT).padStart(2, "0");

  return (
    <div className="flex items-baseline gap-1.5">
      <motion.span className="font-[family-name:var(--font-verbatim)] text-sm font-black tracking-tight text-white/60">
        {currentLabel}
      </motion.span>
      <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold tracking-tight text-white/20">
        / {totalLabel}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CinematicNews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Smooth out the scroll input with spring physics */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.0001,
  });

  /*
   * Convert vertical scroll progress -> horizontal strip translation.
   * progress 0 = strip at x=0, first frame visible.
   * progress 1 = strip fully scrolled left, last frame visible.
   */
  const maxTravel = -(
    TOTAL_STRIP_W -
    (typeof window !== "undefined" ? window.innerWidth : 1440)
  );
  const scrollX = useTransform(smoothProgress, [0, 1], [0, maxTravel]);

  return (
    <section
      ref={containerRef}
      className="relative bg-navy-deep"
      style={{ height: "250vh" }}
    >
      {/* Sticky viewport that stays fixed while the user scrolls through 250vh */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Background noise texture */}
        <div className="noise-overlay absolute inset-0" />

        {/* Giant faded background text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">
          <span className="font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.012]">
            ACTUALITES
          </span>
        </div>

        {/* Section header */}
        <div className="relative z-10 mb-10 w-full max-w-7xl px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Les dernieres nouvelles
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-white md:text-8xl">
              ACTUALITES
            </h2>
          </motion.div>
        </div>

        {/* Film strip track */}
        <div className="relative z-10 w-full">
          <FilmStrip scrollX={scrollX} />
        </div>

        {/* Progress bar at bottom */}
        <ProgressBar progress={smoothProgress} />

        {/* Corner accents (gold lines) */}
        <div className="pointer-events-none absolute left-8 top-8 hidden md:block">
          <div className="flex flex-col">
            <div className="h-[1px] w-6 bg-gold/20" />
            <div className="h-6 w-[1px] bg-gold/20" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-8 right-8 hidden md:block">
          <div className="flex flex-col items-end">
            <div className="h-[1px] w-6 bg-gold/20" />
            <div className="h-6 w-[1px] bg-gold/20 self-end" />
          </div>
        </div>
      </div>
    </section>
  );
}
