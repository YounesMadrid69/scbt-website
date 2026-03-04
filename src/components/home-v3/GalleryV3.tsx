"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { PHOTO_SERIES } from "@/lib/constants";

export default function GalleryV3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-deep py-32">
      {/* Noise grain */}
      <div className="noise-overlay absolute inset-0" />

      {/* Giant moving text behind */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[25vw] font-black uppercase leading-none tracking-tighter text-white/[0.02]">
          HISTOIRE &amp; MÉMOIRE
        </span>
      </motion.div>

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

      {/* Horizontal gallery with parallax */}
      <div className="scrollbar-hide relative z-10 flex gap-6 overflow-x-auto px-8 pb-8 md:px-16">
        {PHOTO_SERIES.map((photo, index) => (
          <GalleryCard key={photo.id} photo={photo} index={index} />
        ))}
      </div>

      {/* Deco slashes */}
      <div className="pointer-events-none absolute bottom-12 right-12 hidden opacity-15 md:block">
        <Image src="/images/deco-slashes.svg" alt="" width={100} height={80} />
      </div>
    </section>
  );
}

function GalleryCard({ photo, index }: { photo: typeof PHOTO_SERIES[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group min-w-[320px] cursor-pointer md:min-w-[420px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Parallax image */}
        <motion.div
          style={{ y: imgY }}
          className="absolute -inset-[10%]"
        >
          <Image
            src={photo.image}
            alt={photo.caption}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
        </motion.div>

        {/* Noise */}
        <div className="noise-overlay absolute inset-0" />

        {/* Year - giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[family-name:var(--font-verbatim)] text-[15vw] font-black tracking-tighter text-white/[0.06] md:text-[100px]">
            {photo.date}
          </span>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 bg-gold transition-all duration-300 group-hover:w-10" />
            <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              {photo.date}
            </span>
          </div>
          <p className="font-[family-name:var(--font-verbatim)] text-base font-bold uppercase leading-tight tracking-wide text-white md:text-lg">
            {photo.caption}
          </p>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-white/20" />
      </div>
    </motion.div>
  );
}
