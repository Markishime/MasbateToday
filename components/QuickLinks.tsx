"use client";

import { motion } from "framer-motion";
import { Link2, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuickLinks() {
  const links = [
    { title: "Government Services", url: "/contact", description: "Contact local government offices" },
    { title: "Emergency Contacts", url: "/contact", description: "Important emergency numbers" },
    { title: "Business Directory", url: "/search?q=business", description: "Find local businesses" },
    { title: "Event Calendar", url: "/search?q=events", description: "Upcoming events in Masbate" },
    { title: "Tourism Guide", url: "/search?q=tourism", description: "Explore Masbate attractions" },
    { title: "Education Resources", url: "/search?q=education", description: "Schools and learning centers" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Link2 className="h-8 w-8 text-[#CE1126]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Quick Links
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {links.map((link, index) => (
          <Link key={link.title} href={link.url}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="bg-gradient-to-br from-[#0038A8]/10 to-[#CE1126]/10 rounded-lg p-4 border-2 border-transparent hover:border-[#FCD116] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#0038A8] group-hover:translate-x-2 transition-transform flex-shrink-0 ml-2" />
              </div>
            </motion.div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}

