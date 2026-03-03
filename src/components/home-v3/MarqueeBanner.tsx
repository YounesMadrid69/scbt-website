"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MarqueeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy-deep py-10 md:py-14"
    >
      <div className="noise-overlay absolute inset-0" />

      {/* Row 1 - moves left */}
      <motion.div style={{ x: x1 }} className="mb-3 whitespace-nowrap">
        <span className="font-[family-name:var(--font-verbatim)] text-[8vw] font-black uppercase leading-none tracking-tighter text-white/[0.04] md:text-[6vw]">
          SPORTIF &nbsp; ÉDUCATIF &nbsp; SOCIAL &nbsp; SPORTIF &nbsp; ÉDUCATIF &nbsp; SOCIAL &nbsp; SPORTIF &nbsp; ÉDUCATIF &nbsp; SOCIAL &nbsp;
        </span>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 flex items-center justify-center gap-8 px-8 md:gap-16">
        <div className="hidden h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10 md:block" />
        <div className="flex items-center gap-6 md:gap-12">
          {[
            { value: "450+", label: "Licenciés" },
            { value: "15", label: "Équipes" },
            { value: "1964", label: "Fondation" },
            { value: "60+", label: "Ans d'histoire" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block font-[family-name:var(--font-verbatim)] text-3xl font-black tracking-tighter text-white md:text-5xl">
                {stat.value}
              </span>
              <span className="block font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 md:text-[10px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="hidden h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10 md:block" />
      </div>

      {/* Row 2 - moves right */}
      <motion.div style={{ x: x2 }} className="mt-3 whitespace-nowrap">
        <span className="font-[family-name:var(--font-verbatim)] text-[8vw] font-black uppercase leading-none tracking-tighter text-white/[0.04] md:text-[6vw]">
          VIVRE ENSEMBLE &nbsp; BRON TERRAILLON &nbsp; VIVRE ENSEMBLE &nbsp; BRON TERRAILLON &nbsp; VIVRE ENSEMBLE &nbsp; BRON TERRAILLON &nbsp;
        </span>
      </motion.div>
    </section>
  );
}
