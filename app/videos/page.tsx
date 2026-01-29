"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInfiniteArticles } from "@/lib/hooks/useInfiniteArticles";
import VideoCard from "@/components/VideoCard";
import Sidebar from "@/components/Sidebar";
import InfiniteScroll from "@/components/InfiniteScroll";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";

export default function VideosPage() {
  const { articles, loadMore, hasMore, loading, reset } = useInfiniteArticles("video");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      reset();
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="min-h-screen bg-white">
        {/* Newspaper-style page header */}
        <div className="bg-white border-b-2 border-newspaper-black py-8">
          <div className="container mx-auto px-4">
            <SectionAnimation delay={0}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="section-header mb-4 inline-block">
                  MULTIMEDIA
                </div>
                <h1 className="text-4xl md:text-5xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                  Video Gallery
                </h1>
                <div className="text-sm font-serif text-newspaper-darkGray uppercase tracking-widest mb-2">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • Live Coverage & Reports
                </div>
                <p className="text-newspaper-darkGray font-serif italic text-lg max-w-2xl mx-auto">
                  Experience breaking news through our comprehensive video coverage, bringing you the stories that matter most
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
                  <div className="newspaper-border paper-texture bg-white p-12 text-center">
                    <h3 className="font-headline text-newspaper-black text-xl uppercase mb-4">
                      No Videos Available
                    </h3>
                    <p className="text-newspaper-darkGray font-serif italic">
                      Check back soon for the latest video news and multimedia content
                    </p>
                  </div>
                </SectionAnimation>
              ) : (
                <InfiniteScroll
                  onLoadMore={loadMore}
                  hasMore={hasMore}
                  loading={loading}
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="newspaper-columns"
                  >
                    {articles.map((article, index) => (
                      <motion.div
                        key={`${article.id || 'video'}-${index}`}
                        variants={itemVariants}
                        className="newspaper-clip bg-white p-4 mb-6 break-inside-avoid"
                      >
                        <VideoCard article={article} />
                      </motion.div>
                    ))}
                  </motion.div>
                </InfiniteScroll>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SectionAnimation delay={0.3}>
                <div className="newspaper-border paper-texture bg-white p-4">
                  <div className="section-header text-sm mb-4">
                    PRODUCTION NOTES
                  </div>
                  <div className="space-y-3 text-xs font-serif text-newspaper-darkGray">
                    <div className="border-l-2 border-newspaper-red pl-3">
                      <p className="font-bold text-newspaper-black">Latest Episode</p>
                      <p>Breaking news coverage from today's town hall meeting.</p>
                    </div>
                    <div className="border-l-2 border-newspaper-red pl-3">
                      <p className="font-bold text-newspaper-black">Weekly Feature</p>
                      <p>Community stories and local business spotlights.</p>
                    </div>
                    <div className="border-l-2 border-newspaper-red pl-3">
                      <p className="font-bold text-newspaper-black">Live Streaming</p>
                      <p>Join us for live coverage of major events and breaking news.</p>
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

