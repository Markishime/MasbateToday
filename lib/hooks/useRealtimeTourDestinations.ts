"use client";

import { useState, useEffect } from "react";
import { subscribeTourDestinations } from "@/lib/firebase/realtime";
import { TourDestination } from "@/types";

const DEFAULT_SPOTS: TourDestination[] = [];

export function useRealtimeTourDestinations(): {
  destinations: TourDestination[];
  loading: boolean;
  error: Error | null;
} {
  const [destinations, setDestinations] = useState<TourDestination[]>(DEFAULT_SPOTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = subscribeTourDestinations((next) => {
      setDestinations(next);
      setLoading(false);
      setError(null);
    });
    if (!unsub) setLoading(false);
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return { destinations, loading, error };
}
