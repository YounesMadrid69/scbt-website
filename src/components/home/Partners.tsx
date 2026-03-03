"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { PARTNERS } from "@/lib/constants";

export default function Partners() {
  // Duplicate the array twice for seamless infinite loop
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-y border-blue-primary/10 bg-bg-alt py-16 px-4">
      <SectionTitle title="PARTENAIRES" align="center" />

      {/* Marquee container */}
      <div className="overflow-hidden">
        <div className="animate-marquee flex items-center gap-16">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-[60px] w-[120px] flex-shrink-0 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white shadow-sm">
                <span className="text-center text-xs text-text-secondary">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
