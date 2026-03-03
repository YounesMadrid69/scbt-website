"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadSequence({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "flash" | "logo" | "name" | "wipe" | "done">("counting");

  useEffect(() => {
    if (phase === "counting") {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            setPhase("flash");
            return 99;
          }
          return prev + 3; // fast count
        });
      }, 30);
      return () => clearInterval(interval);
    }
    if (phase === "flash") {
      const t = setTimeout(() => setPhase("logo"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "logo") {
      const t = setTimeout(() => setPhase("name"), 800);
      return () => clearTimeout(t);
    }
    if (phase === "name") {
      const t = setTimeout(() => setPhase("wipe"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "wipe") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      key="preloader"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep"
    >
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Counter */}
      <motion.span
        animate={{ opacity: phase === "counting" ? 1 : 0, scale: phase === "counting" ? 1 : 1.5 }}
        transition={{ duration: 0.3 }}
        className="absolute font-[family-name:var(--font-verbatim)] text-[20vw] font-black tabular-nums text-white/10"
      >
        {String(Math.min(count, 99)).padStart(2, "0")}
      </motion.span>

      {/* Flash */}
      <motion.div
        animate={{ opacity: phase === "flash" ? [0, 1, 0] : 0 }}
        transition={{ duration: 0.4, times: [0, 0.3, 1] }}
        className="absolute inset-0 bg-white"
      />

      {/* Logo text */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: phase === "logo" || phase === "name" || phase === "wipe" ? 1 : 0.5,
          opacity: phase === "logo" || phase === "name" || phase === "wipe" ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-10 text-center"
      >
        <div className="font-[family-name:var(--font-verbatim)] text-7xl font-black tracking-tighter text-white md:text-9xl">
          SCBT
        </div>

        {/* Club name wipe in */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: phase === "name" || phase === "wipe" ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.4em] text-gold">
            Sporting Club Bron Terraillon
          </span>
        </motion.div>
      </motion.div>

      {/* Diagonal wipe */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        animate={{
          clipPath: phase === "wipe" || phase === "done"
            ? "polygon(0 0, 100% 0, 100% 0, 0 0)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-20 bg-navy-deep"
      />
    </motion.div>
  );
}
