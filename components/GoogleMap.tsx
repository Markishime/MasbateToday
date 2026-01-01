"use client";

import { useEffect, useRef } from "react";

interface GoogleMapProps {
  lat: number;
  lng: number;
  title?: string;
  zoom?: number;
  className?: string;
}

export default function GoogleMap({
  lat,
  lng,
  title = "Location",
  zoom = 15,
  className = "w-full h-96 rounded-lg",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
        });

        new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title,
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [lat, lng, title, zoom]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
        <p className="text-gray-600 dark:text-gray-400">
          Google Maps API key not configured
        </p>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
}

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

