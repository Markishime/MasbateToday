"use client";

import AdSense from "./AdSense";

interface AdBannerProps {
  className?: string;
}

export default function AdBanner({ className = "" }: AdBannerProps) {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <div className={`my-8 ${className}`}>
      <AdSense
        slot="1234567890"
        style={{ display: "block", height: "250px" }}
        format="horizontal"
      />
    </div>
  );
}

