"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Article } from "@/types";
import { TrendingUp, Eye, FileText, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AnalyticsPage() {
  const { admin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    publishedArticles: 0,
    draftArticles: 0,
  });
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    loadAnalytics();
  }, [admin, router]);

  const loadAnalytics = async () => {
    try {
      // Check if Firebase is configured
      if (!db) {
        console.warn("Firebase is not configured. Analytics data unavailable.");
        setLoading(false);
        return;
      }

      // Get all articles
      const articlesQuery = query(collection(db, "articles"));
      const articlesSnapshot = await getDocs(articlesQuery);
      const allArticles = articlesSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate(),
        } as Article;
      });

      // Calculate stats
      const totalViews = allArticles.reduce((sum, article) => sum + (article.views || 0), 0);
      const publishedArticles = allArticles.filter((a) => a.published).length;
      const draftArticles = allArticles.filter((a) => !a.published).length;

      setStats({
        totalArticles: allArticles.length,
        totalViews,
        publishedArticles,
        draftArticles,
      });

      // Get trending articles (top 10 by views)
      const trending = allArticles
        .filter((a) => a.published)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 10);

      setTrendingArticles(trending);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Articles</p>
              <p className="text-2xl font-bold mt-2">{stats.totalArticles}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold mt-2">{stats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold mt-2">{stats.publishedArticles}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold mt-2">{stats.draftArticles}</p>
            </div>
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Trending Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Articles</h2>
        </div>

        {trendingArticles.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No trending articles yet.</p>
        ) : (
          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <div
                key={`${article.id}-${index}`}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(article.publishedAt || article.createdAt)} • {article.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold">{article.views.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

