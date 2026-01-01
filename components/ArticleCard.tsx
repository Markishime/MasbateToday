"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye } from "lucide-react";
import { Article } from "@/types";
import { formatDate, truncateText } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`group cursor-pointer ${featured ? "md:col-span-2" : ""}`}
    >
      <Link href={`/article/${article.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          {article.featuredImage && (
            <div className={`relative ${featured ? "h-48 sm:h-56 md:h-64" : "h-40 sm:h-44 md:h-48"} overflow-hidden`}>
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              />
              {article.sponsored && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Sponsored
                </div>
              )}
              {article.premium && (
                <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Premium
                </div>
              )}
            </div>
          )}

          <div className="p-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span className={`px-2 py-1 rounded ${
                article.category === "masbate"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : article.category === "national"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
            </div>

            <h2 className={`font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 ${
              featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}>
              {article.title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 sm:line-clamp-3">
              {truncateText(article.excerpt, featured ? 200 : 120)}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readingTime} min read
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {article.views} views
                </span>
              </div>
              <span className="text-primary font-semibold hidden sm:inline">Read more →</span>
              <span className="text-primary font-semibold sm:hidden">Read →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

