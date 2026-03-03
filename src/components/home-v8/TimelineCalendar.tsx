"use client";

import { motion } from "framer-motion";

/* ---------------------------------------------------------------
   Match data
--------------------------------------------------------------- */
interface Match {
  date: string;
  time: string;
  opponent: string;
  competition: string;
  home: boolean;
}

const MATCHES: Match[] = [
  {
    date: "15 MARS",
    time: "15:00",
    opponent: "FC Lyon",
    competition: "R\u00e9gional 1",
    home: true,
  },
  {
    date: "22 MARS",
    time: "18:00",
    opponent: "AS Saint-Priest",
    competition: "R\u00e9gional 1",
    home: false,
  },
  {
    date: "29 MARS",
    time: "15:00",
    opponent: "OL Futsal",
    competition: "Coupe Rh\u00f4ne",
    home: true,
  },
  {
    date: "05 AVRIL",
    time: "20:00",
    opponent: "ES V\u00e9nissieux",
    competition: "R\u00e9gional 1",
    home: true,
  },
  {
    date: "12 AVRIL",
    time: "15:00",
    opponent: "FC Villefranche",
    competition: "R\u00e9gional 1",
    home: false,
  },
  {
    date: "19 AVRIL",
    time: "18:00",
    opponent: "Lyon Duch\u00e8re",
    competition: "Coupe Rh\u00f4ne",
    home: true,
  },
];

/* ---------------------------------------------------------------
   Sub-component: single match card on the timeline
   Extracted to avoid hooks inside loops.
--------------------------------------------------------------- */
function TimelineMatch({
  match,
  index,
  side,
}: {
  match: Match;
  index: number;
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  const accentColor = match.home ? "bg-gold" : "bg-blue-primary";
  const indicatorColor = match.home ? "text-gold" : "text-blue-primary";
  const indicatorLabel = match.home ? "DOM" : "EXT";
  const matchTitle = match.home
    ? `SCBT vs ${match.opponent}`
    : `${match.opponent} vs SCBT`;

  return (
    <div
      className={`relative flex w-full items-center ${
        isLeft ? "justify-start" : "justify-end"
      }`}
    >
      {/* --- Card (left or right side) --- */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: "-60px" }}
        className={`relative w-[calc(50%-40px)] ${
          isLeft ? "mr-auto" : "ml-auto"
        }`}
      >
        <div className="group relative overflow-hidden border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
          {/* Accent bar (left edge of card) */}
          <div
            className={`absolute left-0 top-0 h-full w-[3px] ${accentColor}`}
          />

          <div className="py-5 pl-5 pr-4">
            {/* Top row: date + home/away indicator */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-verbatim)] text-2xl font-black uppercase leading-tight tracking-tight text-navy-deep md:text-3xl">
                  {match.date}
                </p>
                <p className="mt-0.5 font-[family-name:var(--font-montserrat)] text-xs text-gray-400">
                  {match.time}
                </p>
              </div>
              <span
                className={`font-[family-name:var(--font-verbatim)] text-[10px] font-black uppercase tracking-widest ${indicatorColor}`}
              >
                {indicatorLabel}
              </span>
            </div>

            {/* Match title */}
            <p className="mt-3 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wide text-navy-deep">
              {matchTitle}
            </p>

            {/* Competition badge */}
            <div className="mt-3">
              <span className="inline-block bg-bg-alt px-2.5 py-1 font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                {match.competition}
              </span>
            </div>
          </div>

          {/* Hover shimmer */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </div>
      </motion.div>

      {/* --- Connector line (from dot to card) --- */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: "-60px" }}
        className={`absolute top-1/2 h-px w-[40px] bg-gold/30 ${
          isLeft
            ? "left-[calc(50%-40px)] origin-right"
            : "right-[calc(50%-40px)] origin-left"
        }`}
        style={{ translateY: "-50%" }}
      />

      {/* --- Timeline dot (centered) --- */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {/* Pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40"
        />
        {/* Solid dot */}
        <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_8px_rgba(212,168,67,0.35)]" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main component
--------------------------------------------------------------- */
export default function TimelineCalendar() {
  return (
    <section className="relative overflow-hidden bg-white py-28 md:py-40">
      {/* Giant watermark behind heading */}
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none md:top-24">
        <span className="font-[family-name:var(--font-verbatim)] text-[15vw] font-black uppercase leading-none tracking-tighter text-navy-deep/[0.03]">
          MATCHS
        </span>
      </div>

      {/* Section header */}
      <div className="relative z-10 mx-auto mb-20 max-w-4xl px-6 text-center md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="mx-auto mb-4 h-[2px] w-8 bg-gold" />
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.4em] text-gold sm:text-xs">
            Prochains matchs
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mt-5 font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.9] tracking-tighter text-navy-deep md:text-7xl lg:text-8xl"
        >
          CALENDRIER
        </motion.h2>
      </div>

      {/* Timeline container */}
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Central vertical gold line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-0 z-[1] h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent"
        />

        {/* Match entries */}
        <div className="relative z-[2] flex flex-col gap-16 md:gap-20">
          {MATCHES.map((match, i) => (
            <TimelineMatch
              key={`${match.date}-${match.opponent}`}
              match={match}
              index={i}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Bottom fade-out on the timeline line */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Decorative bottom corner accents */}
      <div className="absolute bottom-8 left-8 h-10 w-[1px] origin-bottom bg-gold/15" />
      <div className="absolute bottom-8 left-8 h-[1px] w-10 origin-left bg-gold/15" />
      <div className="absolute bottom-8 right-8 h-10 w-[1px] origin-bottom bg-gold/15" />
      <div className="absolute bottom-8 right-8 h-[1px] w-10 origin-right bg-gold/15" />
    </section>
  );
}
