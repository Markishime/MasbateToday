"use client";

import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import { motion } from "framer-motion";

interface StaticArticlesProps {
  articles: Article[];
  staticArticles: Partial<Article>[];
}

export default function StaticArticles({ articles, staticArticles }: StaticArticlesProps) {
  // Use static articles if no articles are available
  const displayArticles = articles.length > 0 ? articles : (staticArticles as Article[]);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="newspaper-columns"
    >
      {displayArticles.map((article, index) => (
        <motion.div
          key={`${article.id || 'article'}-${index}`}
          variants={itemVariants}
          className="newspaper-clip bg-white p-4 mb-6 break-inside-avoid transition-colors duration-300"
          style={{ borderColor: '#8b6f47' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#faf8f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  );
}
