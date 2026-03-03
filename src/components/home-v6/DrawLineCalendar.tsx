"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FFFMatch } from "@/lib/fff-api";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLORS: Record<string, string> = {
  Senior: "bg-blue-primary",
  "U19 - U18": "bg-blue-light",
  "U17 - U16": "bg-emerald-500",
  "U15 - U14": "bg-amber-500",
  "U15 F - U14 F": "bg-pink-500",
  "U13 - U12": "bg-purple-500",
  "U13 F - U12 F": "bg-pink-400",
  "U13 - U12 Futsal": "bg-orange-500",
  "Foot Loisir": "bg-teal-500",
};

const MAX_MATCHES = 10;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d
      .toLocaleDateString("fr-FR", { month: "short" })
      .toUpperCase()
      .replace(".", ""),
  };
}

function isSCBT(name: string) {
  return name.includes("SCBT") || name.includes("S.C.B.T");
}

/* ------------------------------------------------------------------ */
/*  SVG draw line                                                      */
/* ------------------------------------------------------------------ */

function DrawLine({
  height,
  nodePositions,
  scrollYProgress,
}: {
  height: number;
  nodePositions: number[];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalLength = height;

  // Smooth the draw progress
  const rawOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [totalLength, 0]
  );
  const smoothOffset = useSpring(rawOffset, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.5,
  });

  return (
    <svg
      className="absolute left-0 top-0 h-full w-16 md:w-20"
      viewBox={`0 0 80 ${height}`}
      preserveAspectRatio="none"
      fill="none"
      style={{ overflow: "visible" }}
    >
      {/* Track line (ghost) */}
      <line
        x1="40"
        y1="0"
        x2="40"
        y2={height}
        stroke="currentColor"
        strokeWidth="1"
        className="text-gray-200"
      />

      {/* Drawn line (gold) */}
      <motion.line
        x1="40"
        y1="0"
        x2="40"
        y2={height}
        stroke="#D4A843"
        strokeWidth="2"
        strokeDasharray={totalLength}
        style={{ strokeDashoffset: smoothOffset }}
        strokeLinecap="round"
      />

      {/* Node circles at each match position */}
      {nodePositions.map((yPos, i) => (
        <NodeCircle
          key={i}
          cy={yPos}
          index={i}
          scrollYProgress={scrollYProgress}
          totalNodes={nodePositions.length}
        />
      ))}
    </svg>
  );
}

function NodeCircle({
  cy,
  index,
  scrollYProgress,
  totalNodes,
}: {
  cy: number;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalNodes: number;
}) {
  // Activate when the drawn line reaches this node
  const activationPoint = (index + 0.3) / totalNodes;
  const fillOpacity = useTransform(
    scrollYProgress,
    [activationPoint - 0.05, activationPoint + 0.02],
    [0, 1]
  );
  const circleScale = useTransform(
    scrollYProgress,
    [activationPoint - 0.05, activationPoint, activationPoint + 0.03],
    [0.4, 1.3, 1]
  );

  return (
    <motion.circle
      cx="40"
      cy={cy}
      r="5"
      fill="#D4A843"
      stroke="#fff"
      strokeWidth="2"
      style={{ opacity: fillOpacity, scale: circleScale }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Match card                                                         */
/* ------------------------------------------------------------------ */

function MatchCard({
  match,
  index,
}: {
  match: FFFMatch;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px 0px" });
  const { day, month } = formatDate(match.date);
  const isPlayed = match.status === "played";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{
        duration: 0.6,
        delay: 0.08 * (index % 4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Connector line from node to card */}
      <div className="absolute -left-8 top-1/2 hidden h-[1px] w-8 bg-gold/30 md:block" />

      <div className="overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        {/* Top accent bar */}
        <div
          className={cn(
            "h-[3px] w-full",
            COLORS[match.category] || "bg-blue-primary"
          )}
        />

        <div className="flex items-stretch">
          {/* Date block */}
          <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r border-gray-100 bg-gray-50/50 py-4 md:w-24">
            <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black leading-none tracking-tighter text-navy-deep">
              {day}
            </span>
            <span className="mt-1 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
              {month}
            </span>
          </div>

          {/* Match details */}
          <div className="flex flex-1 flex-col justify-center px-5 py-4">
            {/* Teams */}
            <div className="space-y-1.5">
              {/* Home */}
              <div className="flex items-center gap-2.5">
                {match.homeLogo ? (
                  <Image
                    src={match.homeLogo}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gray-100">
                    <span className="text-[7px] font-black text-gray-400">
                      {match.homeTeam.substring(0, 3)}
                    </span>
                  </div>
                )}
                <span
                  className={cn(
                    "font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wide",
                    isSCBT(match.homeTeam)
                      ? "font-black text-navy-deep"
                      : "font-bold text-gray-500"
                  )}
                >
                  {match.homeTeam}
                </span>
                {isPlayed && match.homeScore !== null && (
                  <span className="ml-auto font-[family-name:var(--font-verbatim)] text-lg font-black text-navy-deep">
                    {match.homeScore}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="ml-[30px] h-[1px] w-12 bg-gray-100" />

              {/* Away */}
              <div className="flex items-center gap-2.5">
                {match.awayLogo ? (
                  <Image
                    src={match.awayLogo}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gray-100">
                    <span className="text-[7px] font-black text-gray-400">
                      {match.awayTeam.substring(0, 3)}
                    </span>
                  </div>
                )}
                <span
                  className={cn(
                    "font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wide",
                    isSCBT(match.awayTeam)
                      ? "font-black text-navy-deep"
                      : "font-bold text-gray-500"
                  )}
                >
                  {match.awayTeam}
                </span>
                {isPlayed && match.awayScore !== null && (
                  <span className="ml-auto font-[family-name:var(--font-verbatim)] text-lg font-black text-navy-deep">
                    {match.awayScore}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right info */}
          <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-2 border-l border-gray-100 py-4 md:w-24">
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold text-gray-300">
              {match.time?.replace("H", ":")}
            </span>
            <span
              className={cn(
                "px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white",
                COLORS[match.category] || "bg-blue-primary"
              )}
            >
              {match.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                   */
/* ------------------------------------------------------------------ */

function Skeleton() {
  return (
    <div className="space-y-6 pl-20 md:pl-28">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-[110px] animate-pulse bg-white shadow-sm"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DrawLineCalendar() {
  const [matches, setMatches] = useState<FFFMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fetch match data
  useEffect(() => {
    fetch("/api/matches")
      .then((r) => r.json())
      .then((d) => setMatches(d.matches || []))
      .catch((err) => console.error("Failed to load matches:", err))
      .finally(() => setLoading(false));
  }, []);

  const displayed = matches.slice(0, MAX_MATCHES);

  // Scroll progress for the draw animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Compute node positions and total list height
  // Each card is ~120px high with ~24px gap = ~144px per card
  const cardHeight = 120;
  const cardGap = 24;
  const totalHeight = displayed.length * (cardHeight + cardGap);

  const nodePositions = displayed.map(
    (_, i) => i * (cardHeight + cardGap) + cardHeight / 2
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-bg-alt py-24 px-4 md:py-32"
      id="calendrier"
    >
      {/* Background pattern */}
      <div
        className="stripe-pattern pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-6xl font-black uppercase leading-[0.85] tracking-tighter text-navy-deep md:text-8xl">
            CALENDRIER
          </h2>
        </motion.div>

        {/* Timeline + cards */}
        {loading ? (
          <Skeleton />
        ) : displayed.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-gray-400">
              Aucun match trouv&eacute;.
            </p>
          </div>
        ) : (
          <div className="relative" ref={listRef}>
            {/* SVG draw line */}
            <DrawLine
              height={totalHeight}
              nodePositions={nodePositions}
              scrollYProgress={scrollYProgress}
            />

            {/* Match cards */}
            <div
              className="relative ml-16 space-y-6 md:ml-24"
              style={{ minHeight: totalHeight }}
            >
              {displayed.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Footer link */}
        {!loading && matches.length > MAX_MATCHES && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="/calendrier"
              className="group flex items-center gap-3 border-b-2 border-navy-deep/10 pb-2 transition-colors hover:border-gold"
            >
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep">
                Voir tout le calendrier
              </span>
              <span className="font-[family-name:var(--font-montserrat)] text-xs text-gray-400">
                ({matches.length} matchs)
              </span>
              <svg
                className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
