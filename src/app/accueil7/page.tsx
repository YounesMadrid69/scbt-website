"use client";

import { useState } from "react";
import LoadSequence from "@/components/home-v7/LoadSequence";
import SplitHero from "@/components/home-v7/SplitHero";
import ScrollTypography from "@/components/home-v7/ScrollTypography";
import MomentumCalendar from "@/components/home-v7/MomentumCalendar";
import CinematicNews from "@/components/home-v7/CinematicNews";
import MosaicGallery from "@/components/home-v7/MosaicGallery";
import DialStats from "@/components/home-v7/DialStats";
import FlipTeams from "@/components/home-v7/FlipTeams";
import GravityClosing from "@/components/home-v7/GravityClosing";
import { AnimatePresence } from "framer-motion";

export default function Accueil7() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <LoadSequence onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>
      <SplitHero preloaderDone={!showPreloader} />
      <ScrollTypography />
      <MomentumCalendar />
      <CinematicNews />
      <MosaicGallery />
      <DialStats />
      <FlipTeams />
      <GravityClosing />
    </>
  );
}
