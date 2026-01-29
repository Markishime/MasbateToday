import { getArticle, getArticles, incrementViews } from "@/lib/firebase/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Eye, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { formatDate, shareOnFacebook, shareOnTwitter, shareOnWhatsApp } from "@/lib/utils";
import ArticleContent from "@/components/ArticleContent";
import RelatedArticles from "@/components/RelatedArticles";
import ReadingProgress from "@/components/ReadingProgress";
import SocialShare from "@/components/SocialShare";
import Poll from "@/components/Poll";
import { getPollByArticle } from "@/lib/firebase/polls";

// Force dynamic rendering to avoid Firebase calls during build
export const dynamic = 'force-dynamic';

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  if (!article || !article.published) {
    notFound();
  }

  // Increment views (async, don't wait)
  incrementViews(params.id).catch(console.error);

  // Get related articles
  const { articles: allArticles } = await getArticles(article.category, undefined, 20);
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  // Get poll if exists (client-side only)
  let poll = null;
  try {
    poll = await getPollByArticle(params.id);
  } catch (error) {
    // Poll loading is optional, continue if it fails
  }

  return (
    <>
      <ReadingProgress />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span
              className={`px-3 py-1 rounded-full ${
                article.category === "masbate"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : article.category === "national"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
            {article.sponsored && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                Sponsored
              </span>
            )}
            {article.premium && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                Premium
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{article.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>By {article.author}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] mb-6 sm:mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
                sizes="100vw"
              />
          </div>
        )}

        {/* Video Embed */}
        {article.videoEmbed && (
          <div className="mb-8 aspect-video rounded-lg overflow-hidden">
            <iframe
              src={article.videoEmbed}
              title={article.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Article Content */}
        <ArticleContent content={article.content} />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-sm font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Poll */}
        {poll && <Poll pollId={poll.id} articleId={article.id} />}

        {/* Social Share */}
        <SocialShare article={article} />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </article>
    </>
  );
}

