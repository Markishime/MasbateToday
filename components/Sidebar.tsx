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
        if (!apiKey) {
          // Use static weather data if API key is not configured
          setWeather({
            temp: 28,
            condition: "Partly Cloudy",
          });
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Masbate,PH&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          // Use static weather data on API error (401, 404, etc.)
          setWeather({
            temp: 28,
            condition: "Partly Cloudy",
          });
          return;
        }

        const data = await response.json();

        // Check if the response has the expected structure
        if (data && data.main && data.main.temp !== undefined && data.weather && data.weather[0]) {
          setWeather({
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
          });
        } else {
          // Use static weather data if response structure is unexpected
          setWeather({
            temp: 28,
            condition: "Partly Cloudy",
          });
        }
      } catch (error) {
        // Use static weather data on any error
        setWeather({
          temp: 28,
          condition: "Partly Cloudy",
        });
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

  // Always show weather widget with static data as fallback
  const displayWeather = weather || { temp: 28, condition: "Partly Cloudy" };

  return (
    <aside className="space-y-4 sm:space-y-6">
      {/* Weather Widget */}
      <div className="newspaper-clip bg-white p-4 sm:p-6" style={{ borderColor: '#8b6f47' }}>
          <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg" style={{ color: '#1a1a1a' }}>Masbate Weather</h3>
          <Cloud className="h-6 w-6" style={{ color: '#8b6f47' }} />
          </div>
        <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#5c4a37' }}>{displayWeather.temp}°C</div>
        <div className="text-xs sm:text-sm" style={{ color: '#6b6b6b' }}>
          {displayWeather.condition}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="newspaper-clip bg-white p-4 sm:p-6" style={{ borderColor: '#8b6f47' }}>
        <div className="flex items-center space-x-2 mb-3 sm:mb-4">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#8b6f47' }} />
          <h3 className="font-semibold text-base sm:text-lg" style={{ color: '#1a1a1a' }}>Trending Topics</h3>
        </div>
        <ul className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <li key={index}>
              <a
                href={`/search?q=${encodeURIComponent(topic)}`}
                className="text-sm transition-colors block hover:bg-gray-50 p-2 -m-2 rounded"
                style={{ color: '#6b6b6b' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
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
      <div className="newspaper-clip bg-white p-6" style={{ borderColor: '#8b6f47' }}>
        <h3 className="font-semibold text-lg mb-4" style={{ color: '#1a1a1a' }}>Quick Links</h3>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm transition-colors block hover:bg-gray-50 p-2 -m-2 rounded"
                style={{ color: '#6b6b6b' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Facebook Feed Placeholder */}
      <div className="newspaper-clip bg-white p-6" style={{ borderColor: '#8b6f47' }}>
        <h3 className="font-semibold text-lg mb-4" style={{ color: '#1a1a1a' }}>Follow Us on Facebook</h3>
        <div className="space-y-4">
          <a
            href="https://www.facebook.com/SerbisyoPubliko"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm transition-colors hover:bg-gray-50 p-2 -m-2 rounded"
            style={{ color: '#6b6b6b' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
          >
            Serbisyo Publiko
          </a>
          <a
            href="https://www.facebook.com/MasbateToday"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm transition-colors hover:bg-gray-50 p-2 -m-2 rounded"
            style={{ color: '#6b6b6b' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#8b6f47'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
          >
            Masbate Today
          </a>
        </div>
      </div>
    </aside>
  );
}

