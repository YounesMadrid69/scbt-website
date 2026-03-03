"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PHOTO_SERIES } from "@/lib/constants";

/**
 * Full-bleed gallery with pinned showcase.
 * Each photo takes full viewport as a parallax card.
 */
export default function FullGalleryV4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-navy-deep">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-navy-deep/80 px-8 py-4 backdrop-blur-md md:px-16">
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-6 bg-gold" />
          <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Histoire &amp; Mémoire
          </span>
        </div>
        {/* Progress */}
        <div className="hidden h-[2px] w-32 bg-white/10 md:block">
          <motion.div style={{ width: progressWidth }} className="h-full bg-gold" />
        </div>
      </div>

      {/* Photo cards */}
      {PHOTO_SERIES.map((photo, index) => (
        <GallerySlide key={photo.id} photo={photo} index={index} total={PHOTO_SERIES.length} />
      ))}
    </section>
  );
}

function GallerySlide({
  photo,
  index,
  total,
}: {
  photo: typeof PHOTO_SERIES[0];
  index: number;
  total: number;
}) {
  const slideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const captionY = useTransform(scrollYProgress, [0.2, 0.5], [60, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);

  return (
    <div ref={slideRef} className="relative h-screen">
      {/* Parallax background */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/50 to-navy-deep" />
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/60" />

      {/* Counter */}
      <div className="absolute top-8 right-8 z-10 md:right-16">
        <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold tracking-wider text-white/20">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Year watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-[family-name:var(--font-verbatim)] text-[30vw] font-black tracking-tighter text-white/[0.03]">
          {photo.date}
        </span>
      </div>

      {/* Caption */}
      <motion.div
        style={{ y: captionY, opacity: captionOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 px-8 pb-20 md:px-16"
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-[0.2em] text-gold">
              {photo.date}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.88] tracking-tight text-white md:text-6xl">
            {photo.caption}
          </h3>
        </div>
      </motion.div>

      {/* Deco */}
      {index % 2 === 0 && (
        <div className="pointer-events-none absolute bottom-8 right-8 hidden opacity-10 md:block md:right-16">
          <Image src="/images/deco-slashes.svg" alt="" width={60} height={40} />
        </div>
      )}
    </div>
  );
}
