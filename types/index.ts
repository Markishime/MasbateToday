export interface Article {
  id: string;
  title: string;
  titleTagalog?: string;
  content: string;
  contentTagalog?: string;
  excerpt: string;
  excerptTagalog?: string;
  author: string;
  authorId: string;
  category: "masbate" | "national" | "blog" | "video";
  featuredImage?: string;
  images?: string[];
  videoUrl?: string;
  videoEmbed?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  sponsored: boolean;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  views: number;
  readingTime: number;
  relatedArticles?: string[];
}

export interface BlogPost extends Article {
  category: "blog";
}

export interface VideoPost extends Article {
  category: "video";
  videoUrl: string;
  videoEmbed: string;
}

export interface Poll {
  id: string;
  articleId: string;
  question: string;
  questionTagalog?: string;
  options: {
    id: string;
    text: string;
    textTagalog?: string;
    votes: number;
  }[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  active: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin";
  createdAt: Date;
}

export type ArticleCategory = "masbate" | "national" | "blog" | "video";
export type Language = "en" | "tl";

