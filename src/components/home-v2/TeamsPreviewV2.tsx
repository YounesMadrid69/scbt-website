"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TEAMS_PREVIEW } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotate: 1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TeamsPreviewV2() {
  return (
    <section className="relative overflow-hidden bg-bg-alt py-24 px-4">
      {/* Deco dots top right */}
      <div className="pointer-events-none absolute top-8 right-12 hidden opacity-15 md:block">
        <Image src="/images/deco-dots.svg" alt="" width={60} height={60} />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div className="flex items-center gap-5">
            <Image src="/images/deco-chevrons.svg" alt="" width={36} height={36} className="hidden opacity-20 md:block" />
            <div>
              <span className="mb-2 block font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-[0.2em] text-gold">
                Saison 2025-2026
              </span>
              <h2 className="font-[family-name:var(--font-verbatim)] text-5xl font-black uppercase leading-[0.85] tracking-tight text-navy-deep md:text-7xl">
                NOS ÉQUIPES
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {TEAMS_PREVIEW.map((team) => (
            <motion.div
              key={team.name}
              variants={itemVariants}
              whileHover={{ y: -10, rotate: -0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative cursor-pointer overflow-hidden"
            >
              <div className="card-cut-lg aspect-[4/3]">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-blue-primary/60 to-navy-deep transition-all duration-700 group-hover:scale-110" />

                {/* Noise grain */}
                <div className="noise-overlay absolute inset-0" />

                {/* Stripe accent - top right */}
                <div className="absolute top-0 right-0 h-16 w-16 stripe-pattern opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.15]" />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-transparent to-transparent" />

                {/* Team name */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                  <div className="mb-2 h-[2px] w-8 bg-gold transition-all duration-300 group-hover:w-12" />
                  <h3 className="font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    {team.name}
                  </h3>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-gold/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#equipes"
            className="card-cut-corner border-2 border-navy-deep/20 px-8 py-4 font-[family-name:var(--font-verbatim)] text-sm font-bold uppercase tracking-wider text-navy-deep transition-all hover:border-blue-primary hover:bg-blue-primary hover:text-white"
          >
            Voir toutes les équipes
          </a>
        </motion.div>
      </div>
    </section>
  );
}
