"use client";

import { Facebook, Twitter, MessageCircle } from "lucide-react";
import { Article } from "@/types";
import { shareOnFacebook, shareOnTwitter, shareOnWhatsApp } from "@/lib/utils";

interface SocialShareProps {
  article: Article;
}

export default function SocialShare({ article }: SocialShareProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${article.title} - Masbate Today`;

  return (
    <div className="mt-8 pt-8 border-t">
      <h3 className="text-sm font-semibold mb-3 sm:mb-4">Share this article:</h3>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <button
          onClick={() => shareOnFacebook(url, text)}
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base min-h-[44px] touch-manipulation"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
          <span className="sm:hidden">FB</span>
        </button>
        <button
          onClick={() => shareOnTwitter(url, text)}
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base min-h-[44px] touch-manipulation"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">Twitter</span>
          <span className="sm:hidden">X</span>
        </button>
        <button
          onClick={() => shareOnWhatsApp(url, text)}
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base min-h-[44px] touch-manipulation"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">WA</span>
        </button>
      </div>
    </div>
  );
}

