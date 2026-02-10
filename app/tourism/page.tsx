"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionAnimation from "@/components/SectionAnimation";
import TouristSpotCard from "@/components/TouristSpotCard";
import BookingForm from "@/components/BookingForm";
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

const DEFAULT_SPOTS: TouristSpot[] = [
    // Best Spots - Masbate City
    {
      id: "1",
      name: "Buntod Sandbar",
      location: "Masbate City, Masbate",
      description: "A stunning white sandbar surrounded by crystal-clear turquoise waters. Perfect for swimming, snorkeling, and beach activities. One of Masbate's most iconic destinations.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", // Aerial sandbar beach
      rating: 4.9,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free (boat rental required)",
      features: ["Swimming", "Snorkeling", "Sandbar", "Photography", "Island Hopping"],
      inclusions: ["Boat transfer from Masbate City port", "Entrance and environmental fees", "Life vests and basic snorkel gear", "Local guide assistance"],
      exclusions: ["Meals and drinks", "Towel and personal beach gear", "Underwater camera rental"],
      itinerary: [
        "07:00 AM – Meet at Masbate City port and safety briefing",
        "07:30 AM – Boat ride to Buntod Sandbar",
        "08:00 AM – Free time for swimming, snorkeling, and photos",
        "11:00 AM – Optional mangrove side trip (if weather permits)",
        "12:30 PM – Return to Masbate City port",
      ],
      isBestSpot: true
    },
    {
      id: "2",
      name: "Catandayagan Falls",
      location: "Aroroy, Masbate",
      description: "Majestic multi-tiered waterfall cascading through lush tropical forest. A refreshing natural wonder perfect for swimming and nature photography.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", // Tropical waterfall
      rating: 4.8,
      category: "Nature",
      bestTime: "Year-round, best during rainy season",
      duration: "2-3 hours",
      price: "Free",
      features: ["Waterfall", "Swimming", "Hiking", "Nature Viewing", "Photography"],
      inclusions: ["Local guide to Catandayagan trail", "Use of life vests", "Photo and viewing spots assistance"],
      exclusions: ["Motorbike or tricycle transport to trailhead", "Snacks and drinking water", "Trek insurance"],
      itinerary: [
        "08:00 AM – Meet at designated jump-off point",
        "08:30 AM – Start short trek to waterfall view deck",
        "09:00 AM – Swimming and photo session at base of falls",
        "11:00 AM – Return hike to jump-off point",
      ],
      isBestSpot: true
    },
    {
      id: "3",
      name: "Masbate Cathedral",
      location: "Masbate City, Masbate",
      description: "Historic Spanish-era cathedral, also known as the Cathedral of Our Lady of the Most Holy Rosary. A significant religious and architectural landmark.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80", // Historic church facade
      rating: 4.6,
      category: "Historical",
      bestTime: "Year-round",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Religious Site", "Architecture", "Photography"],
      inclusions: ["Short guided history tour of the cathedral exterior and interior", "Quiet time for prayer and reflection"],
      exclusions: ["Transportation to cathedral", "Candles and souvenir purchases"],
      itinerary: [
        "09:00 AM – Arrival and brief orientation at cathedral plaza",
        "09:15 AM – Guided walk through main nave and side chapels",
        "09:45 AM – Free time for photos and personal devotion",
      ],
      isBestSpot: true
    },
    {
      id: "4",
      name: "Ticao Island",
      location: "Monreal, Masbate",
      description: "Beautiful island known for its pristine beaches, diving spots, and rich marine biodiversity. Perfect for island hopping and water activities.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", // Tropical island beach
      rating: 4.7,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Full day",
      price: "Free (boat rental required)",
      features: ["Island Hopping", "Diving", "Snorkeling", "Beach", "Marine Life"],
      inclusions: ["Shared boat for island hopping (standard route)", "Use of life vests", "Local boatman-guide"],
      exclusions: ["Snorkeling and diving equipment rental", "Lunch and refreshments", "Environmental and barangay fees (where applicable)"],
      itinerary: [
        "07:00 AM – Boat departure from Monreal port",
        "08:00 AM – First beach stop for swimming and snorkeling",
        "11:00 AM – Second island stop and shoreline walk",
        "02:00 PM – Last viewpoint stop and photo session",
        "04:00 PM – Arrival back at Monreal port",
      ],
      isBestSpot: true
    },
    {
      id: "5",
      name: "Mobo Beach",
      location: "Mobo, Masbate",
      description: "Pristine white sand beach with calm waters, ideal for families. Features picnic areas and stunning sunset views.",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80", // Family beach sunset
      rating: 4.6,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Picnic Areas", "Sunset Viewing", "Family-Friendly"],
      inclusions: ["Reserved picnic hut or table (subject to availability)", "Beach access and basic safety briefing"],
      exclusions: ["Food and drinks", "Beach games and equipment", "Transport from Mobo town proper"],
      itinerary: [
        "09:00 AM – Arrival and beach orientation",
        "09:30 AM – Free time for swimming and beach activities",
        "12:00 PM – Picnic lunch (bring your own food)",
        "04:30 PM – Sunset viewing and photo session",
      ],
      isBestSpot: true
    },
    {
      id: "6",
      name: "Cawayan Beach",
      location: "Cawayan, Masbate",
      description: "Pristine white sand beach with crystal clear waters, perfect for swimming and sunbathing. A popular destination for both locals and tourists seeking tranquility.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", // Calm turquoise cove
      rating: 4.8,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Snorkeling", "Picnic Areas", "Parking"],
      inclusions: ["Beach entrance and use of common areas", "On-site assistance from tourism staff (selected days)"],
      exclusions: ["Cottage or cabana rental", "Meals and drinks", "Snorkel and beach gear"],
      itinerary: [
        "08:00 AM – Arrival and site briefing",
        "08:30 AM – Free time for swimming and snorkeling",
        "12:00 PM – Lunch break (own account)",
        "03:00 PM – Relaxation and photo walk along shoreline",
      ],
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
      inclusions: ["Access to lighthouse grounds (where permitted)", "Local guide storytelling about lighthouse history"],
      exclusions: ["Transport to lighthouse", "Snacks and drinks"],
      itinerary: [
        "04:30 PM – Arrival at lighthouse viewpoint",
        "04:45 PM – Short history talk and photo taking",
        "05:30 PM – Sunset viewing along the coast",
      ],
      isBestSpot: false
    },
    {
      id: "8",
      name: "Balud Beach",
      location: "Balud, Masbate",
      description: "Serene beach destination with fine white sand and clear blue waters. Less crowded, perfect for relaxation and beach activities.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80", // Quiet palm-lined shore
      rating: 4.5,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Beach Activities", "Relaxation", "Photography"],
      inclusions: ["Use of common beach area", "Suggested walking route along shoreline"],
      exclusions: ["Private cottage rental", "Meals and beverages", "Transport from Balud town proper"],
      itinerary: [
        "09:00 AM – Arrival at Balud Beach",
        "09:15 AM – Morning swim and relaxation",
        "01:00 PM – Free time for beach games or walking",
      ],
      isBestSpot: false
    },
    {
      id: "9",
      name: "Masbate Provincial Capitol",
      location: "Masbate City, Masbate",
      description: "Historic government building showcasing Spanish colonial architecture. A significant landmark representing Masbate's governance and history.",
      image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80", // Government building at dusk
      rating: 4.4,
      category: "Historical",
      bestTime: "Year-round, weekdays",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Architecture", "Government Building", "Photography"],
      inclusions: ["Guided walk around capitol façade (if guide available)", "Short briefing on Masbate governance history"],
      exclusions: ["Transport to capitol", "Access to restricted government offices"],
      itinerary: [
        "10:00 AM – Meet at capitol front steps",
        "10:15 AM – Guided exterior tour and photo session",
        "10:45 AM – Free time around capitol grounds",
      ],
      isBestSpot: false
    },
    {
      id: "10",
      name: "Aroroy Gold Mines",
      location: "Aroroy, Masbate",
      description: "Historic gold mining site offering educational tours about Masbate's mining industry. Learn about the province's rich mineral resources.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80", // Mining / industrial landscape
      rating: 4.3,
      category: "Cultural",
      bestTime: "Year-round, weekdays",
      duration: "1-2 hours",
      price: "Free (tours may require booking)",
      features: ["Educational Tour", "Mining History", "Cultural Experience"],
      inclusions: ["Guided viewing of designated mining areas (where allowed)", "Basic safety orientation"],
      exclusions: ["Transport to mining site", "Protective gear rental (if required)"],
      itinerary: [
        "08:00 AM – Arrival and safety briefing",
        "08:30 AM – Guided walk through viewing areas",
        "10:00 AM – Q&A with local resource person (subject to availability)",
      ],
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
      inclusions: ["Suggested route through fresh produce and dry goods sections", "Tips on local specialties to try"],
      exclusions: ["Food and any purchases", "Transport to and from market"],
      itinerary: [
        "06:00 AM – Arrival at market entrance",
        "06:15 AM – Walk through fresh fish and produce areas",
        "07:00 AM – Street food and snack stop (own account)",
      ],
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
      inclusions: ["Guided walk through fishing community (subject to arrangement)", "Viewing of traditional fishing boats and gear"],
      exclusions: ["Boat ride with fishermen", "Seafood meals and purchases"],
      itinerary: [
        "05:00 AM – Optional early-morning visit to watch boats depart",
        "08:00 AM – Daytime village walk and interaction with locals",
        "10:00 AM – Fresh seafood selection at landing area",
      ],
      isBestSpot: false
    },
    {
      id: "13",
      name: "Cawayan Church",
      location: "Cawayan Town Center, Masbate",
      description: "Historic church dating back to Spanish colonial period. A significant cultural and religious landmark in Masbate.",
      image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=1200&q=80", // Old stone church
      rating: 4.5,
      category: "Historical",
      bestTime: "Year-round",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Historical Site", "Religious Site", "Architecture", "Photography"],
      inclusions: ["Orientation on church history by local guide (if available)", "Access to main nave and selected side chapels"],
      exclusions: ["Candles, offerings, and souvenirs", "Transport to church"],
      itinerary: [
        "09:00 AM – Arrival at church plaza",
        "09:10 AM – Short talk on church history",
        "09:30 AM – Personal devotion and photo opportunities",
      ],
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
      inclusions: ["Guided boardwalk or trail walk (where available)", "Basic orientation on mangrove conservation"],
      exclusions: ["Transport to mangrove area", "Boat or kayak rental"],
      itinerary: [
        "07:00 AM – Arrival and orientation at mangrove entrance",
        "07:15 AM – Guided walk and bird-watching",
        "09:00 AM – Quiet time and nature photography",
      ],
      isBestSpot: false
    },
    {
      id: "15",
      name: "Cawayan Sunset Point",
      location: "Cawayan Coastal Road, Masbate",
      description: "Popular spot for watching spectacular sunsets over the sea. Features viewing deck and picnic areas.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80", // Dramatic seaside sunset
      rating: 4.7,
      category: "Nature",
      bestTime: "Sunset hours (5 PM - 7 PM)",
      duration: "1-2 hours",
      price: "Free",
      features: ["Sunset Viewing", "Photography", "Picnic", "Scenic Views"],
      inclusions: ["Suggested viewing spots along coastal road", "Basic safety reminders along cliffside areas"],
      exclusions: ["Transport to sunset point", "Food and drinks"],
      itinerary: [
        "05:00 PM – Arrival and setup at chosen viewing area",
        "05:30 PM – Golden hour photo session",
        "06:00 PM – Sunset viewing and picnic (own food)",
      ],
      isBestSpot: false
    },
    {
      id: "16",
      name: "Milagros Beach",
      location: "Milagros, Masbate",
      description: "Beautiful beach destination with golden sand and clear waters. Ideal for swimming, beach games, and family outings.",
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&q=80", // Wide sandy beach
      rating: 4.5,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Half day to full day",
      price: "Free",
      features: ["Swimming", "Beach Games", "Family-Friendly", "Picnic"],
      inclusions: ["Use of public beach section", "Suggested area for family picnics and games"],
      exclusions: ["Cottage rental", "Food and drinks", "Transport to Milagros Beach"],
      itinerary: [
        "09:00 AM – Arrival and orientation",
        "09:30 AM – Free time for swimming and beach games",
        "01:00 PM – Picnic lunch (bring your own food)",
      ],
      isBestSpot: false
    },
    {
      id: "17",
      name: "Pio V. Corpuz Plaza",
      location: "Masbate City, Masbate",
      description: "Central plaza and park in Masbate City, perfect for leisurely walks, people-watching, and experiencing local community life.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80", // Town plaza / park
      rating: 4.3,
      category: "Cultural",
      bestTime: "Early morning or late afternoon",
      duration: "30 minutes - 1 hour",
      price: "Free",
      features: ["Park", "Community Life", "Walking", "Relaxation"],
      inclusions: ["Recommended walking loop around plaza", "Viewing of local monuments and markers"],
      exclusions: ["Snacks and drinks", "Transport to plaza"],
      itinerary: [
        "04:00 PM – Arrival and casual walk around plaza",
        "04:30 PM – People-watching from benches",
        "05:30 PM – Optional visit to nearby eateries (own account)",
      ],
      isBestSpot: false
    },
    {
      id: "18",
      name: "San Jacinto Island",
      location: "San Jacinto, Masbate",
      description: "Picturesque island with pristine beaches and rich marine life. Perfect for island hopping, snorkeling, and beach activities.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", // Remote island lagoon
      rating: 4.6,
      category: "Beach",
      bestTime: "Year-round, best from March to May",
      duration: "Full day",
      price: "Free (boat rental required)",
      features: ["Island Hopping", "Snorkeling", "Beach", "Marine Life"],
      inclusions: ["Boat for island crossing (standard route)", "Use of life vests"],
      exclusions: ["Snorkeling gear and fins", "Meals and drinks", "Environmental fees on specific stops"],
      itinerary: [
        "07:00 AM – Boat departure from San Jacinto",
        "08:00 AM – First beach stop for swimming and snorkeling",
        "11:30 AM – Picnic lunch on the island (own food)",
        "03:30 PM – Return boat ride to San Jacinto",
      ],
      isBestSpot: false
    }
  ];

export default function TourismPage() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  // Always use the full static list so all destinations are visible
  const touristSpots: TouristSpot[] = DEFAULT_SPOTS;

  const bestSpots = touristSpots.filter((spot) => spot.isBestSpot);
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
                <p className="font-serif italic text-lg max-w-2xl mx-auto mb-6" style={{ color: '#6b6b6b' }}>
                  Explore the best tourist destinations and hidden gems across Masbate province. From pristine beaches to historic landmarks, discover what makes Masbate special. Book your visit today!
                </p>
                <div className="relative w-full h-40 sm:h-56 md:h-64 max-w-3xl mx-auto overflow-hidden rounded-lg border-2" style={{ borderColor: '#8b6f47' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
                    alt="AI-style illustration of Masbate tourism destinations and coastline"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
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