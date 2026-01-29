"use client";

import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types";
import { Award, Sparkles } from "lucide-react";
import Link from "next/link";

interface EditorsPickProps {
  articles: Article[];
}

export default function EditorsPick({ articles }: EditorsPickProps) {
  if (articles.length === 0) return null;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#d4c5b0' }}>
            <Award className="h-6 w-6" style={{ color: '#5c4a37' }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-headline uppercase" style={{ color: '#5c4a37' }}>
            Editor's Pick
          </h2>
        </div>
        <Link
          href="/search?featured=true"
          className="text-sm font-serif font-bold uppercase tracking-wide transition-colors flex items-center space-x-1"
          style={{ color: '#6b6b6b' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
        >
          <span>View All</span>
          <Sparkles className="h-4 w-4" />
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
  );
}

