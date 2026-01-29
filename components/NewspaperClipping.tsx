"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface NewspaperClippingProps {
  title: string;
  content: string;
  date?: string;
  author?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function NewspaperClipping({
  title,
  content,
  date,
  author,
  className = "",
  children
}: NewspaperClippingProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`newspaper-clip bg-newspaper-offWhite p-6 relative overflow-hidden ${className}`}
      initial={{ rotateY: -5, rotateX: 2 }}
      whileHover={{
        rotateY: 0,
        rotateX: 0,
        scale: 1.02,
        boxShadow: "8px 8px 16px rgba(0,0,0,0.2)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Torn paper edges effect */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-newspaper-lightGray to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-newspaper-lightGray to-transparent opacity-30" />

      {/* Content */}
      <div className="relative z-10">
        <div className="border-b-2 border-newspaper-black pb-2 mb-4">
          <h3 className="font-headline font-bold text-newspaper-black text-lg uppercase leading-tight">
            {title}
          </h3>
          {(date || author) && (
            <div className="article-byline text-xs mt-1">
              {author && <span>By {author}</span>}
              {author && date && <span> • </span>}
              {date && <span>{date}</span>}
            </div>
          )}
        </div>

        <div className="font-serif text-newspaper-darkGray text-sm leading-relaxed">
          {content}
          {children}
        </div>
      </div>

      {/* Corner fold effect */}
      <motion.div
        className="absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-white"
        animate={isHovered ? { borderLeftWidth: 40, borderBottomWidth: 40 } : { borderLeftWidth: 30, borderBottomWidth: 30 }}
        transition={{ duration: 0.3 }}
      />
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[28px] border-l-transparent border-b-[28px] border-b-newspaper-lightGray opacity-50" />

      {/* Subtle aging effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-newspaper-lightGray opacity-5 pointer-events-none" />
    </motion.div>
  );
}