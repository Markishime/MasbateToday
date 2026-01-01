"use client";

import { TrendingUp, Cloud, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import NewsletterSignup from "./NewsletterSignup";

export default function Sidebar() {
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);

  useEffect(() => {
    // Fetch weather for Masbate (you'll need to add OpenWeatherMap API key)
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if (!apiKey) return;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Masbate,PH&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  const trendingTopics = [
    "Masbate Tourism",
    "Local Elections",
    "Weather Updates",
    "Community Events",
    "Business News",
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Support Us", href: "/support" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <aside className="space-y-4 sm:space-y-6">
      {/* Weather Widget */}
      {weather && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Masbate Weather</h3>
            <Cloud className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold">{weather.temp}°C</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {weather.condition}
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h3 className="font-semibold text-base sm:text-lg">Trending Topics</h3>
        </div>
        <ul className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <li key={index}>
              <a
                href={`/search?q=${encodeURIComponent(topic)}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {index + 1}. {topic}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Facebook Feed Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="font-semibold text-lg mb-4">Follow Us on Facebook</h3>
        <div className="space-y-4">
          <a
            href="https://www.facebook.com/SerbisyoPubliko"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-primary hover:underline"
          >
            Serbisyo Publiko
          </a>
          <a
            href="https://www.facebook.com/MasbateToday"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-primary hover:underline"
          >
            Masbate Today
          </a>
        </div>
      </div>
    </aside>
  );
}

