"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PHOTO_SERIES } from "@/lib/constants";

export default function PhotoSeriesV2() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 px-4">
      {/* Noise */}
      <div className="noise-overlay absolute inset-0 z-0" />

      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 50" fill="none" className="w-full" preserveAspectRatio="none">
          <polygon points="0,0 1440,0 0,50" className="fill-bg-alt" />
        </svg>
      </div>

      {/* Stripe pattern accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-20 stripe-pattern opacity-[0.04]" />

      {/* Deco slashes */}
      <div className="pointer-events-none absolute bottom-16 right-12 hidden opacity-20 md:block">
        <Image src="/images/deco-slashes.svg" alt="" width={80} height={60} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-highlight mb-4 inline-block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em]">
            Nos moments
          </span>
          <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tight text-white md:text-7xl">
            HISTOIRE
            <br />
            <span className="text-blue-light/50">&amp; MÉMOIRE</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll - edge to edge */}
      <div className="scrollbar-hide relative z-10 flex gap-5 overflow-x-auto px-4 pb-6">
        {PHOTO_SERIES.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group min-w-[300px] cursor-pointer md:min-w-[380px]"
          >
            <div className="card-cut-lg relative aspect-[4/3] overflow-hidden">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/40 to-navy transition-transform duration-700 group-hover:scale-110" />

              {/* Noise on each card */}
              <div className="noise-overlay absolute inset-0" />

              {/* Year stamp - big */}
              <div className="absolute top-4 right-4">
                <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black tracking-tighter text-white/20">
                  {photo.date}
                </span>
              </div>

              {/* Bottom gradient + caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-[2px] w-6 bg-gold" />
                  <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                    {photo.date}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wide text-white">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Diagonal bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 50" fill="none" className="w-full" preserveAspectRatio="none">
          <polygon points="0,50 1440,0 1440,50" fill="white" />
        </svg>
      </div>
    </section>
  );
}
