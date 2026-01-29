"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchArticles } from "@/lib/firebase/articles";
import { Article, ArticleCategory } from "@/types";
import ArticleCard from "@/components/ArticleCard";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);
  const [categoryFilter, setCategoryFilter] = useState<ArticleCategory | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setArticles([]);
      return;
    }

    setLoading(true);
    try {
      let results = await searchArticles(term);
      
      // Apply category filter
      if (categoryFilter !== "all") {
        results = results.filter((article) => article.category === categoryFilter);
      }
      
      setArticles(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchTerm)}`);
    handleSearch(searchTerm);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <SectionAnimation delay={0}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Articles</h1>
        <div className="max-w-2xl space-y-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for articles..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label={showFilters ? "Hide filters" : "Show filters"}
            >
              <Filter className="h-5 w-5" />
            </button>
          </form>

          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Filter by Category</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "masbate", "national", "blog", "video"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      if (searchTerm) handleSearch(searchTerm);
                    }}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      categoryFilter === cat
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
          </motion.div>
        </SectionAnimation>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Searching...</p>
        </div>
      ) : articles.length === 0 && searchTerm ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No articles found for "{searchTerm}". Try different keywords.
          </p>
        </div>
          ) : articles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Found {articles.length} article{articles.length !== 1 ? "s" : ""} for "{searchTerm}"
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search term to find articles.
          </p>
        </div>
      )}
      </div>
    </PageTransition>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

