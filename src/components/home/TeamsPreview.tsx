"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { TEAMS_PREVIEW } from "@/lib/constants";

export default function TeamsPreview() {
  return (
    <section className="bg-bg-main py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="NOS ÉQUIPES" subtitle="Saison 2025-2026" />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {TEAMS_PREVIEW.map((team) => (
            <motion.div
              key={team.name}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative cursor-pointer overflow-hidden rounded-xl"
            >
              {/* Aspect ratio container */}
              <div className="aspect-[4/3]">
                {/* Background placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/40 to-navy-deep" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent transition-colors duration-300 group-hover:from-blue-accent/20" />

                {/* Hover scale effect */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" />

                {/* Team name */}
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <h3 className="font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    {team.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="#equipes" variant="outline">
            Voir toutes les équipes
          </Button>
        </div>
      </div>
    </section>
  );
}
