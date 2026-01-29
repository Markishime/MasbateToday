"use client";

// This component is now empty - page turn is handled in PageTransition
// Keeping file for backwards compatibility but removing scroll-based auto page turn
export default function PageTurn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
