"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";
import { Camera } from "lucide-react";

interface PhotoGalleryProps {
  articles: Article[];
}

export default function PhotoGallery({ articles }: PhotoGalleryProps) {
  const photoArticles = articles.filter((article) => article.featuredImage).slice(0, 6);

  if (photoArticles.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Camera className="h-8 w-8 text-[#CE1126]" />
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#CE1126] to-[#0038A8] bg-clip-text text-transparent">
                Photo Gallery
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Visual stories from Masbate and the Philippines
            </p>
          </div>
          <Link
            href="/search?q=photo"
            className="px-4 py-2 bg-gradient-to-r from-[#CE1126] to-[#0038A8] text-white rounded-lg hover:from-[#0038A8] hover:to-[#CE1126] transition-all font-semibold text-sm shadow-lg"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        {photoArticles.map((article, index) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer shadow-lg"
            >
              <Image
                src={article.featuredImage!}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white text-xs sm:text-sm font-semibold line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}

