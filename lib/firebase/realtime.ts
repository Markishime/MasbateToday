import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Unsubscribe,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Article, ArticleCategory, TourDestination, DailyUpdate } from "@/types";

const toArticle = (id: string, data: Record<string, unknown>): Article => ({
  id,
  ...data,
  createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
  updatedAt: (data.updatedAt as Timestamp)?.toDate?.() || new Date(),
  publishedAt: (data.publishedAt as Timestamp)?.toDate?.(),
} as Article);

const toTourDestination = (id: string, data: Record<string, unknown>): TourDestination => ({
  id,
  ...data,
  updatedAt: (data.updatedAt as Timestamp)?.toDate?.() || new Date(),
  createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
} as TourDestination);

const toDailyUpdate = (id: string, data: Record<string, unknown>): DailyUpdate => ({
  id,
  ...data,
  createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
  updatedAt: (data.updatedAt as Timestamp)?.toDate?.() || new Date(),
  expiresAt: (data.expiresAt as Timestamp)?.toDate?.(),
} as DailyUpdate);

/**
 * Subscribe to published articles in real time.
 * Uses a single query (published + orderBy publishedAt); category/featured filtered in memory.
 */
export function subscribeArticles(
  callback: (articles: Article[]) => void,
  options: {
    category?: ArticleCategory;
    featured?: boolean;
    limitCount?: number;
  } = {}
): Unsubscribe | null {
  if (!db) {
    callback([]);
    return null;
  }
  const { category, featured, limitCount = 50 } = options;
  const coll = collection(db, "articles");
  const q = query(
    coll,
    where("published", "==", true),
    orderBy("publishedAt", "desc"),
    limit(limitCount)
  );

  return onSnapshot(
    q,
    (snap) => {
      let articles = snap.docs.map((d) => toArticle(d.id, d.data() as Record<string, unknown>));
      if (category) articles = articles.filter((a) => a.category === category);
      if (featured !== undefined) articles = articles.filter((a) => a.featured === featured);
      articles = articles.slice(0, limitCount);
      callback(articles);
    },
    (err) => {
      console.error("subscribeArticles error:", err);
      callback([]);
    }
  );
}

/**
 * Subscribe to tour destinations in real time (collection: tourDestinations).
 */
export function subscribeTourDestinations(callback: (destinations: TourDestination[]) => void): Unsubscribe | null {
  if (!db) {
    callback([]);
    return null;
  }
  const coll = collection(db, "tourDestinations");
  const q = query(coll, limit(100));

  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => toTourDestination(d.id, d.data() as Record<string, unknown>));
      list.sort((a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0));
      callback(list);
    },
    (err) => {
      console.error("subscribeTourDestinations error:", err);
      callback([]);
    }
  );
}

/**
 * Subscribe to daily/live updates (collection: dailyUpdates).
 */
export function subscribeDailyUpdates(callback: (updates: DailyUpdate[]) => void): Unsubscribe | null {
  if (!db) {
    callback([]);
    return null;
  }
  const coll = collection(db, "dailyUpdates");
  const now = new Date();
  const q = query(coll, where("active", "==", true), limit(50));

  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => toDailyUpdate(d.id, d.data() as Record<string, unknown>));
      const filtered = list
        .filter((u) => !u.expiresAt || new Date(u.expiresAt) > now)
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
      callback(filtered);
    },
    (err) => {
      console.error("subscribeDailyUpdates error:", err);
      callback([]);
    }
  );
}
