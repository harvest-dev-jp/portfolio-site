"use client";
import { useEffect, useState } from "react";

const links = [["業務案内", "#services"], ["選ばれる理由", "#features"], ["料金", "#pricing"], ["ご相談の流れ", "#flow"], ["行政書士紹介", "#profile"], ["FAQ", "#faq"]] as const;

export default function AobaHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return <header className="aoba-header sticky top-0 z-50 border-b border-[#D8E0E1] bg-white/95 backdrop-blur"><nav aria-label="あおば行政書士事務所サイト内ナビゲーション" className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3"><a href="#aoba-top" className="font-bold text-[#1F3B43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"><span className="text-lg">あおば行政書士事務所</span></a><div className="hidden items-center gap-5 xl:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-[#294F59] hover:text-[#B7864F]">{label}</a>)}<a href="#contact" className="aoba-button">無料相談</a></div><button type="button" className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-[#D8E0E1] xl:hidden" aria-expanded={open} aria-controls="aoba-menu" aria-label={open ? "メニューを閉じる" : "メニューを開く"} onClick={() => setOpen(!open)}><span aria-hidden="true" className="text-2xl">{open ? "×" : "☰"}</span></button></nav><div id="aoba-menu" className={`${open ? "grid" : "hidden"} border-t border-[#D8E0E1] bg-white px-5 py-4 xl:hidden`}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-b border-[#D8E0E1] font-medium text-[#294F59]">{label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="aoba-button mt-4">無料相談を申し込む</a></div></header>;
}
