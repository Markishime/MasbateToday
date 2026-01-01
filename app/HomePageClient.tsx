"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import SectionAnimation from "@/components/SectionAnimation";
import { Article } from "@/types";

interface HomePageClientProps {
  masbateArticles: Article[];
  nationalArticles: Article[];
  blogArticles: Article[];
}

export default function HomePageClient({
  masbateArticles,
  nationalArticles,
  blogArticles,
}: HomePageClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Top Stories in Masbate */}
        <SectionAnimation delay={0.3}>
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Top Stories in Masbate
              </h2>
              <motion.a
                href="/masbate"
                whileHover={{ x: 5 }}
                className="text-primary hover:underline text-sm font-semibold"
              >
                View All →
              </motion.a>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {masbateArticles.map((article, index) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} featured={index === 0} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </SectionAnimation>

        {/* National Philippines News */}
        <SectionAnimation delay={0.4}>
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                National Philippines News
              </h2>
              <motion.a
                href="/national"
                whileHover={{ x: 5 }}
                className="text-secondary hover:underline text-sm font-semibold"
              >
                View All →
              </motion.a>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {nationalArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </SectionAnimation>

        {/* Blogs & Opinions */}
        <SectionAnimation delay={0.5}>
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                Blogs & Opinions
              </h2>
              <motion.a
                href="/blogs"
                whileHover={{ x: 5 }}
                className="text-primary hover:underline text-sm font-semibold"
              >
                View All →
              </motion.a>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {blogArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </SectionAnimation>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <SectionAnimation delay={0.6}>
          <Sidebar />
        </SectionAnimation>
      </div>
    </div>
  );
}

