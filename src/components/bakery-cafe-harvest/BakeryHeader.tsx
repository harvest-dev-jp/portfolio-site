"use client";

import { useEffect, useState } from "react";

import { navItems } from "@/lib/bakery-cafe-harvest/data";

export default function BakeryHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-20 z-40 border-b transition-colors duration-300",
        isScrolled || isOpen
          ? "border-[#E3D8C8] bg-[#F7F3EA]/95 backdrop-blur"
          : "border-transparent bg-[#F7F3EA]/70 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-serif text-lg font-bold tracking-wide text-[#355746] sm:text-xl"
        >
          Bakery & Cafe Harvest
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#355746] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[#C98A45]"
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
          className="rounded-full border border-[#D8C8B0] px-3 py-2 text-[#355746] md:hidden"
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {isOpen && (
        <nav
          id="bakery-mobile-nav"
          className="border-t border-[#E3D8C8] bg-[#F7F3EA] px-4 py-4 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#355746] transition hover:bg-white"
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
