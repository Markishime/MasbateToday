import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  Timestamp,
  increment,
} from "firebase/firestore";
import { db } from "./config";
import { Article, ArticleCategory } from "@/types";
import { staticMasbateArticles, staticNationalArticles, staticBlogArticles, staticVideoArticles } from "@/lib/staticData";

// Helper to get articles collection safely
const getArticlesCollection = () => {
  if (!db) {
    return null;
  }
  try {
    return collection(db, "articles");
  } catch (error) {
    console.error("Error accessing articles collection:", error);
    return null;
  }
};

const articlesCollection = getArticlesCollection();

// Helper function to deduplicate articles by ID
const deduplicateArticles = (articles: Article[]): Article[] => {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.id)) {
      return false;
    }
    seen.add(article.id);
    return true;
  });
};

// Normalize static article objects so detail pages work even without Firestore
const normalizeStaticArticle = (partial: Partial<Article>): Article => {
  const now = new Date();
  return {
    id: partial.id || "static-article",
    title: partial.title || "Untitled Article",
    content: partial.content || partial.excerpt || "",
    excerpt: partial.excerpt || "",
    author: partial.author || "Masbate Today Staff",
    authorId: partial.authorId || "static-author",
    category: partial.category || "masbate",
    featuredImage: partial.featuredImage,
    images: partial.images,
    videoUrl: partial.videoUrl,
    videoEmbed: partial.videoEmbed,
    tags: partial.tags || [],
    published: partial.published ?? true,
    featured: partial.featured ?? false,
    sponsored: partial.sponsored ?? false,
    premium: partial.premium ?? false,
    createdAt: partial.createdAt || now,
    updatedAt: partial.updatedAt || partial.createdAt || now,
    publishedAt: partial.publishedAt || partial.createdAt || now,
    views: partial.views ?? 0,
    readingTime: partial.readingTime ?? 3,
    relatedArticles: partial.relatedArticles,
  };
};

export const getArticle = async (id: string): Promise<Article | null> => {
  if (id == null || typeof id !== "string" || !id.trim()) {
    return null;
  }
  // If Firebase is not configured, try to find in static data
  if (!db || !articlesCollection) {
    // Check static data for matching article
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
      ...staticVideoArticles,
    ];
    const staticArticle = allStaticArticles.find((a) => a.id === id);
    if (staticArticle) {
      return normalizeStaticArticle(staticArticle as Article);
    }
    return null;
  }

  try {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Fallback to static data
      const allStaticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
        ...staticVideoArticles,
      ];
      const staticArticle = allStaticArticles.find((a) => a.id === id);
      if (staticArticle) {
        return normalizeStaticArticle(staticArticle as Article);
      }
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      publishedAt: data.publishedAt?.toDate(),
    } as Article;
  } catch (error) {
    console.error("Error fetching article:", error);
    // Fallback to static data
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
      ...staticVideoArticles,
    ];
    const staticArticle = allStaticArticles.find((a) => a.id === id);
    if (staticArticle) {
      return normalizeStaticArticle(staticArticle as Article);
    }
    return null;
  }
};

export const getArticles = async (
  category?: ArticleCategory,
  featured?: boolean,
  limitCount: number = 10,
  lastDoc?: QueryDocumentSnapshot
): Promise<{ articles: Article[]; lastDoc: QueryDocumentSnapshot | null }> => {
  // If Firebase is not configured, return static data
  if (!db || !articlesCollection) {
    let staticArticles: Partial<Article>[] = [];
    
    if (category === "masbate") {
      staticArticles = staticMasbateArticles;
    } else if (category === "national") {
      staticArticles = staticNationalArticles;
    } else if (category === "blog") {
      staticArticles = staticBlogArticles;
    } else if (category === "video") {
      staticArticles = staticVideoArticles;
    } else {
      staticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
        ...staticVideoArticles,
      ];
    }

    // Filter by featured if specified
    if (featured !== undefined) {
      // Static articles don't have featured flag, so return all or empty
      // For now, return all static articles
    }

    // Deduplicate articles by ID before returning
    const uniqueArticles = deduplicateArticles(staticArticles.slice(0, limitCount) as Article[]);

    return {
      articles: uniqueArticles,
      lastDoc: null,
    };
  }

  try {
    let q = query(articlesCollection, where("published", "==", true));

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (featured !== undefined) {
      q = query(q, where("featured", "==", featured));
    }

    q = query(q, orderBy("publishedAt", "desc"), limit(limitCount));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      } as Article;
    });

    // Deduplicate articles by ID
    const uniqueArticles = deduplicateArticles(articles);

    // If no articles found, fallback to static data
    if (uniqueArticles.length === 0) {
      let staticArticles: Partial<Article>[] = [];
      
      if (category === "masbate") {
        staticArticles = staticMasbateArticles;
      } else if (category === "national") {
        staticArticles = staticNationalArticles;
      } else if (category === "blog") {
        staticArticles = staticBlogArticles;
      } else {
        staticArticles = [
          ...staticMasbateArticles,
          ...staticNationalArticles,
          ...staticBlogArticles,
        ];
      }

      // Deduplicate static articles before returning
      const uniqueStaticArticles = deduplicateArticles(staticArticles.slice(0, limitCount) as Article[]);

      return {
        articles: uniqueStaticArticles,
        lastDoc: null,
      };
    }

    return { articles: uniqueArticles, lastDoc: lastVisible };
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Fallback to static data on error
    let staticArticles: Partial<Article>[] = [];
    
    if (category === "masbate") {
      staticArticles = staticMasbateArticles;
    } else if (category === "national") {
      staticArticles = staticNationalArticles;
    } else if (category === "blog") {
      staticArticles = staticBlogArticles;
    } else if (category === "video") {
      staticArticles = staticVideoArticles;
    } else {
      staticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
        ...staticVideoArticles,
      ];
    }

    // Deduplicate static articles before returning
    const uniqueStaticArticles = deduplicateArticles(staticArticles.slice(0, limitCount) as Article[]);

    return {
      articles: uniqueStaticArticles,
      lastDoc: null,
    };
  }
};

export const createArticle = async (articleData: Omit<Article, "id" | "createdAt" | "updatedAt" | "views">): Promise<string> => {
  if (!db || !articlesCollection) {
    throw new Error("Firebase is not configured. Cannot create article.");
  }

  const docRef = await addDoc(articlesCollection, {
    ...articleData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    publishedAt: articleData.published ? Timestamp.now() : null,
    views: 0,
  });

  return docRef.id;
};

export const updateArticle = async (id: string, articleData: Partial<Article>): Promise<void> => {
  if (!db) {
    throw new Error("Firebase is not configured. Cannot update article.");
  }

  const docRef = doc(db, "articles", id);
  await updateDoc(docRef, {
    ...articleData,
    updatedAt: Timestamp.now(),
    publishedAt: articleData.published ? (articleData.publishedAt ? Timestamp.fromDate(articleData.publishedAt) : Timestamp.now()) : null,
  });
};

export const deleteArticle = async (id: string): Promise<void> => {
  if (!db) {
    throw new Error("Firebase is not configured. Cannot delete article.");
  }

  const docRef = doc(db, "articles", id);
  await deleteDoc(docRef);
};

export const incrementViews = async (id: string): Promise<void> => {
  if (!db) {
    // Silently fail if Firebase is not configured
    return;
  }

  try {
    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, {
      views: increment(1),
    });
  } catch (error) {
    // Silently fail - view counting is not critical
    console.error("Error incrementing views:", error);
  }
};

export const searchArticles = async (searchTerm: string, limitCount: number = 20): Promise<Article[]> => {
  if (!db || !articlesCollection) {
    // Fallback to static data search
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const term = searchTerm.toLowerCase();
    return allStaticArticles
      .filter((article) => {
        return (
          article.title?.toLowerCase().includes(term) ||
          article.excerpt?.toLowerCase().includes(term) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(term))
        );
      })
      .slice(0, limitCount);
  }

  try {
    const q = query(
      articlesCollection,
      where("published", "==", true),
      orderBy("publishedAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate(),
        } as Article;
      })
      .filter((article) => {
        const term = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      });

    return deduplicateArticles(articles);
  } catch (error) {
    console.error("Error searching articles:", error);
    // Fallback to static data
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const term = searchTerm.toLowerCase();
    const filtered = allStaticArticles
      .filter((article) => {
        return (
          article.title?.toLowerCase().includes(term) ||
          article.excerpt?.toLowerCase().includes(term) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(term))
        );
      })
      .slice(0, limitCount);
    return deduplicateArticles(filtered);
  }
};

// Enhanced API functions for newspaper features
export const getTrendingArticles = async (limitCount: number = 10): Promise<Article[]> => {
  if (!db || !articlesCollection) {
    // Return static articles sorted by views
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const sorted = allStaticArticles
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limitCount);
    return deduplicateArticles(sorted);
  }

  try {
    // Articles from last 7 days with highest views
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const q = query(
      articlesCollection,
      where("published", "==", true),
      where("publishedAt", ">=", Timestamp.fromDate(weekAgo)),
      orderBy("publishedAt", "desc"),
      orderBy("views", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      } as Article;
    });

    return deduplicateArticles(articles);
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    // Fallback to static articles
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const sorted = allStaticArticles
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limitCount);
    return deduplicateArticles(sorted);
  }
};

export const getPopularArticles = async (limitCount: number = 10): Promise<Article[]> => {
  if (!db || !articlesCollection) {
    // Return static articles sorted by views
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const sorted = allStaticArticles
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limitCount);
    return deduplicateArticles(sorted);
  }

  try {
    const q = query(
      articlesCollection,
      where("published", "==", true),
      orderBy("views", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      } as Article;
    });

    return deduplicateArticles(articles);
  } catch (error) {
    console.error("Error fetching popular articles:", error);
    // Fallback to static articles
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const sorted = allStaticArticles
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limitCount);
    return deduplicateArticles(sorted);
  }
};

export const getBreakingNews = async (limitCount: number = 5): Promise<Article[]> => {
  if (!db || !articlesCollection) {
    // Return recent static articles
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    return deduplicateArticles(allStaticArticles.slice(0, limitCount));
  }

  try {
    // Articles marked as breaking or published in last 24 hours
    const dayAgo = new Date();
    dayAgo.setHours(dayAgo.getHours() - 24);

    const q = query(
      articlesCollection,
      where("published", "==", true),
      where("publishedAt", ">=", Timestamp.fromDate(dayAgo)),
      orderBy("publishedAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      } as Article;
    });

    // Fallback to static if no articles found
    if (articles.length === 0) {
      const allStaticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
      ] as Article[];
      
      return deduplicateArticles(allStaticArticles.slice(0, limitCount));
    }

    return deduplicateArticles(articles);
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    // Fallback to static articles
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    return deduplicateArticles(allStaticArticles.slice(0, limitCount));
  }
};

export const getArticlesByDateRange = async (
  startDate: Date,
  endDate: Date,
  category?: ArticleCategory,
  limitCount: number = 20
): Promise<Article[]> => {
  if (!db || !articlesCollection) {
    // Return static articles filtered by category
    let staticArticles: Partial<Article>[] = [];
    
    if (category === "masbate") {
      staticArticles = staticMasbateArticles;
    } else if (category === "national") {
      staticArticles = staticNationalArticles;
    } else if (category === "blog") {
      staticArticles = staticBlogArticles;
    } else if (category === "video") {
      staticArticles = staticVideoArticles;
    } else {
      staticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
        ...staticVideoArticles,
      ];
    }

    return deduplicateArticles(staticArticles.slice(0, limitCount) as Article[]);
  }

  try {
    let q = query(
      articlesCollection,
      where("published", "==", true),
      where("publishedAt", ">=", Timestamp.fromDate(startDate)),
      where("publishedAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("publishedAt", "desc"),
      limit(limitCount)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        publishedAt: data.publishedAt?.toDate(),
      } as Article;
    });

    return deduplicateArticles(articles);
  } catch (error) {
    console.error("Error fetching articles by date range:", error);
    // Fallback to static articles
    let staticArticles: Partial<Article>[] = [];
    
    if (category === "masbate") {
      staticArticles = staticMasbateArticles;
    } else if (category === "national") {
      staticArticles = staticNationalArticles;
    } else if (category === "blog") {
      staticArticles = staticBlogArticles;
    } else if (category === "video") {
      staticArticles = staticVideoArticles;
    } else {
      staticArticles = [
        ...staticMasbateArticles,
        ...staticNationalArticles,
        ...staticBlogArticles,
        ...staticVideoArticles,
      ];
    }

    return deduplicateArticles(staticArticles.slice(0, limitCount) as Article[]);
  }
};

export const getArticleStats = async (): Promise<{
  totalArticles: number;
  totalViews: number;
  articlesThisMonth: number;
  averageViewsPerArticle: number;
}> => {
  if (!db || !articlesCollection) {
    // Return stats from static data
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const totalViews = allStaticArticles.reduce((sum, article) => sum + (article.views || 0), 0);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    
    const articlesThisMonth = allStaticArticles.filter(article => {
      const pubDate = article.publishedAt ? new Date(article.publishedAt) : new Date();
      return pubDate >= thisMonth;
    }).length;

    return {
      totalArticles: allStaticArticles.length,
      totalViews,
      articlesThisMonth,
      averageViewsPerArticle: allStaticArticles.length > 0 ? Math.round(totalViews / allStaticArticles.length) : 0,
    };
  }

  try {
    const querySnapshot = await getDocs(query(articlesCollection, where("published", "==", true)));

    const thisMonth = new Date();
    thisMonth.setDate(1);

    let totalViews = 0;
    let articlesThisMonth = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalViews += data.views || 0;

      if (data.publishedAt && data.publishedAt.toDate() >= thisMonth) {
        articlesThisMonth++;
      }
    });

    return {
      totalArticles: querySnapshot.size,
      totalViews,
      articlesThisMonth,
      averageViewsPerArticle: querySnapshot.size > 0 ? Math.round(totalViews / querySnapshot.size) : 0,
    };
  } catch (error) {
    console.error("Error fetching article stats:", error);
    // Fallback to static data stats
    const allStaticArticles = [
      ...staticMasbateArticles,
      ...staticNationalArticles,
      ...staticBlogArticles,
    ] as Article[];
    
    const totalViews = allStaticArticles.reduce((sum, article) => sum + (article.views || 0), 0);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    
    const articlesThisMonth = allStaticArticles.filter(article => {
      const pubDate = article.publishedAt ? new Date(article.publishedAt) : new Date();
      return pubDate >= thisMonth;
    }).length;

    return {
      totalArticles: allStaticArticles.length,
      totalViews,
      articlesThisMonth,
      averageViewsPerArticle: allStaticArticles.length > 0 ? Math.round(totalViews / allStaticArticles.length) : 0,
    };
  }
};
