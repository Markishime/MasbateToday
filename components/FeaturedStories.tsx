"use client";

import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types";
import { Star, Sparkles } from "lucide-react";
import Link from "next/link";

interface FeaturedStoriesProps {
  articles: Article[];
}

export default function FeaturedStories({ articles }: FeaturedStoriesProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-newspaper-black" fill="#1a1a1a" />
            <h2 className="text-2xl md:text-3xl font-headline text-newspaper-black uppercase tracking-wide">
              Featured Stories
            </h2>
          </div>
          <Link
            href="/search?featured=true"
            className="text-newspaper-darkGray hover:text-newspaper-black text-sm font-serif font-bold uppercase tracking-wide transition-colors"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 6).map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArticleCard article={article} featured={index === 0} />
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

