"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInfiniteArticles } from "@/lib/hooks/useInfiniteArticles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import InfiniteScroll from "@/components/InfiniteScroll";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import StaticArticles from "@/components/StaticArticles";
import { staticNationalArticles } from "@/lib/staticData";

export default function NationalPage() {
  const { articles, loadMore, hasMore, loading, reset } = useInfiniteArticles("national");

  useEffect(() => {
    reset();
    loadMore();
  }, []);

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
      <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
        {/* Newspaper-style page header */}
        <div className="py-8 border-b-2" style={{ backgroundColor: '#ffffff', borderColor: '#8b6f47' }}>
          <div className="container mx-auto px-4">
            <SectionAnimation delay={0}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="section-header mb-4 inline-block" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>
                  NATIONAL NEWS
                </div>
                <h1 className="text-4xl md:text-5xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                  Philippines News
                </h1>
                <div className="text-sm font-serif text-newspaper-darkGray uppercase tracking-widest mb-2">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • Nationwide Coverage
                </div>
                <p className="text-newspaper-darkGray font-serif italic text-lg max-w-2xl mx-auto">
                  Comprehensive national news coverage from across the Philippines, bringing you the stories that matter most
                </p>
              </motion.div>
            </SectionAnimation>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {articles.length === 0 && !loading ? (
                <SectionAnimation delay={0.2}>
                  <StaticArticles articles={articles} staticArticles={staticNationalArticles} />
                </SectionAnimation>
              ) : (
                <InfiniteScroll
                  onLoadMore={loadMore}
                  hasMore={hasMore}
                  loading={loading}
                >
                  <StaticArticles articles={articles} staticArticles={staticNationalArticles} />
                </InfiniteScroll>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SectionAnimation delay={0.3}>
                <div className="newspaper-border paper-texture bg-white p-4">
                  <div className="section-header text-sm mb-4" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>
                    NATIONAL BRIEFS
                  </div>
                  <div className="space-y-3 text-xs font-serif" style={{ color: '#6b6b6b' }}>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Senate Updates</p>
                      <p>New legislation passed regarding infrastructure development.</p>
                    </div>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Economic Report</p>
                      <p>GDP growth shows positive trends for Q1 2024.</p>
                    </div>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Weather Alert</p>
                      <p>Tropical storm approaching northern regions.</p>
                    </div>
                  </div>
                </div>
              </SectionAnimation>

              <SectionAnimation delay={0.4}>
                <Sidebar />
              </SectionAnimation>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

