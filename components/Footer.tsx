import Link from "next/link";
import { Facebook, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-white border-t-4" style={{ backgroundColor: '#5c4a37', borderColor: '#b22222' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Newspaper-style publication info */}
        <div className="text-center mb-8 pb-6 border-b-2 border-newspaper-gray">
          <h2 className="text-2xl md:text-3xl font-headline text-white uppercase tracking-wide mb-2">
            Masbate Today
          </h2>
          <p className="font-serif italic text-newspaper-lightGray mb-4">
            "Dedicated to Truth, Justice, and the Masbate Way of Life"
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs font-serif" style={{ color: '#d4c5b0' }}>
            <span>Established 2020</span>
            <span>•</span>
            <span>Published Daily</span>
            <span>•</span>
            <span>Circulation: 15,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Publication Info */}
          <div>
            <h3 className="text-white text-lg font-serif font-bold uppercase tracking-wide mb-4 border-b border-newspaper-red pb-1">
              The Paper
            </h3>
            <div className="space-y-2 text-sm font-serif">
              <p>
                Masbate Today is the leading newspaper serving Masbate province and its communities with comprehensive news coverage, investigative journalism, and community-focused reporting.
              </p>
              <p className="text-newspaper-lightGray italic">
                "Truth in Every Headline Since 2020"
              </p>
            </div>
          </div>

          {/* News Sections */}
          <div>
            <h3 className="text-white text-lg font-serif font-bold uppercase tracking-wide mb-4 border-b border-newspaper-red pb-1">
              Sections
            </h3>
            <ul className="space-y-2 text-sm font-serif">
              <li>
                <Link href="/masbate" className="hover:text-gray-200 transition-colors">
                  Front Page
                </Link>
              </li>
              <li>
                <Link href="/national" className="hover:text-gray-200 transition-colors">
                  National News
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-gray-200 transition-colors">
                  Opinion & Blogs
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-gray-200 transition-colors">
                  Multimedia
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="hover:text-gray-200 transition-colors">
                  Tourism
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-200 transition-colors">
                  Letters to Editor
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-gray-200 transition-colors">
                  Classifieds
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-serif font-bold uppercase tracking-wide mb-4 border-b border-newspaper-red pb-1">
              Connect With Us
            </h3>
            <ul className="space-y-3 text-sm font-serif">
              <li>
                <a
                  href="https://www.facebook.com/SerbisyoPubliko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Serbisyo Publiko</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/MasbateToday"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-gray-200 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Masbate Today Digital</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-newspaper-gray">
              <p className="text-xs text-newspaper-lightGray font-serif">
                Follow us for breaking news and exclusive stories
              </p>
            </div>
          </div>

          {/* Contact & Editorial */}
          <div>
            <h3 className="text-white text-lg font-serif font-bold uppercase tracking-wide mb-4 border-b border-newspaper-red pb-1">
              Editorial Office
            </h3>
            <ul className="space-y-3 text-sm font-serif">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Cawayan, Masbate<br />Philippines 5400</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:0963688771" className="hover:text-gray-200 transition-colors">
                  0963688771
                </a>
              </li>
              <li className="pt-2 border-t border-newspaper-gray">
                <p className="text-xs text-newspaper-lightGray">
                  Editor-in-Chief:<br />
                  <span className="text-white font-semibold">Fel C. Monares</span>
                </p>
              </li>
              <li className="pt-2">
                <p className="text-xs text-newspaper-lightGray">
                  Managing Editor:<br />
                  <span className="text-white font-semibold">Masbate Today Staff</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-2 border-newspaper-gray text-center">
          <div className="newspaper-columns text-xs font-serif text-newspaper-lightGray mb-4">
            <p className="mb-2">
              © {new Date().getFullYear()} Masbate Today Publishing Company. All rights reserved.
            </p>
            <p className="mb-2">
              Reproduction in whole or in part without permission is prohibited.
            </p>
            <p>
              Masbate Today is published daily except Sundays and legal holidays.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-newspaper-gray">
            <span className="text-xs font-serif text-newspaper-lightGray uppercase tracking-wide">
              Member: Philippine Press Institute
            </span>
            <span className="text-newspaper-gray">•</span>
            <span className="text-xs font-serif text-newspaper-lightGray uppercase tracking-wide">
              Accredited: Kapisanan ng mga Brodkaster ng Pilipinas
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

