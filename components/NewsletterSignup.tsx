"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!db) {
        console.warn("Firebase is not configured. Cannot subscribe to newsletter.");
        alert("Newsletter subscription is currently unavailable. Please try again later.");
        return;
      }
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: new Date(),
        active: true,
      });
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <div className="flex items-center justify-center space-x-2 text-white text-lg font-semibold bg-green-500 rounded-lg p-4">
          <Check className="h-5 w-5" />
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FCD116] shadow-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 sm:px-8 py-3 bg-[#FCD116] text-[#0038A8] font-bold rounded-lg hover:bg-[#FFD700] transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl min-h-[44px] touch-manipulation"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}

