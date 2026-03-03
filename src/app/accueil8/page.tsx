"use client";

import { useState } from "react";
import MatrixLoader from "@/components/home-v8/MatrixLoader";
import LiquidHero from "@/components/home-v8/LiquidHero";
import RibbonManifesto from "@/components/home-v8/RibbonManifesto";
import TimelineCalendar from "@/components/home-v8/TimelineCalendar";
import DepthNews from "@/components/home-v8/DepthNews";
import PolaroidGallery from "@/components/home-v8/PolaroidGallery";
import NeonStats from "@/components/home-v8/NeonStats";
import HoverTeams from "@/components/home-v8/HoverTeams";
import InfiniteClosing from "@/components/home-v8/InfiniteClosing";
import { AnimatePresence } from "framer-motion";

export default function Accueil8() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <MatrixLoader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>
      <LiquidHero preloaderDone={!showLoader} />
      <RibbonManifesto />
      <TimelineCalendar />
      <DepthNews />
      <PolaroidGallery />
      <NeonStats />
      <HoverTeams />
      <InfiniteClosing />
    </>
  );
}
