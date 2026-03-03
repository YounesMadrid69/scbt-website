"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { NEWS_ARTICLES, CATEGORY_COLORS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function StreetNewsCard({
  title,
  category,
  date,
  featured = false,
}: {
  title: string;
  category: string;
  image: string;
  date: string;
  featured?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -6, rotate: featured ? 0 : -0.3 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden",
        featured
          ? "card-cut-lg row-span-2 h-full min-h-[480px]"
          : "card-cut-corner h-[220px] md:h-[260px]"
      )}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-blue-primary/80 to-navy-deep transition-all duration-500 group-hover:scale-105" />

      {/* Noise grain */}
      <div className="noise-overlay absolute inset-0" />

      {/* Stripe accent - top right */}
      {featured && (
        <div className="absolute top-0 right-0 h-24 w-24 stripe-pattern opacity-10" />
      )}

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6">
        {/* Category badge - street style */}
        <span
          className={cn(
            "mb-3 w-fit px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white",
            CATEGORY_COLORS[category] || "bg-blue-accent"
          )}
        >
          {category}
        </span>

        <h3
          className={cn(
            "font-[family-name:var(--font-verbatim)] font-black uppercase leading-[0.95] tracking-tight text-white",
            featured ? "text-3xl md:text-4xl" : "text-lg md:text-xl"
          )}
        >
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-gold" />
          <time className="font-[family-name:var(--font-verbatim)] text-[11px] font-bold uppercase tracking-wider text-white/50">
            {formatDate(date)}
          </time>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-primary/0 transition-colors duration-300 group-hover:bg-blue-primary/15" />
    </motion.article>
  );
}

export default function NewsV2() {
  return (
    <section className="relative overflow-hidden bg-bg-alt py-24 px-4">
      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
          <polygon points="0,0 1440,40 0,40" fill="currentColor" className="text-white" />
        </svg>
      </div>

      {/* Deco chevrons */}
      <div className="pointer-events-none absolute bottom-12 right-8 hidden opacity-10 md:block">
        <Image src="/images/deco-chevrons-outline.svg" alt="" width={80} height={60} />
      </div>

      <div className="mx-auto max-w-7xl pt-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div className="flex items-center gap-5">
            <Image src="/images/deco-chevrons.svg" alt="" width={36} height={36} className="hidden opacity-20 md:block" />
            <div>
              <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Les dernières infos
              </span>
              <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tight text-navy-deep md:text-7xl">
                ACTU
              </h2>
            </div>
          </div>
          <a
            href="#"
            className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-blue-primary transition-colors hover:text-blue-light"
          >
            Voir tout &rsaquo;
          </a>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {NEWS_ARTICLES.map((article, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <StreetNewsCard
                  title={article.title}
                  category={article.category}
                  image={article.image}
                  date={article.date}
                  featured={isFeatured}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
