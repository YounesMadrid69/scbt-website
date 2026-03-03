"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { NEWS_ARTICLES, CATEGORY_COLORS } from "@/lib/constants";

export default function NewsV3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const featured = NEWS_ARTICLES[0];
  const rest = NEWS_ARTICLES.slice(1);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-alt py-28 px-4">
      {/* Background watermark */}
      <motion.div
        style={{ x: bgX }}
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[18vw] font-black uppercase leading-none tracking-tighter text-white">
          ACTU
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Les dernières infos
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.82] tracking-tighter text-navy-deep md:text-8xl">
              ACTUALITÉS
            </h2>
          </div>
          <a href="#" className="hidden font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:text-blue-primary md:block">
            Tout voir &rsaquo;
          </a>
        </motion.div>

        {/* Editorial layout - asymmetric */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Featured - big */}
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative cursor-pointer overflow-hidden lg:col-span-7"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-blue-primary/70 to-navy-deep transition-transform duration-700 group-hover:scale-105" />
              <div className="noise-overlay absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <span className={cn(
                  "mb-4 w-fit px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white",
                  CATEGORY_COLORS[featured.category] || "bg-blue-accent"
                )}>
                  {featured.category}
                </span>
                <h3 className="max-w-lg font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-4xl lg:text-5xl">
                  {featured.title}
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-[2px] w-6 bg-gold" />
                  <time className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-white/40">
                    {formatDate(featured.date)}
                  </time>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Side articles - stacked */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="group flex cursor-pointer items-center gap-5 border-b border-gray-200/60 pb-4 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden md:h-24 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/30 to-navy-deep transition-transform duration-500 group-hover:scale-110" />
                  <div className="noise-overlay absolute inset-0 opacity-50" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <span className={cn(
                    "mb-1.5 inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white",
                    CATEGORY_COLORS[article.category] || "bg-blue-accent"
                  )}>
                    {article.category}
                  </span>
                  <h4 className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase leading-tight tracking-wide text-navy-deep transition-colors group-hover:text-blue-primary md:text-base">
                    {article.title}
                  </h4>
                  <time className="mt-1 block font-[family-name:var(--font-verbatim)] text-[10px] text-gray-400">
                    {formatDate(article.date)}
                  </time>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
