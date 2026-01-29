"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function ArchiveTimeline() {
  const months = [
    { month: "March 2024", count: 45, year: 2024 },
    { month: "February 2024", count: 38, year: 2024 },
    { month: "January 2024", count: 52, year: 2024 },
    { month: "December 2023", count: 41, year: 2023 },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-3 mb-8"
      >
        <Clock className="h-8 w-8 text-[#FCD116]" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          News Archive
        </h2>
      </motion.div>

      <div className="space-y-4">
        {months.map((item, index) => (
          <Link key={item.month} href={`/search?q=${item.month}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group border-l-4 border-[#0038A8]"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0038A8] to-[#CE1126] rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {item.month}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} articles</p>
                </div>
              </div>
              <span className="text-[#0038A8] font-semibold group-hover:translate-x-2 transition-transform">
                →
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

