"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { NEXT_MATCH } from "@/lib/constants";
import { getCountdown } from "@/lib/utils";

export default function NextMatch() {
  const [countdown, setCountdown] = useState(getCountdown(NEXT_MATCH.date));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(NEXT_MATCH.date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownItems = [
    { value: countdown.days, label: "Jours" },
    { value: countdown.hours, label: "Heures" },
    { value: countdown.minutes, label: "Minutes" },
    { value: countdown.seconds, label: "Secondes" },
  ];

  return (
    <section className="bg-bg-alt py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="PROCHAIN MATCH" subtitle="Matchday" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-white shadow-lg border border-blue-primary/10 overflow-hidden"
        >
          {/* Lion watermark */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.05] pointer-events-none lion-watermark-light"
            style={{
              backgroundPosition: "center right",
              backgroundSize: "contain",
            }}
          />

          <div className="relative z-10 p-6 md:p-10">
            {/* Top: Category, competition, venue */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <span className="bg-blue-accent rounded-full px-4 py-1 text-sm text-white font-semibold">
                {NEXT_MATCH.category}
              </span>
              <span className="font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider text-text-secondary">
                {NEXT_MATCH.competition}
              </span>
              <span className="text-xs text-text-secondary">{NEXT_MATCH.venue}</span>
            </div>

            {/* Center: Teams vs */}
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-10">
              {/* Home team */}
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={NEXT_MATCH.homeTeam.logo}
                  alt={NEXT_MATCH.homeTeam.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
                <span className="font-[family-name:var(--font-verbatim)] text-sm md:text-base uppercase tracking-wider text-navy-deep">
                  {NEXT_MATCH.homeTeam.name}
                </span>
              </div>

              {/* VS */}
              <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black tracking-tight md:text-5xl text-blue-primary/30">
                VS
              </span>

              {/* Away team */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-bg-alt rounded-full">
                  <span className="font-[family-name:var(--font-verbatim)] text-xl font-black tracking-tight md:text-2xl text-navy-deep">
                    {NEXT_MATCH.awayTeam.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-verbatim)] text-sm md:text-base uppercase tracking-wider text-navy-deep">
                  {NEXT_MATCH.awayTeam.name}
                </span>
              </div>
            </div>

            {/* Bottom: Countdown */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center bg-bg-alt rounded-lg p-4 min-w-[70px] md:min-w-[90px]"
                >
                  <span className="font-[family-name:var(--font-verbatim)] text-4xl font-black tracking-tight text-navy-deep">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
