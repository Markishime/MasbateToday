"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NewsletterSubscriber } from "@/types";
import { Mail, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NewsletterPage() {
  const { admin } = useAuth();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    loadSubscribers();
  }, [admin, router]);

  const loadSubscribers = async () => {
    try {
      if (!db) {
        console.warn("Firebase is not configured. Newsletter data unavailable.");
        return;
      }
      const q = query(collection(db, "newsletter"), orderBy("subscribedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const subscribersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          subscribedAt: data.subscribedAt?.toDate() || new Date(),
        } as NewsletterSubscriber;
      });
      setSubscribers(subscribersData);
    } catch (error) {
      console.error("Error loading subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Email", "Subscribed At", "Active"];
    const rows = subscribers.map((sub) => [
      sub.email,
      formatDate(sub.subscribedAt),
      sub.active ? "Yes" : "No",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString()}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading subscribers...</p>
      </div>
    );
  }

  if (!admin) return null;

  const activeSubscribers = subscribers.filter((s) => s.active).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {subscribers.length} total subscribers ({activeSubscribers} active)
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Subscribed At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p>No subscribers yet.</p>
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">{subscriber.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(subscriber.subscribedAt)}
                  </td>
                  <td className="px-4 py-3">
                    {subscriber.active ? (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-xs">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

