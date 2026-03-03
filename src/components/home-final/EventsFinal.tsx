"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CLUB_EVENTS, EVENT_CATEGORY_LABELS } from "@/lib/constants";
import type { ClubEvent } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d
      .toLocaleDateString("fr-FR", { month: "long" })
      .toUpperCase(),
  };
}

/* ------------------------------------------------------------------ */
/*  Featured Event Card — 3D tilt on hover                            */
/* ------------------------------------------------------------------ */

function FeaturedEventCard({ event }: { event: ClubEvent }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const { day, month } = formatEventDate(event.date);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -8, rotateY: x * 8 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      className="group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative flex min-h-[280px] flex-col overflow-hidden sm:min-h-[340px] lg:min-h-[400px] lg:flex-row"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Date side */}
        <div className="relative flex items-center justify-center bg-bg-alt px-8 py-10 lg:w-[35%] lg:py-0">
          <div className="text-center lg:text-left">
            <span className="block font-[family-name:var(--font-verbatim)] text-[80px] font-black leading-none tracking-tighter text-navy-deep sm:text-[100px] lg:text-[140px]">
              {day}
            </span>
            <span className="block font-[family-name:var(--font-verbatim)] text-xl font-bold uppercase tracking-wider text-navy-deep/30 sm:text-2xl lg:text-3xl">
              {month}
            </span>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold lg:mx-0" />
          </div>
        </div>

        {/* Content side */}
        <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-gradient-to-br from-navy-deep via-navy-deep to-blue-primary/80 p-6 sm:p-8 lg:p-12">
          <div className="noise-overlay absolute inset-0" />
          <div className="relative z-10">
            <span className="mb-3 inline-block bg-gold px-3 py-1 font-[family-name:var(--font-verbatim)] text-[10px] font-black uppercase tracking-wider text-navy-deep sm:mb-4">
              {EVENT_CATEGORY_LABELS[event.category]}
            </span>
            <h3 className="mb-3 font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase leading-[0.9] tracking-tight text-white sm:mb-4 sm:text-3xl lg:text-4xl">
              {event.title}
            </h3>
            <p className="mb-5 max-w-md font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-white/50 sm:mb-6">
              {event.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/40">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-4 bg-gold" />
                <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider">
                  {event.time}
                  {event.endTime ? ` — ${event.endTime}` : ""}
                </span>
              </div>
              <span className="font-[family-name:var(--font-montserrat)] text-xs">
                {event.location}
              </span>
            </div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 bg-blue-primary/0 transition-colors duration-500 group-hover:bg-blue-primary/10" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event Row                                                         */
/* ------------------------------------------------------------------ */

const rowVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function EventRow({ event, isLast }: { event: ClubEvent; isLast: boolean }) {
  const { day, month } = formatEventDate(event.date);

  return (
    <motion.div variants={rowVariants}>
      <div className="group flex cursor-pointer items-stretch gap-4 py-5 transition-colors hover:bg-bg-alt/50 sm:gap-6 sm:py-6 md:gap-10 md:py-8">
        {/* Date column */}
        <div className="flex w-16 flex-shrink-0 flex-col items-start sm:w-20 md:w-32">
          <span className="font-[family-name:var(--font-verbatim)] text-[40px] font-black leading-none tracking-tighter text-navy-deep transition-colors group-hover:text-blue-primary sm:text-[52px] md:text-[72px]">
            {day}
          </span>
          <span className="font-[family-name:var(--font-verbatim)] text-[8px] font-bold uppercase tracking-[0.2em] text-navy-deep/30 sm:text-[10px] md:text-xs">
            {month}
          </span>
          <div className="mt-2 h-[2px] w-6 bg-gold transition-all duration-300 group-hover:w-12" />
        </div>

        {/* Content column */}
        <div className="flex flex-1 flex-col justify-center overflow-hidden">
          <div className="mb-1.5 flex items-center gap-3 sm:mb-2">
            <span className="inline-block bg-navy-deep px-2 py-0.5 font-[family-name:var(--font-verbatim)] text-[8px] font-black uppercase tracking-wider text-white sm:text-[9px]">
              {EVENT_CATEGORY_LABELS[event.category]}
            </span>
            <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-medium text-gray-400 sm:text-[11px]">
              {event.time}
              {event.endTime ? ` — ${event.endTime}` : ""}
            </span>
          </div>
          <h3 className="truncate font-[family-name:var(--font-verbatim)] text-base font-bold uppercase tracking-tight text-navy-deep transition-colors group-hover:text-blue-primary sm:text-lg md:text-xl">
            {event.title}
          </h3>
          <p className="mt-1 hidden font-[family-name:var(--font-montserrat)] text-sm text-gray-400 md:block">
            {event.description}
          </p>
          <span className="mt-1 font-[family-name:var(--font-montserrat)] text-[11px] text-gray-400 sm:mt-2 sm:text-xs">
            {event.location}
          </span>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <span className="text-lg text-gray-300 transition-all group-hover:translate-x-2 group-hover:text-gold">
            &rarr;
          </span>
        </div>
      </div>

      {/* Divider */}
      {!isLast && (
        <div className="relative h-[1px] bg-gray-100">
          <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold/40" />
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  EventsFinal                                                       */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function EventsFinal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  const featured = CLUB_EVENTS.find((e) => e.featured);
  const others = CLUB_EVENTS.filter((e) => !e.featured);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-24 md:py-32"
      id="evenements"
    >
      {/* Ghost text */}
      <motion.div
        style={{ x: ghostX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-navy-deep/[0.02]">
          EVENEMENTS
        </span>
      </motion.div>

      {/* Deco */}
      <Image
        src="/images/deco-dots.svg"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute top-16 right-8 hidden opacity-[0.04] md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14 md:mb-16"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              A venir
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[0.85] tracking-tighter text-navy-deep sm:text-5xl md:text-6xl lg:text-8xl">
            EVENEMENTS
          </h2>
        </motion.div>

        {/* Featured event */}
        {featured && <FeaturedEventCard event={featured} />}

        {/* Event rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 flex flex-col sm:mt-12"
        >
          {others.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              isLast={index === others.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
