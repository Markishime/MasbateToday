"use client";

import { useState, useEffect } from "react";
import { subscribeDailyUpdates } from "@/lib/firebase/realtime";
import { DailyUpdate } from "@/types";

export function useRealtimeDailyUpdates(): {
  updates: DailyUpdate[];
  loading: boolean;
  error: Error | null;
} {
  const [updates, setUpdates] = useState<DailyUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = subscribeDailyUpdates((next) => {
      setUpdates(next);
      setLoading(false);
      setError(null);
    });
    if (!unsub) setLoading(false);
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return { updates, loading, error };
}
