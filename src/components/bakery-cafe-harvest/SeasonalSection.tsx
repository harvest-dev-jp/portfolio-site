"use client";

import { useEffect, useState } from "react";

import { seasons } from "@/lib/bakery-cafe-harvest/data";

import ScrollReveal from "./ScrollReveal";

function getSeasonKey(month: number) {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export default function SeasonalSection() {
  const [activeSeason, setActiveSeason] = useState("spring");

  useEffect(() => {
    setActiveSeason(getSeasonKey(new Date().getMonth() + 1));
  }, []);

  return (
    <section id="season" className="relative overflow-hidden bg-[#355746] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#F4D6A2]">
            Four Seasons at Harvest
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">
            那須高原の四季とともに
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {seasons.map((season, index) => {
            const isActive = activeSeason === season.key;

            return (
              <ScrollReveal key={season.key} delay={index * 90}>
                <button
                  type="button"
                  onClick={() => setActiveSeason(season.key)}
                  className={[
                    "h-full w-full rounded-2xl border p-5 text-left transition",
                    isActive
                      ? "border-[#F4D6A2] bg-white text-[#355746] shadow-xl"
                      : "border-white/20 bg-white/8 text-white hover:bg-white/14",
                  ].join(" ")}
                >
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${season.accent}`}>
                    {season.label}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{season.name}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-85">{season.title}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6">
                    {season.items.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
