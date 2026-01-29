"use client";

import { motion } from "framer-motion";
import { Cloud, Droplets, Sun, CloudRain } from "lucide-react";
import { useState, useEffect } from "react";

export default function WeatherForecast() {
  const [weather, setWeather] = useState<{ temp: number; condition: string; humidity: number } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if (!apiKey) {
          // Fallback data
          setWeather({ temp: 28, condition: "Partly Cloudy", humidity: 75 });
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Masbate,PH&appid=${apiKey}&units=metric`
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.main && data.weather && data.weather[0]) {
            setWeather({
              temp: Math.round(data.main.temp),
              condition: data.weather[0].main,
              humidity: data.main.humidity,
            });
          }
        } else {
          setWeather({ temp: 28, condition: "Partly Cloudy", humidity: 75 });
        }
      } catch (error) {
        setWeather({ temp: 28, condition: "Partly Cloudy", humidity: 75 });
      }
    };

    fetchWeather();
  }, []);

  const forecast = [
    { day: "Today", temp: weather?.temp || 28, condition: weather?.condition || "Sunny", icon: Sun },
    { day: "Tomorrow", temp: 29, condition: "Partly Cloudy", icon: Cloud },
    { day: "Day 3", temp: 30, condition: "Sunny", icon: Sun },
    { day: "Day 4", temp: 28, condition: "Rainy", icon: CloudRain },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Cloud className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Weather Forecast - Masbate
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {forecast.map((day, index) => {
          const Icon = day.icon;
          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
            >
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{day.day}</p>
              <Icon className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{day.temp}°C</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{day.condition}</p>
            </motion.div>
          );
        })}
      </div>

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}

