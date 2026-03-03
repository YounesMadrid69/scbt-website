"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

const CLUB_NAME = "SPORTING CLUB BRON TERRAILLON";
const TOTAL_DURATION = 2500; // ms total
const BAR_DURATION = 2000; // ms for progress bar fill
const SPLIT_DELAY = 300; // ms after bar fill before split

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "splitting" | "done">("loading");
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Animate the progress bar with requestAnimationFrame for smoothness
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pct = Math.min(elapsed / BAR_DURATION, 1);

      // Ease out cubic for a satisfying fill
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Bar complete -> wait then split
        setTimeout(() => {
          setPhase("splitting");
        }, SPLIT_DELAY);
      }
    };

    // Small initial delay before bar starts (let logo breathe)
    const initDelay = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(initDelay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleSplitComplete = () => {
    setPhase("done");
    onComplete();
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleSplitComplete}>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ pointerEvents: phase === "splitting" ? "none" : "auto" }}
        >
          {/* Left half */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-black"
            animate={
              phase === "splitting"
                ? { x: "-100%", skewX: -3 }
                : { x: 0, skewX: 0 }
            }
            transition={
              phase === "splitting"
                ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                : {}
            }
            onAnimationComplete={() => {
              if (phase === "splitting") handleSplitComplete();
            }}
          />

          {/* Right half */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-black"
            animate={
              phase === "splitting"
                ? { x: "100%", skewX: 3 }
                : { x: 0, skewX: 0 }
            }
            transition={
              phase === "splitting"
                ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                : {}
            }
          />

          {/* Center content (sits above both halves) */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            animate={
              phase === "splitting"
                ? { opacity: 0, scale: 0.9 }
                : { opacity: 1, scale: 1 }
            }
            transition={
              phase === "splitting"
                ? { duration: 0.3, ease: "easeIn" }
                : {}
            }
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Pulse ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 40px 8px rgba(212, 168, 67, 0.15)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/images/logo-scbt.png"
                alt="SCBT"
                width={80}
                height={80}
                className="relative z-10 drop-shadow-[0_0_20px_rgba(212,168,67,0.3)]"
                priority
              />
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-48 flex flex-col items-center gap-3"
            >
              {/* Bar track */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                {/* Bar fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 12px 2px rgba(212, 168, 67, 0.4)",
                  }}
                />
              </div>

              {/* Percentage */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] text-white/40 font-[family-name:var(--font-montserrat)] tabular-nums"
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>

            {/* Club name - letter by letter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-wrap justify-center"
              aria-label={CLUB_NAME}
            >
              {CLUB_NAME.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + i * 0.04,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-[10px] tracking-[0.5em] text-white/60 font-[family-name:var(--font-verbatim)] uppercase"
                  style={{
                    display: "inline-block",
                    minWidth: letter === " " ? "0.5em" : undefined,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Subtle gold line accents in corners */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-[1px] bg-gold/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="absolute top-8 left-8 w-[1px] h-8 bg-gold/20"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-8 h-[1px] bg-gold/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ transformOrigin: "right" }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-[1px] h-8 bg-gold/20"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ transformOrigin: "bottom" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
