"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";

type NewsCardProps = {
  title: string;
  category: string;
  image: string;
  date: string;
  featured?: boolean;
};

export default function NewsCard({
  title,
  category,
  image,
  date,
  featured = false,
}: NewsCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl",
        featured ? "row-span-2 h-full min-h-[400px]" : "h-[200px] md:h-[240px]"
      )}
    >
      {/* Background placeholder */}
      <div
        className="absolute inset-0 bg-navy transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 30%, rgba(11,20,38,0.95)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Fallback gradient when no image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/40 to-navy-deep/90" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-5">
        <span
          className={cn(
            "mb-3 w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase text-white",
            CATEGORY_COLORS[category] || "bg-blue-accent"
          )}
        >
          {category}
        </span>
        <h3
          className={cn(
            "font-[family-name:var(--font-verbatim)] font-semibold leading-tight text-white",
            featured ? "text-2xl md:text-3xl" : "text-base md:text-lg"
          )}
        >
          {title}
        </h3>
        <time className="mt-2 text-xs text-gray-400">{formatDate(date)}</time>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-accent/0 transition-colors duration-300 group-hover:bg-blue-accent/10" />
    </motion.article>
  );
}
