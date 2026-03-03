"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/ui/NewsCard";
import { NEWS_ARTICLES } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function News() {
  return (
    <section className="bg-bg-alt py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="ACTUALIT\u00C9"
          linkText="Voir tout"
          linkHref="#"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {NEWS_ARTICLES.map((article, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={article.id}
                variants={itemVariants}
                className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <NewsCard
                  title={article.title}
                  category={article.category}
                  image={article.image}
                  date={article.date}
                  featured={isFeatured}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
