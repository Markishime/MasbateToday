"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function NewsCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const difference = tomorrow.getTime() - now.getTime();
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Clock className="h-8 w-8 text-indigo-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Next News Update
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Countdown to tomorrow's news
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 sm:space-x-6 max-w-2xl mx-auto">
        {[
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 text-center shadow-lg min-w-[80px] sm:min-w-[100px]"
          >
            <div className="text-3xl sm:text-4xl font-bold text-[#0038A8] mb-2">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase">
              {item.label}
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}

