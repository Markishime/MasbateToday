"use client";

import { motion } from "framer-motion";
import { Share2, Facebook, Twitter, MessageCircle, Link2, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function NewsShare() {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareOptions = [
    { name: "Facebook", icon: Facebook, color: "bg-blue-600", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { name: "Twitter", icon: Twitter, color: "bg-sky-500", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}` },
    { name: "WhatsApp", icon: MessageCircle, color: "bg-green-500", url: `https://wa.me/?text=${encodeURIComponent(currentUrl)}` },
  ];

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Share2 className="h-8 w-8 text-[#CE1126]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Share Masbate Today
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Help spread the news with your friends and family
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
        {shareOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${option.color} text-white rounded-xl p-4 sm:p-6 flex flex-col items-center space-y-2 shadow-lg hover:shadow-xl transition-all min-w-[100px]`}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-semibold">{option.name}</span>
            </motion.a>
          );
        })}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="bg-gray-700 text-white rounded-xl p-4 sm:p-6 flex flex-col items-center space-y-2 shadow-lg hover:shadow-xl transition-all min-w-[100px]"
        >
          {copied ? (
            <>
              <CheckCircle className="h-8 w-8" />
              <span className="text-sm font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-8 w-8" />
              <span className="text-sm font-semibold">Copy Link</span>
            </>
          )}
        </motion.button>
        </div>
      </div>
    </section>
  );
}

