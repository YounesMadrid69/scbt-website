"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

export default function PartnersV3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20">
      {/* Top line */}
      <div className="mx-auto mb-12 max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <h2 className="font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tighter text-navy-deep md:text-4xl">
            Partenaires
          </h2>
          <div className="h-[2px] flex-1 bg-gray-100" />
        </motion.div>
      </div>

      {/* Row 1 - scroll left */}
      <motion.div style={{ x: x1 }} className="mb-4 flex items-center gap-6 whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
          <div
            key={`r1-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center border border-gray-100 bg-white transition-all duration-300 hover:border-blue-primary/20 hover:shadow-md"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {partner.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 - scroll right */}
      <motion.div style={{ x: x2 }} className="flex items-center gap-6 whitespace-nowrap">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
          <div
            key={`r2-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center border border-gray-100 bg-white transition-all duration-300 hover:border-blue-primary/20 hover:shadow-md"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {partner.name}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
