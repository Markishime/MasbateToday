"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, RotateCcw, Zap } from "lucide-react";

export default function NewspaperInteractions() {
  const [showPageTurn, setShowPageTurn] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime(); // Initial update
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePageTurn = () => {
    setShowPageTurn(true);
    setTimeout(() => setShowPageTurn(false), 2000);
  };

  return (
    <>
      {/* Floating Newspaper Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <button
          onClick={handlePageTurn}
          className="newspaper-hover bg-newspaper-black text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Page turn effect"
        >
          <Newspaper className="h-6 w-6" />
        </button>
      </motion.div>

      {/* Digital Clock - Newspaper Style */}
      {mounted && (
        <motion.div
          className="fixed top-20 right-6 z-30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="newspaper-clip bg-newspaper-black text-white p-3 font-mono text-sm">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider mb-1">Press Time</div>
              <div className="font-bold">
                {currentTime || "--:--:--"}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Breaking News Alert */}
      <motion.div
        className="fixed top-32 left-4 z-30 md:left-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="newspaper-clip p-4 max-w-xs shadow-lg" style={{ backgroundColor: '#b22222', color: '#ffffff', borderColor: '#1a1a1a' }}>
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 news-pulse" style={{ color: '#ffffff' }} />
            <span className="font-bold uppercase text-sm tracking-wide" style={{ color: '#ffffff' }}>Live Updates</span>
          </div>
          <p className="text-xs font-serif italic" style={{ color: '#ffffff' }}>
            Breaking news as it happens from Masbate Today
          </p>
        </div>
      </motion.div>

      {/* Page Turn Animation Overlay */}
      <AnimatePresence>
        {showPageTurn && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Page Turn Effect - Left Page */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8] to-transparent"
              initial={{ x: 0 }}
              animate={{ 
                x: "-50%",
                rotateY: -180,
                transformPerspective: 1000,
              }}
              exit={{ x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            {/* Page Turn Effect - Right Page */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-[#f5f0e8] to-transparent"
              initial={{ x: "50%" }}
              animate={{ 
                x: 0,
                rotateY: 0,
                transformPerspective: 1000,
              }}
              exit={{ x: "50%", rotateY: 180 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              style={{ transformStyle: "preserve-3d" }}
            />
            {/* Shadow Effect */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress - Newspaper Style */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-newspaper-black z-40"
        style={{
          scaleX: 0,
          transformOrigin: "0%",
        }}
        animate={{
          scaleX: typeof window !== 'undefined' ?
            Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) : 0
        }}
        transition={{ ease: "easeOut" }}
      />

      {/* Vintage Corner Decorations */}
      <div className="fixed top-0 left-0 w-16 h-16 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[64px] border-l-transparent border-t-[64px] border-t-newspaper-black opacity-10"></div>
      </div>
      <div className="fixed top-0 right-0 w-16 h-16 z-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-0 h-0 border-r-[64px] border-r-transparent border-t-[64px] border-t-newspaper-red opacity-10"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-16 h-16 z-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[64px] border-l-transparent border-b-[64px] border-b-newspaper-black opacity-10"></div>
      </div>
      <div className="fixed bottom-0 right-0 w-16 h-16 z-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[64px] border-r-transparent border-b-[64px] border-b-newspaper-red opacity-10"></div>
      </div>
    </>
  );
}