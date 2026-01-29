"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Article } from "@/types";

interface InteractiveNewsTickerProps {
  articles: Article[];
}

export default function InteractiveNewsTicker({ articles }: InteractiveNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tickerArticles = articles.slice(0, 5);

  useEffect(() => {
    if (tickerArticles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerArticles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tickerArticles.length]);

  if (tickerArticles.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-[#CE1126] to-[#0038A8] rounded-2xl mb-8 sm:mb-12 overflow-hidden shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <AlertCircle className="h-5 w-5 text-[#FCD116]" />
            <span className="text-white font-bold text-sm sm:text-base">LIVE</span>
          </div>
          <TrendingUp className="h-6 w-6 text-[#FCD116]" />
          <h3 className="text-white font-bold text-lg sm:text-xl">News Ticker</h3>
        </div>
        <div className="relative h-16 sm:h-20 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center"
            >
              <Link href={`/article/${tickerArticles[currentIndex].id}`}>
                <p className="text-white text-base sm:text-lg font-semibold hover:text-[#FCD116] transition-colors cursor-pointer line-clamp-1">
                  {tickerArticles[currentIndex].title}
                </p>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex space-x-2 mt-4">
          {tickerArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-[#FCD116]" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
