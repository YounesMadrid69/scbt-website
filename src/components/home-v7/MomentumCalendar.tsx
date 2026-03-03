"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useInView,
  MotionValue,
} from "framer-motion";
import { NEXT_MATCH } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Match {
  date: string;
  opponent: string;
  competition: string;
  home: boolean;
}

const PLACEHOLDER_MATCHES: Match[] = [
  { date: "15 MAR", opponent: "FC Lyon", competition: "Régional 1", home: true },
  { date: "22 MAR", opponent: "AS Saint-Priest", competition: "Régional 1", home: false },
  { date: "29 MAR", opponent: "OL Futsal", competition: "Coupe Rhône", home: true },
  { date: "05 AVR", opponent: "ES Vénissieux", competition: "Régional 1", home: true },
  { date: "12 AVR", opponent: "FC Villefranche", competition: "Régional 1", home: false },
  { date: "19 AVR", opponent: "Lyon Duchère", competition: "Coupe Rhône", home: true },
  { date: "26 AVR", opponent: "Caluire SC", competition: "Régional 1", home: false },
  { date: "03 MAI", opponent: "AS Minguettes", competition: "Régional 1", home: true },
];

/** Build the real "next match" as the first entry from NEXT_MATCH constant */
function buildNextMatchEntry(): Match {
  const d = new Date(NEXT_MATCH.date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d
    .toLocaleDateString("fr-FR", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  return {
    date: `${day} ${month}`,
    opponent: NEXT_MATCH.awayTeam.name,
    competition: NEXT_MATCH.competition,
    home: true,
  };
}

const ALL_MATCHES: Match[] = [buildNextMatchEntry(), ...PLACEHOLDER_MATCHES];

const CARD_WIDTH = 320;
const CARD_GAP = 24;

/* ------------------------------------------------------------------ */
/*  Match card                                                         */
/* ------------------------------------------------------------------ */

function MatchCard({
  match,
  index,
  scrollX,
  velocity,
}: {
  match: Match;
  index: number;
  scrollX: MotionValue<number>;
  velocity: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const [dayPart, monthPart] = match.date.split(" ");

  // Card offset for parallax calculations
  const cardOffset = index * (CARD_WIDTH + CARD_GAP);

  // Subtle vertical parallax based on distance from viewport center
  const parallaxY = useTransform(scrollX, (x) => {
    const viewCenter =
      typeof window !== "undefined" ? window.innerWidth / 2 : 600;
    const cardCenter = cardOffset + CARD_WIDTH / 2 + x;
    const distance = (cardCenter - viewCenter) / viewCenter;
    return distance * 15;
  });

  // Scale based on proximity to center
  const cardScale = useTransform(scrollX, (x) => {
    const viewCenter =
      typeof window !== "undefined" ? window.innerWidth / 2 : 600;
    const cardCenter = cardOffset + CARD_WIDTH / 2 + x;
    const distance = Math.abs(cardCenter - viewCenter) / viewCenter;
    return Math.max(0.9, 1 - distance * 0.08);
  });

  // Opacity based on distance from center
  const cardOpacity = useTransform(scrollX, (x) => {
    const viewCenter =
      typeof window !== "undefined" ? window.innerWidth / 2 : 600;
    const cardCenter = cardOffset + CARD_WIDTH / 2 + x;
    const distance = Math.abs(cardCenter - viewCenter) / viewCenter;
    return Math.max(0.45, 1 - distance * 0.4);
  });

  // Rotation based on scroll velocity for physics feel
  const rotate = useTransform(velocity, [-3, 0, 3], [-3, 0, 3]);
  const rotateSpring = useSpring(rotate, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        y: parallaxY,
        scale: cardScale,
        opacity: cardOpacity,
        rotate: rotateSpring,
        width: CARD_WIDTH,
        flexShrink: 0,
      }}
      className="group relative cursor-pointer"
      whileHover={{
        y: -12,
        scale: 1.04,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="relative overflow-hidden rounded-sm bg-white shadow-md transition-shadow duration-300 group-hover:shadow-2xl">
        {/* Gold left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gold" />

        {/* "Next match" badge for first card */}
        {isFirst && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-block bg-gold px-2.5 py-1 font-[family-name:var(--font-verbatim)] text-[9px] font-black uppercase tracking-wider text-navy-deep">
              Prochain
            </span>
          </div>
        )}

        <div className="p-6 pl-8">
          {/* Date block */}
          <div className="mb-5">
            <span className="font-[family-name:var(--font-verbatim)] text-5xl font-black leading-none tracking-tighter text-navy-deep">
              {dayPart}
            </span>
            <span className="ml-2 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              {monthPart}
            </span>
          </div>

          {/* Home / Away indicator */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                match.home ? "bg-blue-primary" : "bg-gray-300"
              }`}
            />
            <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              {match.home ? "Domicile" : "Extérieur"}
            </span>
          </div>

          {/* Teams */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep">
                <span className="font-[family-name:var(--font-verbatim)] text-[8px] font-black text-gold">
                  SCB
                </span>
              </div>
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wide text-navy-deep">
                SCBT
              </span>
              <span className="ml-auto font-[family-name:var(--font-verbatim)] text-2xl font-black text-navy-deep/15">
                &mdash;
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="font-[family-name:var(--font-verbatim)] text-[8px] font-black text-gray-400">
                  {match.opponent.substring(0, 3).toUpperCase()}
                </span>
              </div>
              <span className="font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wide text-gray-500">
                {match.opponent}
              </span>
              <span className="ml-auto font-[family-name:var(--font-verbatim)] text-2xl font-black text-navy-deep/15">
                &mdash;
              </span>
            </div>
          </div>

          {/* Competition badge */}
          <div className="mt-5 flex items-center justify-between">
            <span className="inline-block bg-bg-alt px-2.5 py-1 font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-wider text-navy-deep/50">
              {match.competition}
            </span>
            <span className="font-[family-name:var(--font-montserrat)] text-[9px] text-gray-300">
              {match.home ? "Stade Léo Lagrange" : "Extérieur"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Watermark text                                                     */
/* ------------------------------------------------------------------ */

function Watermark({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Parallax in opposite direction to card movement
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.04, 0]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <span className="whitespace-nowrap font-[family-name:var(--font-verbatim)] text-[20vw] font-black uppercase leading-none tracking-tighter text-navy-deep">
        MATCHS
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll progress bar                                                */
/* ------------------------------------------------------------------ */

function ScrollProgress({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const scaleX = useSpring(progress, { stiffness: 120, damping: 30 });

  return (
    <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full overflow-hidden bg-navy-deep/5">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gold"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function MomentumCalendar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Total track width for horizontal scroll calculation
  const matchCount = ALL_MATCHES.length;
  const trackWidth =
    matchCount * CARD_WIDTH + (matchCount - 1) * CARD_GAP + 160; // 80px padding each side

  // Vertical scroll -> horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Velocity for momentum physics
  const scrollVelocity = useVelocity(scrollYProgress);

  // Base horizontal position: map scroll 0->1 to 0->-maxScroll
  const baseX = useTransform(scrollYProgress, (p) => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const maxScroll = Math.max(0, trackWidth - vw + 80);
    return -maxScroll * p;
  });

  // Wrap with spring for floaty momentum (stiffness ~50, damping ~20)
  const springX = useSpring(baseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.8,
    restDelta: 0.5,
  });

  // Extra velocity-based overshoot for inertia
  const velocityInfluence = useTransform(scrollVelocity, (v) => v * -600);
  const velocitySpring = useSpring(velocityInfluence, {
    stiffness: 150,
    damping: 35,
    mass: 0.5,
  });

  // Combine spring position with velocity overshoot
  const finalX = useTransform(
    [springX, velocitySpring] as MotionValue[],
    ([sx, vx]: number[]) => sx + vx
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-bg-alt"
      style={{ height: "300vh" }}
      id="calendrier"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Stripe pattern background */}
        <div
          className="stripe-pattern pointer-events-none absolute inset-0 opacity-[0.012]"
          aria-hidden
        />

        {/* "MATCHS" watermark behind everything */}
        <Watermark scrollYProgress={scrollYProgress} />

        {/* Section header */}
        <div
          ref={headerRef}
          className="relative z-10 px-8 pt-16 pb-6 md:px-16 md:pt-24 md:pb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              isHeaderInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gold accent + subtitle */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
                Saison 2025-2026
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-navy-deep md:text-7xl">
              Calendrier
            </h2>
          </motion.div>
        </div>

        {/* Horizontal cards track */}
        <div className="relative z-10 flex flex-1 items-center">
          <motion.div
            style={{ x: finalX }}
            className="flex items-center gap-6 pl-8 pr-16 md:pl-16"
          >
            {ALL_MATCHES.map((match, i) => (
              <MatchCard
                key={`${match.date}-${match.opponent}`}
                match={match}
                index={i}
                scrollX={finalX}
                velocity={scrollVelocity}
              />
            ))}

            {/* End spacer with CTA */}
            <div className="flex h-[320px] w-[280px] shrink-0 flex-col items-center justify-center rounded-sm border-2 border-dashed border-navy-deep/10 px-6 text-center">
              <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black text-navy-deep/10">
                {ALL_MATCHES.length}
              </span>
              <span className="mt-1 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-navy-deep/25">
                matchs
              </span>
              <a
                href="/calendrier"
                className="mt-5 border-b border-gold/50 pb-0.5 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gold transition-colors hover:border-gold hover:text-gold"
              >
                Voir tout le calendrier
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 right-8 z-20 flex items-center gap-2 md:right-16"
        >
          <span className="font-[family-name:var(--font-montserrat)] text-[10px] font-medium uppercase tracking-wider text-gray-300">
            Scroll
          </span>
          <motion.svg
            animate={{ x: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="h-3 w-3 text-gray-300"
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
          </motion.svg>
        </motion.div>

        {/* Scroll progress bar */}
        <ScrollProgress progress={scrollYProgress} />
      </div>
    </section>
  );
}
