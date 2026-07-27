"use client";

import { useState } from "react";

const faqs = [
  ["初めてでも利用できますか？", "はい。施術前にご希望やお疲れの箇所をゆっくり伺います。"],
  ["どのメニューを選べばよいですか？", "迷われる場合は「相談して決めたい」をお選びください。"],
  ["予約は必要ですか？", "完全予約制を想定しています。デモフォームからご希望を入力できます。"],
  ["着替えはありますか？", "動きやすいお着替えをご用意している想定です。"],
  ["支払い方法を教えてください", "現金と主要なキャッシュレス決済に対応している想定です。"],
  ["妊娠中でも利用できますか？", "安全のため事前に医師へご相談のうえ、予約前に必ずお知らせください。"],
  ["男性も利用できますか？", "女性向けを中心としたサロン設定です。男性は紹介がある場合のみ承る想定です。"],
  ["キャンセル料はかかりますか？", "デモサイトのため実際の規定はありません。実店舗では事前の案内をご確認ください。"],
  ["駐車場はありますか？", "専用駐車場はなく、近隣コインパーキングをご利用いただく想定です。"],
  ["施術を受けられない場合はありますか？", "発熱、飲酒後、怪我や通院中などは施術を控える場合があります。医療判断は行わないため、必要に応じて医師へご相談ください。"],
] as const;

export default function SalonFaq() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const toggle = (index: number) =>
    setOpened((current) => {
      const next = new Set(current);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });

  return (
    <section id="faq" className="salon-section scroll-mt-16 bg-[#F3EEE6]">
      <div className="salon-container max-w-4xl">
        <div className="salon-section-heading">
          <p className="salon-kicker">FAQ</p>
          <h2 className="salon-heading">よくあるご質問</h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map(([question, answer], index) => {
            const isOpen = opened.has(index);
            return (
              <div
                key={question}
                className="rounded-2xl border border-[#D8DED8] bg-white"
              >
                <h3>
                  <button
                    type="button"
                    className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9A6E50]"
                    aria-expanded={isOpen}
                    aria-controls={`salon-faq-${index}`}
                    onClick={() => toggle(index)}
                  >
                    <span>{question}</span>
                    <span aria-hidden="true" className="text-2xl text-[#738B78]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={`salon-faq-${index}`}
                  hidden={!isOpen}
                  className="border-t border-[#D8DED8] px-5 py-4 leading-7 text-[#626862]"
                >
                  {answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
