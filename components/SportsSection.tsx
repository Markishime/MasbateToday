"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Article } from "@/types";
import ArticleCard from "./ArticleCard";
import { staticSportsArticles } from "@/lib/staticData";

interface SportsSectionProps {
  articles: Article[];
}

export default function SportsSection({ articles }: SportsSectionProps) {
  const sportsArticles = articles.filter(a => 
    a.tags?.some(tag => ['sports', 'basketball', 'football', 'athletics'].includes(tag.toLowerCase()))
  ).slice(0, 6);

  // Use static data if no sports articles found
  const displayArticles = sportsArticles.length > 0 
    ? sportsArticles 
    : staticSportsArticles as Article[];

  return (
    <div className="space-y-6">
      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="h-12 w-12 mx-auto mb-4" style={{ color: '#8b6f47' }} />
            <p className="font-serif italic text-lg" style={{ color: '#6b6b6b' }}>
              Sports news coming soon
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}