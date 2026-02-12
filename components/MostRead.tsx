"use client";

import { motion } from "framer-motion";
import { Article } from "@/types";
import { TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { staticMostReadArticles } from "@/lib/staticData";

interface MostReadProps {
  articles: Article[];
}

export default function MostRead({ articles }: MostReadProps) {
  // Use static data if no articles provided
  const displayArticles = articles.length > 0 
    ? [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
    : staticMostReadArticles as Article[];

  if (displayArticles.length === 0) return null;

  return (
    <div className="space-y-4">
      {displayArticles.map((article, index) => (
        <Link key={article.id} href={`/article/${article.id}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-center space-x-4 p-4 rounded transition-colors group hover:bg-gray-50"
            style={{ border: '1px solid #d4c5b0' }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#8b6f47' }}>
              {index + 1}
            </div>
            {article.featuredImage && (
              <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2" style={{ borderColor: '#8b6f47' }}>
                <Image
                  src={article.featuredImage}
                  alt={article.title || "Article"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                  sizes="64px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-sm mb-1 line-clamp-2 transition-colors group-hover:text-newspaper-brown" style={{ color: '#1a1a1a' }}>
                {article.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs" style={{ color: '#6b6b6b' }}>
                <Eye className="h-3 w-3" />
                <span className="font-serif">{article.views || 0} views</span>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

