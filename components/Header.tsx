"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { admin } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/masbate", label: "Masbate News" },
    { href: "/national", label: "National News" },
    { href: "/blogs", label: "Blogs" },
    { href: "/videos", label: "Videos" },
    { href: "/tourism", label: "Tourism" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full masthead">
      <div className="container mx-auto px-4">
        {/* Newspaper Masthead */}
        <div className="py-4 border-b-2" style={{ borderColor: '#8b6f47' }}>
          <div className="text-center">
            <div className="text-xs font-serif text-newspaper-darkGray uppercase tracking-widest mb-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <Link href="/" className="block">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-newspaper-black uppercase tracking-tight leading-none mb-2">
                MASBATE TODAY
              </h1>
              <div className="text-base md:text-lg font-serif text-newspaper-darkGray italic mt-2">
                "Truth in Every Headline"
              </div>
            </Link>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs font-serif text-newspaper-darkGray">
              <span>Vol. {new Date().getFullYear() - 2020}</span>
              <span>•</span>
              <span>No. {Math.floor((new Date().getTime() - new Date('2020-01-01').getTime()) / (1000 * 60 * 60 * 24))}</span>
              <span>•</span>
              <span>Masbate, Philippines</span>
            </div>
          </div>
        </div>

        <div className="flex h-14 items-center justify-between border-t-2 border-newspaper-black">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-serif font-bold uppercase tracking-wider transition-colors px-2 py-1 ${
                  pathname === link.href
                    ? "text-newspaper-black border-b-3 border-newspaper-black bg-gray-50"
                    : "text-newspaper-darkGray hover:text-newspaper-black hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:p-2.5 text-newspaper-darkGray hover:text-newspaper-black min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {admin && (
              <Link
                href="/admin"
                className="hidden md:block px-4 py-2 bg-newspaper-black text-white font-serif font-bold uppercase text-sm tracking-wide hover:bg-newspaper-darkGray transition-colors"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-newspaper-darkGray hover:text-newspaper-black transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-newspaper-black">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-serif font-bold uppercase tracking-wide transition-colors hover:text-newspaper-black ${
                    pathname === link.href
                      ? "text-newspaper-black"
                      : "text-newspaper-gray hover:text-newspaper-darkGray"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {admin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 bg-newspaper-black text-white font-serif font-bold uppercase text-sm tracking-wide hover:bg-newspaper-darkGray transition-colors text-center"
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t-2 border-newspaper-black">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-newspaper-lightGray" />
              <input
                type="text"
                placeholder="Search the archives..."
                className="w-full pl-10 pr-4 py-3 border-2 border-newspaper-black bg-newspaper-offWhite font-serif text-newspaper-black placeholder-newspaper-lightGray focus:outline-none focus:ring-2 focus:ring-newspaper-black"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const query = (e.target as HTMLInputElement).value;
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

