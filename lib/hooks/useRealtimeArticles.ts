"use client";

import { useState, useEffect } from "react";
import { subscribeArticles } from "@/lib/firebase/realtime";
import { Article } from "@/types";
import { ArticleCategory } from "@/types";

export function useRealtimeArticles(
  category?: ArticleCategory,
  options: { featured?: boolean; limit?: number } = {}
): { articles: Article[]; loading: boolean; error: Error | null } {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { featured, limit = 20 } = options;

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeArticles(
      (next) => {
        setArticles(next);
        setLoading(false);
        setError(null);
      },
      { category, featured, limitCount: limit }
    );
    return () => {
      if (unsub) unsub();
    };
  }, [category, featured, limit]);

  return { articles, loading, error };
}
