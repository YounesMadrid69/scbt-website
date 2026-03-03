"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import { KEY_STATS } from "@/lib/constants";

/**
 * Full-viewport stats with scroll-driven reveal.
 * Each stat takes emphasis with massive typography.
 */
export default function StatsV4() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-32 px-4">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{ backgroundSize: "60%", opacity: 0.04 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Le SCBT en chiffres
            </span>
            <div className="h-[2px] w-8 bg-gold" />
          </div>
        </motion.div>

        {/* Stats - massive */}
        <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4">
          {KEY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-center"
            >
              {/* Divider */}
              {index !== 0 && (
                <div className="absolute top-1/2 left-0 hidden h-20 w-[1px] -translate-y-1/2 bg-gray-100 md:block" />
              )}

              <div className="font-[family-name:var(--font-verbatim)] text-7xl font-black tracking-tighter text-navy-deep md:text-9xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-4">
                <div className="mx-auto mb-2 h-[2px] w-6 bg-gold" />
                <p className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
