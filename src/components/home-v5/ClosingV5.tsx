"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

/**
 * Closing section.
 * Partners in a clean grid + giant closing statement that builds on scroll.
 */
export default function ClosingV5() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const closingX = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"]);
  const closingOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Partners */}
      <div className="mx-auto max-w-7xl px-8 pt-24 pb-16 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <h3 className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tighter text-navy-deep">
            Partenaires
          </h3>
          <div className="h-[1px] flex-1 bg-gray-100" />
        </motion.div>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex aspect-[3/2] items-center justify-center border border-gray-100 transition-all duration-300 hover:border-blue-primary/20 hover:shadow-lg"
            >
              <span className="text-center font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-300 transition-colors group-hover:text-gray-600">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Giant closing marquee */}
      <div className="relative overflow-hidden border-t border-gray-100 py-16">
        <motion.div
          style={{ x: closingX, opacity: closingOpacity }}
          className="whitespace-nowrap"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-[10vw] font-black uppercase leading-none tracking-tighter text-navy-deep/[0.06]">
            CRÉER LE CLUB DE DEMAIN &mdash; VIVRE ENSEMBLE &mdash; DEPUIS 1964 &mdash; BRON TERRAILLON &mdash;
          </span>
        </motion.div>

        {/* Centered statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 -mt-8 text-center"
        >
          <div className="mx-auto mb-4 h-[2px] w-8 bg-gold" />
          <p className="font-[family-name:var(--font-verbatim)] text-lg font-bold uppercase tracking-wider text-navy-deep md:text-xl">
            Sporting Club Bron Terraillon
          </p>
          <p className="mt-1 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
            8 rue Marcel Cerdan, 69500 Bron
          </p>
        </motion.div>
      </div>
    </section>
  );
}
