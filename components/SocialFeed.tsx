"use client";

import { motion } from "framer-motion";
import { Facebook, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function SocialFeed() {
  const posts = [
    { platform: "Facebook", title: "Serbisyo Publiko", description: "Latest public service updates", url: "https://www.facebook.com/SerbisyoPubliko" },
    { platform: "Facebook", title: "Masbate Today", description: "Community news and events", url: "https://www.facebook.com/MasbateToday" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-3">
          <Share2 className="h-8 w-8 text-[#0038A8]" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Follow Us on Social Media
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <Link key={post.title} href={post.url} target="_blank" rel="noopener noreferrer">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-[#0038A8]/10 to-[#CE1126]/10 rounded-xl p-6 border-2 border-[#0038A8]/20 hover:border-[#CE1126]/40 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#0038A8] rounded-lg flex items-center justify-center">
                  <Facebook className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.platform}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>
              <div className="flex items-center space-x-2 text-[#0038A8] font-semibold">
                <MessageCircle className="h-4 w-4" />
                <span>Visit Page →</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

