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
/*  Photo data (6 placeholders for the 3x2 grid)                      */
/* ------------------------------------------------------------------ */

const PHOTOS = [
  { id: 1, label: "Les fondateurs du club" },
  { id: 2, label: "Formation des jeunes" },
  { id: 3, label: "Match en nocturne" },
  { id: 4, label: "Gala des 60 ans" },
  { id: 5, label: "Label FFF Argent" },
  { id: 6, label: "Vivre Ensemble" },
];

/* ------------------------------------------------------------------ */
/*  Pre-defined scatter offsets (deterministic, no Math.random)         */
/* ------------------------------------------------------------------ */

const SCATTER = [
  { x: -400, y: -300, rotate: -25 },
  { x: 300, y: -200, rotate: 15 },
  { x: -200, y: 400, rotate: -10 },
  { x: 500, y: 200, rotate: 30 },
  { x: -350, y: 100, rotate: -20 },
  { x: 250, y: -400, rotate: 12 },
];

/** Gradient placeholders per photo for visual variety */
const PHOTO_GRADIENTS = [
  "from-blue-primary/30 via-navy-deep to-[#0d1a33]",
  "from-[#0e1b35] via-navy-deep to-blue-primary/20",
  "from-navy-deep via-blue-primary/15 to-[#111d30]",
  "from-blue-primary/20 via-[#0b1527] to-navy-deep",
  "from-navy-deep via-[#0d192e] to-blue-primary/25",
  "from-[#091320] via-navy-deep to-blue-primary/15",
];

/* ------------------------------------------------------------------ */
/*  MosaicPhoto sub-component                                          */
/*  (Extracted so hooks are NOT called inside loops)                    */
/* ------------------------------------------------------------------ */

interface MosaicPhotoProps {
  photo: (typeof PHOTOS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function MosaicPhoto({ photo, index, scrollYProgress }: MosaicPhotoProps) {
  const scatter = SCATTER[index];
  const gradient = PHOTO_GRADIENTS[index];

  /*
   * Map scroll progress to scatter interpolation:
   * 0.0 -> fully scattered (offset = 1)
   * 0.5 -> midpoint
   * 1.0 -> fully assembled (offset = 0)
   *
   * The images start scattered and fly into grid position as the user
   * scrolls through the 150vh container.
   */
  const x = useTransform(scrollYProgress, [0, 0.7], [scatter.x, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [scatter.y, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.7],
    [scatter.rotate, 0]
  );

  /* Smooth all transforms with spring for fluid feel */
  const smoothX = useSpring(x, { stiffness: 60, damping: 30, restDelta: 0.5 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 30, restDelta: 0.5 });
  const smoothRotate = useSpring(rotate, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.1,
  });

  /* Opacity: faded when scattered, fully visible when assembled */
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const smoothOpacity = useSpring(opacity, {
    stiffness: 80,
    damping: 30,
  });

  /* Scale: slightly smaller when scattered */
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.85, 1]);
  const smoothScale = useSpring(scale, { stiffness: 60, damping: 30 });

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
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Gradient placeholder background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-500 group-hover:brightness-125",
            gradient
          )}
        />

        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0" />

        {/* SCBT watermark text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-[family-name:var(--font-verbatim)] text-[60px] font-black uppercase leading-none tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:text-white/[0.1] md:text-[80px]">
            SCBT
          </span>
        </div>

        {/* Bottom gradient for label legibility on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Photo label - appears on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-2 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-8" />
          <p className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wide text-white">
            {photo.label}
          </p>
        </div>

        {/* Gold corner brackets on hover */}
        <div className="pointer-events-none absolute inset-3">
          <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
          <div className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
          <div className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
          <div className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
        </div>

        {/* Hover gold glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_40px_rgba(212,168,67,0.1)] transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Assembly Progress Indicator                                        */
/* ------------------------------------------------------------------ */

interface AssemblyIndicatorProps {
  scrollYProgress: MotionValue<number>;
}

function AssemblyIndicator({ scrollYProgress }: AssemblyIndicatorProps) {
  const barScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const labelOpacity = useTransform(scrollYProgress, (p: number) =>
    p < 0.6 ? 0.4 : 0
  );

  return (
    <div className="absolute bottom-12 left-1/2 z-40 -translate-x-1/2">
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

export default function MosaicGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "150vh" }}
    >
      {/* Subtle noise overlay on white background */}
      <div className="noise-overlay absolute inset-0 opacity-50" />

      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Section header */}
        <div className="relative z-10 mb-8 w-full max-w-7xl px-8 md:mb-12 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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

        {/* 3x2 Mosaic Grid */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            {PHOTOS.map((photo, index) => (
              <MosaicPhoto
                key={photo.id}
                photo={photo}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Assembly progress indicator */}
        <AssemblyIndicator scrollYProgress={scrollYProgress} />

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
      </div>
    </section>
  );
}
