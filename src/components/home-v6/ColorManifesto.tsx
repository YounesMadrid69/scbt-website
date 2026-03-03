"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SLIDES = [
  {
    word: "SPORTIF.",
    description:
      "Former les joueurs et joueuses de demain avec exigence et passion.",
    bg: [255, 255, 255] as const, // white
    text: [10, 20, 50] as const, // navy-deep approx
    deco: "/images/deco-chevrons.svg",
  },
  {
    word: "\u00C9DUCATIF.",
    description:
      "Transmettre les valeurs du sport\u00A0: respect, discipline, d\u00E9passement de soi.",
    bg: [10, 20, 50] as const, // navy-deep
    text: [255, 255, 255] as const, // white
    deco: "/images/deco-dots.svg",
  },
  {
    word: "SOCIAL.",
    description:
      "\u00CAtre un acteur du lien social dans le quartier de Terraillon.",
    bg: [0, 109, 166] as const, // blue-primary #006DA6
    text: [255, 255, 255] as const, // white
    deco: "/images/deco-slashes.svg",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Color interpolation helpers                                        */
/* ------------------------------------------------------------------ */

function useInterpolatedColor(
  progress: MotionValue<number>,
  breakpoints: number[],
  colors: readonly (readonly [number, number, number])[]
): MotionValue<string> {
  const r = useTransform(progress, breakpoints, colors.map((c) => c[0]));
  const g = useTransform(progress, breakpoints, colors.map((c) => c[1]));
  const b = useTransform(progress, breakpoints, colors.map((c) => c[2]));

  return useTransform([r, g, b], ([rv, gv, bv]) => {
    return `rgb(${Math.round(rv as number)},${Math.round(gv as number)},${Math.round(bv as number)})`;
  });
}

/* ------------------------------------------------------------------ */
/*  Slide component                                                    */
/* ------------------------------------------------------------------ */

function Slide({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const slide = SLIDES[index];
  const total = SLIDES.length;

  // Each slide occupies 1/3 of the scroll range
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  // Text fade + slide: appear in first half, disappear in second half
  const wordOpacity = useTransform(
    scrollYProgress,
    [
      start,
      start + 0.05,
      mid - 0.04,
      mid + 0.04,
      end - 0.05,
      end,
    ],
    index === 0
      ? [1, 1, 1, 1, 0, 0] // First slide starts visible
      : index === total - 1
        ? [0, 0, 1, 1, 1, 1] // Last slide stays visible
        : [0, 0, 1, 1, 0, 0]
  );

  const wordY = useTransform(
    scrollYProgress,
    [start, start + 0.06, end - 0.06, end],
    index === 0
      ? [0, 0, -60, -60]
      : index === total - 1
        ? [60, 60, 0, 0]
        : [60, 0, 0, -60]
  );

  const descOpacity = useTransform(
    scrollYProgress,
    [
      start + 0.02,
      start + 0.08,
      mid - 0.02,
      mid + 0.02,
      end - 0.08,
      end - 0.02,
    ],
    index === 0
      ? [1, 1, 1, 1, 0, 0]
      : index === total - 1
        ? [0, 0, 1, 1, 1, 1]
        : [0, 1, 1, 1, 1, 0]
  );

  // Gold underline scale
  const lineScaleX = useTransform(
    scrollYProgress,
    [start + 0.04, mid, end - 0.04],
    [0, 1, 0]
  );
  const smoothLineScale = useSpring(lineScaleX, {
    stiffness: 120,
    damping: 30,
  });

  // Deco element float
  const decoRotate = useTransform(
    scrollYProgress,
    [start, end],
    [-12, 12]
  );
  const decoScale = useTransform(
    scrollYProgress,
    [start, start + 0.08, end - 0.08, end],
    index === 0
      ? [0.8, 0.8, 0.8, 0.4]
      : index === total - 1
        ? [0.4, 0.8, 0.8, 0.8]
        : [0.4, 0.8, 0.8, 0.4]
  );
  const decoOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, end - 0.06, end],
    index === 0
      ? [0.12, 0.12, 0.12, 0]
      : index === total - 1
        ? [0, 0.12, 0.12, 0.12]
        : [0, 0.12, 0.12, 0]
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Deco element */}
      <motion.div
        style={{
          rotate: decoRotate,
          scale: decoScale,
          opacity: decoOpacity,
        }}
        className="absolute right-[8%] top-[15%] h-[30vw] w-[30vw] max-h-[300px] max-w-[300px] md:right-[12%] md:top-[12%]"
      >
        <Image
          src={slide.deco}
          alt=""
          fill
          className="object-contain opacity-60"
          aria-hidden
        />
      </motion.div>

      {/* Text block */}
      <div className="relative flex flex-col items-center text-center">
        <motion.h2
          style={{ opacity: wordOpacity, y: wordY }}
          className="font-[family-name:var(--font-verbatim)] text-[15vw] font-black uppercase leading-none tracking-tighter"
        >
          {slide.word}
        </motion.h2>

        {/* Gold underline */}
        <motion.div
          style={{ scaleX: smoothLineScale }}
          className="mt-5 h-[3px] w-32 origin-center bg-gold md:w-48"
        />

        <motion.p
          style={{ opacity: descOpacity, y: wordY }}
          className="mt-6 max-w-md px-6 font-[family-name:var(--font-montserrat)] text-lg leading-relaxed opacity-50"
        >
          {slide.description}
        </motion.p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress dots                                                      */
/* ------------------------------------------------------------------ */

function ProgressDots({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
      {SLIDES.map((_, i) => (
        <Dot key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function Dot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const total = SLIDES.length;
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(
    scrollYProgress,
    [start - 0.01, start + 0.03, end - 0.03, end + 0.01],
    [0.6, 1, 1, 0.6]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [start - 0.01, start + 0.03, end - 0.03, end + 0.01],
    [0.25, 1, 1, 0.25]
  );

  // Dot color should match the current text color for contrast
  const dotColor = useInterpolatedColor(
    scrollYProgress,
    [0, 0.333, 0.333, 0.666, 0.666, 1],
    [
      SLIDES[0].text,
      SLIDES[0].text,
      SLIDES[1].text,
      SLIDES[1].text,
      SLIDES[2].text,
      SLIDES[2].text,
    ]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity: dotOpacity,
        backgroundColor: dotColor,
      }}
      className="h-2.5 w-2.5 rounded-full"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ColorManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothed progress for buttery transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Background color interpolation across the 3 slides
  const bgColor = useInterpolatedColor(
    smoothProgress,
    [0, 0.28, 0.38, 0.61, 0.71, 1],
    [
      SLIDES[0].bg,
      SLIDES[0].bg,
      SLIDES[1].bg,
      SLIDES[1].bg,
      SLIDES[2].bg,
      SLIDES[2].bg,
    ]
  );

  // Text color interpolation
  const textColor = useInterpolatedColor(
    smoothProgress,
    [0, 0.28, 0.38, 0.61, 0.71, 1],
    [
      SLIDES[0].text,
      SLIDES[0].text,
      SLIDES[1].text,
      SLIDES[1].text,
      SLIDES[2].text,
      SLIDES[2].text,
    ]
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <motion.div
        style={{ backgroundColor: bgColor, color: textColor }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10" />

        {/* Lion watermark */}
        <div
          className="pointer-events-none absolute inset-0 lion-watermark-light"
          style={{
            backgroundSize: "40%",
            backgroundPosition: "90% 60%",
            opacity: 0.03,
          }}
        />

        {/* Slides */}
        {SLIDES.map((_, i) => (
          <Slide key={i} index={i} scrollYProgress={smoothProgress} />
        ))}

        {/* Progress dots */}
        <ProgressDots scrollYProgress={smoothProgress} />

        {/* Side label */}
        <motion.div
          style={{ color: textColor }}
          className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 md:block"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">
            Nos valeurs
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
