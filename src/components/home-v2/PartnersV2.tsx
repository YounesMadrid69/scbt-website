"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

export default function PartnersV2() {
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative overflow-hidden border-t-[3px] border-blue-primary/10 bg-white py-20 px-4">
      {/* Accent stripe top */}
      <div className="absolute top-0 left-0 h-[3px] w-32 bg-blue-primary" />

      {/* Deco chevrons */}
      <div className="pointer-events-none absolute top-8 right-12 hidden opacity-10 md:block">
        <Image src="/images/deco-chevrons-outline.svg" alt="" width={60} height={40} />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase tracking-tight text-navy-deep md:text-5xl">
            PARTENAIRES
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-12 bg-gold" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="animate-marquee flex items-center gap-12">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="card-cut-corner flex h-[70px] w-[140px] flex-shrink-0 items-center justify-center bg-bg-alt opacity-50 transition-all duration-300 hover:opacity-100 hover:shadow-lg"
            >
              <span className="text-center font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gray-500">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
