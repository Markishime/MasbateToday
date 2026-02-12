"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import Image from "next/image";

interface TouristSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  category: string;
  bestTime: string;
  duration: string;
  price: string;
  features: string[];
  isBestSpot: boolean;
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: string[];
}

interface BookingFormProps {
  spot: TouristSpot;
  onClose: () => void;
  emailTo: string;
}

export default function BookingForm({ spot, onClose, emailTo }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call API route to prepare email
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spot,
          formData,
          emailTo
        }),
      });

      const data: { success: boolean; mailtoLink?: string | null; error?: string } = await response.json();

      if (data.success) {
        // If backend returned a mailto link, open the user's email client.
        if (data.mailtoLink) {
          window.location.href = data.mailtoLink;
          // Wait a bit for email client to open
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            guests: "",
            message: "",
          });
        }, 3000);
      } else {
        throw new Error(data.error || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again or contact us directly at " + emailTo);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="newspaper-border bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b-4 border-newspaper-black p-6 flex items-center justify-between z-10">
            <div>
              <div className="section-header mb-2">BOOKING REQUEST</div>
              <h2 className="font-headline text-2xl text-newspaper-black uppercase">
                {spot.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-newspaper-black" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-headline text-2xl text-newspaper-black uppercase mb-2">
                Booking Request Sent!
              </h3>
              <p className="font-serif text-newspaper-darkGray">
                We've received your booking request. Our team will contact you shortly at {formData.email}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Spot Info */}
              <div className="p-6 border-r-2 border-newspaper-black">
                <div className="relative h-48 mb-4 border-4 overflow-hidden" style={{ borderColor: '#8b6f47' }}>
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-headline text-xl text-newspaper-black uppercase mb-3">
                  {spot.name}
                </h3>
                <div className="space-y-2 text-sm font-serif text-newspaper-darkGray mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{spot.location}</span>
                  </div>
                  <div>
                    <strong>Category:</strong> {spot.category}
                  </div>
                  <div>
                    <strong>Best Time to Visit:</strong> {spot.bestTime}
                  </div>
                  <div>
                    <strong>Duration:</strong> {spot.duration}
                  </div>
                  <div>
                    <strong>Price:</strong> {spot.price}
                  </div>
                </div>
                <div className="border-t-2 border-newspaper-black pt-4 space-y-4">
                  <div>
                    <div className="text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Highlights / Features:
                    </div>
                    <ul className="space-y-1 text-sm font-serif text-newspaper-darkGray">
                      {spot.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  {spot.inclusions && spot.inclusions.length > 0 && (
                    <div>
                      <div className="text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                        Package Inclusions:
                      </div>
                      <ul className="space-y-1 text-sm font-serif text-newspaper-darkGray">
                        {spot.inclusions.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {spot.exclusions && spot.exclusions.length > 0 && (
                    <div>
                      <div className="text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                        Package Exclusions:
                      </div>
                      <ul className="space-y-1 text-sm font-serif text-newspaper-darkGray">
                        {spot.exclusions.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {spot.itinerary && spot.itinerary.length > 0 && (
                    <div>
                      <div className="text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                        Sample Itinerary:
                      </div>
                      <ul className="space-y-1 text-sm font-serif text-newspaper-darkGray">
                        {spot.itinerary.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Booking Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                      placeholder="+63 XXX XXX XXXX"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                        Visit Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                        aria-label="Preferred visit date"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                        aria-label="Preferred visit time"
                      >
                        <option value="">Select time</option>
                        <option value="06:00 AM">06:00 AM</option>
                        <option value="07:00 AM">07:00 AM</option>
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      min="1"
                      max="50"
                      className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                      placeholder="Number of visitors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif font-bold text-newspaper-black uppercase mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-newspaper-black bg-white font-serif text-newspaper-black focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                      placeholder="Any special requests, budget, or questions..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-newspaper-black text-white px-6 py-3 font-serif font-bold uppercase text-sm tracking-widest border-2 border-newspaper-black hover:bg-white hover:text-newspaper-black transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border-2 border-newspaper-black bg-white text-newspaper-black font-serif font-bold uppercase text-sm tracking-widest hover:bg-newspaper-black hover:text-white transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}