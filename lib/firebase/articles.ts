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

const articlesCollection = collection(db, "articles");

export const getArticle = async (id: string): Promise<Article | null> => {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
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
};

export const getArticles = async (
  category?: ArticleCategory,
  featured?: boolean,
  limitCount: number = 10,
  lastDoc?: QueryDocumentSnapshot
): Promise<{ articles: Article[]; lastDoc: QueryDocumentSnapshot | null }> => {
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

  return { articles, lastDoc: lastVisible };
};

export const createArticle = async (articleData: Omit<Article, "id" | "createdAt" | "updatedAt" | "views">): Promise<string> => {
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
  const docRef = doc(db, "articles", id);
  await updateDoc(docRef, {
    ...articleData,
    updatedAt: Timestamp.now(),
    publishedAt: articleData.published ? (articleData.publishedAt ? Timestamp.fromDate(articleData.publishedAt) : Timestamp.now()) : null,
  });
};

export const deleteArticle = async (id: string): Promise<void> => {
  const docRef = doc(db, "articles", id);
  await deleteDoc(docRef);
};

export const incrementViews = async (id: string): Promise<void> => {
  const docRef = doc(db, "articles", id);
  await updateDoc(docRef, {
    views: increment(1),
  });
};

export const searchArticles = async (searchTerm: string, limitCount: number = 20): Promise<Article[]> => {
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

  return articles;
};

