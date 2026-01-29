"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import NewspaperClipping from "./NewspaperClipping";

export default function ObituariesSection() {
  const obituaries = [
    {
      name: "Juan dela Cruz",
      age: 78,
      date: "January 18, 2026",
      details: "Beloved father, grandfather, and community leader. Services will be held at St. Michael's Church on January 20."
    },
    {
      name: "Maria Santos",
      age: 65,
      date: "January 17, 2026",
      details: "Devoted mother and teacher. Memorial service scheduled for January 21 at the family residence."
    }
  ];

  return (
    <div className="space-y-4">
      {obituaries.map((obituary, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NewspaperClipping
            title={`${obituary.name}, ${obituary.age}`}
            content={obituary.details}
            date={obituary.date}
          />
        </motion.div>
      ))}
      <div className="text-center pt-4 border-t border-newspaper-lightGray">
        <p className="text-newspaper-darkGray font-serif text-sm italic">
          To submit an obituary, please contact our editorial office
        </p>
      </div>
    </div>
  );
}