import { useState, useCallback } from "react";
import { getArticles } from "@/lib/firebase/articles";
import { Article, ArticleCategory } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";

export function useInfiniteArticles(
  category?: ArticleCategory,
  featured?: boolean
) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { articles: newArticles, lastDoc: newLastDoc } = await getArticles(
        category,
        featured,
        10,
        lastDoc || undefined
      );

      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setLastDoc(newLastDoc);
        setHasMore(newArticles.length === 10);
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  }, [category, featured, lastDoc, loading, hasMore]);

  const reset = useCallback(() => {
    setArticles([]);
    setLastDoc(null);
    setHasMore(true);
  }, []);

  return {
    articles,
    loadMore,
    hasMore,
    loading,
    reset,
  };
}

