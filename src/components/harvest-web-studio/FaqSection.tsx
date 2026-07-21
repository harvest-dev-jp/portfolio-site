"use client";

import { useState } from "react";
import { faqs } from "@/lib/harvest-web-studio/data";

export default function FaqSection() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpened((old) => { const next = new Set(old); next.has(i) ? next.delete(i) : next.add(i); return next; });
  return <section id="faq" className="hws-section bg-[#F8FAF8]"><div className="hws-container max-w-4xl"><p className="hws-kicker">FAQ</p><h2 className="hws-heading">よくあるご質問</h2><div className="mt-10 space-y-3">{faqs.map(([q, a], i) => { const isOpen = opened.has(i); return <div key={q} className="overflow-hidden rounded-2xl border border-[#DDE5E1] bg-white"><h3><button type="button" className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-[#1F2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D9834E]" aria-expanded={isOpen} aria-controls={`faq-answer-${i}`} onClick={() => toggle(i)}><span>{q}</span><span aria-hidden="true" className="text-2xl text-[#3F6B5B]">{isOpen ? "−" : "+"}</span></button></h3><div id={`faq-answer-${i}`} hidden={!isOpen} className="border-t border-[#EAF2EE] px-5 py-4 leading-7 text-[#4B5563]">{a}</div></div>; })}</div></div></section>;
}
