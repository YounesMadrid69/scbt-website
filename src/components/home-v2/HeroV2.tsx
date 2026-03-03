"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 1.2 },
  },
};

export default function HeroV2() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-deep">
      {/* Noise grain */}
      <div className="noise-overlay absolute inset-0 z-10" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Dark overlay on top of image */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/90 via-navy-deep/80 to-blue-primary/40" />

      {/* Lion watermark - huge and bold */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[90vh] w-[90vh] opacity-[0.08]"
          style={{
            backgroundImage: "url('/images/lion-watermark.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Deco stripes - top right corner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute top-0 right-0 z-10 hidden md:block"
      >
        <div className="stripe-pattern h-40 w-40 opacity-10" />
      </motion.div>

      {/* Deco chevrons - repeating pattern left edge */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute top-1/3 left-6 z-10 hidden opacity-15 md:block"
      >
        <Image src="/images/deco-chevrons.svg" alt="" width={60} height={60} />
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex min-h-screen flex-col justify-end px-6 pb-24 md:px-12 lg:px-20"
      >
        {/* Top bar - club name small */}
        <motion.div
          variants={slideUp}
          className="absolute top-8 left-6 md:left-12 lg:left-20"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.4em] text-gold/80">
            Sporting Club Bron Terraillon
          </span>
        </motion.div>

        {/* Logo - absolute positioned */}
        <motion.div
          variants={slideUp}
          className="absolute top-6 right-6 md:right-12 lg:right-20"
        >
          <Image
            src="/images/logo-scbt.png"
            alt="SCBT"
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20"
            priority
          />
        </motion.div>

        {/* Giant title block */}
        <div className="max-w-5xl">
          <motion.div variants={clipReveal}>
            <span className="text-highlight mb-4 inline-block font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-[0.3em]">
              Depuis 1964
            </span>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="font-[family-name:var(--font-verbatim)] text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-white md:text-[10vw] lg:text-[8vw]"
          >
            CRÉER LE
            <br />
            CLUB DE
            <br />
            <span className="text-stroke text-transparent" style={{
              WebkitTextStroke: "2px white",
            }}>
              DEMAIN
            </span>
          </motion.h1>

          <motion.div variants={slideUp} className="mt-6 flex items-center gap-6">
            <div className="h-[3px] w-16 bg-gold" />
            <p className="font-[family-name:var(--font-montserrat)] text-sm text-gray-400 md:text-base">
              Accompagner les jeunes d&apos;aujourd&apos;hui.
            </p>
          </motion.div>

          {/* CTA - street style */}
          <motion.div variants={slideUp} className="mt-10 flex gap-4">
            <a
              href="/le-club"
              className="card-cut-corner bg-blue-primary px-8 py-4 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-light"
            >
              Découvrir le club
            </a>
            <a
              href="#calendrier"
              className="border-2 border-white/20 px-8 py-4 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-white/70 transition-all hover:border-gold hover:text-gold"
            >
              Calendrier
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
          <polygon points="0,60 1440,0 1440,60" fill="white" />
        </svg>
      </div>

      {/* Scroll line indicator */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-20 left-6 z-20 hidden origin-bottom md:block md:left-12 lg:left-20"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="h-16 w-[2px] bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
