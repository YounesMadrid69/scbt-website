"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------
   Constants
--------------------------------------------------------------- */
const COLUMNS = 15;
const CHARS = "SCBT01964CREERCLUBDEMAINVIVRE";
const CLUB_NAME = "SPORTING CLUB BRON TERRAILLON";

const PHASE_TIMINGS = {
  rain: 2000,
  convergence: 1000,
  shatter: 800,
} as const;

type Phase = "rain" | "convergence" | "shatter" | "done";

/* ---------------------------------------------------------------
   Shatter directions per letter index
--------------------------------------------------------------- */
const SHATTER_EXITS: Record<number, { x: number; y: number; rotate: number }> = {
  0: { x: -400, y: -300, rotate: -45 },  // S -> top-left
  1: { x: 400, y: -300, rotate: 45 },     // C -> top-right
  2: { x: -400, y: 300, rotate: 30 },      // B -> bottom-left
  3: { x: 400, y: 300, rotate: -30 },      // T -> bottom-right
};

/* ---------------------------------------------------------------
   Sub-component: single rain column
   (extracted to avoid hooks-in-loops violation)
--------------------------------------------------------------- */
function RainColumn({ index, total }: { index: number; total: number }) {
  const chars = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) =>
        CHARS[(index * 7 + i * 3) % CHARS.length]
      ),
    [index]
  );

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "100vh" }}
      transition={{
        duration: 1.6 + (index % 4) * 0.4,
        ease: "linear",
        repeat: 0,
      }}
      className="absolute top-0 flex flex-col items-center gap-0.5"
      style={{ left: `${((index + 0.5) / total) * 100}%` }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="block font-[family-name:var(--font-verbatim)] text-xs leading-tight text-gold sm:text-sm"
          style={{ opacity: 0.08 + (i % 6) * 0.12 }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Sub-component: single shatter letter
   (extracted to avoid hooks-in-loops violation)
--------------------------------------------------------------- */
function ShatterLetter({
  letter,
  index,
  isShattered,
}: {
  letter: string;
  index: number;
  isShattered: boolean;
}) {
  const exit = SHATTER_EXITS[index] ?? { x: 0, y: 0, rotate: 0 };

  return (
    <motion.span
      animate={
        isShattered
          ? {
              x: exit.x,
              y: exit.y,
              rotate: exit.rotate,
              opacity: 0,
              scale: 1.5,
            }
          : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
      }
      transition={
        isShattered
          ? {
              type: "spring",
              stiffness: 120,
              damping: 12,
              mass: 0.8,
              delay: index * 0.04,
            }
          : { duration: 0 }
      }
      className="inline-block font-[family-name:var(--font-verbatim)] text-7xl font-black tracking-tighter text-white md:text-9xl"
    >
      {letter}
    </motion.span>
  );
}

/* ---------------------------------------------------------------
   Sub-component: club name letter stagger
   (extracted to avoid hooks-in-loops violation)
--------------------------------------------------------------- */
function ClubNameLetter({
  letter,
  index,
  visible,
}: {
  letter: string;
  index: number;
  visible: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{
        delay: index * 0.02,
        duration: 0.25,
        ease: "easeOut",
      }}
      className="inline-block font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.4em] text-gold sm:text-xs"
      style={{ minWidth: letter === " " ? "0.5em" : undefined }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}

/* ---------------------------------------------------------------
   Main component
--------------------------------------------------------------- */
interface MatrixLoaderProps {
  onComplete: () => void;
}

export default function MatrixLoader({ onComplete }: MatrixLoaderProps) {
  const [phase, setPhase] = useState<Phase>("rain");

  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      if (prev === "rain") return "convergence";
      if (prev === "convergence") return "shatter";
      if (prev === "shatter") {
        // delay the callback slightly so exit anim can start
        setTimeout(onComplete, 500);
        return "done";
      }
      return prev;
    });
  }, [onComplete]);

  /* Phase sequencer */
  useEffect(() => {
    if (phase === "done") return;

    const duration = PHASE_TIMINGS[phase as keyof typeof PHASE_TIMINGS];
    if (!duration) return;

    const timer = setTimeout(advancePhase, duration);
    return () => clearTimeout(timer);
  }, [phase, advancePhase]);

  /* Rain column indices (stable array) */
  const columnIndices = useMemo(
    () => Array.from({ length: COLUMNS }, (_, i) => i),
    []
  );

  /* SCBT letters (stable array) */
  const scbtLetters = useMemo(() => ["S", "C", "B", "T"], []);

  /* Club name letters (stable array) */
  const clubNameLetters = useMemo(() => CLUB_NAME.split(""), []);

  const showRain = phase === "rain";
  const showLogo = phase === "convergence" || phase === "shatter" || phase === "done";
  const showClubName = phase === "convergence" || phase === "shatter";
  const isShattered = phase === "shatter" || phase === "done";

  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-deep"
    >
      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* ====== Phase 1: Digital Rain ====== */}
      <motion.div
        animate={{ opacity: showRain ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        {columnIndices.map((i) => (
          <RainColumn key={i} index={i} total={COLUMNS} />
        ))}

        {/* Scanline effect across rain */}
        <motion.div
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{ duration: 2, ease: "linear", repeat: 0 }}
          className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-gold/5 to-transparent"
          style={{ pointerEvents: "none" }}
        />
      </motion.div>

      {/* ====== Phase 2 & 3: Convergence + Shatter ====== */}
      <motion.div
        initial={{ scale: 0, filter: "blur(20px)", opacity: 0 }}
        animate={
          showLogo
            ? { scale: 1, filter: "blur(0px)", opacity: 1 }
            : { scale: 0, filter: "blur(20px)", opacity: 0 }
        }
        transition={
          showLogo
            ? { type: "spring", stiffness: 180, damping: 14, mass: 0.9 }
            : { duration: 0.3 }
        }
        className="relative z-10 flex flex-col items-center"
      >
        {/* SCBT letters */}
        <div className="flex">
          {scbtLetters.map((letter, i) => (
            <ShatterLetter
              key={letter}
              letter={letter}
              index={i}
              isShattered={isShattered}
            />
          ))}
        </div>

        {/* Club full name (letter-by-letter stagger) */}
        <motion.div
          animate={{ opacity: showClubName ? 1 : 0 }}
          transition={{ duration: 0.3, delay: showClubName ? 0.2 : 0 }}
          className="mt-4 flex flex-wrap justify-center"
          aria-label={CLUB_NAME}
        >
          {clubNameLetters.map((letter, i) => (
            <ClubNameLetter
              key={`${letter}-${i}`}
              letter={letter}
              index={i}
              visible={showClubName}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Vignette overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(11,20,38,0.6) 100%)",
        }}
      />

      {/* Gold corner accents */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-6 top-6 h-[1px] w-10 origin-left bg-gold/20"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-6 top-6 h-10 w-[1px] origin-top bg-gold/20"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-6 right-6 h-[1px] w-10 origin-right bg-gold/20"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-6 right-6 h-10 w-[1px] origin-bottom bg-gold/20"
      />
    </motion.div>
  );
}
