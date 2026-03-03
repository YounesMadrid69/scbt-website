"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

/* ---------------------------------------------------------------
   Manifesto text rows
--------------------------------------------------------------- */
const ROWS: {
  text: string;
  direction: "left" | "right";
  fontSize: string;
}[] = [
  {
    text: "VIVRE ENSEMBLE \u2014 DEPUIS 1964 \u2014 BRON TERRAILLON \u2014",
    direction: "left",
    fontSize: "text-[10vw]",
  },
  {
    text: "CR\u00C9ER LE CLUB DE DEMAIN \u2014 ACCOMPAGNER LES JEUNES \u2014",
    direction: "right",
    fontSize: "text-[8vw]",
  },
  {
    text: "SPORTING CLUB \u2014 PASSION \u2014 RESPECT \u2014 SOLIDARIT\u00C9 \u2014",
    direction: "left",
    fontSize: "text-[6vw]",
  },
];

/* ---------------------------------------------------------------
   Sub-component: single ribbon row
   Extracted to keep hooks out of loops.
--------------------------------------------------------------- */
function RibbonRow({
  text,
  direction,
  fontSize,
  scrollYProgress,
  rowIndex,
}: {
  text: string;
  direction: "left" | "right";
  fontSize: string;
  scrollYProgress: MotionValue<number>;
  rowIndex: number;
}) {
  /* Direction determines which way the ribbon slides on scroll */
  const baseMove =
    direction === "left" ? ["10%", "-60%"] : ["-60%", "10%"];

  const x = useTransform(scrollYProgress, [0, 1], baseMove);
  const smoothX = useSpring(x, { stiffness: 50, damping: 30 });

  /* Slight vertical parallax offset per row for depth */
  const yShift = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (rowIndex - 1) * -30]
  );

  /* Repeat the text 4 times so it feels truly continuous */
  const repeated = `${text} ${text} ${text} ${text}`;

  return (
    <div
      className="relative flex items-center overflow-hidden"
      style={{
        /* Gradient mask: fade edges, bright center strip */
        maskImage:
          "linear-gradient(to right, transparent 5%, black 35%, black 65%, transparent 95%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 5%, black 35%, black 65%, transparent 95%)",
      }}
    >
      <motion.div
        style={{ x: smoothX, y: yShift }}
        className="whitespace-nowrap will-change-transform"
      >
        <span
          className={`font-[family-name:var(--font-verbatim)] ${fontSize} font-black uppercase leading-none tracking-tighter text-white/[0.08]`}
        >
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main component
--------------------------------------------------------------- */
export default function RibbonManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-navy-deep">
        {/* Noise texture overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Radial gold spotlight glow at center */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Vertical gold accent line (center) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[60%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute left-1/2 top-12 z-10 -translate-x-1/2 text-center md:top-16"
        >
          <div className="mx-auto mb-3 h-[2px] w-8 bg-gold" />
          <span className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.4em] text-gold/60 sm:text-xs">
            Notre identit&eacute;
          </span>
        </motion.div>

        {/* Ribbon rows */}
        <div className="relative z-[3] flex w-full flex-col justify-center gap-6 md:gap-10">
          {ROWS.map((row, i) => (
            <RibbonRow
              key={i}
              text={row.text}
              direction={row.direction}
              fontSize={row.fontSize}
              scrollYProgress={scrollYProgress}
              rowIndex={i}
            />
          ))}
        </div>

        {/* Vignette overlay for depth */}
        <div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(11,20,38,0.6) 100%)",
          }}
        />

        {/* Corner accents (match hero style) */}
        <div className="absolute bottom-6 left-6 z-10 h-10 w-[1px] origin-bottom bg-gold/20" />
        <div className="absolute bottom-6 left-6 z-10 h-[1px] w-10 origin-left bg-gold/20" />
        <div className="absolute right-6 top-6 z-10 h-10 w-[1px] origin-top bg-gold/20" />
        <div className="absolute right-6 top-6 z-10 h-[1px] w-10 origin-right bg-gold/20" />
      </div>
    </section>
  );
}
