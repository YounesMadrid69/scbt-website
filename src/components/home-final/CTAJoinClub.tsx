"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const AUDIENCES = [
  {
    number: "01",
    title: "JOUEURS",
    subtitle: "De U5 à Seniors",
    description:
      "Rejoins une équipe, progresse et vis ta passion du football au quotidien.",
  },
  {
    number: "02",
    title: "PARENTS",
    subtitle: "Accompagnez vos enfants",
    description:
      "Intégrez une communauté bienveillante et participez à l'aventure sportive de vos enfants.",
  },
  {
    number: "03",
    title: "BENEVOLES",
    subtitle: "Faites vivre le club",
    description:
      "Le SCBT a besoin de vous. Chaque contribution compte pour construire le club de demain.",
  },
] as const;

const HEADLINE_WORDS = ["REJOIGNEZ", "L'AVENTURE", "SCBT"];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  CTAJoinClub                                                       */
/* ------------------------------------------------------------------ */

export default function CTAJoinClub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep py-20 sm:py-28 md:py-36"
    >
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Ghost text */}
      <motion.div
        style={{ x: ghostX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[25vw] font-black uppercase leading-none tracking-tighter text-white/[0.02]">
          REJOINDRE
        </span>
      </motion.div>

      {/* Lion watermark */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/images/lion-watermark.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "35%",
          backgroundPosition: "90% center",
          opacity: 0.03,
        }}
      />

      {/* Deco */}
      <Image
        src="/images/deco-slashes.svg"
        alt=""
        width={100}
        height={80}
        className="pointer-events-none absolute bottom-12 left-12 hidden opacity-[0.06] md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Headline */}
        <div className="mb-12 text-center sm:mb-16 md:mb-20">
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
            <div className="h-[2px] w-8 bg-gold" />
          </div>

          <div className="overflow-hidden">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`mr-[0.25em] inline-block font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.85] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl ${
                  word === "SCBT"
                    ? "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]"
                    : "text-white"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-5 max-w-lg font-[family-name:var(--font-montserrat)] text-sm text-white/40 sm:mt-6 sm:text-base md:text-lg"
          >
            Joueurs, parents, bénévoles : il y a une place pour chacun au SCBT.
          </motion.p>
        </div>

        {/* Audience cards */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-12 grid grid-cols-1 gap-4 sm:mb-16 md:grid-cols-3 md:gap-6"
        >
          {AUDIENCES.map((audience) => (
            <motion.div
              key={audience.title}
              variants={cardVariants}
              className="group relative overflow-hidden border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.05] sm:p-8 md:p-10"
            >
              {/* Number watermark */}
              <span className="pointer-events-none absolute top-2 right-4 select-none font-[family-name:var(--font-verbatim)] text-[80px] font-black leading-none tracking-tighter text-white/[0.03] sm:text-[100px] md:text-[120px]">
                {audience.number}
              </span>

              <div className="relative z-10">
                <h3 className="mb-1.5 font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase tracking-tight text-white sm:mb-2 sm:text-3xl md:text-4xl">
                  {audience.title}
                </h3>
                <span className="mb-3 block font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:mb-4 sm:text-[11px]">
                  {audience.subtitle}
                </span>
                <p className="font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-white/40">
                  {audience.description}
                </p>
              </div>

              {/* Gold bottom bar */}
              <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gold transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-gold px-8 py-3.5 font-[family-name:var(--font-verbatim)] text-xs font-black uppercase tracking-wider text-navy-deep transition-all duration-300 hover:bg-white sm:px-12 sm:py-4 sm:text-sm"
          >
            Nous rejoindre
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              &rarr;
            </span>
          </a>
          <p className="mt-4 font-[family-name:var(--font-montserrat)] text-[11px] text-white/20 sm:text-xs">
            Inscriptions ouvertes pour la saison 2026-2027
          </p>
        </motion.div>
      </div>
    </section>
  );
}
