"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading?: boolean;
}

export default function InfiniteScroll({
  children,
  onLoadMore,
  hasMore,
  loading = false,
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          onLoadMore()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {loading || isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-400">Loading more articles...</span>
            </div>
          ) : (
            <div className="h-20" />
          )}
        </div>
      )}
      {!hasMore && (
        <div className="py-8 text-center text-gray-600 dark:text-gray-400">
          <p>No more articles to load</p>
        </div>
      )}
    </>
  );
}

