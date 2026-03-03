"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import CountUp from "@/components/ui/CountUp";
import { KEY_STATS } from "@/lib/constants";

export default function Stats() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-bg-alt py-24 px-4"
    >
      {/* Lion watermark background */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{
          backgroundSize: "50%",
          opacity: 0.12,
        }}
      />

      {/* Deco dots - top right */}
      <img src="/images/deco-dots.svg" alt="" className="pointer-events-none absolute top-8 right-8 hidden w-20 opacity-60 md:block" />

      {/* Deco chevrons - bottom left */}
      <img src="/images/deco-chevrons.svg" alt="" className="pointer-events-none absolute bottom-8 left-8 hidden w-24 opacity-15 md:block" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle title="LE SCBT EN CHIFFRES" align="center" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {KEY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center ${
                index !== 0 ? "md:border-l md:border-blue-primary/15" : ""
              }`}
            >
              <div className="font-[family-name:var(--font-verbatim)] text-5xl font-black tracking-tight text-navy-deep md:text-7xl">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
