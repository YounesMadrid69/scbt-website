"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const TEAMS = [
  { name: "Seniors" },
  { name: "U20" },
  { name: "U17" },
  { name: "U15" },
  { name: "U13" },
  { name: "Feminines" },
] as const;

/* Fan layout parameters — scaled by viewport                         */
function fanParams(index: number, total: number, mobile: boolean) {
  const mid = (total - 1) / 2;
  const t = (index - mid) / mid; // -1 .. 1

  if (mobile) {
    return {
      rotation: t * 12,
      tx: t * 95,
      ty: Math.abs(t) * 18,
    };
  }

  return {
    rotation: t * 15,
    tx: t * 260,
    ty: Math.abs(t) * 40,
  };
}

/* ------------------------------------------------------------------ */
/*  Fan Card — works on all sizes, adapts via `mobile` prop           */
/* ------------------------------------------------------------------ */

function FanCard({
  team,
  index,
  total,
  progress,
  mobile,
}: {
  team: (typeof TEAMS)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
  mobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const fan = fanParams(index, total, mobile);
  const stackedRotation = ((index % 3) - 1) * 1.5;

  const rotation = useTransform(
    progress,
    [0, 0.5, 1],
    [stackedRotation, fan.rotation * 0.5, fan.rotation]
  );
  const translateX = useTransform(
    progress,
    [0, 0.5, 1],
    [0, fan.tx * 0.4, fan.tx]
  );
  const translateY = useTransform(
    progress,
    [0, 0.5, 1],
    [0, fan.ty * 0.3, -fan.ty]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        rotate: rotation,
        x: translateX,
        y: translateY,
        zIndex: hovered ? 50 : total - index,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          scale: hovered ? 1.1 : 1,
          rotateY: hovered ? 5 : 0,
          z: hovered ? 50 : 0,
          boxShadow: hovered
            ? "0 30px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,168,67,0.25)"
            : "0 8px 30px rgba(0,0,0,0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative cursor-pointer overflow-hidden rounded-sm ${
          mobile ? "h-[200px] w-[120px]" : "h-[340px] w-[220px]"
        }`}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
      >
        <CardContent team={team} index={index} hovered={hovered} mobile={mobile} />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared card content                                               */
/* ------------------------------------------------------------------ */

function CardContent({
  team,
  index,
  hovered,
  mobile,
}: {
  team: (typeof TEAMS)[number];
  index: number;
  hovered: boolean;
  mobile: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/40 via-navy-deep to-navy-deep" />
      <div className="noise-overlay absolute inset-0" />

      <span
        className={`pointer-events-none absolute top-2 right-3 select-none font-[family-name:var(--font-verbatim)] font-black leading-none tracking-tighter text-white/[0.04] ${
          mobile ? "text-[40px]" : "text-[80px]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`relative z-10 flex h-full flex-col justify-end ${mobile ? "p-3" : "p-5"}`}>
        <motion.div
          animate={{ width: hovered ? 40 : 20 }}
          transition={{ duration: 0.3 }}
          className={`h-[2px] bg-gold ${mobile ? "mb-1.5" : "mb-3"}`}
        />
        <h3
          className={`font-[family-name:var(--font-verbatim)] font-black uppercase tracking-tight text-white ${
            mobile ? "text-sm" : "text-2xl md:text-3xl"
          }`}
        >
          {team.name}
        </h3>
        <p
          className={`mt-0.5 font-[family-name:var(--font-verbatim)] font-bold uppercase tracking-[0.25em] text-white/30 ${
            mobile ? "text-[6px]" : "text-[9px]"
          }`}
        >
          Saison 2025-2026
        </p>
      </div>

      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gold"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FanTeams                                                          */
/* ------------------------------------------------------------------ */

export default function FanTeams() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-alt h-[180vh] md:h-[200vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden md:gap-16">
        {/* Background deco */}
        <div
          className="pointer-events-none absolute inset-0 lion-watermark-light"
          style={{ backgroundSize: "45%", opacity: 0.02 }}
        />
        <Image
          src="/images/deco-chevrons.svg"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none absolute top-16 left-10 hidden opacity-[0.04] md:block"
          aria-hidden
        />
        <Image
          src="/images/deco-dots.svg"
          alt=""
          width={160}
          height={160}
          className="pointer-events-none absolute right-10 bottom-16 hidden opacity-[0.04] md:block"
          aria-hidden
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-20 px-6 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold" />
            <span className="font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Saison 2025-2026
            </span>
            <div className="h-[2px] w-8 bg-gold" />
          </div>
          <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-navy-deep sm:text-6xl md:text-8xl">
            NOS
            <br />
            EQUIPES
          </h2>
        </motion.div>

        {/* Fan arc — all screen sizes */}
        <div
          className="relative z-10 flex h-[240px] items-center justify-center md:h-[380px]"
          style={{ perspective: mobile ? 600 : 1200 }}
        >
          {TEAMS.map((team, index) => (
            <FanCard
              key={team.name}
              team={team}
              index={index}
              total={TEAMS.length}
              progress={smoothProgress}
              mobile={mobile}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-20 px-6 text-center"
        >
          <a
            href="#equipes"
            className="group inline-flex items-center gap-3 bg-navy-deep px-6 py-3 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-blue-primary sm:px-8 sm:py-4 sm:text-sm"
          >
            Voir toutes les équipes
            <span className="inline-block transition-transform group-hover:translate-x-1.5">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
