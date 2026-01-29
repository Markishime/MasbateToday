import { useState, useCallback, useRef } from "react";
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
  
  // Use refs to track state without causing re-renders
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const lastDocRef = useRef<QueryDocumentSnapshot | null>(null);
  
  // Sync refs with state
  loadingRef.current = loading;
  hasMoreRef.current = hasMore;
  lastDocRef.current = lastDoc;

  const loadMore = useCallback(async () => {
    // Check refs instead of state to avoid dependency issues
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    loadingRef.current = true;
    
    try {
      const { articles: newArticles, lastDoc: newLastDoc } = await getArticles(
        category,
        featured,
        10,
        lastDocRef.current || undefined
      );

      if (newArticles.length === 0) {
        setHasMore(false);
        hasMoreRef.current = false;
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setLastDoc(newLastDoc);
        lastDocRef.current = newLastDoc;
        setHasMore(newArticles.length === 10);
        hasMoreRef.current = newArticles.length === 10;
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [category, featured]);

  const reset = useCallback(() => {
    setArticles([]);
    setLastDoc(null);
    setHasMore(true);
    loadingRef.current = false;
    hasMoreRef.current = true;
    lastDocRef.current = null;
  }, []);

  return {
    articles,
    loadMore,
    hasMore,
    loading,
    reset,
  };
}

