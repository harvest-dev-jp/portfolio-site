"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const links = [
    ["Home", "/"],
    ["Services", "/#services"],
    ["Works", "/#works"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-harvest-50/95 backdrop-blur-sm border-b border-harvest-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700">
          <span className="bg-gradient-to-r from-harvest-700 to-harvest-600 bg-clip-text text-transparent">
            Harvest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-11 items-center text-harvest-700 transition-colors hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-harvest-700"
          aria-expanded={isOpen}
          aria-controls="portfolio-mobile-menu"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-harvest-700 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div id="portfolio-mobile-menu" className="md:hidden bg-harvest-50 border-t border-harvest-100">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex min-h-11 items-center border-b border-harvest-100 text-harvest-700 transition-colors last:border-0 hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-harvest-700"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
