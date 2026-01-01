import Link from "next/link";
import { Facebook, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Masbate Today</h3>
            <p className="text-sm">
              Your trusted source for local news, events, and updates from Masbate, Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/masbate" className="hover:text-white transition-colors">
                  Masbate News
                </Link>
              </li>
              <li>
                <Link href="/national" className="hover:text-white transition-colors">
                  National News
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/SerbisyoPubliko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
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
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Masbate Today</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Cawayan, Masbate, Philippines</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:0963688771" className="hover:text-white transition-colors">
                  0963688771
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs">
                  Admin: <span className="text-white font-semibold">Fel C. Monares</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Masbate Today News. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

