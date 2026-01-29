"use client";

import { motion } from "framer-motion";
import { Newspaper, Globe, Video, BookOpen, Camera, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function NewsCategories() {
  const categories = [
    { name: "Masbate News", icon: Newspaper, href: "/masbate", color: "from-[#0038A8] to-[#1E4FC7]", count: "150+" },
    { name: "National News", icon: Globe, href: "/national", color: "from-[#CE1126] to-[#E01A2F]", count: "200+" },
    { name: "Videos", icon: Video, href: "/videos", color: "from-[#FCD116] to-[#FFD700]", count: "80+" },
    { name: "Blogs", icon: BookOpen, href: "/blogs", color: "from-[#059669] to-[#10b981]", count: "120+" },
    { name: "Photo Gallery", icon: Camera, href: "/search?q=photo", color: "from-[#7c3aed] to-[#8b5cf6]", count: "300+" },
    { name: "Trending", icon: TrendingUp, href: "/search?q=trending", color: "from-[#dc2626] to-[#ef4444]", count: "50+" },
  ];

  return (
    <section className="py-12 sm:py-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Explore News Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Browse news by category and stay informed
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link key={category.name} href={category.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#FCD116]"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{category.count} articles</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

