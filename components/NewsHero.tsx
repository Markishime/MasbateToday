"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Article } from "@/types";

interface NewsHeroProps {
  articles?: Article[];
}

export default function NewsHero({ articles = [] }: NewsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback images for news theme (AI-style editorial illustrations)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80", // Newspaper front page collage
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80", // City skyline and headlines
    "https://images.unsplash.com/photo-1485115918245-91c9103c87c3?w=1920&q=80", // Journalist at work
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80", // Editorial newsroom scene
  ];

  // Use articles if available, otherwise use fallback images
  const displayItems = articles.length > 0 ? articles : fallbackImages.map((_, i) => ({ id: `fallback-${i}` }));
  const displayItemsLength = displayItems.length;
  const currentItem = displayItems[currentIndex % displayItemsLength];
  const currentArticle = articles.length > 0 ? (currentItem as Article) : null;

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (displayItemsLength === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayItemsLength);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayItemsLength]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayItemsLength) % displayItemsLength);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayItemsLength);
  };
  
  // Ensure we always have a valid image URL
  const currentImage = currentArticle?.featuredImage && currentArticle.featuredImage.trim() !== ""
    ? currentArticle.featuredImage
    : fallbackImages[currentIndex % fallbackImages.length];

  return (
    <div className="relative w-full min-h-[500px] max-h-[700px] overflow-hidden" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Prominent Background Image - Synced with Current Article */}
      {currentImage && currentImage.trim() !== "" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={currentArticle?.title || "Masbate Today News"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Fallback gradient if no image */}
      {(!currentImage || currentImage.trim() === "") && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0038A8] via-[#059669] to-[#CE1126]" />
      )}

      {/* Navigation Arrows */}
      {displayItems.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 sm:p-4 transition-colors z-20"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 sm:p-4 transition-colors z-20"
            aria-label="Next article"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </button>
        </>
      )}

      {/* Newspaper Front Page Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-8">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Main Title - MASBATE TODAY */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline uppercase leading-none mb-3 text-white drop-shadow-lg">
                  MASBATE TODAY
                </h1>
              </div>

              {/* Article Title - Synced with Image */}
              {currentArticle?.title && (
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-md line-clamp-2">
                  {currentArticle.title}
                </div>
              )}

              {/* Description - Synced with Current Article */}
              <div className="text-base sm:text-lg md:text-xl font-serif italic mb-3 text-white/95 drop-shadow-md line-clamp-2">
                {currentArticle?.excerpt || "Your trusted source for breaking news, events, and updates from Masbate and across the Philippines"}
              </div>

              {/* Published Date */}
              <div className="text-sm font-serif italic mb-5 text-white/90">
                Published {currentArticle?.publishedAt 
                  ? new Date(currentArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                }
              </div>

              {/* Explore News Button and Navigation */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {currentArticle ? (
                  <Link href={`/article/${currentArticle.id}`}>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 font-serif font-bold uppercase text-sm tracking-widest border-2 transition-all duration-300 shadow-lg bg-white text-[#1a1a1a] border-white hover:bg-[#FCD116] hover:border-[#FCD116]"
                    >
                      READ MORE
                    </motion.button>
                  </Link>
                ) : (
                  <Link href="/masbate">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 font-serif font-bold uppercase text-sm tracking-widest border-2 transition-all duration-300 shadow-lg bg-white text-[#1a1a1a] border-white hover:bg-[#FCD116] hover:border-[#FCD116]"
                    >
                      EXPLORE NEWS
                    </motion.button>
                  </Link>
                )}

                {/* Navigation dots - Synced with Carousel */}
                {displayItems.length > 1 && (
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    {displayItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 w-3 transition-all duration-300 rounded-sm ${
                          index === currentIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to story ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

