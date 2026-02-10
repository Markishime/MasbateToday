"use client";

import { useMemo } from "react";
import { useRealtimeArticles } from "@/lib/hooks/useRealtimeArticles";
import { useRealtimeDailyUpdates } from "@/lib/hooks/useRealtimeDailyUpdates";
import NewsHero from "@/components/NewsHero";
import InteractiveNewsTicker from "@/components/InteractiveNewsTicker";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import NewsletterPopup from "@/components/NewsletterPopup";
import NewspaperInteractions from "@/components/NewspaperInteractions";
import NewspaperClipping from "@/components/NewspaperClipping";
import OpinionPolls from "@/components/OpinionPolls";
import EditorsPick from "@/components/EditorsPick";
import MostRead from "@/components/MostRead";
import WeatherForecast from "@/components/WeatherForecast";
import BusinessSection from "@/components/BusinessSection";
import SportsSection from "@/components/SportsSection";
import ObituariesSection from "@/components/ObituariesSection";
import BirthNoticesSection from "@/components/BirthNoticesSection";
import EditorialColumns from "@/components/EditorialColumns";
import AnimatedArticleList from "@/components/AnimatedArticleList";
import AnimatedVideoList from "@/components/AnimatedVideoList";

export default function DynamicHomePage() {
  const { articles: featuredArticles } = useRealtimeArticles(undefined, { featured: true, limit: 5 });
  const { articles: latestArticles } = useRealtimeArticles(undefined, { limit: 5 });
  const { articles: latestNews } = useRealtimeArticles(undefined, { limit: 6 });
  const { articles: masbateArticles } = useRealtimeArticles("masbate", { limit: 8 });
  const { articles: nationalArticles } = useRealtimeArticles("national", { limit: 8 });
  const { articles: blogArticles } = useRealtimeArticles("blog", { limit: 4 });
  const { articles: videoArticles } = useRealtimeArticles("video", { limit: 6 });
  const { articles: featuredStories } = useRealtimeArticles(undefined, { featured: true, limit: 6 });
  const { articles: allArticles } = useRealtimeArticles(undefined, { limit: 20 });
  const { updates: dailyUpdates } = useRealtimeDailyUpdates();

  const heroArticles = useMemo(() => {
    if (featuredArticles.length >= 3) return featuredArticles.slice(0, 5);
    return [...featuredArticles, ...latestArticles.slice(0, 5 - featuredArticles.length)];
  }, [featuredArticles, latestArticles]);

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>
        <SectionAnimation delay={0}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="paper-texture bg-white p-8 sm:p-10 mb-8" style={{ border: "1px solid #8b6f47" }}>
              <div className="mb-6">
                <div className="section-header mb-4">FRONT PAGE</div>
                <div
                  className="text-sm font-serif uppercase tracking-widest mb-4 border-b-2 pb-2"
                  style={{ color: "#5c4a37", borderColor: "#8b6f47" }}
                >
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • Masbate, Philippines • Live
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 border-2" style={{ borderColor: "#d4c5b0" }}>
                    <NewsHero articles={heroArticles} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="newspaper-clip bg-white p-4">
                    <div
                      className="text-center mb-4 text-sm font-bold px-4 py-2"
                      style={{ backgroundColor: "#b22222", color: "#ffffff", border: "2px solid #1a1a1a" }}
                    >
                      ⚡ BREAKING NEWS ⚡
                    </div>
                    <InteractiveNewsTicker articles={latestNews.slice(0, 5)} />
                  </div>
                  <div className="newspaper-clip bg-white p-4">
                    <h3
                      className="font-serif font-bold uppercase text-sm mb-3 border-b-2 pb-2"
                      style={{ color: "#5c4a37", borderColor: "#8b6f47" }}
                    >
                      TODAY&apos;S BRIEFS • Live
                    </h3>
                    <div className="space-y-2 text-xs font-serif" style={{ color: "#6b6b6b" }}>
                      {dailyUpdates.length > 0
                        ? dailyUpdates.slice(0, 5).map((u) => (
                            <p key={u.id}>• {u.title}</p>
                          ))
                        : (
                          <>
                            <p>• Local market opens at 6 AM</p>
                            <p>• Town hall meeting scheduled</p>
                            <p>• New business licenses issued</p>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.1}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="paper-texture bg-white p-6" style={{ border: "1px solid #8b6f47" }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
                >
                  LOCAL NEWS
                </div>
                <AnimatedArticleList articles={masbateArticles} viewAllHref="/masbate" />
              </div>
              <div className="paper-texture bg-white p-6" style={{ border: "1px solid #8b6f47" }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
                >
                  NATIONAL NEWS
                </div>
                <AnimatedArticleList articles={nationalArticles} viewAllHref="/national" />
              </div>
              <div className="paper-texture bg-white p-6" style={{ border: "1px solid #8b6f47" }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
                >
                  MULTIMEDIA
                </div>
                <AnimatedVideoList articles={videoArticles} viewAllHref="/videos" />
              </div>
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                BUSINESS
              </div>
              <BusinessSection articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.3}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                SPORTS
              </div>
              <SportsSection articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.4}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                OPINION & EDITORIALS
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OpinionPolls />
                <EditorialColumns blogArticles={blogArticles} />
              </div>
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.5}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                WEATHER FORECAST
              </div>
              <WeatherForecast />
            </div>
          </div>
        </SectionAnimation>

        {featuredStories.length > 0 && (
          <SectionAnimation delay={0.6}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
                >
                  EDITOR&apos;S PICK
                </div>
                <EditorsPick articles={featuredStories} />
              </div>
            </div>
          </SectionAnimation>
        )}

        <SectionAnimation delay={0.7}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                MOST READ
              </div>
              <MostRead articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.8}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                OBITUARIES
              </div>
              <ObituariesSection />
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={0.9}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                BIRTH NOTICES
              </div>
              <BirthNoticesSection />
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={1.0}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                CLASSIFIEDS & ANNOUNCEMENTS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NewspaperClipping title="Help Wanted" content="Experienced journalist needed for Masbate Today." date="Published Today" />
                <NewspaperClipping title="Community Event" content="Masbate Town Fiesta Celebration - Join us for three days of festivities." date="This Weekend" />
                <NewspaperClipping title="Public Notice" content="Road maintenance schedule for Highway 1. Expect delays between 9 AM - 3 PM." date="Official Notice" />
                <NewspaperClipping title="For Sale" content="2000 sqm lot in prime location. Contact for details." date="Real Estate" />
                <NewspaperClipping title="Services Offered" content="Professional photography services for events and corporate functions." date="Photography" />
                <NewspaperClipping title="Lost & Found" content="Found: Brown leather wallet near public market. Contact editorial office to claim." date="Community Service" />
              </div>
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={1.1}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                TOURISM & TRAVEL
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                    Explore Cawayan, Masbate
                  </h2>
                  <p className="text-newspaper-darkGray font-serif text-base leading-relaxed mb-6">
                    Discover the best tourist spots in Cawayan, Masbate. Book your visit today and create unforgettable memories.
                  </p>
                  <Link href="/tourism">
                    <button className="bg-newspaper-black text-white px-8 py-4 font-serif font-bold uppercase text-sm tracking-widest border-2 border-newspaper-black hover:bg-white hover:text-newspaper-black transition-all duration-300">
                      Explore Tourism →
                    </button>
                  </Link>
                </div>
                <div className="newspaper-clip bg-white p-6">
                  <h3 className="font-headline text-xl text-newspaper-black uppercase mb-4">Featured Destinations</h3>
                  <div className="space-y-3 text-sm font-serif text-newspaper-darkGray">
                    <div className="border-l-4 border-newspaper-red pl-4">
                      <div className="font-bold text-newspaper-black">Cawayan Beach</div>
                      <div className="text-xs">Pristine white sand beach</div>
                    </div>
                    <div className="border-l-4 border-newspaper-red pl-4">
                      <div className="font-bold text-newspaper-black">Cawayan Lighthouse</div>
                      <div className="text-xs">Historic coastal landmark</div>
                    </div>
                    <div className="border-l-4 border-newspaper-red pl-4">
                      <div className="font-bold text-newspaper-black">Masbate Island Viewpoint</div>
                      <div className="text-xs">Breathtaking panoramic views</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        <SectionAnimation delay={1.2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-8 sm:p-12 lg:p-16" style={{ border: "1px solid #8b6f47" }}>
              <div
                className="section-header mb-6 text-center"
                style={{ backgroundColor: "#8b6f47", color: "#f5f0e8", borderLeftColor: "#5c4a37" }}
              >
                SUBSCRIBE TO OUR DAILY EDITION
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                  Never Miss a Story
                </h2>
                <p className="text-newspaper-darkGray font-serif text-lg mb-8 max-w-2xl mx-auto italic">
                  Get Masbate&apos;s latest news delivered to your inbox every morning
                </p>
                <div className="max-w-md mx-auto">
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        <NewsletterPopup />
        <NewspaperInteractions />
      </div>
    </PageTransition>
  );
}
