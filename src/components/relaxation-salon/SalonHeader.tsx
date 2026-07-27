"use client";

import { useEffect, useState } from "react";

const links = [
  ["Concept", "#concept"],
  ["Menu", "#menu"],
  ["Therapist", "#therapist"],
  ["FAQ", "#faq"],
  ["Access", "#access"],
] as const;

export default function SalonHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="salon-header sticky top-0 z-50 border-b border-[#D8DED8] bg-[#FAF8F3]/95 backdrop-blur">
      <nav
        aria-label="Lumièreサイト内ナビゲーション"
        className="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-3"
      >
        <a
          href="#salon-top"
          className="rounded text-xl font-bold tracking-wide text-[#53695A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Lumière
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-[#53695A] hover:text-[#9A6E50] focus-visible:outline focus-visible:outline-2"
            >
              {label}
            </a>
          ))}
          <a href="#reservation" className="salon-button">
            ご予約
          </a>
        </div>
        <button
          type="button"
          className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-[#D8DED8] lg:hidden"
          aria-expanded={open}
          aria-controls="salon-mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" className="text-2xl">
            {open ? "×" : "☰"}
          </span>
        </button>
      </nav>
      <div
        id="salon-mobile-menu"
        className={`${open ? "grid" : "hidden"} border-t border-[#D8DED8] bg-[#FAF8F3] px-5 py-4 lg:hidden`}
      >
        {links.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="flex min-h-11 items-center border-b border-[#D8DED8] font-medium text-[#53695A]"
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#reservation"
          className="salon-button mt-4 text-center"
          onClick={() => setOpen(false)}
        >
          ご予約
        </a>
      </div>
    </header>
  );
}
