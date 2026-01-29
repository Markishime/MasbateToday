"use client";

import { motion } from "framer-motion";
import { Star, Zap, Award } from "lucide-react";
import { Article } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface NewsHighlightsProps {
  articles: Article[];
}

export default function NewsHighlights({ articles }: NewsHighlightsProps) {
  const highlights = articles.slice(0, 3);

  if (highlights.length === 0) return null;

  const highlightTypes = [
    { icon: Star, label: "Featured", color: "from-[#FCD116] to-[#FFD700]" },
    { icon: Zap, label: "Breaking", color: "from-[#CE1126] to-[#E01A2F]" },
    { icon: Award, label: "Top Story", color: "from-[#0038A8] to-[#1E4FC7]" },
  ];

  return (
    <section className="py-12 sm:py-16 mb-8 sm:mb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            News Highlights
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stories that made headlines this week
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((article, index) => {
          const HighlightIcon = highlightTypes[index]?.icon || Star;
          const highlightColor = highlightTypes[index]?.color || "from-[#0038A8] to-[#1E4FC7]";
          
          return (
            <Link key={article.id} href={`/article/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl group"
              >
                {article.featuredImage && (
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className={`absolute top-4 left-4 bg-gradient-to-br ${highlightColor} text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg`}>
                      <HighlightIcon className="h-4 w-4" />
                      <span className="text-xs font-semibold">{highlightTypes[index]?.label}</span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm sm:text-base">
                    {article.excerpt}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}

