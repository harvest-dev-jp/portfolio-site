"use client";

import { useState } from "react";

import { navItems } from "@/lib/bakery-cafe-harvest/data";

export default function BakeryHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-16 z-40 border-b border-black/10 bg-[#F7F3EA]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="grid leading-tight">
          <span className="font-serif text-lg font-bold tracking-wide text-[#1F3D34] sm:text-xl">
            Bakery & Cafe Harvest
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B47A3C]">
            Fictional cafe site
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#1F3D34] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm transition hover:text-[#B47A3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B47A3C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="bakery-mobile-nav"
          aria-label="メニューを開閉"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-full border border-[#D8C8B0] px-3 py-2 text-[#1F3D34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B47A3C] md:hidden"
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {isOpen && (
        <nav
          id="bakery-mobile-nav"
          className="border-t border-black/10 bg-[#F7F3EA] px-4 py-4 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#1F3D34] transition hover:bg-white hover:text-[#B47A3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B47A3C]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
