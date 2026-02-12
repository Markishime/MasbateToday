import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { QueryClientProvider } from "@/components/QueryClientProvider";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Masbate Today News - Local News, Events & Updates",
  description: "Stay informed with the latest news, events, and updates from Masbate, Philippines. Local news coverage and national Philippine news.",
  keywords: "Masbate, Philippines, news, local news, events, updates, Masbate Today",
  authors: [{ name: "Fel C. Monares" }],
  openGraph: {
    title: "Masbate Today News",
    description: "Local news, events, and updates from Masbate, Philippines",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} style={{ backgroundColor: '#f5f0e8' }}>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <QueryClientProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#f5f0e8' }}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

