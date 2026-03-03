"use client";

import { motion } from "framer-motion";
import { MapPin, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { INFRASTRUCTURE } from "@/lib/constants";

export default function Infrastructure() {
  return (
    <section className="bg-bg-alt py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="INFRASTRUCTURES"
          subtitle="Stade L\u00E9o Lagrange"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Image gallery placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main large image */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-primary/10 to-bg-alt" />

            {/* 3 small thumbnails */}
            <div className="mt-2 grid grid-cols-3 gap-2">
              {INFRASTRUCTURE.images.map((_, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg bg-gradient-to-br from-blue-primary/10 to-bg-alt"
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Info section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="font-[family-name:var(--font-verbatim)] text-4xl font-black uppercase tracking-tight text-navy-deep">
              {INFRASTRUCTURE.name}
            </h3>

            <p className="mt-4 flex items-center gap-2 text-text-secondary">
              <MapPin className="h-5 w-5 shrink-0 text-blue-accent" />
              {INFRASTRUCTURE.address}
            </p>

            <ul className="mt-6 space-y-3">
              {INFRASTRUCTURE.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
