"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Heart } from "lucide-react";
import Link from "next/link";

export default function ReadersChoice() {
  const awards = [
    { category: "Best Breaking News", winner: "Masbate Infrastructure Update", votes: 1250 },
    { category: "Most Engaging Story", winner: "Community Health Initiative", votes: 980 },
    { category: "Best Photo Story", winner: "Masbate Festival Coverage", votes: 1100 },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#FCD116]/20 to-[#FFD700]/20 rounded-2xl p-6 sm:p-8 mb-12 border-2 border-[#FCD116]/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Trophy className="h-8 w-8 text-[#FCD116]" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Reader's Choice Awards
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Stories loved by our readers this month
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((award, index) => (
          <motion.div
            key={award.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#FCD116] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-[#0038A8]" fill="#0038A8" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{award.category}</h3>
            <p className="text-[#0038A8] font-semibold mb-3">{award.winner}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Heart className="h-4 w-4 text-[#CE1126]" fill="#CE1126" />
              <span>{award.votes} votes</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

