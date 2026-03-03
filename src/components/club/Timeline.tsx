"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { TIMELINE_EVENTS } from "@/lib/constants";

export default function Timeline() {
  return (
    <section className="bg-bg-main py-20 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="NOTRE HISTOIRE" subtitle="Depuis 1964" />

        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-accent/30 md:left-1/2" />

          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex items-start ${
                    isEven
                      ? "md:flex-row md:justify-start"
                      : "md:flex-row-reverse md:justify-start"
                  } flex-row`}
                >
                  {/* Year badge on the line */}
                  <div className="absolute left-4 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-blue-accent font-[family-name:var(--font-verbatim)] text-lg text-white md:left-1/2">
                    {event.year.slice(-2)}
                  </div>

                  {/* Connector dot */}
                  <div className="absolute left-4 top-6 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-accent/50 md:left-1/2 md:top-14" />

                  {/* Content card */}
                  <div
                    className={`ml-12 max-w-md md:ml-0 ${
                      isEven
                        ? "md:mr-auto md:pr-16"
                        : "md:ml-auto md:pl-16"
                    } md:w-1/2`}
                  >
                    <div className="rounded-xl border border-blue-primary/10 bg-white shadow-md p-6">
                      <h3 className="font-[family-name:var(--font-verbatim)] text-xl font-semibold text-navy-deep">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary">
                        {event.description}
                      </p>
                      {event.image && (
                        <div className="mt-4 aspect-video rounded-lg bg-gradient-to-br from-blue-primary/10 to-bg-alt" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
