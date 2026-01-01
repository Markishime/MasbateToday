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
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 sm:p-6 shadow-md text-white">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
        <h3 className="font-semibold text-base sm:text-lg">Newsletter</h3>
      </div>
      <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
        Get daily/weekly news digests delivered to your inbox.
      </p>
      {submitted ? (
        <div className="flex items-center space-x-2 text-sm">
          <Check className="h-4 w-4" />
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-primary font-semibold py-2.5 sm:py-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 text-sm sm:text-base min-h-[44px] touch-manipulation"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}

