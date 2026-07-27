"use client";
import { useState } from "react";

const faqs = [
  ["何を相談すればよいか整理できていなくても大丈夫ですか？", "はい。現在の状況と目的を伺い、必要な確認事項から一緒に整理します。"],
  ["初回相談は本当に無料ですか？", "初回の概要確認は無料という架空設定です。正式な対応前に料金をご案内します。"],
  ["オンライン相談はできますか？", "全国からオンライン相談に対応する想定です。"],
  ["土曜日も相談できますか？", "土曜日は事前予約制で対応する想定です。"],
  ["見積もり後に断っても大丈夫ですか？", "はい。見積もり後に必ず契約する必要はありません。"],
  ["申請すれば必ず許可されますか？", "許可・認可・在留資格などの結果は保証できません。要件を確認し、必要書類を整える支援を行います。"],
  ["自分で用意する書類はありますか？", "手続きごとに異なります。正式なご依頼後、必要書類を一覧でご案内する想定です。"],
  ["どのくらいの期間がかかりますか？", "手続きの種類、書類の準備状況、官公署の審査期間で異なるため、ご相談後に目安をご案内します。"],
  ["他の専門家を紹介してもらえますか？", "弁護士、司法書士、税理士などが必要な場合は、適切な相談先をご案内する想定です。"],
  ["相談内容の秘密は守られますか？", "適切に管理する想定ですが、この架空サイトでは実際の相談受付を行いません。"],
  ["全国から依頼できますか？", "オンライン相談は全国対応の想定です。実際の対応可否は手続きや管轄により異なります。"],
  ["役所とのやり取りも任せられますか？", "行政書士の業務範囲内で対応します。内容や資格・登録状況により対応できない場合があります。"],
] as const;

export default function AobaFaq() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const toggle = (index: number) => setOpened((old) => { const next = new Set(old); next.has(index) ? next.delete(index) : next.add(index); return next; });
  return <section id="faq" className="aoba-section scroll-mt-16 bg-[#F7F9F8]"><div className="aoba-container max-w-4xl"><div className="aoba-section-heading"><p className="aoba-kicker">FAQ</p><h2 className="aoba-heading">よくあるご質問</h2></div><div className="mt-8 space-y-3">{faqs.map(([question, answer], index) => { const open = opened.has(index); return <div key={question} className="rounded-2xl border border-[#D8E0E1] bg-white"><h3><button type="button" className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B7864F]" aria-expanded={open} aria-controls={`aoba-faq-${index}`} onClick={() => toggle(index)}><span>{question}</span><span aria-hidden="true" className="text-2xl text-[#294F59]">{open ? "−" : "+"}</span></button></h3><div id={`aoba-faq-${index}`} hidden={!open} className="border-t border-[#D8E0E1] px-5 py-4 leading-7 text-[#5C6870]">{answer}</div></div>; })}</div></div></section>;
}
