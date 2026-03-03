"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { KEY_STATS } from "@/lib/constants";

/**
 * Stats with slot machine digit rolling effect.
 * Each digit cascades down independently.
 */

function SlotDigit({ digit, delay }: { digit: string; delay: number }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimate(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  const isNumber = /\d/.test(digit);
  if (!isNumber) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay / 1000, duration: 0.3 }}
        className="inline-block"
      >
        {digit}
      </motion.span>
    );
  }

  const num = parseInt(digit);
  // Create the digit strip: 0-9 repeated twice, then land on target
  const digits = [...Array(10).keys(), ...Array(10).keys(), num];

  return (
    <div ref={ref} className="relative inline-block h-[1em] overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={animate ? { y: -(digits.length - 1) * 1 + "em" } : {}}
        transition={{ duration: 1.2 + Math.random() * 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col"
      >
        {digits.map((d, i) => (
          <span key={i} className="block h-[1em] leading-[1em]">
            {d}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SlotNumber({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const str = value.toLocaleString("fr-FR") + suffix;

  return (
    <span className="inline-flex">
      {str.split("").map((char, i) => (
        <SlotDigit key={i} digit={char} delay={delay + i * 80} />
      ))}
    </span>
  );
}

export default function SlotMachineStats() {
  return (
    <section className="relative overflow-hidden bg-white py-32 px-4">
      {/* Lion watermark */}
      <div
        className="pointer-events-none absolute inset-0 lion-watermark-light"
        style={{ backgroundSize: "50%", opacity: 0.03 }}
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

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-y-20 md:grid-cols-4">
          {KEY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {index !== 0 && (
                <div className="absolute top-1/2 left-0 hidden h-24 w-[1px] -translate-y-1/2 bg-gray-100 md:block" />
              )}

              <div className="font-[family-name:var(--font-verbatim)] text-7xl font-black tracking-tighter text-navy-deep md:text-9xl">
                <SlotNumber value={stat.value} suffix={stat.suffix} delay={index * 200} />
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
