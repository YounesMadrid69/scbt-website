"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function ClubHero() {
  return (
    <section className="relative flex h-[50vh] min-h-[400px] items-end">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/30 to-navy-deep" />

      {/* Overlay gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />

      {/* Deco stripes - top right */}
      <img src="/images/deco-stripes.svg" alt="" className="pointer-events-none absolute top-20 right-8 hidden w-32 opacity-15 md:block" />

      {/* Deco slashes - bottom right */}
      <img src="/images/deco-slashes.svg" alt="" className="pointer-events-none absolute bottom-16 right-16 hidden w-28 opacity-20 md:block" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12"
      >
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-verbatim)] text-sm text-gray-400"
        >
          Accueil / Le Club
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-verbatim)] text-7xl font-black uppercase tracking-tight text-white md:text-9xl"
        >
          LE CLUB
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-verbatim)] text-lg tracking-wider text-gold"
        >
          Sporting Club Bron Terraillon
        </motion.p>
      </motion.div>
    </section>
  );
}
