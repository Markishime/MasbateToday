"use client";

import { CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";

export default function SupportPage() {
  const GCASH_NUMBER = process.env.NEXT_PUBLIC_GCASH_NUMBER || "0963688771";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleGcashClick = async () => {
    try {
      if (navigator.clipboard && GCASH_NUMBER) {
        await navigator.clipboard.writeText(GCASH_NUMBER);
        alert("GCash number copied. Open your GCash app and paste it to send support.");
      } else {
        throw new Error("Clipboard not available");
      }
    } catch {
      alert(`Please send your support via GCash number: ${GCASH_NUMBER}`);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SectionAnimation delay={0}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Masbate Today</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your support helps us continue providing quality journalism and keeping the Masbate community informed.
            </p>
          </motion.div>
        </SectionAnimation>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <motion.div
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center col-span-1 sm:col-span-2 lg:col-span-3"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h3 className="font-bold text-lg mb-2">Donate via GCash</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Send your support directly through GCash. Your contribution keeps Masbate Today independent and free
              for everyone.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4">
              <p className="font-mono text-sm">{GCASH_NUMBER}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              type="button"
              onClick={handleGcashClick}
            >
              Copy GCash Number
            </motion.button>
          </motion.div>
        </motion.div>

        <SectionAnimation delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Why Support Us?</h2>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-3 text-gray-700 dark:text-gray-300"
            >
              {[
                "Independent journalism focused on Masbate and the Philippines",
                "Free access to quality news and information",
                "Community-driven content and local coverage",
                "No paywalls for essential news",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start"
                >
                  <span className="text-primary mr-2">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </SectionAnimation>

        <SectionAnimation delay={0.5}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For other ways to support, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </motion.div>
        </SectionAnimation>
      </div>
    </PageTransition>
  );
}

