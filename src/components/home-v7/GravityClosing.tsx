"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const HEADLINE = "VIVRE ENSEMBLE";
const BOUNCE_SPRING = { stiffness: 300, damping: 12 };

/* ------------------------------------------------------------------ */
/*  GravityLetter                                                     */
/* ------------------------------------------------------------------ */

function GravityLetter({
  letter,
  index,
  inView,
}: {
  letter: string;
  index: number;
  inView: boolean;
}) {
  const y = useSpring(-200, BOUNCE_SPRING);
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (inView) {
      const delay = index * 50;
      const timer = setTimeout(() => {
        y.set(0);
        opacity.set(1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, index, y, opacity]);

  /* Space characters */
  if (letter === " ") {
    return <span className="inline-block w-[2.5vw] md:w-[2vw]" />;
  }

  return (
    <motion.span
      className="inline-block font-[family-name:var(--font-verbatim)] text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-navy-deep"
      style={{ y, opacity }}
    >
      {letter}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  GravityDrop — generic "drop from above" wrapper                   */
/* ------------------------------------------------------------------ */

function GravityDrop({
  children,
  delay,
  triggered,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  triggered: boolean;
  className?: string;
}) {
  const y = useSpring(-200, BOUNCE_SPRING);
  const opacity = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (triggered) {
      const timer = setTimeout(() => {
        y.set(0);
        opacity.set(1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [triggered, delay, y, opacity]);

  return (
    <motion.div className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  GoldLine — expands across full width as the finale                */
/* ------------------------------------------------------------------ */

function GoldLine({
  triggered,
  delay,
}: {
  triggered: boolean;
  delay: number;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (triggered) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [triggered, delay]);

  return (
    <div className="relative mt-16 flex w-full justify-center overflow-hidden">
      <motion.div
        className="h-[1px] bg-gold"
        initial={{ width: 0 }}
        animate={started ? { width: "100%" } : {}}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          boxShadow: started
            ? "0 0 20px 4px rgba(212, 168, 67, 0.25)"
            : "none",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GravityClosing                                                    */
/* ------------------------------------------------------------------ */

export default function GravityClosing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Timing calculations */
  const letters = HEADLINE.split("");
  const lettersDuration = letters.length * 50 + 400;
  const partnersBaseDelay = lettersDuration + 300;
  const addressDelay = partnersBaseDelay + PARTNERS.length * 80 + 300;
  const goldLineDelay = addressDelay + 400;
  const scbtDelay = goldLineDelay + 600;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 md:py-40"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {/* ============================================ */}
        {/*  Headline — each letter drops with gravity   */}
        {/* ============================================ */}
        <div className="flex flex-wrap items-center justify-center text-center">
          {letters.map((char, i) => (
            <GravityLetter
              key={`${char}-${i}`}
              letter={char}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* ============================================ */}
        {/*  Partners logos — drop in sequentially        */}
        {/* ============================================ */}
        <div className="mt-16">
          <GravityDrop
            delay={partnersBaseDelay - 200}
            triggered={isInView}
            className="mb-6 text-center"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              Nos partenaires
            </span>
          </GravityDrop>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {PARTNERS.map((partner, i) => (
              <GravityDrop
                key={partner.name}
                delay={partnersBaseDelay + i * 80}
                triggered={isInView}
              >
                <div className="group flex items-center justify-center border border-gray-100 bg-white px-4 py-5 transition-all duration-300 hover:border-gold/30 hover:shadow-sm">
                  <span className="text-center font-[family-name:var(--font-montserrat)] text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors group-hover:text-navy-deep">
                    {partner.name}
                  </span>
                </div>
              </GravityDrop>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/*  Footer info: address + gold accent          */}
        {/* ============================================ */}
        <GravityDrop
          delay={addressDelay}
          triggered={isInView}
          className="mt-12 text-center"
        >
          <div className="mx-auto mb-3 h-[2px] w-6 bg-gold" />
          <p className="font-[family-name:var(--font-montserrat)] text-xs text-gray-400">
            8 rue Marcel Cerdan, 69500 Bron
          </p>
        </GravityDrop>

        {/* ============================================ */}
        {/*  Thin gold line + "SCBT" centered            */}
        {/* ============================================ */}
        <GoldLine triggered={isInView} delay={goldLineDelay} />

        <GravityDrop
          delay={scbtDelay}
          triggered={isInView}
          className="mt-5 text-center"
        >
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
            SCBT
          </span>
        </GravityDrop>
      </div>
    </section>
  );
}
