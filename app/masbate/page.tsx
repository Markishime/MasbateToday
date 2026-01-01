"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInfiniteArticles } from "@/lib/hooks/useInfiniteArticles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import InfiniteScroll from "@/components/InfiniteScroll";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";

export default function MasbatePage() {
  const { articles, loadMore, hasMore, loading, reset } = useInfiniteArticles("masbate");

  useEffect(() => {
    reset();
    loadMore();
  }, []);

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
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <SectionAnimation delay={0}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Masbate News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Latest news, events, and updates from Masbate, Philippines
            </p>
          </motion.div>
        </SectionAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {articles.length === 0 && !loading ? (
              <SectionAnimation delay={0.2}>
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No articles found. Check back soon for updates!
                  </p>
                </div>
              </SectionAnimation>
            ) : (
              <InfiniteScroll
                onLoadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {articles.map((article) => (
                    <motion.div key={article.id} variants={itemVariants}>
                      <ArticleCard article={article} />
                    </motion.div>
                  ))}
                </motion.div>
              </InfiniteScroll>
            )}
          </div>

          <div className="lg:col-span-1">
            <SectionAnimation delay={0.3}>
              <Sidebar />
            </SectionAnimation>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
