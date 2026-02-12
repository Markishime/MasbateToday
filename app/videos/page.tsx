"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRealtimeArticles } from "@/lib/hooks/useRealtimeArticles";
import VideoCard from "@/components/VideoCard";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function VideosPage() {
  const { articles, loading } = useRealtimeArticles("video", { limit: 50 });

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
                <p className="text-newspaper-darkGray font-serif italic text-lg max-w-2xl mx-auto mb-6">
                  Experience breaking news through our comprehensive video coverage, bringing you the stories that matter most
                </p>
                {articles.length > 0 && (articles[0].featuredImage || articles[0].videoEmbed) ? (() => {
                  const thumbnailUrl = articles[0].featuredImage || 
                    (articles[0].videoEmbed ? `https://img.youtube.com/vi/${getYouTubeEmbedUrl(articles[0].videoEmbed)?.split('/').pop()}/maxresdefault.jpg` : '');
                  return (
                    <div className="relative w-full h-40 sm:h-56 md:h-64 max-w-3xl mx-auto overflow-hidden rounded-lg border-2" style={{ borderColor: '#8b6f47' }}>
                      <Image
                        src={thumbnailUrl || "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80"}
                        alt={articles[0].title || "Video thumbnail"}
                        fill
                        className="object-cover"
                        style={{ filter: 'saturate(1.1) brightness(1.05)' }}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4 border-2 border-white shadow-lg">
                          <Play className="h-8 w-8 text-newspaper-black fill-newspaper-black" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-white font-headline text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg line-clamp-2">
                          {articles[0].title}
                        </h2>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="relative w-full h-40 sm:h-56 md:h-64 max-w-3xl mx-auto overflow-hidden rounded-lg border-2" style={{ borderColor: '#8b6f47' }}>
                    <Image
                      src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80"
                      alt="Video gallery illustration"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(1.1) brightness(1.05)' }}
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                )}
              </motion.div>
            </SectionAnimation>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SectionAnimation delay={0.2}>
                {loading && articles.length === 0 ? (
                  <div className="newspaper-border paper-texture bg-white p-12 text-center">
                    <p className="text-newspaper-darkGray font-serif italic">Loading video gallery...</p>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="newspaper-border paper-texture bg-white p-12 text-center">
                    <h3 className="font-headline text-newspaper-black text-xl uppercase mb-4">
                      No Videos Available
                    </h3>
                    <p className="text-newspaper-darkGray font-serif italic">
                      Check back soon for the latest video news and multimedia content
                    </p>
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="newspaper-columns"
                  >
                    {articles.map((article, index) => (
                      <motion.div
                        key={`${article.id || "video"}-${index}`}
                        variants={itemVariants}
                        className="newspaper-clip bg-white p-4 mb-6 break-inside-avoid"
                      >
                        <VideoCard article={article} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </SectionAnimation>
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

