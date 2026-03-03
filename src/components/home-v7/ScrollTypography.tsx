"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const WORDS = [
  "VIVRE",
  "ENSEMBLE",
  "DEPUIS",
  "1964",
  "CRÉER",
  "LE",
  "CLUB",
  "DE",
  "DEMAIN",
] as const;

/** Entry direction per word -- cycles through left, right, bottom, top */
const DIRECTIONS: Array<{ x: string; y: string }> = [
  { x: "-100vw", y: "0px" },   // VIVRE    — from left
  { x: "100vw", y: "0px" },    // ENSEMBLE — from right
  { x: "0px", y: "100vh" },    // DEPUIS   — from bottom
  { x: "0px", y: "-100vh" },   // 1964     — from top
  { x: "-100vw", y: "0px" },   // CRÉER    — from left
  { x: "100vw", y: "0px" },    // LE       — from right
  { x: "0px", y: "100vh" },    // CLUB     — from bottom
  { x: "-100vw", y: "0px" },   // DE       — from left
  { x: "100vw", y: "0px" },    // DEMAIN   — from right
];

/** Gold accent words that get highlighted when settled */
const ACCENT_INDICES = new Set([3, 6, 8]); // "1964", "CLUB", "DEMAIN"

/* ------------------------------------------------------------------ */
/*  Individual word — each is its own component for correct hook calls */
/* ------------------------------------------------------------------ */

function ScrollWord({
  word,
  index,
  total,
  scrollYProgress,
  direction,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  direction: { x: string; y: string };
}) {
  const isAccent = ACCENT_INDICES.has(index);
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const focusIn = start + segmentSize * 0.2;
  const mid = start + segmentSize * 0.5;
  const focusOut = start + segmentSize * 0.75;
  const end = start + segmentSize;

  // Position: fly in from direction -> center -> stay
  const x = useTransform(
    scrollYProgress,
    [start, mid, end],
    [direction.x, "0px", "0px"]
  );
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [direction.y, "0px", "0px"]
  );

  // Scale: 0 -> massive (15vw feel) -> settle to final size
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, focusOut, end],
    [0, 2.8, 2.8, 1, 1]
  );

  // Opacity: invisible -> full -> slightly dimmed when settled
  const opacity = useTransform(
    scrollYProgress,
    [start, focusIn, mid, focusOut],
    [0, 1, 1, 1]
  );

  // Blur for dramatic entry
  const blur = useTransform(
    scrollYProgress,
    [start, focusIn, mid],
    [12, 0, 0]
  );
  const filterStr = useTransform(blur, (v: number) => `blur(${v}px)`);

  // Rotation wobble on entry
  const rotate = useTransform(
    scrollYProgress,
    [start, focusIn, mid],
    [index % 2 === 0 ? -8 : 8, 0, 0]
  );

  // Text color: white when bg is dark (middle), navy when bg is light (edges)
  // Accent words shift to gold at end
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.75, 1],
    isAccent
      ? [
          "rgb(11, 20, 38)",
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
          "rgb(212, 168, 67)",
        ]
      : [
          "rgb(11, 20, 38)",
          "rgb(255, 255, 255)",
          "rgb(255, 255, 255)",
          "rgb(11, 20, 38)",
        ]
  );

  return (
    <motion.span
      style={{
        x,
        y,
        scale,
        opacity,
        color: textColor,
        filter: filterStr,
        rotate,
      }}
      className="inline-block font-[family-name:var(--font-verbatim)] text-[8vw] font-black uppercase leading-none tracking-tighter md:text-[6vw]"
    >
      {word}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress indicator (gold bar at bottom)                            */
/* ------------------------------------------------------------------ */

function ProgressBar({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });

  return (
    <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full overflow-hidden bg-white/10">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gold"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Side label                                                         */
/* ------------------------------------------------------------------ */

function SideLabel({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const labelColor = useTransform(progress, (p: number) =>
    p > 0.75
      ? `rgba(11,20,38,${0.25 * Math.min(1, (p - 0.75) / 0.2)})`
      : "rgba(255,255,255,0.15)"
  );

  return (
    <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 md:block">
      <motion.span
        style={{ color: labelColor }}
        className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.5em]"
      >
        Notre identit&eacute;
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Year counter — reveals "1964" with a counting animation            */
/* ------------------------------------------------------------------ */

function YearCounter({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0.35, 0.45, 0.7, 0.85], [0, 0.06, 0.06, 0]);
  const scale = useTransform(progress, [0.35, 0.45], [0.8, 1]);
  const y = useTransform(progress, [0.35, 0.45], [40, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      aria-hidden
    >
      <span className="font-[family-name:var(--font-verbatim)] text-[30vw] font-black leading-none text-white md:text-[25vw]">
        64
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ScrollTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth spring for overall progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Background color morph: white -> navy-deep -> white
  const bgR = useTransform(smoothProgress, [0, 0.12, 0.75, 1], [255, 11, 11, 255]);
  const bgG = useTransform(smoothProgress, [0, 0.12, 0.75, 1], [255, 20, 20, 255]);
  const bgB = useTransform(smoothProgress, [0, 0.12, 0.75, 1], [255, 38, 38, 255]);
  const bgColor = useTransform(
    [bgR, bgG, bgB] as MotionValue[],
    ([r, g, b]: number[]) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
  );

  return (
    <section ref={ref} className="relative" style={{ height: "300vh" }}>
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-gold" />

        {/* Lion watermark behind */}
        <div
          className="pointer-events-none absolute inset-0 lion-watermark-light"
          style={{
            backgroundSize: "35%",
            backgroundPosition: "85% 50%",
            opacity: 0.02,
          }}
          aria-hidden
        />

        {/* Large year counter behind words */}
        <YearCounter progress={smoothProgress} />

        {/* Words */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-0 px-4">
          {WORDS.map((word, i) => (
            <ScrollWord
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={WORDS.length}
              scrollYProgress={smoothProgress}
              direction={DIRECTIONS[i]}
            />
          ))}
        </div>

        {/* Side label */}
        <SideLabel progress={smoothProgress} />

        {/* Progress bar */}
        <ProgressBar progress={smoothProgress} />

        {/* Subtle noise texture */}
        <div className="noise-overlay pointer-events-none absolute inset-0" />
      </motion.div>
    </section>
  );
}
