"use client";

import { useEffect, useState } from "react";

const links = [["サービス", "#service"], ["特徴", "#features"], ["制作事例", "#works"], ["料金", "#pricing"], ["制作の流れ", "#flow"], ["FAQ", "#faq"]] as const;

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    onScroll(); window.addEventListener("scroll", onScroll); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className={`sticky top-0 z-50 border-b border-[#DDE5E1] transition-colors ${scrolled || open ? "bg-white/95 shadow-sm backdrop-blur" : "bg-[#F8FAF8]/90"}`}>
    <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3" aria-label="Harvest Web Studio">
      <a href="#top" className="rounded font-bold tracking-tight text-[#2F5145] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Harvest <span className="font-normal">Web Studio</span></a>
      <div className="hidden items-center gap-6 lg:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-[#2F5145] hover:text-[#D9834E] focus-visible:outline focus-visible:outline-2">{label}</a>)}<a href="#contact" className="hws-button px-5 py-3">無料相談</a></div>
      <button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#DDE5E1] lg:hidden" aria-expanded={open} aria-controls="hws-mobile-menu" aria-label={open ? "メニューを閉じる" : "メニューを開く"} onClick={() => setOpen(!open)}><span aria-hidden="true" className="text-2xl">{open ? "×" : "☰"}</span></button>
    </nav>
    <div id="hws-mobile-menu" className={`${open ? "grid" : "hidden"} border-t border-[#DDE5E1] bg-white px-5 py-4 lg:hidden`}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-b border-[#EAF2EE] font-medium text-[#2F5145]">{label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="hws-button mt-4 text-center">無料相談を申し込む</a></div>
  </header>;
}
