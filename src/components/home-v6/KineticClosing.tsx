"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const PARTNERS = [
  { name: "Kappa" },
  { name: "Olympique Lyonnais" },
  { name: "MySalesAcademy" },
  { name: "Ville de Bron" },
  { name: "District du Rhone" },
  { name: "Credit Agricole" },
] as const;

const KINETIC_LINES = [
  {
    text: "CREER LE CLUB",
    from: "0%",
    to: "10%",
    size: "text-[10vw]",
    opacity: "text-navy-deep/[0.04]",
  },
  {
    text: "DE DEMAIN",
    from: "0%",
    to: "-15%",
    size: "text-[12vw]",
    opacity: "text-navy-deep/[0.06]",
  },
  {
    text: "VIVRE ENSEMBLE",
    from: "-5%",
    to: "10%",
    size: "text-[8vw]",
    opacity: "text-navy-deep/[0.03]",
  },
  {
    text: "BRON TERRAILLON",
    from: "5%",
    to: "-10%",
    size: "text-[9vw]",
    opacity: "text-navy-deep/[0.05]",
  },
  {
    text: "DEPUIS 1964",
    from: "-3%",
    to: "8%",
    size: "text-[11vw]",
    opacity: "text-navy-deep/[0.04]",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Kinetic line component                                            */
/* ------------------------------------------------------------------ */

function KineticLine({
  line,
  scrollYProgress,
}: {
  line: (typeof KINETIC_LINES)[number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const x = useTransform(scrollYProgress, [0, 1], [line.from, line.to]);

  return (
    <motion.div style={{ x }} className="whitespace-nowrap">
      <span
        className={`select-none font-[family-name:var(--font-verbatim)] font-black uppercase leading-[0.85] tracking-tighter ${line.size} ${line.opacity}`}
      >
        {line.text}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  KineticClosing                                                    */
/* ------------------------------------------------------------------ */

export default function KineticClosing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Gold line width animation */
  const goldLineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);
  const smoothGoldLine = useSpring(goldLineWidth, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-32"
    >
      {/* ============================================ */}
      {/*  Kinetic typography field                    */}
      {/* ============================================ */}
      <div className="pointer-events-none relative flex flex-col items-center justify-center gap-0">
        {KINETIC_LINES.map((line, index) => (
          <KineticLine
            key={index}
            line={line}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* ============================================ */}
      {/*  Overlaid center content                     */}
      {/* ============================================ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
          {/* Gold line above partners */}
          <div className="mx-auto mb-12 flex justify-center">
            <motion.div
              className="h-[2px] bg-gold"
              style={{ width: smoothGoldLine }}
            />
          </div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-[2px] w-6 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Nos partenaires
              </span>
              <div className="h-[2px] w-6 bg-gold" />
            </div>
          </motion.div>

          {/* Partners grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-center justify-center border border-gray-100 bg-white/80 px-4 py-5 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
              >
                <span className="text-center font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors group-hover:text-navy-deep">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Club address */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center font-[family-name:var(--font-montserrat)] text-xs text-gray-400"
          >
            8 rue Marcel Cerdan, 69500 Bron
          </motion.p>

          {/* Deco dots */}
          <Image
            src="/images/deco-dots.svg"
            alt=""
            width={60}
            height={60}
            className="pointer-events-none absolute -right-16 -bottom-8 opacity-[0.06]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
