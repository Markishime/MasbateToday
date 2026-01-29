"use client";

import { motion } from "framer-motion";
import { Baby } from "lucide-react";
import NewspaperClipping from "./NewspaperClipping";

export default function BirthNoticesSection() {
  const births = [
    {
      parents: "Mr. & Mrs. Roberto Garcia",
      child: "Maria Elena Garcia",
      date: "January 18, 2026",
      weight: "7 lbs, 8 oz"
    },
    {
      parents: "Mr. & Mrs. Carlos Reyes",
      child: "Jose Miguel Reyes",
      date: "January 17, 2026",
      weight: "8 lbs, 2 oz"
    }
  ];

  return (
    <div className="space-y-4">
      {births.map((birth, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NewspaperClipping
            title={`Birth Announcement: ${birth.child}`}
            content={`Born to ${birth.parents} on ${birth.date}. Weight: ${birth.weight}.`}
            date={birth.date}
          />
        </motion.div>
      ))}
      <div className="text-center pt-4 border-t border-newspaper-lightGray">
        <p className="text-newspaper-darkGray font-serif text-sm italic">
          To announce a birth, please contact our editorial office
        </p>
      </div>
    </div>
  );
}