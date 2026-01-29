"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    { name: "Masbate City", news: 45, coords: "12.3700°N, 123.6200°E" },
    { name: "Cawayan", news: 28, coords: "12.0333°N, 123.6833°E" },
    { name: "Mobo", news: 15, coords: "12.0167°N, 123.6500°E" },
    { name: "Milagros", news: 22, coords: "12.2167°N, 123.5167°E" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Navigation className="h-8 w-8 text-[#CE1126]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              News by Location
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Explore news from different areas in Masbate
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {locations.map((location, index) => (
          <motion.button
            key={location.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLocation(selectedLocation === location.name ? null : location.name)}
            className={`p-4 sm:p-6 rounded-xl transition-all ${
              selectedLocation === location.name
                ? "bg-gradient-to-br from-[#0038A8] to-[#CE1126] text-white shadow-2xl"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <MapPin className={`h-8 w-8 mx-auto mb-3 ${selectedLocation === location.name ? "text-white" : "text-[#0038A8]"}`} />
            <h3 className="font-bold text-sm sm:text-base mb-2">{location.name}</h3>
            <p className={`text-xs sm:text-sm ${selectedLocation === location.name ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}>
              {location.news} articles
            </p>
            {selectedLocation === location.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs mt-2 text-white/80"
              >
                {location.coords}
              </motion.p>
            )}
          </motion.button>
        ))}
        </div>
      </div>
    </section>
  );
}

