"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { STAFF_MEMBERS } from "@/lib/constants";

const CATEGORY_ORDER = ["Direction", "Entra\u00EEneurs", "B\u00E9n\u00E9voles"];

export default function Staff() {
  const groupedStaff = CATEGORY_ORDER.map((category) => ({
    category,
    members: STAFF_MEMBERS.filter((m) => m.category === category),
  })).filter((group) => group.members.length > 0);

  return (
    <section className="bg-bg-main py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="NOTRE STAFF" subtitle="Organigramme" />

        <div className="space-y-12">
          {groupedStaff.map((group) => (
            <div key={group.category}>
              <h3 className="mb-6 font-[family-name:var(--font-verbatim)] text-lg uppercase tracking-wider text-gold">
                {group.category}
              </h3>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {group.members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="overflow-hidden rounded-xl border border-blue-primary/10 bg-white shadow-md transition hover:border-blue-accent/30"
                  >
                    {/* Photo area placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-blue-primary/10 to-bg-alt" />

                    {/* Info */}
                    <div className="p-4">
                      <p className="font-[family-name:var(--font-verbatim)] font-semibold text-navy-deep">
                        {member.name}
                      </p>
                      <p className="text-sm text-text-secondary">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
