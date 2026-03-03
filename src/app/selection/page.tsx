"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

/* ─── Preloaders gardés ─── */
import CinematicHero from "@/components/home-v5/CinematicHero";
import PreloaderV6 from "@/components/home-v6/Preloader";

/* ─── Heroes gardés ─── */
import Hero from "@/components/home/Hero";
import HeroV2 from "@/components/home-v2/HeroV2";
import HeroV3 from "@/components/home-v3/HeroV3";
import SplitHero from "@/components/home-v7/SplitHero";

/* ─── Manifeste gardés ─── */
import MarqueeBanner from "@/components/home-v3/MarqueeBanner";
import ManifestoV4 from "@/components/home-v4/ManifestoV4";

/* ─── Calendrier gardés ─── */
import Calendar from "@/components/home/Calendar";
import CalendarV2 from "@/components/home-v2/CalendarV2";
import CalendarV3 from "@/components/home-v3/CalendarV3";

/* ─── Actualités gardées ─── */
import News from "@/components/home/News";
import NewsV2 from "@/components/home-v2/NewsV2";

/* ─── Galerie (toutes, à décider) ─── */
import PhotoSeries from "@/components/home/PhotoSeries";
import PhotoSeriesV2 from "@/components/home-v2/PhotoSeriesV2";
import GalleryV3 from "@/components/home-v3/GalleryV3";
import FullGalleryV4 from "@/components/home-v4/FullGalleryV4";
import VelocityGallery from "@/components/home-v5/VelocityGallery";
import CursorGallery from "@/components/home-v6/CursorGallery";
import MosaicGallery from "@/components/home-v7/MosaicGallery";
import PolaroidGallery from "@/components/home-v8/PolaroidGallery";

/* ─── Stats → MarqueeBanner V3 (déjà importé) ─── */

/* ─── Équipes (toutes, à décider) ─── */
import TeamsPreview from "@/components/home/TeamsPreview";
import TeamsPreviewV2 from "@/components/home-v2/TeamsPreviewV2";
import TeamsV3 from "@/components/home-v3/TeamsV3";
import TeamsV4 from "@/components/home-v4/TeamsV4";
import AccordionTeams from "@/components/home-v5/AccordionTeams";
import FanTeams from "@/components/home-v6/FanTeams";
import FlipTeams from "@/components/home-v7/FlipTeams";
import HoverTeams from "@/components/home-v8/HoverTeams";

/* ─── Closing gardés ─── */
import PartnersV3 from "@/components/home-v3/PartnersV3";
import InfiniteClosing from "@/components/home-v8/InfiniteClosing";

/* ─── UI ─── */
function SectionDivider({ category, decided }: { category: string; decided?: boolean }) {
  return (
    <div className="sticky top-10 z-50 border-b-2 border-gold bg-navy-deep px-8 py-6 flex items-center gap-4">
      <h2 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
        {category}
      </h2>
      {!decided && (
        <span className="rounded-full bg-gold/20 px-3 py-1 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-gold">
          À décider
        </span>
      )}
      {decided && (
        <span className="rounded-full bg-green-500/20 px-3 py-1 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-green-400">
          Sélectionné
        </span>
      )}
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

function PreloaderDemo({
  version,
  name,
  children,
}: {
  version: string;
  name: string;
  children: (props: { onComplete: () => void }) => React.ReactNode;
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
              {children({ onComplete: () => setShow(false) })}
            </div>
          )}
        </AnimatePresence>
        {!show && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-navy-deep">
            <button
              onClick={() => { setKey((k) => k + 1); setShow(true); }}
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
  { id: "manifesto", label: "Manifeste" },
  { id: "calendar", label: "Calendrier" },
  { id: "news", label: "Actualités" },
  { id: "gallery", label: "Galerie" },
  { id: "stats", label: "Stats" },
  { id: "teams", label: "Équipes" },
  { id: "closing", label: "Closing" },
];

export default function Selection() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center gap-1 overflow-x-auto bg-navy-deep/95 px-4 py-2 backdrop-blur-sm">
        <span className="mr-4 shrink-0 font-[family-name:var(--font-verbatim)] text-xs font-bold text-gold">
          SÉLECTION
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

        {/* ═══ PRELOADERS ═══ */}
        <div id="preloaders">
          <SectionDivider category="Preloaders" decided />

          <PreloaderDemo version="V5" name="CinematicHero — Typewriter SCBT + split curtain">
            {({ onComplete }) => {
              setTimeout(onComplete, 5000);
              return <div className="h-screen"><CinematicHero /></div>;
            }}
          </PreloaderDemo>

          <PreloaderDemo version="V6" name="Preloader — Logo pulse + progress + split curtain skew">
            {({ onComplete }) => <PreloaderV6 onComplete={onComplete} />}
          </PreloaderDemo>
        </div>

        {/* ═══ HEROES ═══ */}
        <div id="heroes">
          <SectionDivider category="Heroes" decided />

          <VersionLabel version="V1" name="Hero — Classique gradient + photo bg" />
          <Hero />

          <VersionLabel version="V2" name="HeroV2 — Street diagonal cut + outline DEMAIN + grain" />
          <HeroV2 />

          <VersionLabel version="V3" name="HeroV3 — Parallax sticky + split text lettre par lettre" />
          <HeroV3 />

          <VersionLabel version="V7" name="SplitHero — Split screen photo/texte + gap doré" />
          <SplitHero preloaderDone={true} />
        </div>

        {/* ═══ MANIFESTE ═══ */}
        <div id="manifesto">
          <SectionDivider category="Manifeste / Valeurs" decided />

          <VersionLabel version="V3" name="MarqueeBanner — Double marquee + stats centre" />
          <MarqueeBanner />

          <VersionLabel version="V4" name="ManifestoV4 — Word-by-word highlight pinné" />
          <ManifestoV4 />
        </div>

        {/* ═══ CALENDRIER ═══ */}
        <div id="calendar">
          <SectionDivider category="Calendrier" decided />

          <VersionLabel version="V1" name="Calendar — Grille classique + filtres catégories" />
          <Calendar />

          <VersionLabel version="V2" name="CalendarV2 — Cards street + accents couleur" />
          <CalendarV2 />

          <VersionLabel version="V3" name="CalendarV3 — Liste stagger + watermark MATCHS" />
          <CalendarV3 />
        </div>

        {/* ═══ ACTUALITÉS ═══ */}
        <div id="news">
          <SectionDivider category="Actualités" decided />

          <VersionLabel version="V1" name="News — Cards classiques" />
          <News />

          <VersionLabel version="V2" name="NewsV2 — Dark cards + grain + stripes" />
          <NewsV2 />
        </div>

        {/* ═══ GALERIE ═══ */}
        <div id="gallery">
          <SectionDivider category="Galerie / Photos" />

          <VersionLabel version="V1" name="PhotoSeries — Scroll horizontal photos historiques" />
          <PhotoSeries />

          <VersionLabel version="V2" name="PhotoSeriesV2 — Dark + SVG diagonales" />
          <PhotoSeriesV2 />

          <VersionLabel version="V3" name="GalleryV3 — Portraits 3:4 + parallax + year watermark" />
          <GalleryV3 />

          <VersionLabel version="V4" name="FullGalleryV4 — Slides plein écran + progress bar" />
          <FullGalleryV4 />

          <VersionLabel version="V5" name="VelocityGallery — Skew basé sur la vélocité scroll" />
          <VelocityGallery />

          <VersionLabel version="V6" name="CursorGallery — Parallax driven by mouse cursor" />
          <CursorGallery />

          <VersionLabel version="V7" name="MosaicGallery — Scatter explosé → reassemble grille" />
          <MosaicGallery />

          <VersionLabel version="V8" name="PolaroidGallery — Polaroids éparpillés → grille ordonnée" />
          <PolaroidGallery />
        </div>

        {/* ═══ STATS ═══ */}
        <div id="stats">
          <SectionDivider category="Stats" decided />

          <VersionLabel version="V3" name="MarqueeBanner — Chiffres intégrés dans le bandeau marquee" />
          <MarqueeBanner />
        </div>

        {/* ═══ ÉQUIPES ═══ */}
        <div id="teams">
          <SectionDivider category="Équipes" />

          <VersionLabel version="V1" name="TeamsPreview — Cards classiques avec overlay" />
          <TeamsPreview />

          <VersionLabel version="V2" name="TeamsPreviewV2 — Cards street + gold underline hover" />
          <TeamsPreviewV2 />

          <VersionLabel version="V3" name="TeamsV3 — 6 colonnes portrait + corner brackets" />
          <TeamsV3 />

          <VersionLabel version="V4" name="TeamsV4 — Texte vertical writing-mode full height" />
          <TeamsV4 />

          <VersionLabel version="V5" name="AccordionTeams — Accordéon expand/collapse hover" />
          <AccordionTeams />

          <VersionLabel version="V6" name="FanTeams — Cards en éventail arc au scroll" />
          <FanTeams />

          <VersionLabel version="V7" name="FlipTeams — 3D flip rotateY au hover" />
          <FlipTeams />

          <VersionLabel version="V8" name="HoverTeams — Liste full-width slide hover" />
          <HoverTeams />
        </div>

        {/* ═══ CLOSING ═══ */}
        <div id="closing">
          <SectionDivider category="Closing / Partenaires" decided />

          <VersionLabel version="V3" name="PartnersV3 — Double scroll directions opposées" />
          <PartnersV3 />

          <VersionLabel version="V8" name="InfiniteClosing — 3 rubans infinis + partenaires grille" />
          <InfiniteClosing />
        </div>

      </div>
    </>
  );
}
