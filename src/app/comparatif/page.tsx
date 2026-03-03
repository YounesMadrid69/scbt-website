"use client";

/* ─── V1 ─── */
import Calendar from "@/components/home/Calendar";
import News from "@/components/home/News";
import PhotoSeries from "@/components/home/PhotoSeries";
import Stats from "@/components/home/Stats";
import TeamsPreview from "@/components/home/TeamsPreview";
import Partners from "@/components/home/Partners";

/* ─── V2 ─── */
import CalendarV2 from "@/components/home-v2/CalendarV2";
import NewsV2 from "@/components/home-v2/NewsV2";
import PhotoSeriesV2 from "@/components/home-v2/PhotoSeriesV2";
import StatsV2 from "@/components/home-v2/StatsV2";
import TeamsPreviewV2 from "@/components/home-v2/TeamsPreviewV2";
import PartnersV2 from "@/components/home-v2/PartnersV2";

/* ─── V3 ─── */
import MarqueeBanner from "@/components/home-v3/MarqueeBanner";
import CalendarV3 from "@/components/home-v3/CalendarV3";
import NewsV3 from "@/components/home-v3/NewsV3";
import GalleryV3 from "@/components/home-v3/GalleryV3";
import TeamsV3 from "@/components/home-v3/TeamsV3";
import PartnersV3 from "@/components/home-v3/PartnersV3";

/* ─── V4 ─── */
import ManifestoV4 from "@/components/home-v4/ManifestoV4";
import HorizontalCalendarV4 from "@/components/home-v4/HorizontalCalendarV4";
import StackedNewsV4 from "@/components/home-v4/StackedNewsV4";
import FullGalleryV4 from "@/components/home-v4/FullGalleryV4";
import StatsV4 from "@/components/home-v4/StatsV4";
import TeamsV4 from "@/components/home-v4/TeamsV4";
import FooterMarquee from "@/components/home-v4/FooterMarquee";

/* ─── V5 ─── */
import ParallaxDepth from "@/components/home-v5/ParallaxDepth";
import BentoCalendar from "@/components/home-v5/BentoCalendar";
import MagazineNews from "@/components/home-v5/MagazineNews";
import VelocityGallery from "@/components/home-v5/VelocityGallery";
import SlotMachineStats from "@/components/home-v5/SlotMachineStats";
import AccordionTeams from "@/components/home-v5/AccordionTeams";
import ClosingV5 from "@/components/home-v5/ClosingV5";

/* ─── V6 ─── */
import ColorManifesto from "@/components/home-v6/ColorManifesto";
import DrawLineCalendar from "@/components/home-v6/DrawLineCalendar";
import ImmersiveNews from "@/components/home-v6/ImmersiveNews";
import CursorGallery from "@/components/home-v6/CursorGallery";
import RevealStats from "@/components/home-v6/RevealStats";
import FanTeams from "@/components/home-v6/FanTeams";
import KineticClosing from "@/components/home-v6/KineticClosing";

/* ─── V7 ─── */
import ScrollTypography from "@/components/home-v7/ScrollTypography";
import MomentumCalendar from "@/components/home-v7/MomentumCalendar";
import CinematicNews from "@/components/home-v7/CinematicNews";
import MosaicGallery from "@/components/home-v7/MosaicGallery";
import DialStats from "@/components/home-v7/DialStats";
import FlipTeams from "@/components/home-v7/FlipTeams";
import GravityClosing from "@/components/home-v7/GravityClosing";

/* ─── V8 ─── */
import RibbonManifesto from "@/components/home-v8/RibbonManifesto";
import TimelineCalendar from "@/components/home-v8/TimelineCalendar";
import DepthNews from "@/components/home-v8/DepthNews";
import PolaroidGallery from "@/components/home-v8/PolaroidGallery";
import NeonStats from "@/components/home-v8/NeonStats";
import HoverTeams from "@/components/home-v8/HoverTeams";
import InfiniteClosing from "@/components/home-v8/InfiniteClosing";

/* ─── Section divider ─── */
function SectionDivider({ category }: { category: string }) {
  return (
    <div className="sticky top-0 z-50 border-b-2 border-gold bg-navy-deep px-8 py-6">
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

/* ─── Nav sommaire ─── */
const CATEGORIES = [
  { id: "manifesto", label: "Manifeste" },
  { id: "calendar", label: "Calendrier" },
  { id: "news", label: "Actualités" },
  { id: "gallery", label: "Galerie" },
  { id: "stats", label: "Stats" },
  { id: "teams", label: "Équipes" },
  { id: "closing", label: "Closing" },
];

export default function Comparatif() {
  return (
    <>
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center gap-1 overflow-x-auto bg-navy-deep/95 px-4 py-2 backdrop-blur-sm">
        <span className="mr-4 shrink-0 font-[family-name:var(--font-verbatim)] text-xs font-bold text-gold">
          COMPARATIF
        </span>
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-[family-name:var(--font-verbatim)] text-[10px] font-bold uppercase tracking-wider text-white/50 transition-all hover:border-gold hover:text-gold"
          >
            {cat.label}
          </a>
        ))}
      </nav>

      <div className="pt-12">
        {/* ════════════════════════════════════════════ */}
        {/*  MANIFESTE / VALEURS                        */}
        {/* ════════════════════════════════════════════ */}
        <div id="manifesto">
          <SectionDivider category="Manifeste / Valeurs" />

          <VersionLabel version="V3" name="MarqueeBanner — Double marquee + stats" />
          <MarqueeBanner />

          <VersionLabel version="V4" name="ManifestoV4 — Word-by-word highlight pinné" />
          <ManifestoV4 />

          <VersionLabel version="V5" name="ParallaxDepth — 6 couches parallax" />
          <ParallaxDepth />

          <VersionLabel version="V6" name="ColorManifesto — RGB interpolation 3 slides" />
          <ColorManifesto />

          <VersionLabel version="V7" name="ScrollTypography — Mots qui arrivent de partout" />
          <ScrollTypography />

          <VersionLabel version="V8" name="RibbonManifesto — 3 rubans alternés + spotlight" />
          <RibbonManifesto />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  CALENDRIER                                 */}
        {/* ════════════════════════════════════════════ */}
        <div id="calendar">
          <SectionDivider category="Calendrier" />

          <VersionLabel version="V1" name="Calendar — Grille classique + filtres" />
          <Calendar />

          <VersionLabel version="V2" name="CalendarV2 — Cards street + accents couleur" />
          <CalendarV2 />

          <VersionLabel version="V3" name="CalendarV3 — Liste stagger + watermark MATCHS" />
          <CalendarV3 />

          <VersionLabel version="V4" name="HorizontalCalendarV4 — Scroll hijack horizontal" />
          <HorizontalCalendarV4 />

          <VersionLabel version="V5" name="BentoCalendar — Bento grid + 3D tilt mouse" />
          <BentoCalendar />

          <VersionLabel version="V6" name="DrawLineCalendar — SVG draw on scroll" />
          <DrawLineCalendar />

          <VersionLabel version="V7" name="MomentumCalendar — Physique inertie horizontal" />
          <MomentumCalendar />

          <VersionLabel version="V8" name="TimelineCalendar — Timeline verticale alternée" />
          <TimelineCalendar />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  ACTUALITÉS                                 */}
        {/* ════════════════════════════════════════════ */}
        <div id="news">
          <SectionDivider category="Actualités" />

          <VersionLabel version="V1" name="News — Cards classiques" />
          <News />

          <VersionLabel version="V2" name="NewsV2 — Dark cards + grain + stripes" />
          <NewsV2 />

          <VersionLabel version="V3" name="NewsV3 — Éditorial asymétrique 7/5 cols" />
          <NewsV3 />

          <VersionLabel version="V4" name="StackedNewsV4 — Cards sticky empilées" />
          <StackedNewsV4 />

          <VersionLabel version="V5" name="MagazineNews — Spread magazine 21:9" />
          <MagazineNews />

          <VersionLabel version="V6" name="ImmersiveNews — Fullscreen crossfade" />
          <ImmersiveNews />

          <VersionLabel version="V7" name="CinematicNews — Pellicule film + sprockets" />
          <CinematicNews />

          <VersionLabel version="V8" name="DepthNews — Layers en profondeur" />
          <DepthNews />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  GALERIE / PHOTOS                           */}
        {/* ════════════════════════════════════════════ */}
        <div id="gallery">
          <SectionDivider category="Galerie / Photos" />

          <VersionLabel version="V1" name="PhotoSeries — Scroll horizontal photos" />
          <PhotoSeries />

          <VersionLabel version="V2" name="PhotoSeriesV2 — Dark + SVG diagonales" />
          <PhotoSeriesV2 />

          <VersionLabel version="V3" name="GalleryV3 — Portraits 3:4 + parallax" />
          <GalleryV3 />

          <VersionLabel version="V4" name="FullGalleryV4 — Slides plein écran + progress" />
          <FullGalleryV4 />

          <VersionLabel version="V5" name="VelocityGallery — Skew basé sur la vélocité" />
          <VelocityGallery />

          <VersionLabel version="V6" name="CursorGallery — Parallax driven by mouse" />
          <CursorGallery />

          <VersionLabel version="V7" name="MosaicGallery — Scatter → reassemble grid" />
          <MosaicGallery />

          <VersionLabel version="V8" name="PolaroidGallery — Polaroids éparpillés → grille" />
          <PolaroidGallery />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  STATS                                      */}
        {/* ════════════════════════════════════════════ */}
        <div id="stats">
          <SectionDivider category="Stats" />

          <VersionLabel version="V1" name="Stats — Compteurs classiques" />
          <Stats />

          <VersionLabel version="V2" name="StatsV2 — Lion watermark + accent stripe" />
          <StatsV2 />

          <VersionLabel version="V4" name="StatsV4 — Typo massive text-9xl + spring" />
          <StatsV4 />

          <VersionLabel version="V5" name="SlotMachineStats — Slot machine digits" />
          <SlotMachineStats />

          <VersionLabel version="V6" name="RevealStats — Curtain clip-path reveal" />
          <RevealStats />

          <VersionLabel version="V7" name="DialStats — Jauges SVG circulaires" />
          <DialStats />

          <VersionLabel version="V8" name="NeonStats — Barres horizontales + glow" />
          <NeonStats />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  ÉQUIPES                                    */}
        {/* ════════════════════════════════════════════ */}
        <div id="teams">
          <SectionDivider category="Équipes" />

          <VersionLabel version="V1" name="TeamsPreview — Cards classiques" />
          <TeamsPreview />

          <VersionLabel version="V2" name="TeamsPreviewV2 — Cards street + gold hover" />
          <TeamsPreviewV2 />

          <VersionLabel version="V3" name="TeamsV3 — 6 colonnes portrait + brackets" />
          <TeamsV3 />

          <VersionLabel version="V4" name="TeamsV4 — Texte vertical writing-mode" />
          <TeamsV4 />

          <VersionLabel version="V5" name="AccordionTeams — Accordéon expand/collapse" />
          <AccordionTeams />

          <VersionLabel version="V6" name="FanTeams — Cards en éventail au scroll" />
          <FanTeams />

          <VersionLabel version="V7" name="FlipTeams — 3D flip rotateY hover" />
          <FlipTeams />

          <VersionLabel version="V8" name="HoverTeams — Liste full-width hover slide" />
          <HoverTeams />
        </div>

        {/* ════════════════════════════════════════════ */}
        {/*  CLOSING / PARTENAIRES                      */}
        {/* ════════════════════════════════════════════ */}
        <div id="closing">
          <SectionDivider category="Closing / Partenaires" />

          <VersionLabel version="V1" name="Partners — Grille classique" />
          <Partners />

          <VersionLabel version="V2" name="PartnersV2 — Marquee + card-cut" />
          <PartnersV2 />

          <VersionLabel version="V3" name="PartnersV3 — Double scroll opposé" />
          <PartnersV3 />

          <VersionLabel version="V4" name="FooterMarquee — Giant slogan scroll" />
          <FooterMarquee />

          <VersionLabel version="V5" name="ClosingV5 — Grille + marquee statement" />
          <ClosingV5 />

          <VersionLabel version="V6" name="KineticClosing — 5 lignes kinetic typo" />
          <KineticClosing />

          <VersionLabel version="V7" name="GravityClosing — Lettres qui tombent + bounce" />
          <GravityClosing />

          <VersionLabel version="V8" name="InfiniteClosing — 3 rubans infinis + partenaires" />
          <InfiniteClosing />
        </div>
      </div>
    </>
  );
}
