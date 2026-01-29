"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Article } from "@/types";
import Link from "next/link";

interface NewsComparisonProps {
  masbateArticles: Article[];
  nationalArticles: Article[];
}

export default function NewsComparison({ masbateArticles, nationalArticles }: NewsComparisonProps) {
  const stats = [
    { label: "Masbate News", count: masbateArticles.length, trend: "+12%", icon: TrendingUp, color: "from-[#0038A8] to-[#1E4FC7]" },
    { label: "National News", count: nationalArticles.length, trend: "+8%", icon: TrendingUp, color: "from-[#CE1126] to-[#E01A2F]" },
    { label: "Total Coverage", count: masbateArticles.length + nationalArticles.length, trend: "+10%", icon: TrendingUp, color: "from-[#FCD116] to-[#FFD700]" },
  ];

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            News Coverage Statistics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Compare local and national news coverage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 sm:p-8 text-white text-center shadow-lg`}
            >
              <Icon className="h-10 w-10 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.count}</div>
              <div className="text-sm sm:text-base opacity-90 mb-2">{stat.label}</div>
              <div className="flex items-center justify-center space-x-1 text-sm">
                <span>{stat.trend}</span>
                <TrendingUp className="h-4 w-4" />
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

