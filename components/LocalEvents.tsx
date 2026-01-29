"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function LocalEvents() {
  const events = [
    { id: 1, title: "Masbate City Festival", date: "March 15, 2024", location: "Masbate City", time: "9:00 AM" },
    { id: 2, title: "Community Health Fair", date: "March 20, 2024", location: "Cawayan", time: "8:00 AM" },
    { id: 3, title: "Local Business Expo", date: "March 25, 2024", location: "Masbate City", time: "10:00 AM" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-3 mb-8"
      >
        <Calendar className="h-8 w-8 text-[#CE1126]" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Upcoming Local Events
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-[#0038A8]/10 to-[#CE1126]/10 rounded-xl p-6 border-2 border-[#0038A8]/20 hover:border-[#CE1126]/40 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-[#FCD116] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#0038A8] dark:text-[#1E4FC7]">Upcoming</span>
            </div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

