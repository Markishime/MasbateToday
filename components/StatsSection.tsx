"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, Newspaper } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="newspaper-clip bg-white p-4 sm:p-6 text-center hover:bg-white transition-colors"
      >
        <Newspaper className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-newspaper-black" />
        <div className="text-2xl sm:text-3xl font-headline font-bold mb-1 text-newspaper-black">500+</div>
        <div className="text-xs sm:text-sm font-serif text-newspaper-darkGray uppercase tracking-wide">News Articles</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="newspaper-clip bg-white p-4 sm:p-6 text-center hover:bg-white transition-colors"
      >
        <Users className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-newspaper-black" />
        <div className="text-2xl sm:text-3xl font-headline font-bold mb-1 text-newspaper-black">10K+</div>
        <div className="text-xs sm:text-sm font-serif text-newspaper-darkGray uppercase tracking-wide">Daily Readers</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="newspaper-clip bg-white p-4 sm:p-6 text-center hover:bg-white transition-colors"
      >
        <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-newspaper-black" />
        <div className="text-2xl sm:text-3xl font-headline font-bold mb-1 text-newspaper-black">24/7</div>
        <div className="text-xs sm:text-sm font-serif text-newspaper-darkGray uppercase tracking-wide">News Updates</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="newspaper-clip bg-white p-4 sm:p-6 text-center hover:bg-white transition-colors border-2 border-newspaper-black"
      >
        <Clock className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-newspaper-black" />
        <div className="text-2xl sm:text-3xl font-headline font-bold mb-1 text-newspaper-black">Real-time</div>
        <div className="text-xs sm:text-sm font-serif text-newspaper-darkGray uppercase tracking-wide">Coverage</div>
      </motion.div>
    </div>
  );
}

