"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Nike", color: "#111" },
  { name: "Crédit Agricole", color: "#006A4E" },
  { name: "Métropole de Lyon", color: "#E30045" },
  { name: "Groupama", color: "#00965E" },
  { name: "Décathlon", color: "#0066CC" },
  { name: "Mairie de Bron", color: "#1B4B8A" },
  { name: "FFF", color: "#002F6C" },
  { name: "AURA Football", color: "#E63312" },
];

// Double pour boucle infinie
const ITEMS = [...PARTNERS, ...PARTNERS];

export default function PartnersCarousel() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center sm:mb-14">
        <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
          Ils nous soutiennent
        </span>
        <h2 className="font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-navy-deep sm:text-4xl md:text-5xl">
          PARTENAIRES
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <motion.div
          className="flex w-max gap-8 sm:gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {ITEMS.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-sm border border-gray-100 bg-bg-alt px-4 transition-all hover:border-blue-primary/20 hover:shadow-md sm:h-20 sm:w-44"
            >
              <span
                className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
