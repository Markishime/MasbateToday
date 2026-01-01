"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Calendar, Eye } from "lucide-react";
import { VideoPost } from "@/types";
import { formatDate, getYouTubeEmbedUrl } from "@/lib/utils";

interface VideoCardProps {
  article: VideoPost;
}

export default function VideoCard({ article }: VideoCardProps) {
  const thumbnailUrl = article.featuredImage || 
    (article.videoUrl ? `https://img.youtube.com/vi/${getYouTubeEmbedUrl(article.videoUrl)?.split('/').pop()}/maxresdefault.jpg` : '');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <Link href={`/article/${article.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <div className="relative h-48 overflow-hidden">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Play className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary fill-primary" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h2>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {article.views} views
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

