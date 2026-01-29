"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Hash } from "lucide-react";

interface TrendingTopicsProps {
  topics: string[];
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  const trendingTopics = topics.length > 0 
    ? topics 
    : ["Masbate", "Philippines", "News", "Local", "Events", "Community", "Politics", "Weather"];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl border-2 border-[#0038A8]/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-[#FCD116] to-[#FFD700] rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#0038A8]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Trending Topics
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Explore the most discussed topics in Masbate and the Philippines
          </p>
        </motion.div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {trendingTopics.map((topic, index) => (
          <Link key={index} href={`/search?q=${encodeURIComponent(topic)}`}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#0038A8] to-[#CE1126] text-white rounded-full font-semibold hover:from-[#CE1126] hover:to-[#0038A8] transition-all shadow-lg hover:shadow-xl min-h-[44px] touch-manipulation"
            >
              <Hash className="h-4 w-4" />
              <span className="text-sm sm:text-base">{topic}</span>
            </motion.button>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}

