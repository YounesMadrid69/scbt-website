"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "@/components/ui/CountUp";
import { KEY_STATS } from "@/lib/constants";

export default function StatsV2() {
  return (
    <section className="relative overflow-hidden bg-white py-28 px-4">
      {/* Lion watermark - very visible */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{
          backgroundSize: "55%",
          opacity: 0.08,
        }}
      />

      {/* Deco dots */}
      <div className="pointer-events-none absolute top-8 right-8 hidden opacity-40 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={80} height={80} />
      </div>

      {/* Stripe accent left */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-2 bg-blue-primary" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-highlight mb-4 inline-block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em]">
            Le SCBT en chiffres
          </span>
          <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tight text-navy-deep md:text-7xl">
            NOS CHIFFRES
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
          {KEY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative text-center"
            >
              {/* Divider */}
              {index !== 0 && (
                <div className="absolute top-1/2 left-0 hidden h-16 w-[3px] -translate-y-1/2 bg-blue-primary/20 md:block" />
              )}

              <div className="font-[family-name:var(--font-verbatim)] text-6xl font-black tracking-tighter text-navy-deep md:text-8xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
