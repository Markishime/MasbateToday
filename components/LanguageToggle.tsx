"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <button
        onClick={() => setLanguage(language === "en" ? "tl" : "en")}
        className="px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {language === "en" ? "EN" : "TL"}
      </button>
    </div>
  );
}

