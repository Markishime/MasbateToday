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
        <div className="newspaper-clip bg-white p-4 transition-colors duration-300" style={{ borderColor: '#8b6f47' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#faf8f5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
          {article.featuredImage && (
            <div className={`relative ${featured ? "h-48 sm:h-56 md:h-64" : "h-32 sm:h-36 md:h-40"} overflow-hidden mb-3 border-2`} style={{ borderColor: '#8b6f47' }}>
              <Image
                src={article.featuredImage}
                alt={article.title || "Article image"}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                style={{ filter: 'saturate(1.1) brightness(1.05)' }}
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                priority={featured}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              {article.sponsored && (
                <div className="absolute top-2 right-2 vintage-stamp text-xs px-2 py-1">
                  SPONSORED
                </div>
              )}
              {article.premium && (
                <div className="absolute top-2 left-2 vintage-stamp text-xs px-2 py-1">
                  PREMIUM
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-serif mb-2">
              <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                article.category === "masbate"
                  ? "text-white"
                  : article.category === "national"
                  ? "text-white"
                  : article.category === "blog"
                  ? "text-black"
                  : "text-white"
              }`} style={{
                backgroundColor: article.category === "masbate" ? "#5c4a37" : 
                                article.category === "national" ? "#b22222" :
                                article.category === "blog" ? "#d4c5b0" :
                                "#8b6f47"
              }}>
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <span className="text-newspaper-darkGray">
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
            </div>

            <h2 className={`font-headline font-bold transition-colors line-clamp-2 ${
              featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"
            } uppercase leading-tight`} style={{ color: '#1a1a1a' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'} onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}>
              {article.title}
            </h2>

            <p className="text-xs sm:text-sm text-newspaper-darkGray font-serif leading-relaxed line-clamp-2 sm:line-clamp-3">
              {truncateText(article.excerpt, featured ? 200 : 120)}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-newspaper-lightGray">
              <div className="flex items-center space-x-3 text-xs text-newspaper-gray font-serif">
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readingTime} min
                </span>
                <span className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {article.views}
                </span>
              </div>
              <span className="font-serif font-bold text-xs uppercase tracking-wide transition-colors" style={{ color: '#1a1a1a' }} onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'} onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}>
                Read Story →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

