"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { galleryItems } from "@/lib/bakery-cafe-harvest/data";

import ScrollReveal from "./ScrollReveal";

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem =
    activeIndex === null ? null : galleryItems[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="scroll-mt-32 bg-[#F7F3EA] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            Gallery
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#355746] sm:text-5xl">
            森とパンと、休日の景色
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={(index % 4) * 60}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#EFE6D8] text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C98A45]"
              >
                <Image
                  src={item.image}
                  alt={`${item.title}のイメージ`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-5 text-sm font-bold text-white">
                  {item.title}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title}の拡大表示`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#F7F3EA] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-6 top-6 z-10 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#355746] shadow"
            >
              閉じる
            </button>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={activeItem.image}
                alt={`${activeItem.title}の拡大イメージ`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-[#355746]">{activeItem.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
