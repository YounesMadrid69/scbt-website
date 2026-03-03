"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

/* ─── Single partner with stagger entrance ─── */
function PartnerItem({
  partner,
  index,
}: {
  partner: (typeof PARTNERS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex aspect-[3/2] items-center justify-center border border-gray-100 bg-white transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
    >
      <span className="text-center font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gray-300 transition-colors group-hover:text-navy-deep">
        {partner.name}
      </span>
    </motion.div>
  );
}

/* ─── Infinite loop marquee row ─── */
function MarqueeRow({
  text,
  direction,
  scrollYProgress,
  speed,
}: {
  text: string;
  direction: "left" | "right";
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  speed: number;
}) {
  const baseRange = direction === "left" ? ["5%", `-${speed}%`] : [`-${speed}%`, "5%"];
  const x = useTransform(scrollYProgress, [0, 1], baseRange);
  const smoothX = useSpring(x, { stiffness: 40, damping: 30 });

  return (
    <motion.div style={{ x: smoothX }} className="flex whitespace-nowrap">
      {[0, 1, 2].map((copy) => (
        <span
          key={copy}
          className="font-[family-name:var(--font-verbatim)] text-[8vw] font-black uppercase leading-none tracking-tighter text-navy-deep/[0.04]"
        >
          {text}&nbsp;&mdash;&nbsp;
        </span>
      ))}
    </motion.div>
  );
}

/* ─── Main closing section ─── */
export default function InfiniteClosing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

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
          <div className="h-[2px] w-8 bg-gold" />
          <h3 className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tighter text-navy-deep">
            Partenaires
          </h3>
          <div className="h-[1px] flex-1 bg-gray-100" />
        </motion.div>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {PARTNERS.map((partner, i) => (
            <PartnerItem key={partner.name} partner={partner} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee ribbons */}
      <div className="relative border-t border-gray-100 py-12 space-y-2">
        <MarqueeRow
          text="CRÉER LE CLUB DE DEMAIN"
          direction="left"
          scrollYProgress={scrollYProgress}
          speed={40}
        />
        <MarqueeRow
          text="VIVRE ENSEMBLE DEPUIS 1964"
          direction="right"
          scrollYProgress={scrollYProgress}
          speed={35}
        />
        <MarqueeRow
          text="SPORTING CLUB BRON TERRAILLON"
          direction="left"
          scrollYProgress={scrollYProgress}
          speed={45}
        />
      </div>

      {/* Centered closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 py-16 text-center"
      >
        <div className="mx-auto mb-4 h-[2px] w-8 bg-gold" />
        <p className="font-[family-name:var(--font-verbatim)] text-lg font-bold uppercase tracking-wider text-navy-deep md:text-xl">
          Sporting Club Bron Terraillon
        </p>
        <p className="mt-1 font-[family-name:var(--font-montserrat)] text-sm text-gray-400">
          8 rue Marcel Cerdan, 69500 Bron
        </p>

        {/* Gold final line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 h-[1px] w-32 origin-center bg-gold"
        />
      </motion.div>
    </section>
  );
}
