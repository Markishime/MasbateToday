"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Calendar, Eye } from "lucide-react";
import { Article } from "@/types";
import { formatDate, getYouTubeEmbedUrl } from "@/lib/utils";

interface VideoCardProps {
  article: Article;
}

export default function VideoCard({ article }: VideoCardProps) {
  const thumbnailUrl = article.featuredImage || 
    (article.videoEmbed ? `https://img.youtube.com/vi/${getYouTubeEmbedUrl(article.videoEmbed)?.split('/').pop()}/maxresdefault.jpg` : '');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <Link href={`/article/${article.id}`}>
        <div className="newspaper-clip bg-white p-4 hover:bg-white transition-colors duration-300">
          <div className="relative h-40 overflow-hidden mb-3 border-2" style={{ borderColor: '#8b6f47' }}>
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={article.title}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-newspaper-lightGray flex items-center justify-center">
                <Play className="h-12 w-12 text-newspaper-darkGray" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-newspaper-black/60 group-hover:bg-newspaper-black/70 transition-colors">
              <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform border-2 border-newspaper-black">
                <Play className="h-6 w-6 text-newspaper-black fill-newspaper-black" />
              </div>
            </div>
            <div className="absolute top-2 left-2 vintage-stamp text-xs px-2 py-1">
              VIDEO
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline font-bold text-newspaper-black group-hover:text-newspaper-red transition-colors text-sm sm:text-base line-clamp-2 uppercase leading-tight">
              {article.title}
            </h2>

            <div className="flex items-center justify-between pt-2 border-t border-newspaper-lightGray">
              <span className="text-xs text-newspaper-darkGray font-serif">
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <div className="flex items-center space-x-2 text-xs text-newspaper-gray font-serif">
                <Eye className="h-3 w-3" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

