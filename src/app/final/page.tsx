"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

/* ─── Preloader ─── */
import PreloaderV6 from "@/components/home-v6/Preloader";

/* ─── Hero ─── */
import HeroV3 from "@/components/home-v3/HeroV3";

/* ─── Manifeste ─── */
import ManifestoV4 from "@/components/home-v4/ManifestoV4";
import MarqueeBanner from "@/components/home-v3/MarqueeBanner";

/* ─── Calendrier ─── */
import CalendarFinal from "@/components/home/CalendarFinal";

/* ─── Actualités ─── */
import NewsV2 from "@/components/home-v2/NewsV2";

/* ─── Événements ─── */
import EventsFinal from "@/components/home-final/EventsFinal";

/* ─── Partenaires ─── */
import PartnersCarousel from "@/components/home/PartnersCarousel";

/* ─── Galerie ─── */
import GalleryV3 from "@/components/home-v3/GalleryV3";

/* ─── Équipes ─── */
import FanTeams from "@/components/home-v6/FanTeams";

/* ─── CTA ─── */
import CTAJoinClub from "@/components/home-final/CTAJoinClub";

export default function Final() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <PreloaderV6 onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <HeroV3 />
      <ManifestoV4 />
      <MarqueeBanner />
      <CalendarFinal />
      <NewsV2 />
      <EventsFinal />
      <PartnersCarousel />
      <GalleryV3 />
      <FanTeams />
      <CTAJoinClub />
    </>
  );
}
