"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

/**
 * Closing section with partners + giant scroll marquee.
 */
export default function FooterMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24">
      {/* Partners */}
      <div className="mx-auto mb-20 max-w-7xl px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-4"
        >
          <h3 className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tighter text-navy-deep">
            Partenaires
          </h3>
          <div className="h-[1px] flex-1 bg-gray-100" />
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex h-14 w-28 items-center justify-center opacity-30 transition-opacity duration-300 hover:opacity-80"
            >
              <span className="text-center font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Giant closing marquee */}
      <motion.div style={{ x }} className="whitespace-nowrap border-y border-gray-100 py-6">
        <span className="font-[family-name:var(--font-verbatim)] text-[12vw] font-black uppercase leading-none tracking-tighter text-gray-50 md:text-[10vw]">
          CRÉER LE CLUB DE DEMAIN &mdash; ACCOMPAGNER LES JEUNES D&apos;AUJOURD&apos;HUI &mdash; CRÉER LE CLUB DE DEMAIN &mdash;
        </span>
      </motion.div>
    </section>
  );
}
