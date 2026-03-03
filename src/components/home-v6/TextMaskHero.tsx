"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TextMaskHeroProps {
  preloaderDone?: boolean;
}

export default function TextMaskHero({
  preloaderDone = true,
}: TextMaskHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based mouse values for parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll progress for the entire sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smoothed scroll for silky transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // --- Scroll-driven transforms ---

  // Text scale: 1 -> 6 as user scrolls
  const textScale = useTransform(smoothProgress, [0, 0.6], [1, 6]);

  // White overlay opacity: 1 -> 0
  const whiteOverlayOpacity = useTransform(smoothProgress, [0.05, 0.5], [1, 0]);

  // Full background image fades in
  const bgImageOpacity = useTransform(smoothProgress, [0.1, 0.5], [0, 1]);

  // Text opacity: visible then fades
  const textOpacity = useTransform(smoothProgress, [0.4, 0.65], [1, 0]);

  // Content fades in at the end of the scroll
  const contentOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.45, 0.65], [60, 0]);

  // Vignette intensifies
  const vignetteOpacity = useTransform(smoothProgress, [0.2, 0.7], [0, 0.7]);

  // Scroll indicator fades out quickly
  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.08],
    [1, 0]
  );

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms from mouse movement
  const decoX1 = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const decoY1 = useTransform(smoothMouseY, [-1, 1], [-10, 10]);
  const decoX2 = useTransform(smoothMouseX, [-1, 1], [12, -12]);
  const decoY2 = useTransform(smoothMouseY, [-1, 1], [8, -8]);
  const decoX3 = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const decoY3 = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
      aria-label="Hero section"
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ===== Layer 0: Full background image (revealed on scroll) ===== */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: bgImageOpacity }}
        >
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Dark gradient overlay on image for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        </motion.div>

        {/* ===== Layer 1: White overlay (hides image initially) ===== */}
        <motion.div
          className="absolute inset-0 z-10 bg-white"
          style={{ opacity: whiteOverlayOpacity }}
        />

        {/* ===== Layer 2: Text mask container ===== */}
        <AnimatePresence>
          {preloaderDone && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              style={{ opacity: textOpacity }}
            >
              <motion.div
                style={{ scale: textScale }}
                className="will-change-transform"
              >
                <h1
                  className={cn(
                    "font-[family-name:var(--font-verbatim)] uppercase font-black",
                    "text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight",
                    "text-center select-none whitespace-nowrap",
                    "px-4"
                  )}
                  style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <span className="block">CR&Eacute;ER LE CLUB</span>
                  <span className="block">DE DEMAIN</span>
                </h1>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Layer 3: Vignette (intensifies on scroll) ===== */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ===== Layer 4: Noise overlay ===== */}
        <div className="noise-overlay absolute inset-0 z-40 pointer-events-none" />

        {/* ===== Layer 5: Decorative elements with mouse parallax ===== */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Top-left logo */}
          <motion.div
            className="absolute top-8 left-8 md:top-12 md:left-12"
            initial={{ opacity: 0, y: -20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ x: decoX1, y: decoY1 }}
          >
            <Image
              src="/images/logo-scbt.png"
              alt="SCBT Logo"
              width={48}
              height={48}
              className="opacity-90 drop-shadow-lg"
            />
          </motion.div>

          {/* Top-right "Est. 1964" */}
          <motion.div
            className="absolute top-8 right-8 md:top-12 md:right-12"
            initial={{ opacity: 0, y: -20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ x: decoX2, y: decoY2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] tracking-[0.3em] font-[family-name:var(--font-montserrat)] text-gold uppercase">
                Est. 1964
              </span>
            </div>
          </motion.div>

          {/* Gold accent line - left side */}
          <motion.div
            className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 hidden md:block"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={preloaderDone ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top", x: decoX3, y: decoY3 }}
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-gold to-transparent" />
          </motion.div>

          {/* Chevron decoration - floating */}
          <motion.div
            className="absolute bottom-32 right-12 md:right-24 opacity-20 hidden md:block"
            initial={{ opacity: 0 }}
            animate={preloaderDone ? { opacity: 0.15 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ x: decoX2, y: decoY1 }}
          >
            <Image
              src="/images/deco-chevrons.svg"
              alt=""
              width={80}
              height={80}
              className="opacity-60"
            />
          </motion.div>

          {/* Floating chevron outlines - top area */}
          <motion.div
            className="absolute top-1/4 right-1/4 opacity-10 hidden lg:block"
            style={{ x: decoX1, y: decoY2 }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              className="text-gold"
            >
              <path
                d="M10 45L30 15L50 45"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
              <path
                d="M15 50L30 25L45 50"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Slashes deco */}
          <motion.div
            className="absolute top-1/3 left-1/4 opacity-10 hidden lg:block"
            style={{ x: decoX3, y: decoY3 }}
          >
            <Image
              src="/images/deco-slashes.svg"
              alt=""
              width={40}
              height={40}
              className="opacity-40"
            />
          </motion.div>

          {/* Dots deco */}
          <motion.div
            className="absolute bottom-1/4 left-16 opacity-10 hidden lg:block"
            style={{ x: decoX2, y: decoY2 }}
          >
            <Image
              src="/images/deco-dots.svg"
              alt=""
              width={50}
              height={50}
              className="opacity-30"
            />
          </motion.div>
        </div>

        {/* ===== Layer 6: Bottom content (fades in on scroll) ===== */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-50 px-8 md:px-16 pb-12 md:pb-20"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end md:items-center justify-between gap-8">
            {/* Subtitle */}
            <div className="max-w-lg">
              {/* Gold accent bar */}
              <div className="w-10 h-[2px] bg-gold mb-5" />
              <p className="font-[family-name:var(--font-montserrat)] text-white/90 text-sm md:text-base leading-relaxed tracking-wide">
                Accompagner les jeunes d&apos;aujourd&apos;hui.
                <br />
                <span className="text-white/60">
                  Depuis 1964, au c&oelig;ur de Terraillon.
                </span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#decouvrir"
                className={cn(
                  "group relative px-7 py-3.5 bg-white text-navy-deep",
                  "font-[family-name:var(--font-verbatim)] uppercase text-xs tracking-[0.2em]",
                  "overflow-hidden transition-colors duration-300",
                  "hover:bg-gold hover:text-navy-deep"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover fill animation */}
                <span className="relative z-10">D&eacute;couvrir</span>
                <motion.span
                  className="absolute inset-0 bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.a>

              <motion.a
                href="#calendrier"
                className={cn(
                  "group px-7 py-3.5 border border-white/20",
                  "font-[family-name:var(--font-verbatim)] uppercase text-xs tracking-[0.2em] text-white",
                  "transition-all duration-300",
                  "hover:border-gold/60 hover:text-gold"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Calendrier
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ===== Layer 7: Scroll indicator (bottom center) ===== */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase font-[family-name:var(--font-montserrat)] text-gold/70">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent relative overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-3 bg-gold"
              animate={{ y: [0, 32, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ===== Gradient bottom edge (always visible, blends into next section) ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-main/80 to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  );
}
