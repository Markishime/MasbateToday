"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Star, Clock, Calendar } from "lucide-react";

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
}

interface TouristSpotCardProps {
  spot: TouristSpot;
  onBookNow: () => void;
  index: number;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";

export default function TouristSpotCard({ spot, onBookNow, index }: TouristSpotCardProps) {
  const imageSrc = spot.image?.trim() || FALLBACK_IMAGE;
  const imageAlt = spot.name?.trim() || "Tourist spot in Masbate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="newspaper-clip bg-white overflow-hidden hover:border-newspaper-brown transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden border-b-4" style={{ borderColor: '#8b6f47' }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-all duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {spot.isBestSpot && (
          <div className="absolute top-2 right-2 px-3 py-1 font-serif font-bold text-xs uppercase tracking-wide border-2 border-white shadow-lg" style={{ backgroundColor: '#b22222', color: '#ffffff' }}>
            ⭐ BEST SPOT
          </div>
        )}
        <div className="absolute bottom-2 left-2 px-2 py-1 font-serif font-bold text-xs uppercase shadow-lg" style={{ backgroundColor: '#8b6f47', color: '#ffffff' }}>
          {spot.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-headline font-bold text-newspaper-black text-lg uppercase leading-tight flex-1">
            {spot.name}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-serif font-bold text-newspaper-black text-sm">{spot.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-newspaper-darkGray text-xs font-serif mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{spot.location}</span>
        </div>

        <p className="text-newspaper-darkGray text-sm font-serif leading-relaxed mb-4 line-clamp-3">
          {spot.description}
        </p>

        <div className="space-y-2 mb-4 text-xs font-serif text-newspaper-darkGray">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-2" />
            <span><strong>Duration:</strong> {spot.duration}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-2" />
            <span><strong>Best Time:</strong> {spot.bestTime}</span>
          </div>
          <div>
            <strong>Price:</strong> {spot.price}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs font-serif font-bold text-newspaper-black uppercase mb-2">Features:</div>
          <div className="flex flex-wrap gap-2">
            {(spot.features ?? []).slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-newspaper-black text-white text-xs font-serif uppercase tracking-wide"
              >
                {feature}
              </span>
            ))}
            {(spot.features ?? []).length > 3 && (
              <span className="px-2 py-1 bg-newspaper-gray text-white text-xs font-serif">
                +{(spot.features ?? []).length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onBookNow}
          className="w-full px-6 py-3 font-serif font-bold uppercase text-sm tracking-widest border-2 transition-all duration-300 shadow-md hover:shadow-lg"
          style={{ 
            backgroundColor: '#8b6f47', 
            color: '#ffffff',
            borderColor: '#5c4a37'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5c4a37';
            e.currentTarget.style.color = '#f5f0e8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#8b6f47';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}