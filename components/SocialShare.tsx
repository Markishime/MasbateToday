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
      <h3 className="text-sm font-semibold mb-4">Share this article:</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => shareOnFacebook(url, text)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => shareOnTwitter(url, text)}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => shareOnWhatsApp(url, text)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

