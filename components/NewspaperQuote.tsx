"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface NewspaperQuoteProps {
  quote: string;
  author?: string;
  source?: string;
  className?: string;
}

export default function NewspaperQuote({ quote, author, source, className = "" }: NewspaperQuoteProps) {
  return (
    <motion.div
      className={`newspaper-clip bg-newspaper-offWhite p-6 my-6 border-l-4 border-newspaper-red relative ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Quote className="h-8 w-8 text-newspaper-red mb-4 opacity-50" />
      <blockquote className="font-serif italic text-newspaper-black text-lg leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      {(author || source) && (
        <cite className="font-serif text-newspaper-darkGray text-sm not-italic">
          {author && <span className="font-bold">— {author}</span>}
          {source && <span className="ml-2">({source})</span>}
        </cite>
      )}

      {/* Decorative corner fold */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white"></div>
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[18px] border-l-transparent border-t-[18px] border-t-newspaper-lightGray opacity-30"></div>
    </motion.div>
  );
}