"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Article } from "@/types";

interface AnimatedVideoListProps {
  articles: Article[];
  viewAllHref: string;
}

export default function AnimatedVideoList({ articles, viewAllHref }: AnimatedVideoListProps) {
  return (
    <div className="space-y-4">
      {articles.slice(0, 4).map((article, index) => (
        <Link key={article.id} href={`/article/${article.id}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="border-b pb-3 last:border-b-0 hover:bg-gray-50 p-2 -m-2 transition-colors"
            style={{ borderColor: '#d4c5b0' }}
          >
            <h3 className="font-serif font-bold text-sm mb-2 line-clamp-2" style={{ color: '#1a1a1a' }}>
              {article.title}
            </h3>
            <p className="text-xs font-serif line-clamp-2" style={{ color: '#6b6b6b' }}>
              {article.excerpt}
            </p>
            <div className="text-xs font-serif mt-1 flex items-center" style={{ color: '#8b6f47' }}>
              <span className="mr-1">🎥</span>
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        </Link>
      ))}
      <Link href={viewAllHref} className="text-newspaper-darkGray hover:text-newspaper-black text-sm font-serif font-bold uppercase tracking-wide block mt-4">
        View All →
      </Link>
    </div>
  );
}
