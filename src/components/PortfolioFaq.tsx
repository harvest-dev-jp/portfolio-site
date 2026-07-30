"use client";

import { useState } from "react";

const faqs = [
  [
    "相談内容が整理できていなくても大丈夫ですか？",
    "はい。現在のお困りごとや作りたいもののイメージを伺いながら、必要な内容を一緒に整理します。",
  ],
  [
    "初回相談は無料ですか？",
    "はい。初回のご相談は無料です。ご相談後に必ず契約する必要はありません。",
  ],
  [
    "全国から依頼できますか？",
    "オンラインで全国からご相談いただけます。埼玉・東京は、内容や場所により対面相談も可能です。",
  ],
  [
    "Webサイトに掲載する文章が用意できていません",
    "事業内容やサービスについて伺い、ページ構成と文章の整理をお手伝いします。",
  ],
  [
    "写真やロゴがなくても相談できますか？",
    "はい。現在お持ちの素材を確認し、必要な素材と準備方法をご案内します。",
  ],
  [
    "制作期間はどのくらいですか？",
    "内容により異なりますが、LPは数週間、小規模Webサイトは1〜3か月程度が目安です。素材の準備状況や修正内容により変動します。",
  ],
  [
    "公開後の修正もお願いできますか？",
    "対応内容を確認したうえで、軽微な修正や追加改善について個別にご案内します。",
  ],
  [
    "Webアプリはどのようなものを依頼できますか？",
    "入力、計算、集計、グラフ表示、ローカル保存、CSVやテキスト出力などを備えた小規模なWebアプリを想定しています。",
  ],
] as const;

export default function PortfolioFaq() {
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpened((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <section className="bg-harvest-50/60 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="home-section-heading">
          <p className="text-sm font-bold tracking-[0.18em] text-harvest-700">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold text-harvest-900 md:text-4xl">
            よくある質問
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map(([question, answer], index) => {
            const isOpen = opened.has(index);
            const answerId = `portfolio-faq-answer-${index}`;

            return (
              <article
                key={question}
                className="home-card home-faq-item rounded-xl border border-harvest-200 bg-white"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggle(index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left font-bold text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-harvest-700"
                  >
                    <span>{question}</span>
                    <span
                      aria-hidden="true"
                      className="home-faq-icon text-2xl text-harvest-700"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  hidden={!isOpen}
                  className="home-faq-answer border-t border-harvest-100 px-5 py-4 leading-7 text-stone-700"
                >
                  {answer}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
