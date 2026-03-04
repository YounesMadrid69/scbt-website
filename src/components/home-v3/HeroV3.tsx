"use client";

import { motion } from "framer-motion";

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroV3() {
  return (
    <section className="relative h-svh min-h-[600px] overflow-hidden">
      {/* Background video */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-bg.png"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy-deep/65" />

      {/* Noise grain */}
      <div className="noise-overlay absolute inset-0 z-10" />

      {/* Main content */}
      <div className="relative z-20 flex h-full flex-col justify-end px-5 pb-24 sm:justify-center sm:px-8 sm:pb-0 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          {/* Pre-title */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 1, ease: [0.76, 0, 0.24, 1] as const }}
            className="mb-4 overflow-hidden sm:mb-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-[2px] w-8 bg-gold sm:w-12" />
              <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs sm:tracking-[0.4em]">
                Sporting Club Bron Terraillon
              </span>
            </div>
          </motion.div>

          {/* Giant split title */}
          <h1 className="overflow-hidden font-[family-name:var(--font-verbatim)] text-[11vw] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-[9vw] md:text-[8vw] lg:text-[6.5vw]">
            <SplitText text="CRÉER LE" />
            <br />
            <span className="inline-block">
              <SplitText text="CLUB DE " />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)" }}>
                <SplitText text="DEMAIN" />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-5 max-w-md sm:mt-8 sm:max-w-lg"
          >
            <p className="font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-white/50 sm:text-base md:text-lg">
              Accompagner les jeunes d&apos;aujourd&apos;hui.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.7 }}
            className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <a
              href="/le-club"
              className="bg-white px-7 py-3 font-[family-name:var(--font-verbatim)] text-xs font-black uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold sm:px-10 sm:py-4 sm:text-sm"
            >
              Découvrir
            </a>
            <a
              href="#calendrier"
              className="border border-white/20 px-7 py-3 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/60 transition-all hover:border-white hover:text-white sm:px-10 sm:py-4 sm:text-sm"
            >
              Calendrier
            </a>
          </motion.div>
        </div>
      </div>

      {/* Marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/5 bg-navy-deep/60 py-2.5 backdrop-blur-sm sm:py-3">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-6 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em] text-white/15 sm:mx-8 sm:text-sm sm:tracking-[0.3em]">
              SCBT &mdash; DEPUIS 1964 &mdash; BRON TERRAILLON &mdash; VIVRE ENSEMBLE &mdash;
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-16 right-8 z-30 hidden md:right-12 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-[9px] uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
