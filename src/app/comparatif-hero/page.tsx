"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

/* ─── Preloaders ─── */
import PreloaderV6 from "@/components/home-v6/Preloader";
import LoadSequence from "@/components/home-v7/LoadSequence";
import MatrixLoader from "@/components/home-v8/MatrixLoader";

/* ─── Heroes ─── */
import Hero from "@/components/home/Hero";
import HeroV2 from "@/components/home-v2/HeroV2";
import HeroV3 from "@/components/home-v3/HeroV3";
import HeroV4 from "@/components/home-v4/HeroV4";
import CinematicHero from "@/components/home-v5/CinematicHero";
import TextMaskHero from "@/components/home-v6/TextMaskHero";
import SplitHero from "@/components/home-v7/SplitHero";
import LiquidHero from "@/components/home-v8/LiquidHero";

function SectionDivider({ category }: { category: string }) {
  return (
    <div className="sticky top-10 z-50 border-b-2 border-gold bg-navy-deep px-8 py-6">
      <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
        {category}
      </h2>
    </div>
  );
}

function VersionLabel({ version, name }: { version: string; name: string }) {
  return (
    <div className="relative z-40 flex items-center gap-4 border-b border-gold/30 bg-gold px-8 py-3">
      <span className="font-[family-name:var(--font-verbatim)] text-sm font-black uppercase tracking-wider text-navy-deep">
        {version}
      </span>
      <span className="font-[family-name:var(--font-montserrat)] text-xs text-navy-deep/60">
        {name}
      </span>
    </div>
  );
}

/* ─── Preloader wrapper: click to replay ─── */
function PreloaderDemo({
  version,
  name,
  children,
}: {
  version: string;
  name: string;
  children: (props: { onComplete: () => void; show: boolean }) => React.ReactNode;
}) {
  const [show, setShow] = useState(true);
  const [key, setKey] = useState(0);

  return (
    <div>
      <VersionLabel version={version} name={name} />
      <div className="relative h-screen overflow-hidden bg-navy-deep">
        <AnimatePresence mode="wait">
          {show && (
            <div key={key}>
              {children({ onComplete: () => setShow(false), show })}
            </div>
          )}
        </AnimatePresence>

        {/* Replay button */}
        {!show && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-navy-deep">
            <button
              onClick={() => {
                setKey((k) => k + 1);
                setShow(true);
              }}
              className="border border-gold/30 px-6 py-3 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-navy-deep"
            >
              Rejouer le preloader
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const NAV = [
  { id: "preloaders", label: "Preloaders" },
  { id: "heroes", label: "Heroes" },
];

export default function ComparatifHero() {
  return (
    <>
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center gap-2 bg-navy-deep/95 px-4 py-2 backdrop-blur-sm">
        <span className="mr-4 shrink-0 font-[family-name:var(--font-verbatim)] text-xs font-bold text-gold">
          COMPARATIF
        </span>
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-white/50 transition-all hover:border-gold hover:text-gold"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="pt-10">
        {/* ════════════════════════════════════════════ */}
        {/*  PRELOADERS                                 */}
        {/* ════════════════════════════════════════════ */}
        <div id="preloaders">
          <SectionDivider category="Preloaders" />

          <PreloaderDemo version="V5" name="CinematicHero — Typewriter SCBT + split curtain (preloader intégré au hero)">
            {({ onComplete }) => {
              // V5 has preloader built into the hero, so we just show it
              // We'll let it auto-complete after a delay
              setTimeout(onComplete, 5000);
              return (
                <div className="h-screen">
                  <CinematicHero />
                </div>
              );
            }}
          </PreloaderDemo>

          <PreloaderDemo version="V6" name="Preloader — Logo pulse + progress + split curtain skew">
            {({ onComplete }) => (
              <PreloaderV6 onComplete={onComplete} />
            )}
          </PreloaderDemo>

          <PreloaderDemo version="V7" name="LoadSequence — Counter 00→99 + flash + SCBT spring + clip wipe">
            {({ onComplete }) => (
              <LoadSequence onComplete={onComplete} />
            )}
          </PreloaderDemo>

          <PreloaderDemo version="V8" name="MatrixLoader — Digital rain + convergence + shatter">
            {({ onComplete }) => (
              <MatrixLoader onComplete={onComplete} />
            )}
          </PreloaderDemo>
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  HEROES                                     */}
        {/* ════════════════════════════════════════════ */}
        <div id="heroes">
          <SectionDivider category="Heroes" />

          <VersionLabel version="V1" name="Hero — Classique gradient + texte centré + photo bg" />
          <Hero />

          <VersionLabel version="V2" name="HeroV2 — Street diagonal cut + outline DEMAIN + grain" />
          <HeroV2 />

          <VersionLabel version="V3" name="HeroV3 — Parallax sticky 150vh + split text lettre par lettre" />
          <HeroV3 />

          <VersionLabel version="V4" name="HeroV4 — Zoom-through titre (scale 1→8) + reveal content" />
          <HeroV4 />

          <VersionLabel version="V6" name="TextMaskHero — background-clip:text photo à travers les lettres" />
          <TextMaskHero preloaderDone={true} />

          <VersionLabel version="V7" name="SplitHero — Split screen photo/texte + gap doré qui se ferme" />
          <SplitHero preloaderDone={true} />

          <VersionLabel version="V8" name="LiquidHero — Blobs fluides morphing + titre centré" />
          <LiquidHero preloaderDone={true} />
        </div>
      </div>
    </>
  );
}
