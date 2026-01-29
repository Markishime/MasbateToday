"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: new Date(),
        read: false,
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
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
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Have a news tip, story idea, or feedback? We'd love to hear from you!
            </p>
          </motion.div>
        </SectionAnimation>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Cawayan, Masbate, Philippines
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a
                    href="tel:0963688771"
                    className="text-primary hover:underline"
                  >
                    0963688771
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:admin@masbatetoday.com"
                    className="text-primary hover:underline"
                  >
                    admin@masbatetoday.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Admin</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fel C. Monares
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          {submitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg p-4 mb-4">
                <p className="font-semibold">Thank you for your message!</p>
                <p className="text-sm mt-2">We'll get back to you soon.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  {...register("subject", { required: true })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">Subject is required</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  {...register("message", { required: true })}
                  rows={5}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">Message is required</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 sm:py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </PageTransition>
  );
}

