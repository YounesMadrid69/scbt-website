"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ---------------------------------------------------------------
   Blob configuration
--------------------------------------------------------------- */
interface BlobConfig {
  color: string;
  size: string;
  initialX: string;
  initialY: string;
  delay: number;
  opacity: number;
}

const BLOBS: BlobConfig[] = [
  {
    color: "var(--color-blue-primary)",
    size: "40vw",
    initialX: "-5vw",
    initialY: "-5vh",
    delay: 0,
    opacity: 0.35,
  },
  {
    color: "var(--color-gold)",
    size: "30vw",
    initialX: "55vw",
    initialY: "55vh",
    delay: 3,
    opacity: 0.15,
  },
  {
    color: "var(--color-blue-primary)",
    size: "35vw",
    initialX: "50vw",
    initialY: "15vh",
    delay: 6,
    opacity: 0.2,
  },
  {
    color: "var(--color-gold)",
    size: "20vw",
    initialX: "10vw",
    initialY: "60vh",
    delay: 2,
    opacity: 0.1,
  },
];

/* ---------------------------------------------------------------
   Sub-component: animated liquid blob
--------------------------------------------------------------- */
function LiquidBlob({
  config,
  scrollProgress,
  blobIndex,
}: {
  config: BlobConfig;
  scrollProgress: ReturnType<typeof useTransform<number, number>>;
  blobIndex: number;
}) {
  // Each blob moves at a different parallax rate
  const parallaxRate = 0.08 + blobIndex * 0.04;
  const blobY = useTransform(scrollProgress, [0, 1], [0, -150 * parallaxRate]);

  return (
    <motion.div
      animate={{
        x: [
          config.initialX,
          `calc(${config.initialX} + 10vw)`,
          `calc(${config.initialX} - 5vw)`,
          config.initialX,
        ],
        y: [
          config.initialY,
          `calc(${config.initialY} - 8vh)`,
          `calc(${config.initialY} + 12vh)`,
          config.initialY,
        ],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 15 + config.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: config.size,
        height: config.size,
        background: config.color,
        opacity: config.opacity,
        y: blobY,
      }}
      className="absolute rounded-full blur-[100px] will-change-transform"
    />
  );
}

/* ---------------------------------------------------------------
   Sub-component: animated title line
--------------------------------------------------------------- */
function TitleLine({
  text,
  outline,
  inline,
  index,
  preloaderDone,
}: {
  text: string;
  outline: boolean;
  inline?: boolean;
  index: number;
  preloaderDone: boolean;
}) {
  const baseDelay = 0.3 + index * 0.15;

  if (outline) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 80 }}
        animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          delay: baseDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-transparent md:text-7xl lg:text-[5.5rem] xl:text-[7rem]"
        style={{
          WebkitTextStroke: "2px white",
        }}
      >
        {" "}{text}
      </motion.span>
    );
  }

  if (inline) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 80 }}
        animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          delay: baseDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-7xl lg:text-[5.5rem] xl:text-[7rem]"
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-7xl lg:text-[5.5rem] xl:text-[7rem]">
        {text}
      </span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Main component
--------------------------------------------------------------- */
interface LiquidHeroProps {
  preloaderDone?: boolean;
}

export default function LiquidHero({ preloaderDone = false }: LiquidHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax transforms */
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0.3]);

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-navy-deep">
        {/* ====== Liquid blobs background ====== */}
        <div className="absolute inset-0 overflow-hidden">
          {BLOBS.map((blob, i) => (
            <LiquidBlob
              key={i}
              config={blob}
              scrollProgress={scrollYProgress}
              blobIndex={i}
            />
          ))}
        </div>

        {/* Noise texture overlay */}
        <div className="noise-overlay absolute inset-0" />

        {/* Subtle radial gradient for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(11,20,38,0.5) 100%)",
          }}
        />

        {/* ====== Main content ====== */}
        <motion.div
          style={{ y: titleY, opacity: contentOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6"
        >
          {/* Gold accent line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={preloaderDone ? { width: 56, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="mb-5 h-[2px] bg-gold"
          />

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.4em] text-gold/60 sm:text-xs"
          >
            Depuis 1964 &mdash; Bron Terraillon
          </motion.span>

          {/* Title block */}
          <motion.div
            animate={
              preloaderDone
                ? {
                    scale: [1, 1.02, 1],
                  }
                : {}
            }
            transition={
              preloaderDone
                ? {
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    },
                  }
                : {}
            }
            className="text-center"
          >
            <h1>
              {/* Line 1: CREER */}
              <TitleLine
                text="CR&Eacute;ER"
                outline={false}
                index={0}
                preloaderDone={preloaderDone}
              />

              {/* Line 2: LE CLUB */}
              <TitleLine
                text="LE CLUB"
                outline={false}
                index={1}
                preloaderDone={preloaderDone}
              />

              {/* Line 3: DE DEMAIN (DE normal + DEMAIN outline) */}
              <div>
                <TitleLine
                  text="DE"
                  outline={false}
                  inline
                  index={2}
                  preloaderDone={preloaderDone}
                />
                <TitleLine
                  text="DEMAIN"
                  outline
                  inline
                  index={3}
                  preloaderDone={preloaderDone}
                />
              </div>
            </h1>
          </motion.div>

          {/* Tagline below title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 max-w-md text-center font-[family-name:var(--font-montserrat)] text-sm leading-relaxed text-white/35"
          >
            Accompagner les jeunes d&apos;aujourd&apos;hui,
            construire l&apos;avenir du football &agrave; Bron.
          </motion.p>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <a
              href="#decouvrir"
              className="inline-flex items-center gap-3 border-b border-gold/30 pb-2 font-[family-name:var(--font-verbatim)] text-xs font-bold uppercase tracking-wider text-gold transition-all hover:border-gold hover:text-gold"
            >
              D&eacute;couvrir le club
              <span className="text-lg">&rsaquo;</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ====== Scroll indicator ====== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-[family-name:var(--font-verbatim)] text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>

        {/* ====== Side decorative elements ====== */}
        {/* Left vertical text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 0.15 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-16 left-6 z-10 hidden lg:block"
        >
          <span
            className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-white"
            style={{ writingMode: "vertical-rl" }}
          >
            Est. 1964
          </span>
        </motion.div>

        {/* Right vertical text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 0.15 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-16 right-6 z-10 hidden lg:block"
        >
          <span
            className="font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-[0.3em] text-white"
            style={{ writingMode: "vertical-rl" }}
          >
            Bron, Rh&ocirc;ne
          </span>
        </motion.div>

        {/* Bottom-left corner accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={preloaderDone ? { scaleX: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 left-6 h-[1px] w-10 origin-left bg-gold/20"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={preloaderDone ? { scaleY: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 left-6 h-10 w-[1px] origin-bottom bg-gold/20"
        />

        {/* Top-right corner accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={preloaderDone ? { scaleX: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute right-6 top-6 h-[1px] w-10 origin-right bg-gold/20"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={preloaderDone ? { scaleY: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute right-6 top-6 h-10 w-[1px] origin-top bg-gold/20"
        />
      </div>
    </section>
  );
}
