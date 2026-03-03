"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { NEWS_ARTICLES, CATEGORY_COLORS } from "@/lib/constants";

/**
 * Stacked sticky cards.
 * Each article card pins and the next one slides over it.
 */

function StickyCard({
  article,
  index,
  total,
}: {
  article: typeof NEWS_ARTICLES[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // Slight scale-down as next card comes over
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <div ref={cardRef} className="h-[90vh]" style={{ zIndex: total - index }}>
      <motion.article
        style={{ scale, filter: useTransform(brightness, (v) => `brightness(${v})`) }}
        className="sticky top-[10vh] mx-auto h-[80vh] max-w-6xl cursor-pointer overflow-hidden rounded-2xl"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-blue-primary/60 to-navy-deep" />
        <div className="noise-overlay absolute inset-0" />

        {/* Card number - giant */}
        <div className="absolute top-8 right-8">
          <span className="font-[family-name:var(--font-verbatim)] text-[120px] font-black leading-none tracking-tighter text-white/[0.04] md:text-[180px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content - bottom left */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent p-8 md:p-14">
          <span className={cn(
            "mb-4 w-fit px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white",
            CATEGORY_COLORS[article.category] || "bg-blue-accent"
          )}>
            {article.category}
          </span>

          <h3 className="max-w-2xl font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.88] tracking-tight text-white md:text-6xl lg:text-7xl">
            {article.title}
          </h3>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] w-8 bg-gold" />
            <time className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/40">
              {formatDate(article.date)}
            </time>
          </div>

          <div className="mt-8">
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-white/30 transition-colors hover:text-white/60">
              Lire l&apos;article &rsaquo;
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function StackedNewsV4() {
  return (
    <section className="relative bg-bg-alt px-4 py-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Les dernières infos
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
            ACTUALITÉS
          </h2>
        </motion.div>
      </div>

      {/* Stacked cards */}
      {NEWS_ARTICLES.slice(0, 4).map((article, index) => (
        <StickyCard
          key={article.id}
          article={article}
          index={index}
          total={4}
        />
      ))}
    </section>
  );
}
