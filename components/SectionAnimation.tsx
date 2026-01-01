"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function SectionAnimation({
  children,
  delay = 0,
  className = "",
}: SectionAnimationProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

