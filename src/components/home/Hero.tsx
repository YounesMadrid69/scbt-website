"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/20 via-navy-deep/80 to-navy-deep" />

      {/* Lion watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[70vh] h-[70vh] opacity-[0.15]"
          style={{
            backgroundImage: "url('/images/lion-watermark.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
      >
        {/* Logo */}
        <motion.div variants={fadeInScale}>
          <Image
            src="/images/logo-scbt.png"
            alt="SCBT Logo"
            width={160}
            height={160}
            className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.h1
          variants={slideUp}
          className="font-[family-name:var(--font-verbatim)] text-6xl md:text-8xl font-black uppercase tracking-tight text-white"
        >
          DEPUIS 1964
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={slideUp}
          className="font-[family-name:var(--font-verbatim)] text-lg tracking-[0.3em] text-gold"
        >
          SPORTING CLUB BRON TERRAILLON
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={slideUp}>
          <Button href="/le-club" variant="outline-light" size="lg">
            Découvrir le club
          </Button>
        </motion.div>
      </motion.div>

      {/* Deco chevrons outline - bottom right */}
      <div className="pointer-events-none absolute bottom-24 right-8 hidden opacity-20 md:block">
        <Image src="/images/deco-chevrons-outline.svg" alt="" width={120} height={80} />
      </div>

      {/* Deco stripes - top left */}
      <div className="pointer-events-none absolute top-24 left-8 hidden opacity-10 md:block">
        <Image src="/images/deco-stripes.svg" alt="" width={100} height={80} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
