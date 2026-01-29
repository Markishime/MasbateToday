"use client";

import { motion } from "framer-motion";
import { Vote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OpinionPolls() {
  const [activeTab, setActiveTab] = useState<"polls" | "pulse">("polls");

  // Fixed percentages to avoid hydration errors - using deterministic values based on poll and option indices
  const polls = [
    { 
      id: 1, 
      question: "What's the most important issue in Masbate?", 
      votes: 1250, 
      options: [
        { name: "Infrastructure", percentage: 35 },
        { name: "Education", percentage: 28 },
        { name: "Healthcare", percentage: 22 },
        { name: "Economy", percentage: 15 }
      ] 
    },
    { 
      id: 2, 
      question: "How do you rate local news coverage?", 
      votes: 890, 
      options: [
        { name: "Excellent", percentage: 45 },
        { name: "Good", percentage: 30 },
        { name: "Fair", percentage: 20 },
        { name: "Poor", percentage: 5 }
      ] 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center space-x-4 border-b-2 border-newspaper-lightGray">
        <button
          onClick={() => setActiveTab("polls")}
          className={`px-4 py-2 font-serif font-bold uppercase text-sm tracking-wide transition-colors ${
            activeTab === "polls"
              ? "bg-newspaper-black text-white"
              : "text-newspaper-darkGray hover:text-newspaper-black"
          }`}
        >
          Opinion Polls
        </button>
        <button
          onClick={() => setActiveTab("pulse")}
          className={`px-4 py-2 font-serif font-bold uppercase text-sm tracking-wide transition-colors ${
            activeTab === "pulse"
              ? "bg-newspaper-black text-white"
              : "text-newspaper-darkGray hover:text-newspaper-black"
          }`}
        >
          Reader Pulse
        </button>
        <div className="flex-1" />
        <Link href="/admin/polls" className="text-newspaper-darkGray hover:text-newspaper-black text-sm font-serif font-bold uppercase tracking-wide transition-colors">
          View All →
        </Link>
      </div>

      {/* Polls Content */}
      {activeTab === "polls" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll, index) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="newspaper-clip bg-white p-6"
            >
              <h3 className="font-headline font-bold text-newspaper-black text-base mb-4 uppercase leading-tight line-clamp-2">
                {poll.question}
              </h3>
              <div className="space-y-3">
                {poll.options.map((option, optIndex) => (
                  <div key={optIndex} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-serif text-newspaper-darkGray">{option.name}</span>
                      <span className="font-serif text-newspaper-gray font-bold">{option.percentage}%</span>
                    </div>
                    <div className="w-full bg-newspaper-lightGray rounded-none h-3 border border-newspaper-black">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${option.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 + optIndex * 0.1 }}
                        className="bg-newspaper-black h-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 mt-4 text-sm text-newspaper-darkGray font-serif border-t border-newspaper-lightGray pt-3">
                <Vote className="h-4 w-4" />
                <span>{poll.votes} readers voted</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reader Pulse Content */}
      {activeTab === "pulse" && (
        <div className="text-center py-12">
          <p className="text-newspaper-darkGray font-serif italic">
            Reader pulse insights coming soon
          </p>
        </div>
      )}
    </div>
  );
}

