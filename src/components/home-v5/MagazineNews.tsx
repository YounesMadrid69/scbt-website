"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { NEWS_ARTICLES, CATEGORY_COLORS } from "@/lib/constants";

/**
 * Editorial magazine spread layout.
 * Featured article is full-width cinematic.
 * Side articles overlap and cascade.
 */
export default function MagazineNews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const quoteX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const featured = NEWS_ARTICLES[0];
  const rest = NEWS_ARTICLES.slice(1);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-28">
      {/* Pull quote - giant text behind */}
      <motion.div
        style={{ x: quoteX }}
        className="pointer-events-none absolute top-1/3 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[12vw] font-black uppercase leading-none tracking-tighter text-gray-50">
          ACTUALITÉS
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Les dernières infos
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
              ACTU
            </h2>
            <a href="#" className="hidden font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:text-blue-primary md:block">
              Tout voir &rsaquo;
            </a>
          </div>
        </motion.div>

        {/* FEATURED - Full-width cinematic */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mb-8 cursor-pointer overflow-hidden"
        >
          <div className="relative aspect-[21/9] overflow-hidden md:aspect-[3/1]">
            <motion.div style={{ y: parallaxY }} className="absolute -inset-[10%]">
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-blue-primary/70 to-navy-deep transition-all duration-700 group-hover:scale-105" />
              <div className="noise-overlay absolute inset-0" />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/40 to-transparent" />

            <div className="absolute inset-0 flex items-center px-8 md:px-14">
              <div className="max-w-2xl">
                <span className={cn(
                  "mb-4 inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white",
                  CATEGORY_COLORS[featured.category] || "bg-blue-accent"
                )}>
                  {featured.category}
                </span>
                <h3 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.88] tracking-tight text-white md:text-6xl">
                  {featured.title}
                </h3>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-[2px] w-6 bg-gold" />
                  <time className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-white/40">
                    {formatDate(featured.date)}
                  </time>
                </div>
              </div>
            </div>

            {/* Issue number - big */}
            <div className="absolute bottom-6 right-8 md:right-14">
              <span className="font-[family-name:var(--font-verbatim)] text-[100px] font-black leading-none tracking-tighter text-white/[0.04] md:text-[150px]">
                01
              </span>
            </div>
          </div>
        </motion.article>

        {/* REST - Cascading cards that overlap */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotate: -0.5 }}
              className="group relative cursor-pointer overflow-hidden bg-navy-deep"
              style={{ marginTop: i % 2 === 0 ? 0 : 24 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/30 to-navy-deep transition-all duration-500 group-hover:scale-105" />
                <div className="noise-overlay absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />

                {/* Number */}
                <div className="absolute top-4 right-4">
                  <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black tracking-tighter text-white/[0.06]">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className={cn(
                    "mb-2 inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white",
                    CATEGORY_COLORS[article.category] || "bg-blue-accent"
                  )}>
                    {article.category}
                  </span>
                  <h4 className="font-[family-name:var(--font-verbatim)] text-lg font-black uppercase leading-[0.9] tracking-tight text-white">
                    {article.title}
                  </h4>
                  <time className="mt-2 block font-[family-name:var(--font-verbatim)] text-[10px] text-white/30">
                    {formatDate(article.date)}
                  </time>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
