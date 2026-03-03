"use client";

import { useState } from "react";
import Preloader from "@/components/home-v6/Preloader";
import TextMaskHero from "@/components/home-v6/TextMaskHero";
import ColorManifesto from "@/components/home-v6/ColorManifesto";
import DrawLineCalendar from "@/components/home-v6/DrawLineCalendar";
import ImmersiveNews from "@/components/home-v6/ImmersiveNews";
import CursorGallery from "@/components/home-v6/CursorGallery";
import RevealStats from "@/components/home-v6/RevealStats";
import FanTeams from "@/components/home-v6/FanTeams";
import KineticClosing from "@/components/home-v6/KineticClosing";
import { AnimatePresence } from "framer-motion";

export default function Accueil6() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>
      <TextMaskHero preloaderDone={!showPreloader} />
      <ColorManifesto />
      <DrawLineCalendar />
      <ImmersiveNews />
      <CursorGallery />
      <RevealStats />
      <FanTeams />
      <KineticClosing />
    </>
  );
}
