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

/* ------------------------------------------------------------------ */
/*  Polaroid data (deterministic scatter positions)                    */
/* ------------------------------------------------------------------ */

const POLAROIDS = [
  { id: 1, caption: "Entrainement", scatter: { x: -300, y: -150, rotate: -18 } },
  { id: 2, caption: "Match jour", scatter: { x: 250, y: -200, rotate: 12 } },
  { id: 3, caption: "Vestiaires", scatter: { x: -150, y: 250, rotate: -8 } },
  { id: 4, caption: "Supporters", scatter: { x: 400, y: 100, rotate: 22 } },
  { id: 5, caption: "Celebration", scatter: { x: -350, y: 50, rotate: -15 } },
  { id: 6, caption: "Le terrain", scatter: { x: 200, y: -350, rotate: 10 } },
];

/** Gradient placeholders per photo for visual variety */
const PHOTO_GRADIENTS = [
  "from-blue-primary/10 via-[#e8eef5] to-gold/10",
  "from-gold/10 via-[#f0f4f8] to-blue-primary/10",
  "from-blue-primary/15 via-[#edf2f8] to-gold/5",
  "from-gold/15 via-[#f5f0e8] to-blue-primary/5",
  "from-blue-primary/8 via-[#eef3fa] to-gold/12",
  "from-gold/8 via-[#f2efe8] to-blue-primary/12",
];

/** Index of the polaroid that gets the gold star sticker */
const STAR_POLAROID_INDEX = 3;

/* ------------------------------------------------------------------ */
/*  PolaroidCard sub-component                                         */
/*  (Extracted so hooks are NOT called inside loops)                    */
/* ------------------------------------------------------------------ */

interface PolaroidCardProps {
  polaroid: (typeof POLAROIDS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function PolaroidCard({ polaroid, index, scrollYProgress }: PolaroidCardProps) {
  const gradient = PHOTO_GRADIENTS[index % PHOTO_GRADIENTS.length];
  const hasStar = index === STAR_POLAROID_INDEX;

  /* Scatter -> Grid animation driven by scroll */
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    [polaroid.scatter.x, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    [polaroid.scatter.y, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    [polaroid.scatter.rotate, 0]
  );

  /* Spring physics for fluid, organic feel */
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, restDelta: 0.5 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, restDelta: 0.5 });
  const smoothRotate = useSpring(rotate, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.1,
  });

  /* Opacity: faded when scattered, full when assembled */
  const opacity = useTransform(scrollYProgress, [0.05, 0.4], [0.7, 1]);
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 25 });

  /* Scale: slightly smaller when scattered */
  const scale = useTransform(scrollYProgress, [0.1, 0.7], [0.9, 1]);
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      className="group relative"
      style={{
        x: smoothX,
        y: smoothY,
        rotate: smoothRotate,
        scale: smoothScale,
        opacity: smoothOpacity,
      }}
    >
      {/* The Polaroid frame */}
      <div className="relative overflow-visible rounded-sm bg-white p-3 shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
        {/* Tape effect on top */}
        <div className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2">
          <div
            className="h-5 w-12 rounded-sm bg-gold/20 backdrop-blur-sm"
            style={{ transform: "rotate(-2deg)" }}
          />
        </div>

        {/* Gold star sticker on one polaroid */}
        {hasStar && (
          <div className="absolute -right-2 -top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-gold shadow-lg">
            <span className="text-sm text-navy-deep">&#9733;</span>
          </div>
        )}

        {/* Photo area */}
        <div className="relative aspect-square w-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-all duration-500 group-hover:brightness-105",
              gradient
            )}
          />

          {/* Noise texture on photo */}
          <div className="noise-overlay absolute inset-0 opacity-60" />

          {/* Faint SCBT watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none font-[family-name:var(--font-verbatim)] text-[40px] font-black uppercase leading-none tracking-tighter text-navy-deep/[0.06] md:text-[50px]">
              SCBT
            </span>
          </div>

          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.06)]" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gold/0 transition-colors duration-500 group-hover:bg-gold/[0.04]" />
        </div>

        {/* Caption below photo (handwriting feel) */}
        <div className="mt-3 pb-1 text-center">
          <p className="font-[family-name:var(--font-montserrat)] text-sm italic text-gray-500 transition-colors duration-300 group-hover:text-navy-deep">
            {polaroid.caption}
          </p>
        </div>

        {/* Subtle bottom gold line on hover */}
        <div className="absolute inset-x-3 bottom-0 h-[2px] scale-x-0 bg-gold/30 transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Assembly Progress Indicator                                        */
/* ------------------------------------------------------------------ */

interface AssemblyBarProps {
  scrollYProgress: MotionValue<number>;
}

function AssemblyBar({ scrollYProgress }: AssemblyBarProps) {
  const barScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const labelOpacity = useTransform(scrollYProgress, (p: number) =>
    p < 0.65 ? 0.4 : 0
  );

  return (
    <div className="absolute bottom-10 left-1/2 z-40 -translate-x-1/2 md:bottom-12">
      <div className="flex flex-col items-center gap-3">
        <motion.span
          className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-navy-deep/30"
          style={{ opacity: labelOpacity }}
        >
          Assemblez
        </motion.span>
        <div className="h-[2px] w-32 overflow-hidden bg-navy-deep/[0.06]">
          <motion.div
            className="h-full origin-left bg-gold/50"
            style={{ scaleX: barScale }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PolaroidGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "200vh" }}
    >
      {/* Subtle noise overlay on white background */}
      <div className="noise-overlay absolute inset-0 opacity-40" />

      {/* Faint diagonal pattern for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 20px, #0B1426 20px, #0B1426 21px)",
          }}
        />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Section header */}
        <div className="relative z-10 mb-8 w-full max-w-7xl px-8 md:mb-12 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Nos moments
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
              GALERIE
            </h2>
          </motion.div>
        </div>

        {/* 3x2 Polaroid Grid */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-8 md:px-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
            {POLAROIDS.map((polaroid, index) => (
              <PolaroidCard
                key={polaroid.id}
                polaroid={polaroid}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Assembly progress indicator */}
        <AssemblyBar scrollYProgress={scrollYProgress} />

        {/* Corner accents (gold lines) */}
        <div className="pointer-events-none absolute left-8 top-8 hidden md:block">
          <div className="flex flex-col">
            <div className="h-[1px] w-6 bg-gold/30" />
            <div className="h-6 w-[1px] bg-gold/30" />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-8 right-8 hidden md:block">
          <div className="flex flex-col items-end">
            <div className="h-[1px] w-6 bg-gold/30" />
            <div className="h-6 w-[1px] bg-gold/30 self-end" />
          </div>
        </div>

        {/* Faint vertical separator lines for visual depth */}
        <div className="pointer-events-none absolute bottom-0 left-[10%] top-0 hidden w-[1px] bg-gradient-to-b from-transparent via-navy-deep/[0.03] to-transparent lg:block" />
        <div className="pointer-events-none absolute bottom-0 right-[10%] top-0 hidden w-[1px] bg-gradient-to-b from-transparent via-navy-deep/[0.03] to-transparent lg:block" />
      </div>
    </section>
  );
}
