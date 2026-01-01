import { getArticles } from "@/lib/firebase/articles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import { motion } from "framer-motion";

export default async function BlogsPage() {
  const { articles } = await getArticles("blog", undefined, 20);

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Blogs & Opinions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thought-provoking articles, opinions, and insights
            </p>
          </motion.div>
        </SectionAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {articles.length === 0 ? (
              <SectionAnimation delay={0.2}>
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No blog posts found. Check back soon for updates!
                  </p>
                </div>
              </SectionAnimation>
            ) : (
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
            )}
          </div>

          <div className="lg:col-span-1">
            <SectionAnimation delay={0.3}>
              <Sidebar />
            </SectionAnimation>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

