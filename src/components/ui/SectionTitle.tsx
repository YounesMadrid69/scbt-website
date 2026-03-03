"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  linkText,
  linkHref,
  align = "left",
  dark = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-10 flex items-end justify-between",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Deco chevrons accent */}
        {align !== "center" && (
          <img
            src="/images/deco-chevrons.svg"
            alt=""
            className={cn(
              "hidden h-8 w-auto md:block",
              dark ? "opacity-30 brightness-0 invert" : "opacity-20"
            )}
          />
        )}
        <div>
          {subtitle && (
            <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-[0.2em] text-gold">
              {subtitle}
            </span>
          )}
          <h2 className={cn(
            "font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl",
            dark ? "text-white" : "text-text-heading"
          )}>
            {title}
          </h2>
        </div>
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className={cn(
            "mt-4 font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider transition-colors md:mt-0",
            dark ? "text-blue-accent hover:text-blue-light" : "text-blue-accent hover:text-blue-light"
          )}
        >
          {linkText} &rarr;
        </Link>
      )}
    </motion.div>
  );
}
