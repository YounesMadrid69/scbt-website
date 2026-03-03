"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { LABELS } from "@/lib/constants";

export default function Labels() {
  return (
    <section className="bg-bg-main py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="LABELS & DISTINCTIONS"
          subtitle="Reconnaissance"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LABELS.map((label, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="rounded-2xl border border-blue-primary/10 bg-white shadow-md p-6 text-center"
            >
              {/* Image placeholder */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-blue-primary/20">
                <Award className="h-10 w-10 text-gold" />
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-verbatim)] text-lg font-semibold text-navy-deep">
                {label.title}
              </h3>

              {label.level && (
                <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs text-gold">
                  {label.level}
                </span>
              )}

              {label.period && (
                <p className="mt-1 text-sm text-blue-accent">{label.period}</p>
              )}

              <p className="mt-3 text-sm text-text-secondary">{label.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
