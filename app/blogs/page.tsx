"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRealtimeArticles } from "@/lib/hooks/useRealtimeArticles";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import StaticArticles from "@/components/StaticArticles";
import { staticBlogArticles } from "@/lib/staticData";

export default function BlogsPage() {
  const { articles, loading } = useRealtimeArticles("blog", { limit: 50 });

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
                  OPINION & EDITORIALS
                </div>
                <h1 className="text-4xl md:text-5xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                  Blogs & Opinions
                </h1>
                <div className="text-sm font-serif text-newspaper-darkGray uppercase tracking-widest mb-2">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • Voices of the Community
                </div>
                <p className="text-newspaper-darkGray font-serif italic text-lg max-w-2xl mx-auto mb-6">
                  Thought-provoking articles, expert opinions, and diverse perspectives from our community of writers and analysts
                </p>
                {articles.length > 0 && articles[0].featuredImage ? (
                  <div className="relative w-full h-40 sm:h-56 md:h-64 max-w-3xl mx-auto overflow-hidden rounded-lg border-2" style={{ borderColor: '#8b6f47' }}>
                    <Image
                      src={articles[0].featuredImage}
                      alt={articles[0].title || "Blog article"}
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(1.1) brightness(1.05)' }}
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-white font-headline text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg line-clamp-2">
                        {articles[0].title}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-40 sm:h-56 md:h-64 max-w-3xl mx-auto overflow-hidden rounded-lg border-2" style={{ borderColor: '#8b6f47' }}>
                    <Image
                      src="https://images.unsplash.com/photo-1485115918245-91c9103c87c3?w=1600&q=80"
                      alt="Blogs and opinions illustration"
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
                    <p className="text-newspaper-darkGray font-serif italic">Loading latest articles...</p>
                  </div>
                ) : (
                  <StaticArticles articles={articles} staticArticles={staticBlogArticles} />
                )}
              </SectionAnimation>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SectionAnimation delay={0.3}>
                <div className="newspaper-border paper-texture bg-white p-4">
                  <div className="section-header text-sm mb-4" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>
                    CONTRIBUTOR SPOTLIGHT
                  </div>
                  <div className="space-y-3 text-xs font-serif" style={{ color: '#6b6b6b' }}>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Featured Writer</p>
                      <p>Dr. Maria Santos - Political analyst with 20+ years experience.</p>
                    </div>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Columnist</p>
                      <p>Juan dela Cruz - Weekly economics column since 2018.</p>
                    </div>
                    <div className="border-l-2 pl-3 transition-colors hover:bg-gray-50 p-2 -m-2 rounded" style={{ borderColor: '#b22222' }}>
                      <p className="font-bold" style={{ color: '#1a1a1a' }}>Guest Contributor</p>
                      <p>Local business leaders share their insights monthly.</p>
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

