"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import Image from "next/image";
import { PHOTO_SERIES } from "@/lib/constants";

/**
 * Gallery where cards skew based on scroll velocity.
 * Fast scroll = tilted cards. Slow = straight.
 * Creates a very dynamic, kinetic feel.
 */
export default function VelocityGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(
    useTransform(scrollVelocity, [-3000, 0, 3000], [-12, 0, 12]),
    { stiffness: 200, damping: 30 }
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-navy-deep py-32">
      <div className="noise-overlay absolute inset-0" />

      {/* Giant moving text */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[22vw] font-black uppercase leading-none tracking-tighter text-white/[0.02]">
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

      {/* Velocity-driven gallery */}
      <motion.div
        style={{ skewX: skewVelocity }}
        className="relative z-10"
      >
        <div className="scrollbar-hide flex gap-6 overflow-x-auto px-8 pb-8 md:px-16">
          {PHOTO_SERIES.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group min-w-[300px] cursor-pointer md:min-w-[400px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/50 to-navy transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                <div className="noise-overlay absolute inset-0" />

                {/* Year - huge centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-verbatim)] text-[100px] font-black tracking-tighter text-white/[0.06] transition-all duration-500 group-hover:text-white/[0.1] group-hover:scale-110">
                    {photo.date}
                  </span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent" />

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-10" />
                  <span className="block font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-[0.2em] text-gold">
                    {photo.date}
                  </span>
                  <p className="mt-1 font-[family-name:var(--font-verbatim)] text-lg font-black uppercase leading-tight tracking-wide text-white">
                    {photo.caption}
                  </p>
                </div>

                {/* Corner borders on hover */}
                <div className="pointer-events-none absolute inset-3">
                  <div className="absolute top-0 left-0 h-5 w-5 border-l border-t border-transparent transition-colors duration-500 group-hover:border-gold/40" />
                  <div className="absolute top-0 right-0 h-5 w-5 border-r border-t border-transparent transition-colors duration-500 group-hover:border-gold/40" />
                  <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-transparent transition-colors duration-500 group-hover:border-gold/40" />
                  <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-transparent transition-colors duration-500 group-hover:border-gold/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Deco */}
      <div className="pointer-events-none absolute bottom-12 right-12 hidden opacity-10 md:block">
        <Image src="/images/deco-slashes.svg" alt="" width={80} height={60} />
      </div>
    </section>
  );
}
