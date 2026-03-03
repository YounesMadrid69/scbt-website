"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHOTOS = [
  { id: 1, caption: "Les fondateurs du club, 1964", date: "1964" },
  { id: 2, caption: "Le jeune Karim Benzema au SCBT", date: "1996" },
  { id: 3, caption: "Montée en Promotion d'Honneur", date: "2003" },
  { id: 4, caption: "60 ans du club - Gala anniversaire", date: "2024" },
  { id: 5, caption: "Label FFF Argent - Cérémonie de remise", date: "2025" },
];

/**
 * Grid layout definitions.
 * Row 1: 3 items (wide, square, wide)
 * Row 2: 2 items (square, wide)
 */
const GRID_CONFIG = [
  { colSpan: "md:col-span-5", aspect: "aspect-[16/10]" },
  { colSpan: "md:col-span-3", aspect: "aspect-square" },
  { colSpan: "md:col-span-4", aspect: "aspect-[16/10]" },
  { colSpan: "md:col-span-5", aspect: "aspect-[4/3]" },
  { colSpan: "md:col-span-7", aspect: "aspect-[16/9]" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CursorGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw mouse tracking relative to the container center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed springs for the parallax
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Map raw position to subtle translation range (-15px to +15px)
  const gridX = useTransform(springX, [-1, 1], [-15, 15]);
  const gridY = useTransform(springY, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalise to -1 ... +1 relative to center
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-navy-deep py-28 md:py-36"
    >
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Giant background text */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">
        <span className="font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-none tracking-tighter text-white/[0.015]">
          HISTOIRE
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Nos moments
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-white md:text-8xl">
            GALERIE
          </h2>
        </motion.div>
      </div>

      {/* Parallax-driven grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="relative z-10 mx-auto max-w-7xl px-8 md:px-16"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {PHOTOS.map((photo, index) => (
            <GalleryCard
              key={photo.id}
              photo={photo}
              index={index}
              config={GRID_CONFIG[index]}
            />
          ))}
        </div>
      </motion.div>

      {/* Deco */}
      <div className="pointer-events-none absolute bottom-12 right-12 hidden opacity-10 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={80} height={60} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Card                                                       */
/* ------------------------------------------------------------------ */

interface GalleryCardProps {
  photo: (typeof PHOTOS)[number];
  index: number;
  config: (typeof GRID_CONFIG)[number];
}

function GalleryCard({ photo, index, config }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  // Spring-based scale for smooth hover
  const hoverScale = useSpring(hovered ? 1.05 : 1, {
    stiffness: 300,
    damping: 25,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`col-span-1 ${config.colSpan}`}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ scale: hoverScale }}
        className="group relative cursor-pointer overflow-hidden"
        whileHover={{ zIndex: 10 }}
      >
        {/* Card surface */}
        <div className={`relative ${config.aspect} overflow-hidden`}>
          {/* Gradient placeholder background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/40 to-navy-deep transition-all duration-700 group-hover:brightness-125" />

          {/* Noise */}
          <div className="noise-overlay absolute inset-0" />

          {/* Giant faint year watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-[family-name:var(--font-verbatim)] text-[120px] font-black leading-none tracking-tighter text-white/[0.05] transition-all duration-500 select-none group-hover:text-white/[0.1] group-hover:scale-110 md:text-[140px]">
              {photo.date}
            </span>
          </div>

          {/* Bottom gradient for caption legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />

          {/* Caption at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <div className="mb-2 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-10" />
            <span className="block font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              {photo.date}
            </span>
            <p className="mt-1 font-[family-name:var(--font-verbatim)] text-base font-black uppercase leading-tight tracking-wide text-white md:text-lg">
              {photo.caption}
            </p>
          </div>

          {/* Corner brackets - appear on hover */}
          <div className="pointer-events-none absolute inset-3">
            {/* Top-left */}
            <div className="absolute top-0 left-0 h-6 w-6 border-l-2 border-t-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
            {/* Top-right */}
            <div className="absolute top-0 right-0 h-6 w-6 border-r-2 border-t-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
            {/* Bottom-left */}
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
            {/* Bottom-right */}
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-transparent transition-all duration-500 group-hover:border-gold/60" />
          </div>

          {/* Hover shadow (inset glow) */}
          <div className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_60px_rgba(212,168,67,0.1)] transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </motion.div>
    </motion.div>
  );
}
