"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-harvest-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-harvest-900">
          <span className="bg-gradient-to-r from-harvest-700 to-harvest-600 bg-clip-text text-transparent">
            Harvest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-harvest-700 hover:text-harvest-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-harvest-700 hover:text-harvest-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-harvest-700 hover:text-harvest-900 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 group"
        >
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-harvest-50 border-t border-harvest-100">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-harvest-700 hover:text-harvest-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-harvest-700 hover:text-harvest-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/works"
              className="text-harvest-700 hover:text-harvest-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Works
            </Link>
            <Link
              href="/contact"
              className="text-harvest-700 hover:text-harvest-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
