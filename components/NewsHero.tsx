"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  
  // Ensure we always have a valid image URL
  const currentImage = currentArticle?.featuredImage && currentArticle.featuredImage.trim() !== ""
    ? currentArticle.featuredImage
    : fallbackImages[currentIndex % fallbackImages.length];

  return (
    <div className="relative w-full min-h-[500px] max-h-[700px] overflow-hidden paper-texture" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Optional subtle background image */}
      {currentImage && currentImage.trim() !== "" && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={currentArticle?.title || "News background"}
              fill
              className="object-cover grayscale"
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Newspaper Front Page Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-8">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Main Title - MASBATE TODAY */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline uppercase leading-none mb-3" style={{ color: '#1a1a1a' }}>
                MASBATE TODAY
              </h1>
            </div>

            {/* Description */}
            <div className="text-base sm:text-lg md:text-xl font-serif italic mb-3" style={{ color: '#5c4a37' }}>
              {currentArticle?.excerpt || "Your trusted source for breaking news, events, and updates from Masbate and across the Philippines"}
            </div>

            {/* Published Date */}
            <div className="text-sm font-serif italic mb-5" style={{ color: '#6b6b6b' }}>
              Published {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>

            {/* Explore News Button and Navigation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/masbate">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 font-serif font-bold uppercase text-sm tracking-widest border-2 transition-all duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: '#1a1a1a', 
                    color: '#ffffff',
                    borderColor: '#1a1a1a'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5c4a37';
                    e.currentTarget.style.borderColor = '#5c4a37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.borderColor = '#1a1a1a';
                  }}
                >
                  EXPLORE NEWS
                </motion.button>
              </Link>

              {/* Navigation dots */}
              {displayItems.length > 1 && (
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  {displayItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-3 w-3 transition-all duration-300 rounded-sm ${
                        index === currentIndex
                          ? "bg-newspaper-black"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      style={index === currentIndex ? { backgroundColor: '#1a1a1a' } : {}}
                      aria-label={`Go to story ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

