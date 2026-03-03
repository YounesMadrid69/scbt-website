"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { PHOTO_SERIES } from "@/lib/constants";

export default function PhotoSeries() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-navy-deep py-20 px-4"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="NOS MOMENTS" subtitle="S\u00E9rie | Histoire" dark />
      </div>

      <div className="scrollbar-hide flex gap-6 overflow-x-auto px-4 pb-4">
        {PHOTO_SERIES.map((photo) => (
          <div
            key={photo.id}
            className="group min-w-[300px] cursor-pointer md:min-w-[400px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              {/* Background placeholder with hover scale */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/30 to-navy transition-transform duration-500 group-hover:scale-105" />

              {/* Bottom overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />

              {/* Caption content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="block font-[family-name:var(--font-verbatim)] text-sm text-gold">
                  {photo.date}
                </span>
                <p className="mt-1 text-sm text-white">{photo.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
