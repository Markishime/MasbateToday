"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { Article } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface NewsTimelineProps {
  articles: Article[];
}

export default function NewsTimeline({ articles }: NewsTimelineProps) {
  const recentArticles = articles.slice(0, 6);

  if (recentArticles.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Clock className="h-8 w-8 text-[#0038A8]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              News Timeline
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Latest updates in chronological order
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0038A8] via-[#CE1126] to-[#FCD116]" />

          <div className="space-y-8">
            {recentArticles.map((article, index) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="relative pl-12 sm:pl-16 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 sm:left-6 top-2 w-4 h-4 bg-[#0038A8] rounded-full border-4 border-white dark:border-gray-800 shadow-lg group-hover:bg-[#CE1126] transition-colors" />

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#FCD116]">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {article.featuredImage && (
                        <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2" style={{ borderColor: '#8b6f47' }}>
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                            sizes="128px"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

