"use client";

import { useState, useEffect, useRef } from "react";
import { WeatherData } from "@/types";

const POLL_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function useWeather(): {
  weather: WeatherData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchWeather = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        setWeather({
          temp: 28,
          condition: "Partly Cloudy",
          humidity: 75,
          updatedAt: new Date(),
        });
        setLoading(false);
        return;
      }
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Masbate,PH&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      if (data?.main && data?.weather?.[0]) {
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity ?? 75,
          updatedAt: new Date(),
        });
      }
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to load weather"));
      setWeather((prev) =>
        prev ? prev : { temp: 28, condition: "Partly Cloudy", humidity: 75, updatedAt: new Date() }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    intervalRef.current = setInterval(fetchWeather, POLL_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { weather, loading, error, refetch: fetchWeather };
}
