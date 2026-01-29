"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Calendar, Users, Camera, Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import TouristSpotCard from "@/components/TouristSpotCard";
import BookingForm from "@/components/BookingForm";

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

export default function TourismPage() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const touristSpots: TouristSpot[] = [
    // Best Spots - Masbate City
    {
      id: "1",
      name: "Buntod Sandbar",
      location: "Masbate City, Masbate",
      description: "A stunning white sandbar surrounded by crystal-clear turquoise waters. Perfect for swimming, snorkeling, and beach activities. One of Masbate's most iconic destinations.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.9,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free (boat rental required)",
      features: ["Swimming", "Snorkeling", "Sandbar", "Photography", "Island Hopping"],
      isBestSpot: true
    },
    {
      id: "2",
      name: "Catandayagan Falls",
      location: "Aroroy, Masbate",
      description: "Majestic multi-tiered waterfall cascading through lush tropical forest. A refreshing natural wonder perfect for swimming and nature photography.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.8,
      category: "Nature",
      bestTime: "Year-round, best during rainy season",
      duration: "2-3 hours",
      price: "Free",
      features: ["Waterfall", "Swimming", "Hiking", "Nature Viewing", "Photography"],
      isBestSpot: true
    },
    {
      id: "3",
      name: "Masbate Cathedral",
      location: "Masbate City, Masbate",
      description: "Historic Spanish-era cathedral, also known as the Cathedral of Our Lady of the Most Holy Rosary. A significant religious and architectural landmark.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      rating: 4.6,
      category: "Historical",
      bestTime: "Year-round",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Religious Site", "Architecture", "Photography"],
      isBestSpot: true
    },
    {
      id: "4",
      name: "Ticao Island",
      location: "Monreal, Masbate",
      description: "Beautiful island known for its pristine beaches, diving spots, and rich marine biodiversity. Perfect for island hopping and water activities.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.7,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Full day",
      price: "Free (boat rental required)",
      features: ["Island Hopping", "Diving", "Snorkeling", "Beach", "Marine Life"],
      isBestSpot: true
    },
    {
      id: "5",
      name: "Mobo Beach",
      location: "Mobo, Masbate",
      description: "Pristine white sand beach with calm waters, ideal for families. Features picnic areas and stunning sunset views.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.6,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Picnic Areas", "Sunset Viewing", "Family-Friendly"],
      isBestSpot: true
    },
    {
      id: "6",
      name: "Cawayan Beach",
      location: "Cawayan, Masbate",
      description: "Pristine white sand beach with crystal clear waters, perfect for swimming and sunbathing. A popular destination for both locals and tourists seeking tranquility.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.8,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Snorkeling", "Picnic Areas", "Parking"],
      isBestSpot: true
    },
    // Additional Spots
    {
      id: "7",
      name: "Cawayan Lighthouse",
      location: "Cawayan Port Area, Masbate",
      description: "Historic lighthouse offering panoramic views of the surrounding coastline. A perfect spot for photography and watching sunsets.",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
      rating: 4.6,
      category: "Historical",
      bestTime: "Year-round, sunset hours",
      duration: "1-2 hours",
      price: "Free",
      features: ["Photography", "Historical Site", "Scenic Views", "Sunset Viewing"],
      isBestSpot: false
    },
    {
      id: "8",
      name: "Balud Beach",
      location: "Balud, Masbate",
      description: "Serene beach destination with fine white sand and clear blue waters. Less crowded, perfect for relaxation and beach activities.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.5,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Beach Activities", "Relaxation", "Photography"],
      isBestSpot: false
    },
    {
      id: "9",
      name: "Masbate Provincial Capitol",
      location: "Masbate City, Masbate",
      description: "Historic government building showcasing Spanish colonial architecture. A significant landmark representing Masbate's governance and history.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      rating: 4.4,
      category: "Historical",
      bestTime: "Year-round, weekdays",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Architecture", "Government Building", "Photography"],
      isBestSpot: false
    },
    {
      id: "10",
      name: "Aroroy Gold Mines",
      location: "Aroroy, Masbate",
      description: "Historic gold mining site offering educational tours about Masbate's mining industry. Learn about the province's rich mineral resources.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.3,
      category: "Cultural",
      bestTime: "Year-round, weekdays",
      duration: "1-2 hours",
      price: "Free (tours may require booking)",
      features: ["Educational Tour", "Mining History", "Cultural Experience"],
      isBestSpot: false
    },
    {
      id: "11",
      name: "Cawayan Public Market",
      location: "Cawayan Town Center, Masbate",
      description: "Vibrant local market showcasing Masbate's culture and local products. Experience authentic Filipino market atmosphere.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      rating: 4.3,
      category: "Cultural",
      bestTime: "Early morning (6 AM - 10 AM)",
      duration: "1-2 hours",
      price: "Free",
      features: ["Local Products", "Cultural Experience", "Food", "Shopping"],
      isBestSpot: false
    },
    {
      id: "12",
      name: "Cawayan Fishing Village",
      location: "Cawayan Coastal Area, Masbate",
      description: "Traditional fishing village where visitors can observe local fishing practices and enjoy fresh seafood. Experience authentic coastal life.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      rating: 4.4,
      category: "Cultural",
      bestTime: "Early morning or late afternoon",
      duration: "2-3 hours",
      price: "Free",
      features: ["Cultural Tour", "Fresh Seafood", "Photography", "Local Interaction"],
      isBestSpot: false
    },
    {
      id: "13",
      name: "Cawayan Church",
      location: "Cawayan Town Center, Masbate",
      description: "Historic church dating back to Spanish colonial period. A significant cultural and religious landmark in Masbate.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      rating: 4.5,
      category: "Historical",
      bestTime: "Year-round",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Religious Site", "Architecture", "Photography"],
      isBestSpot: false
    },
    {
      id: "14",
      name: "Cawayan Mangrove Forest",
      location: "Cawayan Coastal Area, Masbate",
      description: "Protected mangrove forest offering eco-tourism opportunities. Perfect for nature lovers and environmental education.",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
      rating: 4.6,
      category: "Nature",
      bestTime: "Early morning or late afternoon",
      duration: "2-3 hours",
      price: "Free",
      features: ["Eco-Tourism", "Nature Walk", "Bird Watching", "Photography"],
      isBestSpot: false
    },
    {
      id: "15",
      name: "Cawayan Sunset Point",
      location: "Cawayan Coastal Road, Masbate",
      description: "Popular spot for watching spectacular sunsets over the sea. Features viewing deck and picnic areas.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.7,
      category: "Nature",
      bestTime: "Sunset hours (5 PM - 7 PM)",
      duration: "1-2 hours",
      price: "Free",
      features: ["Sunset Viewing", "Photography", "Picnic", "Scenic Views"],
      isBestSpot: false
    },
    {
      id: "16",
      name: "Milagros Beach",
      location: "Milagros, Masbate",
      description: "Beautiful beach destination with golden sand and clear waters. Ideal for swimming, beach games, and family outings.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.5,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Beach Games", "Family-Friendly", "Picnic"],
      isBestSpot: false
    },
    {
      id: "17",
      name: "Pio V. Corpuz Plaza",
      location: "Masbate City, Masbate",
      description: "Central plaza and park in Masbate City, perfect for leisurely walks, people-watching, and experiencing local community life.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      rating: 4.3,
      category: "Cultural",
      bestTime: "Early morning or late afternoon",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Park", "Community Life", "Walking", "Relaxation"],
      isBestSpot: false
    },
    {
      id: "18",
      name: "San Jacinto Island",
      location: "San Jacinto, Masbate",
      description: "Picturesque island with pristine beaches and rich marine life. Perfect for island hopping, snorkeling, and beach activities.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      rating: 4.6,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Full day",
      price: "Free (boat rental required)",
      features: ["Island Hopping", "Snorkeling", "Beach", "Marine Life"],
      isBestSpot: false
    }
  ];

  const bestSpots = touristSpots.filter(spot => spot.isBestSpot);
  const allSpots = touristSpots;

  const handleBookNow = (spot: TouristSpot) => {
    setSelectedSpot(spot);
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedSpot(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
        {/* Page Header */}
        <div className="py-8 border-b-4" style={{ backgroundColor: '#ffffff', borderColor: '#8b6f47' }}>
          <div className="container mx-auto px-4">
            <SectionAnimation delay={0}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="section-header mb-4 inline-block" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>
                  TOURISM
                </div>
                <h1 className="text-4xl md:text-5xl font-headline uppercase tracking-wide mb-4" style={{ color: '#5c4a37' }}>
                  Masbate, Philippines
                </h1>
                <div className="text-sm font-serif uppercase tracking-widest mb-2" style={{ color: '#8b6f47' }}>
                  Discover the Beauty of Masbate Province
                </div>
                <p className="font-serif italic text-lg max-w-2xl mx-auto" style={{ color: '#6b6b6b' }}>
                  Explore the best tourist destinations and hidden gems across Masbate province. From pristine beaches to historic landmarks, discover what makes Masbate special. Book your visit today!
                </p>
              </motion.div>
            </SectionAnimation>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Best Tourist Spots Section */}
          <SectionAnimation delay={0.1}>
            <div className="mb-12 sm:mb-16">
              <div className="newspaper-border paper-texture bg-white p-6 sm:p-8">
                <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>BEST TOURIST SPOTS</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bestSpots.map((spot, index) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="transform hover:scale-105 transition-transform duration-300"
                    >
                      <TouristSpotCard
                        spot={spot}
                        onBookNow={() => handleBookNow(spot)}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionAnimation>

          {/* All Tourist Spots Section */}
          <SectionAnimation delay={0.2}>
            <div className="mb-12 sm:mb-16">
              <div className="newspaper-border paper-texture bg-white p-6 sm:p-8">
                <div className="section-header mb-6" style={{ backgroundColor: '#8b6f47', color: '#f5f0e8', borderLeftColor: '#5c4a37' }}>ALL TOURIST SPOTS</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allSpots.map((spot, index) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="transform hover:scale-105 transition-transform duration-300"
                    >
                      <TouristSpotCard
                        spot={spot}
                        onBookNow={() => handleBookNow(spot)}
                        index={index + bestSpots.length}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionAnimation>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && selectedSpot && (
          <BookingForm
            spot={selectedSpot}
            onClose={handleCloseBooking}
            emailTo="marklloydcuizon@gmail.com"
          />
        )}
      </div>
    </PageTransition>
  );
}