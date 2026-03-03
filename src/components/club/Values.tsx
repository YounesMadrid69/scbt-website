"use client";

import { motion } from "framer-motion";
import { Trophy, GraduationCap, HeartHandshake } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { CLUB_VALUES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
};

export default function Values() {
  return (
    <section className="bg-bg-alt py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="NOS VALEURS" align="center" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CLUB_VALUES.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Trophy;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="rounded-2xl border border-blue-primary/10 bg-white shadow-md p-8 text-center"
              >
                <IconComponent size={48} className="mx-auto text-gold" />
                <h3 className="mt-6 font-[family-name:var(--font-verbatim)] text-3xl font-black uppercase tracking-tight text-navy-deep">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
