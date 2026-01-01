"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Poll } from "@/types";
import Link from "next/link";
import { Plus, BarChart3 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PollsPage() {
  const { admin } = useAuth();
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    loadPolls();
  }, [admin, router]);

  const loadPolls = async () => {
    try {
      const q = query(collection(db, "polls"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const pollsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          expiresAt: data.expiresAt?.toDate(),
        } as Poll;
      });
      setPolls(pollsData);
    } catch (error) {
      console.error("Error loading polls:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading polls...</p>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Polls</h1>
        <Link
          href="/admin/polls/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Poll</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No polls found. Create your first poll!</p>
          </div>
        ) : (
          polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
            const isExpired = poll.expiresAt && new Date() > poll.expiresAt;

            return (
              <div
                key={poll.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="font-bold text-lg mb-2">{poll.question}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {poll.options.length} options • {totalVotes} votes
                </p>
                <div className="space-y-2 mb-4">
                  {poll.options.map((option) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                      <div key={option.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{option.text}</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Article: {poll.articleId}</span>
                  {isExpired ? (
                    <span className="text-red-600">Expired</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </div>
                <Link
                  href={`/article/${poll.articleId}`}
                  className="mt-4 block text-sm text-primary hover:underline"
                >
                  View Article →
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

