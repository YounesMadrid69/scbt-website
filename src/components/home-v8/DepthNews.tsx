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

const ARTICLES = NEWS_ARTICLES.slice(0, 4);
const TOTAL = ARTICLES.length;

/** Per-card gradient variations for the image placeholder area */
const CARD_GRADIENTS = [
  "from-blue-primary/20 via-[#0d1a33] to-navy-deep",
  "from-navy-deep via-blue-primary/15 to-[#0e1b35]",
  "from-[#0b1527] via-navy-deep to-blue-primary/20",
  "from-blue-primary/10 via-[#091320] to-navy-deep",
];

/* ------------------------------------------------------------------ */
/*  DepthCard sub-component                                            */
/*  (Extracted so hooks are NOT called inside loops)                    */
/* ------------------------------------------------------------------ */

interface DepthCardProps {
  article: (typeof ARTICLES)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function DepthCard({ article, index, total, scrollYProgress }: DepthCardProps) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  /*
   * Each card occupies a scroll segment.
   * - It starts at reduced scale/opacity (visible behind the card in front)
   * - Reaches full size/opacity at its segment start
   * - Translates upward and fades out by segment end
   */
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - segmentSize), start, end],
    ["0%", "0%", "-100%"]
  );
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, start - segmentSize), start, end],
    [0.85, 1, 0.95]
  );
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.5),
      start,
      end - segmentSize * 0.2,
      end,
    ],
    [0.4, 1, 1, 0]
  );

  /* Spring physics for fluid feel */
  const smoothY = useSpring(y, { stiffness: 60, damping: 30, restDelta: 0.5 });
  const smoothScale = useSpring(scale, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });
  const smoothOpacity = useSpring(opacity, {
    stiffness: 80,
    damping: 30,
  });

  const frameNum = String(index + 1).padStart(2, "0");
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const categoryColor = CATEGORY_COLORS[article.category] ?? "bg-gold";

  return (
    <motion.article
      style={{
        y: smoothY,
        scale: smoothScale,
        opacity: smoothOpacity,
        zIndex: total - index,
      }}
      className="absolute inset-x-8 top-0 bottom-0 md:inset-x-16"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-none bg-navy-deep/60 backdrop-blur-sm">
        {/* Giant faded article index */}
        <div className="pointer-events-none absolute right-4 top-4 select-none md:right-8 md:top-6">
          <span className="font-[family-name:var(--font-verbatim)] text-[8vw] font-black leading-none tracking-tighter text-white/[0.04]">
            {frameNum}
          </span>
        </div>

        {/* Image placeholder area */}
        <div className="relative w-full overflow-hidden">
          <div
            className={cn(
              "aspect-[16/9] w-full bg-gradient-to-br transition-all duration-700 group-hover:scale-[1.02] group-hover:brightness-110",
              gradient
            )}
          />

          {/* Noise texture on image */}
          <div className="noise-overlay absolute inset-0" />

          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,109,166,0.1),transparent_70%)]" />

          {/* SCBT watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none font-[family-name:var(--font-verbatim)] text-[80px] font-black uppercase leading-none tracking-tighter text-white/[0.03] md:text-[120px]">
              SCBT
            </span>
          </div>

          {/* Category badge - top left */}
          <div className="absolute left-0 top-0 z-10 p-5 md:p-8">
            <span
              className={cn(
                "inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em]",
                "bg-gold text-navy-deep"
              )}
            >
              {article.category}
            </span>
          </div>

          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/90 to-transparent" />
        </div>

        {/* Gold accent line */}
        <div className="relative z-10 mx-5 md:mx-8">
          <div className="h-[3px] w-16 bg-gold transition-all duration-500 group-hover:w-24 group-hover:bg-gold/90" />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-6 md:px-8 md:py-8">
          <h3 className="font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-5xl lg:text-6xl">
            {article.title}
          </h3>

          <p className="mt-4 font-[family-name:var(--font-montserrat)] text-sm text-white/40">
            {formatDate(article.date)}
          </p>

          {/* Read link */}
          <div className="mt-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <a
              href="#"
              className="group/link inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-xs font-semibold uppercase tracking-[0.15em] text-gold/70 transition-colors duration-300 hover:text-gold"
            >
              <span>Lire l&apos;article</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
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

        {/* Bottom hairline */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Hover gold glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_80px_rgba(212,168,67,0.06)] transition-opacity duration-600 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll Progress Indicator                                          */
/* ------------------------------------------------------------------ */

interface ProgressDotsProps {
  scrollYProgress: MotionValue<number>;
}

function ProgressDots({ scrollYProgress }: ProgressDotsProps) {
  return (
    <div className="absolute right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
      {ARTICLES.map((_, i) => (
        <ProgressDot
          key={i}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

interface ProgressDotProps {
  index: number;
  scrollYProgress: MotionValue<number>;
}

function ProgressDot({ index, scrollYProgress }: ProgressDotProps) {
  const segmentSize = 1 / TOTAL;
  const start = index * segmentSize;
  const end = start + segmentSize;

  const dotScale = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start, end - 0.05, end],
    [0.6, 1.3, 1.3, 0.6]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start, end - 0.05, end],
    [0.2, 1, 1, 0.2]
  );

  return (
    <motion.div
      style={{ scale: dotScale, opacity: dotOpacity }}
      className="h-2.5 w-2.5 rounded-full bg-gold"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DepthNews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-navy-deep"
      style={{ height: "400vh" }}
    >
      {/* Noise overlay on the entire section */}
      <div className="noise-overlay absolute inset-0" />

      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Giant background text */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">
          <span className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-white/[0.015]">
            ACTUALITES
          </span>
        </div>

        {/* Section header */}
        <div className="relative z-50 w-full max-w-7xl px-8 pt-12 md:px-16 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Stacked depth cards */}
        <div className="relative z-10 mt-8 flex flex-1 items-center justify-center md:mt-10">
          <div className="relative w-full max-w-7xl" style={{ height: "60vh" }}>
            {ARTICLES.map((article, i) => (
              <DepthCard
                key={article.id}
                article={article}
                index={i}
                total={TOTAL}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Progress dots - right side */}
        <ProgressDots scrollYProgress={scrollYProgress} />

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

        {/* Vertical line accent left */}
        <div className="pointer-events-none absolute bottom-0 left-[5%] top-0 hidden w-[1px] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent lg:block" />
        <div className="pointer-events-none absolute bottom-0 right-[5%] top-0 hidden w-[1px] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent lg:block" />
      </div>
    </section>
  );
}
