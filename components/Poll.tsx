"use client";

import { useState, useEffect } from "react";
import { Poll as PollType } from "@/types";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BarChart3, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PollProps {
  pollId: string;
  articleId: string;
}

export default function Poll({ pollId, articleId }: PollProps) {
  const [poll, setPoll] = useState<PollType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    loadPoll();
    checkVoted();
  }, [pollId]);

  const loadPoll = async () => {
    try {
      if (!db) {
        console.warn("Firebase is not configured. Cannot load poll.");
        return;
      }
      const pollDoc = await getDoc(doc(db, "polls", pollId));
      if (pollDoc.exists()) {
        const data = pollDoc.data();
        setPoll({
          id: pollDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate(),
        } as PollType);
        
        const total = data.options.reduce((sum: number, opt: any) => sum + (opt.votes || 0), 0);
        setTotalVotes(total);
      }
    } catch (error) {
      console.error("Error loading poll:", error);
    }
  };

  const checkVoted = () => {
    const voted = localStorage.getItem(`poll_${pollId}`);
    if (voted) {
      setHasVoted(true);
      setSelectedOption(voted);
    }
  };

  const handleVote = async (optionId: string) => {
    if (hasVoted || !poll) return;

    try {
      const option = poll.options.find((opt) => opt.id === optionId);
      if (!option) return;

      if (!db) {
        console.warn("Firebase is not configured. Cannot vote.");
        alert("Voting is currently unavailable. Please try again later.");
        return;
      }

      await updateDoc(doc(db, "polls", pollId), {
        [`options.${poll.options.findIndex((o) => o.id === optionId)}.votes`]: increment(1),
      });

      localStorage.setItem(`poll_${pollId}`, optionId);
      setHasVoted(true);
      setSelectedOption(optionId);
      setTotalVotes(totalVotes + 1);
      
      // Update local state
      const updatedOptions = poll.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
      setPoll({ ...poll, options: updatedOptions });
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to submit vote. Please try again.");
    }
  };

  if (!poll) return null;

  const isExpired = poll.expiresAt && new Date() > poll.expiresAt;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md my-6 sm:my-8">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <h3 className="text-lg sm:text-xl font-bold">Poll</h3>
      </div>

      <p className="text-base sm:text-lg mb-4 sm:mb-6">{poll.question}</p>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedOption === option.id;

          return (
            <div key={option.id} className="relative">
              {hasVoted || isExpired ? (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{option.text}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.votes} votes ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full ${
                        isSelected
                          ? "bg-primary"
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}
                    />
                  </div>
                  {isSelected && (
                    <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleVote(option.id)}
                  className="w-full text-left p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors min-h-[44px] touch-manipulation text-sm sm:text-base"
                >
                  {option.text}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!hasVoted && !isExpired && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Click an option to vote
        </p>
      )}

      {isExpired && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          This poll has ended
        </p>
      )}
    </div>
  );
}

