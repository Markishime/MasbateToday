"use client";

import { motion } from "framer-motion";
import { User, Award, Mail } from "lucide-react";
import Link from "next/link";

export default function JournalistSpotlight() {
  const journalists = [
    { name: "Fel C. Monares", role: "Editor-in-Chief", articles: 150, location: "Cawayan, Masbate" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#0038A8]/5 to-[#CE1126]/5 rounded-2xl p-6 sm:p-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Meet the journalists bringing you the news
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journalists.map((journalist, index) => (
          <motion.div
            key={journalist.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#0038A8] to-[#CE1126] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-1 text-gray-900 dark:text-white">{journalist.name}</h3>
            <p className="text-[#0038A8] font-semibold mb-3">{journalist.role}</p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-4 w-4" />
                <span>{journalist.articles} Articles</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{journalist.location}</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-block px-4 py-2 bg-[#0038A8] text-white rounded-lg hover:bg-[#1E4FC7] transition-colors text-sm"
            >
              Contact
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

