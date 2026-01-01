"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "tl";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "home": "Home",
    "masbate_news": "Masbate News",
    "national_news": "National News",
    "blogs": "Blogs",
    "videos": "Videos",
    "search": "Search",
    "contact": "Contact",
    "support": "Support Us",
    "read_more": "Read more",
    "min_read": "min read",
    "views": "views",
    "share": "Share",
    "related_articles": "Related Articles",
    "trending": "Trending",
    "newsletter": "Newsletter",
    "subscribe": "Subscribe",
    "featured": "Featured",
    "sponsored": "Sponsored",
    "premium": "Premium",
    "latest_news": "Latest News",
    "top_stories": "Top Stories",
    "weather": "Weather",
    "quick_links": "Quick Links",
  },
  tl: {
    "home": "Home",
    "masbate_news": "Balita sa Masbate",
    "national_news": "Pambansang Balita",
    "blogs": "Blog",
    "videos": "Video",
    "search": "Maghanap",
    "contact": "Makipag-ugnayan",
    "support": "Suportahan Kami",
    "read_more": "Magbasa pa",
    "min_read": "min na pagbabasa",
    "views": "mga view",
    "share": "Ibahagi",
    "related_articles": "Mga Kaugnay na Artikulo",
    "trending": "Trending",
    "newsletter": "Newsletter",
    "subscribe": "Mag-subscribe",
    "featured": "Itinatampok",
    "sponsored": "Sponsored",
    "premium": "Premium",
    "latest_news": "Pinakabagong Balita",
    "top_stories": "Nangungunang Kwento",
    "weather": "Panahon",
    "quick_links": "Mabilis na Link",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "tl")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

