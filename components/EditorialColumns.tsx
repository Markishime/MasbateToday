"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types";
import { staticEditorialArticles } from "@/lib/staticData";

interface EditorialColumnsProps {
  blogArticles: Article[];
}

export default function EditorialColumns({ blogArticles }: EditorialColumnsProps) {
  const displayArticles = blogArticles.length > 0 ? blogArticles : staticEditorialArticles as Article[];

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-headline font-bold text-lg uppercase tracking-wide mb-4 border-b-2 pb-2" style={{ color: '#1a1a1a', borderColor: '#8b6f47' }}>
          Editorial Columns
        </h3>
      </div>
      {displayArticles.length > 0 ? (
        <div className="space-y-4">
          {displayArticles.slice(0, 3).map((article, index) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b pb-4 last:border-b-0 hover:bg-gray-50 p-2 -m-2 transition-colors"
                style={{ borderColor: '#d4c5b0' }}
              >
                <h3 className="font-serif font-bold text-sm mb-2 line-clamp-2" style={{ color: '#1a1a1a' }}>
                  {article.title}
                </h3>
                <p className="text-xs font-serif line-clamp-2" style={{ color: '#6b6b6b' }}>
                  {article.excerpt}
                </p>
                <div className="text-xs font-serif mt-1" style={{ color: '#8b6f47' }}>
                  By {article.author || "Editorial Staff"} • {new Date(article.publishedAt || article.createdAt || new Date()).toLocaleDateString()}
                </div>
              </motion.div>
            </Link>
          ))}
          <Link 
            href="/blogs" 
            className="text-sm font-serif font-bold uppercase tracking-wide block mt-4 transition-colors hover:text-newspaper-brown"
            style={{ color: '#6b6b6b' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8b6f47';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b6b6b';
            }}
          >
            View All Editorials →
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <p className="font-serif italic text-lg" style={{ color: '#6b6b6b' }}>
            Editorial columns coming soon
          </p>
        </motion.div>
      )}
    </div>
  );
}
