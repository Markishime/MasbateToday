"use client";

import { motion } from "framer-motion";
import { Award, Globe, Heart } from "lucide-react";

export default function CommunityImpact() {
  return (
    <div className="newspaper-border paper-texture bg-white p-8 sm:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-8 w-8 text-newspaper-red" fill="#b22222" />
          <h2 className="text-3xl sm:text-4xl font-headline text-newspaper-black uppercase tracking-wide">
            Serving Our Community
          </h2>
        </div>
        <p className="text-newspaper-darkGray font-serif text-lg max-w-2xl mx-auto italic">
          Masbate Today is committed to bringing you accurate, timely, and relevant news that matters to our community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center newspaper-clip bg-white p-6 hover:bg-white transition-colors"
        >
          <div className="w-16 h-16 bg-newspaper-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-headline font-bold text-newspaper-black mb-2 uppercase">Trusted Source</h3>
          <p className="text-newspaper-darkGray font-serif">
            Reliable journalism you can count on
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center newspaper-clip bg-white p-6 hover:bg-white transition-colors"
        >
          <div className="w-16 h-16 bg-newspaper-red rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-headline font-bold text-newspaper-black mb-2 uppercase">Local Focus</h3>
          <p className="text-newspaper-darkGray font-serif">
            News that matters to Masbate and the Philippines
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center newspaper-clip bg-white p-6 hover:bg-white transition-colors"
        >
          <div className="w-16 h-16 bg-newspaper-black rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" fill="white" />
          </div>
          <h3 className="text-xl font-headline font-bold text-newspaper-black mb-2 uppercase">Community First</h3>
          <p className="text-newspaper-darkGray font-serif">
            Your voice, your stories, your news
          </p>
        </motion.div>
      </div>
    </div>
  );
}

