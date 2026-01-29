"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const pageTurnVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [showPageTurn, setShowPageTurn] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Only trigger page turn if pathname actually changed (navigation occurred)
    if (pathname !== prevPathname && prevPathname !== pathname) {
      setShowPageTurn(true);
      const timer = setTimeout(() => {
        setShowPageTurn(false);
        setPrevPathname(pathname);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPageTurn && (
          <motion.div
            key="page-turn"
            className="fixed inset-0 z-[9999] pointer-events-none"
            variants={pageTurnVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Left Page Fold */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/2"
              initial={{ rotateY: 0, transformOrigin: "right center", x: 0 }}
              animate={{ 
                rotateY: -180,
                x: "-100%",
              }}
              exit={{ rotateY: 0, x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "inset -10px 0 20px rgba(0,0,0,0.2)",
                backgroundColor: '#f5f0e8',
              }}
            />
            {/* Right Page Reveal */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/2"
              initial={{ rotateY: 180, transformOrigin: "left center", x: "100%" }}
              animate={{ 
                rotateY: 0,
                x: 0,
              }}
              exit={{ rotateY: 180, x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "inset 10px 0 20px rgba(0,0,0,0.2)",
                backgroundColor: '#f5f0e8',
              }}
            />
            {/* Shadow overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
}

