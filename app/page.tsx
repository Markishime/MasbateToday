import { getArticles } from "@/lib/firebase/articles";
import HeroCarousel from "@/components/HeroCarousel";
import VideoHero from "@/components/VideoHero";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  // Fetch featured articles for hero carousel
  const { articles: featuredArticles } = await getArticles(undefined, true, 5);

  // Fetch top Masbate stories
  const { articles: masbateArticles } = await getArticles("masbate", undefined, 6);

  // Fetch national news
  const { articles: nationalArticles } = await getArticles("national", undefined, 6);

  // Fetch blogs
  const { articles: blogArticles } = await getArticles("blog", undefined, 4);

  // Get featured video if available
  const { articles: videoArticles } = await getArticles("video", true, 1);
  const featuredVideo = videoArticles[0];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Video Hero Section */}
        <SectionAnimation delay={0}>
          <div className="mb-12">
            <VideoHero
              videoUrl={featuredVideo?.videoUrl}
              videoEmbed={featuredVideo?.videoEmbed}
              title="Masbate Today News"
              subtitle="Your trusted source for local news, events, and updates from Masbate, Philippines"
            />
          </div>
        </SectionAnimation>

        {/* Hero Carousel */}
        {featuredArticles.length > 0 && (
          <SectionAnimation delay={0.2}>
            <div className="mb-12">
              <HeroCarousel articles={featuredArticles} />
            </div>
          </SectionAnimation>
        )}

        <HomePageClient
          masbateArticles={masbateArticles}
          nationalArticles={nationalArticles}
          blogArticles={blogArticles}
        />

      </div>
    </PageTransition>
  );
}

