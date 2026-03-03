"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Pinned manifesto section.
 * Each word highlights as you scroll through.
 */
const WORDS = [
  "Sportif.", "Éducatif.", "Social.",
  "Depuis", "1964,", "le", "SCBT", "forme",
  "les", "jeunes", "du", "quartier", "Terraillon.",
  "Plus", "qu'un", "club,", "une", "famille.",
];

function Word({ word, index, total, scrollYProgress }: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [4, 0]);

  const isAccent = ["Sportif.", "Éducatif.", "Social.", "SCBT", "famille."].includes(word);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.3em] ${
        isAccent
          ? "font-[family-name:var(--font-verbatim)] font-black text-blue-primary"
          : "font-[family-name:var(--font-montserrat)] font-medium text-navy-deep"
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function ManifestoV4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        {/* Lion watermark faint */}
        <div
          className="pointer-events-none absolute inset-0 lion-watermark-light"
          style={{ backgroundSize: "45%", backgroundPosition: "85% center", opacity: 0.04 }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-8 md:px-16">
          {/* Gold line progress */}
          <motion.div
            style={{ width: lineWidth }}
            className="mb-10 h-[2px] bg-gold"
          />

          <div className="text-3xl leading-relaxed md:text-5xl md:leading-relaxed lg:text-6xl lg:leading-relaxed">
            {WORDS.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i}
                total={WORDS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
