import { getArticles } from "@/lib/firebase/articles";
import NewsHero from "@/components/NewsHero";
import InteractiveNewsTicker from "@/components/InteractiveNewsTicker";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import NewsletterPopup from "@/components/NewsletterPopup";
import NewspaperInteractions from "@/components/NewspaperInteractions";
import NewspaperClipping from "@/components/NewspaperClipping";
import ArticleCard from "@/components/ArticleCard";
import FeaturedStories from "@/components/FeaturedStories";
import OpinionPolls from "@/components/OpinionPolls";
import EditorsPick from "@/components/EditorsPick";
import MostRead from "@/components/MostRead";
import WeatherForecast from "@/components/WeatherForecast";
import BusinessSection from "@/components/BusinessSection";
import SportsSection from "@/components/SportsSection";
import ObituariesSection from "@/components/ObituariesSection";
import BirthNoticesSection from "@/components/BirthNoticesSection";
import PageTurn from "@/components/PageTurn";
import EditorialColumns from "@/components/EditorialColumns";
import AnimatedArticleList from "@/components/AnimatedArticleList";
import AnimatedVideoList from "@/components/AnimatedVideoList";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch featured articles for hero carousel
  const { articles: featuredArticles } = await getArticles(undefined, true, 5);
  
  // Fetch latest articles for hero if not enough featured
  const { articles: latestArticles } = await getArticles(undefined, undefined, 5);
  const heroArticles = featuredArticles.length >= 3 
    ? featuredArticles.slice(0, 5) 
    : [...featuredArticles, ...latestArticles.slice(0, 5 - featuredArticles.length)];

  // Fetch latest news for hero sidebar
  const { articles: latestNews } = await getArticles(undefined, undefined, 6);

  // Fetch top Masbate stories
  const { articles: masbateArticles } = await getArticles("masbate", undefined, 8);

  // Fetch national news
  const { articles: nationalArticles } = await getArticles("national", undefined, 8);

  // Fetch blogs
  const { articles: blogArticles } = await getArticles("blog", undefined, 4);

  // Fetch videos
  const { articles: videoArticles } = await getArticles("video", undefined, 6);

  // Fetch breaking news
  const { articles: breakingNews } = await getArticles(undefined, undefined, 4);

  // Fetch featured stories
  const { articles: featuredStories } = await getArticles(undefined, true, 6);

  // Fetch all articles for photo gallery
  const { articles: allArticles } = await getArticles(undefined, undefined, 20);

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
        {/* Section 1: Front Page Hero */}
        <SectionAnimation delay={0}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="paper-texture bg-white p-8 sm:p-10 mb-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="mb-6">
                <div className="section-header mb-4">
                  FRONT PAGE
                </div>
                <div className="text-sm font-serif uppercase tracking-widest mb-4 border-b-2 pb-2" style={{ color: '#5c4a37', borderColor: '#8b6f47' }}>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • Masbate, Philippines
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Hero Section */}
                <div className="lg:col-span-2">
                  <div className="bg-white p-8 border-2" style={{ borderColor: '#d4c5b0' }}>
          <NewsHero articles={heroArticles} />
        </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Breaking News */}
                  <div className="newspaper-clip bg-white p-4">
                    <div className="text-center mb-4 text-sm font-bold px-4 py-2" style={{ backgroundColor: '#b22222', color: '#ffffff', border: '2px solid #1a1a1a' }}>
                      ⚡ BREAKING NEWS ⚡
                    </div>
                    <InteractiveNewsTicker articles={latestNews.slice(0, 3)} />
                  </div>
                  
                  {/* Today's Briefs */}
                  <div className="newspaper-clip bg-white p-4">
                    <h3 className="font-serif font-bold uppercase text-sm mb-3 border-b-2 pb-2" style={{ color: '#5c4a37', borderColor: '#8b6f47' }}>
                      TODAY'S BRIEFS
                    </h3>
                    <div className="space-y-2 text-xs font-serif" style={{ color: '#6b6b6b' }}>
                      <p>• Local market opens at 6 AM</p>
                      <p>• Town hall meeting scheduled</p>
                      <p>• New business licenses issued</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Section 2: Main News Columns */}
        <SectionAnimation delay={0.1}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="paper-texture bg-white p-6" style={{ border: '1px solid #8b6f47' }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}
                >
                  LOCAL NEWS
                </div>
                <AnimatedArticleList articles={masbateArticles} viewAllHref="/masbate" />
              </div>
              <div className="paper-texture bg-white p-6" style={{ border: '1px solid #8b6f47' }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}
                >
                  NATIONAL NEWS
                </div>
                <AnimatedArticleList articles={nationalArticles} viewAllHref="/national" />
              </div>
              <div className="paper-texture bg-white p-6" style={{ border: '1px solid #8b6f47' }}>
                <div
                  className="section-header mb-6"
                  style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}
                >
                  MULTIMEDIA
                </div>
                <AnimatedVideoList articles={videoArticles} viewAllHref="/videos" />
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Section 3: Business News */}
        <SectionAnimation delay={0.2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>BUSINESS</div>
              <BusinessSection articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 4: Sports */}
        <SectionAnimation delay={0.3}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>SPORTS</div>
              <SportsSection articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 5: Opinion & Editorials */}
        <SectionAnimation delay={0.4}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>OPINION & EDITORIALS</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Opinion Polls Section */}
                <div>
                  <OpinionPolls />
                </div>
                {/* Editorial Columns Section */}
                <div>
                  <EditorialColumns blogArticles={blogArticles} />
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Section 6: Weather Forecast */}
        <SectionAnimation delay={0.5}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>WEATHER FORECAST</div>
              <WeatherForecast />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 7: Editor's Pick */}
        {featuredStories.length > 0 && (
          <SectionAnimation delay={0.6}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
                <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>EDITOR'S PICK</div>
                <EditorsPick articles={featuredStories} />
              </div>
            </div>
          </SectionAnimation>
        )}

        {/* Section 8: Most Read */}
        <SectionAnimation delay={0.7}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>MOST READ</div>
              <MostRead articles={allArticles} />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 9: Obituaries */}
        <SectionAnimation delay={0.8}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>OBITUARIES</div>
              <ObituariesSection />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 10: Birth Notices */}
        <SectionAnimation delay={0.9}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>BIRTH NOTICES</div>
              <BirthNoticesSection />
            </div>
          </div>
        </SectionAnimation>

        {/* Section 11: Classifieds & Announcements */}
        <SectionAnimation delay={1.0}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>CLASSIFIEDS & ANNOUNCEMENTS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NewspaperClipping
                  title="Help Wanted"
                  content="Experienced journalist needed for Masbate Today. Must have strong writing skills and passion for community news."
                  date="Published Today"
                />
                <NewspaperClipping
                  title="Community Event"
                  content="Masbate Town Fiesta Celebration - Join us for three days of festivities, food, and cultural performances."
                  date="This Weekend"
                />
                <NewspaperClipping
                  title="Public Notice"
                  content="Road maintenance schedule for Highway 1. Expect delays between 9 AM - 3 PM. Detour routes available."
                  date="Official Notice"
                />
                <NewspaperClipping
                  title="For Sale"
                  content="2000 sqm lot in prime location. Perfect for business or residential development. Contact for details."
                  date="Real Estate"
                />
                <NewspaperClipping
                  title="Services Offered"
                  content="Professional photography services for events, weddings, and corporate functions. Competitive rates."
                  date="Photography"
                />
                <NewspaperClipping
                  title="Lost & Found"
                  content="Found: Brown leather wallet near public market. Contact editorial office to claim with proper identification."
                  date="Community Service"
                />
              </div>
            </div>
          </div>
              </SectionAnimation>

        {/* Section 12: Tourism Section */}
        <SectionAnimation delay={1.1}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-6 sm:p-8" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>TOURISM & TRAVEL</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                  <h2 className="text-2xl sm:text-3xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                    Explore Cawayan, Masbate
                      </h2>
                  <p className="text-newspaper-darkGray font-serif text-base leading-relaxed mb-6">
                    Discover the best tourist spots in Cawayan, Masbate. From pristine beaches to historic landmarks, 
                    experience the beauty and culture of this amazing destination. Book your visit today and create 
                    unforgettable memories.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-newspaper-darkGray font-serif">
                      <span className="mr-2">✓</span>
                      <span>Best tourist spots in Cawayan</span>
                    </div>
                    <div className="flex items-center text-newspaper-darkGray font-serif">
                      <span className="mr-2">✓</span>
                      <span>Easy booking system</span>
                    </div>
                    <div className="flex items-center text-newspaper-darkGray font-serif">
                      <span className="mr-2">✓</span>
                      <span>Detailed spot information</span>
                    </div>
                    <div className="flex items-center text-newspaper-darkGray font-serif">
                      <span className="mr-2">✓</span>
                      <span>Local insights and tips</span>
                  </div>
                  </div>
                  <Link href="/tourism">
                    <button className="bg-newspaper-black text-white px-8 py-4 font-serif font-bold uppercase text-sm tracking-widest border-2 border-newspaper-black hover:bg-white hover:text-newspaper-black transition-all duration-300">
                      Explore Tourism →
                    </button>
                  </Link>
                </div>
                <div className="newspaper-clip bg-white p-6">
                  <div className="text-center">
                    <h3 className="font-headline text-xl text-newspaper-black uppercase mb-4">
                      Featured Destinations
                    </h3>
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
                      <div className="border-l-4 border-newspaper-red pl-4">
                        <div className="font-bold text-newspaper-black">Cawayan Sunset Point</div>
                        <div className="text-xs">Spectacular sunset viewing</div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
            </SectionAnimation>

        {/* Section 13: Newsletter Subscription */}
        <SectionAnimation delay={1.2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="paper-texture bg-white p-8 sm:p-12 lg:p-16" style={{ border: '1px solid #8b6f47' }}>
              <div className="section-header mb-6 text-center" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>
                SUBSCRIBE TO OUR DAILY EDITION
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-headline text-newspaper-black uppercase tracking-wide mb-4">
                  Never Miss a Story
                </h2>
                <p className="text-newspaper-darkGray font-serif text-lg mb-8 max-w-2xl mx-auto italic">
                  Get Masbate's latest news delivered to your inbox every morning
                </p>
                <div className="max-w-md mx-auto">
                <NewsletterSignup />
                </div>
              </div>
            </div>
          </div>
        </SectionAnimation>

        {/* Newsletter Popup */}
        <NewsletterPopup />

        {/* Interactive Newspaper Elements */}
        <NewspaperInteractions />
      </div>
    </PageTransition>
  );
}

