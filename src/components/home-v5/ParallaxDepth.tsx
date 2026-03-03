"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/**
 * Multi-layer parallax depth section.
 * 5+ layers at different speeds create a 3D tunnel effect.
 * Club statement centered.
 */
export default function ParallaxDepth() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each layer moves at different speed
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);    // Slowest (back)
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const layer4X = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const layer5X = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const layer6Y = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);    // Fastest (front)

  const textScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1, 0.9]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[120vh] overflow-hidden bg-white">
      {/* LAYER 1 - Lion watermark (deepest, slowest) */}
      <motion.div
        style={{ y: layer1Y }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[80vh] w-[80vh] opacity-[0.03]"
          style={{
            backgroundImage: "url('/images/lion-watermark.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            filter: "brightness(0) saturate(100%) invert(25%) sepia(60%) saturate(700%) hue-rotate(180deg)",
          }}
        />
      </motion.div>

      {/* LAYER 2 - Giant text "1964" */}
      <motion.div
        style={{ y: layer2Y }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2"
      >
        <span className="font-[family-name:var(--font-verbatim)] text-[30vw] font-black tracking-tighter text-gray-50/80">
          1964
        </span>
      </motion.div>

      {/* LAYER 3 - Dots pattern (top right) */}
      <motion.div
        style={{ y: layer3Y }}
        className="pointer-events-none absolute top-[15%] right-[10%]"
      >
        <Image src="/images/deco-dots.svg" alt="" width={120} height={120} className="opacity-10" />
      </motion.div>

      {/* LAYER 4 - Chevrons (left, moves horizontally) */}
      <motion.div
        style={{ x: layer4X }}
        className="pointer-events-none absolute top-[40%] left-[5%]"
      >
        <Image src="/images/deco-chevrons.svg" alt="" width={80} height={80} className="opacity-8" />
      </motion.div>

      {/* LAYER 5 - Slashes (right, moves opposite) */}
      <motion.div
        style={{ x: layer5X }}
        className="pointer-events-none absolute bottom-[30%] right-[8%]"
      >
        <Image src="/images/deco-slashes.svg" alt="" width={100} height={80} className="opacity-8" />
      </motion.div>

      {/* LAYER 6 - Stripes (front, fastest) */}
      <motion.div
        style={{ y: layer6Y }}
        className="pointer-events-none absolute top-[20%] right-[20%]"
      >
        <div className="stripe-pattern h-24 w-24 opacity-[0.04] rotate-12" />
      </motion.div>

      {/* Center content - middle depth */}
      <motion.div
        style={{ scale: textScale, opacity: textOpacity }}
        className="sticky top-0 flex h-screen items-center justify-center px-8"
      >
        <div className="max-w-3xl text-center">
          <motion.div style={{ width: lineWidth }} className="mx-auto mb-8 h-[2px] bg-gold" />

          <p className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase leading-[1.1] tracking-tight text-navy-deep md:text-6xl lg:text-7xl">
            SPORTIF.
            <br />
            <span className="text-blue-primary">ÉDUCATIF.</span>
            <br />
            SOCIAL.
          </p>

          <p className="mx-auto mt-8 max-w-md font-[family-name:var(--font-montserrat)] text-base leading-relaxed text-gray-400 md:text-lg">
            Depuis 1964, le SCBT forme les jeunes du quartier Terraillon. Plus qu&apos;un club, une famille.
          </p>

          <div className="mx-auto mt-6 h-[2px] w-8 bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
