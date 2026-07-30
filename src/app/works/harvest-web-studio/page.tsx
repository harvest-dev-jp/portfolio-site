import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/harvest-web-studio/ContactSection";
import FaqSection from "@/components/harvest-web-studio/FaqSection";
import LandingHeader from "@/components/harvest-web-studio/LandingHeader";
import { features, plans, problems } from "@/lib/harvest-web-studio/data";

export const metadata: Metadata = { title: "Harvest Web Studio｜個人事業主向けWebサイト制作", description: "Webサイトが初めての個人事業主・小規模店舗向けに、内容整理から公開まで分かりやすくサポートする架空Web制作サービスのLPです。", openGraph: { title: "Harvest Web Studio｜個人事業主向けWebサイト制作", description: "個人事業主・小規模店舗向けに企画した、ポートフォリオ用の架空Web制作サービスLPです。", type: "website" } };

const steps = [["事業について伺います", "現在のお悩みや目標、お客様についてお聞きします。"], ["伝える内容を整理します", "事業の魅力と、お客様が知りたい情報を言葉にします。"], ["必要なページをご提案します", "目的と予算に合う、過不足のない構成をご提案します。"], ["公開までサポートします", "表示確認や公開作業まで、一つずつご案内します。"]] as const;
const services = [["LP制作", "1つの商品やサービスを詳しく紹介し、お問い合わせや申し込みにつなげる1ページ型サイトです。", "新商品や一つのサービスを伝えたい方"], ["小規模ホームページ", "事業紹介、サービス、プロフィール、お問い合わせなどをまとめたWebサイトです。", "初めて公式サイトを持ちたい方"], ["既存サイト改善", "古いデザインやスマートフォン表示、文章や問い合わせ導線を見直します。", "今のサイトを生かして整えたい方"]] as const;
const works = [["Bakery & Cafe Harvest", "自主制作・架空店舗サイト", "那須高原の架空ベーカリーカフェを想定した、店舗の世界観と季節の魅力を伝えるWebサイトです。", "/works/bakery-cafe-harvest"], ["リラクゼーションサロンWebサイト", "自主制作・架空案件", "初めて訪れる方が、安心して施術内容や料金を確認できるサイトを想定しています。", "/works/relaxation-salon"], ["行政書士事務所Webサイト", "自主制作・架空案件", "専門性と相談しやすさを両立した、小規模士業向けWebサイトを想定しています。", "/works/administrative-scrivener"]] as const;
const studioImages = {
  hero: "/images/harvest-web-studio/hero-consultation.webp",
  salon: "/images/harvest-web-studio/work-salon.webp",
  legalOffice: "/images/harvest-web-studio/work-legal-office.webp",
} as const;

function publicImageExists(src: string) {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}
const flow = [
  ["無料相談", "現在のお悩みや作りたいサイトについて伺います。"],
  ["ヒアリング", "事業の内容やお客様、掲載したい情報を整理します。"],
  ["ご提案・お見積もり", "ページ構成と制作範囲、料金をご案内します。"],
  ["デザイン・制作", "内容に合うデザインで各画面を制作します。"],
  ["確認・修正", "実際の画面をご確認いただき、調整を行います。"],
  ["公開・納品", "最終確認後、Webサイトの公開まで支援します。"],
] as const;

export default function HarvestWebStudioPage() {
  const availableImages = {
    hero: publicImageExists(studioImages.hero),
    salon: publicImageExists(studioImages.salon),
    legalOffice: publicImageExists(studioImages.legalOffice),
  };

  return <div id="top" className="hws-root overflow-x-clip bg-white text-[#1F2937]">
    <style dangerouslySetInnerHTML={{ __html: hwsStyles }} />
    <LandingHeader />
    <main>
      <section className="hws-hero-section bg-gradient-to-br from-[#F8FAF8] to-[#EAF2EE] px-5 py-14 md:py-20"><div className="hws-hero-grid mx-auto grid max-w-[1180px] items-center gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(420px,.9fr)] xl:gap-14"><div className="hws-hero min-w-0 xl:max-w-[620px]"><p className="hws-kicker">個人事業主・小規模店舗向け</p><h1 className="hws-title mt-5 font-bold leading-tight tracking-tight text-[#2F5145]"><span className="block whitespace-nowrap">小さな事業に、</span><span className="block whitespace-nowrap">ちょうどいい</span><span className="block whitespace-nowrap">Webサイトを。</span></h1><p className="mt-6 max-w-[680px] text-lg leading-8 text-[#4B5563]">Webサイトが初めてでも大丈夫です。<br /><br />事業の内容整理からデザイン、制作、公開まで、<br className="hidden sm:block" />分かりやすく丁寧にサポートします。</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#contact" className="hws-button text-center">無料相談を申し込む</a><a href="#pricing" className="hws-secondary text-center">制作プランを見る</a></div><ul className="mt-6 grid max-w-[620px] gap-x-6 gap-y-2 text-sm sm:grid-cols-2">{["初回相談無料", "全国オンライン対応", "埼玉・東京は対面相談可能", "強引な営業なし"].map(x => <li key={x} className="break-keep">✓ {x}</li>)}</ul></div><HeroVisual usePhoto={availableImages.hero} /></div></section>
      <section aria-label="サポート内容" className="border-y border-[#DDE5E1]"><div className="hws-container grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">{[["相談", "初回相談無料", "まずはお話だけでも大丈夫です"], ["全国", "オンライン対応", "ご自宅から相談できます"], ["端末", "スマートフォン対応", "各画面で見やすく整えます"], ["公開", "公開までサポート", "手順を一つずつご案内します"]].map(([icon, title, desc]) => <div key={title} className="rounded-2xl bg-[#F8FAF8] p-5 text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#EAF2EE] text-xs font-bold text-[#2F5145]">{icon}</span><h2 className="mt-3 whitespace-nowrap font-bold">{title}</h2><p className="mt-1 text-sm text-[#4B5563]">{desc}</p></div>)}</div></section>
      <Section id="problems" kicker="YOUR CONCERNS" title="こんなお悩みはありませんか？" lead="Webサイトを作る前の迷いも、相談してよいことの一つです。" tone><div className="hws-card-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">{problems.map((x, i) => <Card key={x}><span className="text-sm font-bold text-[#D9834E]">お悩み {String(i + 1).padStart(2, "0")}</span><p className="mt-4 leading-7">{x}</p></Card>)}</div></Section>
      <Section id="service" kicker="SERVICE" title={<>そのお悩みを、<br />一緒に整理します。</>} lead={<>完成した文章や専門知識は必要ありません。<br />お話を伺いながら、事業の魅力や伝える内容を整理します。</>}><div className="grid items-center gap-10 lg:grid-cols-2"><WorkflowVisual /><ol className="space-y-5">{steps.map(([title, desc], i) => <li key={title} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#3F6B5B] font-bold text-white">{i + 1}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-1 leading-7 text-[#4B5563]">{desc}</p></div></li>)}</ol></div></Section>
      <Section id="features" kicker="OUR VALUES" title={<>Harvest Web Studioが<br />大切にしている5つのこと</>} tone><div className="hws-values-grid flex flex-wrap justify-center gap-5">{features.map(([title, desc], i) => <Card key={title} className="w-full min-w-0 md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.9rem)]"><span className="text-3xl font-bold text-[#D9834E]">0{i + 1}</span><h3 className="mt-4 text-xl font-bold text-[#2F5145]">{title}</h3><p className="mt-3 leading-7 text-[#4B5563]">{desc}</p></Card>)}</div></Section>
      <Section id="services" kicker="WHAT WE CREATE" title={<>事業に合わせた<br />3つの制作方法</>}><div className="hws-card-grid grid gap-5 lg:grid-cols-3">{services.map(([title, desc, fit], i) => <Card key={title} className="flex min-w-0 flex-col"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF2EE] font-bold text-[#3F6B5B]">0{i + 1}</span><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 flex-1 leading-7 text-[#4B5563]">{desc}</p><p className="mt-5 rounded-xl bg-[#F8FAF8] p-3 text-sm"><b>向いている方：</b>{fit}</p><a href="#pricing" className="mt-5 inline-block font-bold text-[#2F5145] underline underline-offset-4">対応プランを見る</a></Card>)}</div></Section>
      <Cta title={<>どのプランが合うか<br />分からなくても大丈夫です。</>} body="今のお悩みや、作りたいWebサイトのイメージを伺い、必要な内容をご提案します。" note={<>相談だけでも大丈夫です。<br />まだ依頼を決めていなくても問題ありません。</>} />
      <Section id="works" kicker="WORKS" title="制作事例" tone><div className="hws-card-grid grid items-stretch gap-5 lg:grid-cols-3">{works.map(([title, type, desc, href], i) => <Card key={title} className="flex h-full min-w-0 flex-col overflow-hidden !p-0"><WorkThumbnail index={i} title={title} usePhoto={i === 1 ? availableImages.salon : i === 2 ? availableImages.legalOffice : true} /><div className="flex flex-1 flex-col p-6"><p className="text-sm font-bold text-[#3F6B5B]">{type}</p><h3 className="mt-2 text-xl font-bold">{title}</h3><p className="mt-3 flex-1 leading-7 text-[#4B5563]">{desc}</p>{href ? <Link href={href} className="mt-5 inline-block font-bold text-[#2F5145] underline">制作事例を見る</Link> : <span className="mt-5 block text-sm text-[#4B5563]">ポートフォリオ用コンセプト</span>}</div></Card>)}</div><p className="mt-8 text-sm text-[#4B5563]">掲載している事例には、ポートフォリオ用に制作した架空サイトが含まれます。</p></Section>
      <Section id="pricing" kicker="PRICING" title="分かりやすい制作プラン" lead="目的と必要なページに合わせて、3つの参考プランをご用意しました。"><div className="hws-pricing-grid grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`order-2 flex h-full min-w-0 flex-col rounded-3xl border bg-white p-6 shadow-sm ${plan.featured ? "order-1 border-2 border-[#3F6B5B] xl:order-2" : "border-[#DDE5E1]"} ${plan.name.startsWith("サイト改善") ? "xl:order-1" : "xl:order-3"}`}>{plan.featured && <span className="self-start rounded-full bg-[#D9834E] px-3 py-1 text-xs font-bold text-white">1ページで伝えたい方へ</span>}<h3 className="mt-4 min-w-0 text-xl font-bold leading-snug"><PlanTitle name={plan.name} /></h3><p className="mt-4 whitespace-nowrap text-3xl font-bold text-[#2F5145]">{plan.price}</p><p className="mt-3 min-h-12 text-sm text-[#4B5563]">{plan.target}</p><ul className="mt-5 flex-1 space-y-2 border-y border-[#DDE5E1] py-5">{plan.items.map(x => <li key={x}>✓&nbsp;{x}</li>)}</ul><p className="mt-5"><b>制作期間：</b>{plan.term}</p><a href="#contact" className="hws-button mt-6 block whitespace-nowrap text-center">このプランを相談する</a></article>)}</div><div className="mt-8 rounded-2xl bg-[#F8FAF8] p-5 text-sm leading-7 text-[#4B5563]"><p>表示料金は、ポートフォリオ用の架空サービスとして設定した参考価格です。</p><p className="mt-2">実際の制作内容、ページ数、機能、素材の準備状況などにより、料金と制作期間は変わります。</p></div></Section>
      <Cta title="料金や制作範囲を一緒に整理します。" body="ご予算が決まっていない段階でも、必要な内容から考えられます。" />
      <Section id="flow" kicker="FLOW" title="ご相談から公開までの流れ" tone><ol className="hws-flow-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3">{flow.map(([title, desc], i) => <li key={title} className="relative min-h-40 rounded-2xl border border-[#DDE5E1] bg-white p-6"><span className="text-lg font-bold text-[#D9834E]">STEP {String(i + 1).padStart(2, "0")}</span><h3 className="mt-3 break-keep text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-[#4B5563]">{desc}</p></li>)}</ol></Section>
      <Section id="profile" kicker="PROFILE" title={<>ご相談から制作まで、<br />同じ担当者が対応します。</>}><div className="grid items-center gap-10 lg:grid-cols-[.7fr_1.3fr]"><div className="text-center"><Image src="/profile.png" width={260} height={260} sizes="(max-width: 1024px) 200px, 260px" alt="制作者 Takeshi Akaguma" className="mx-auto rounded-full border-8 border-[#EAF2EE]" /></div><div className="space-y-5 leading-8 text-[#4B5563]"><p>システム開発の経験を生かし、分かりやすく使いやすいWebサイト制作に取り組んでいます。</p><p>Webサイト制作が初めての方にも安心していただけるように、専門用語をなるべく使わず、事業内容を整理するところから丁寧に対応します。</p><p className="rounded-2xl bg-[#F8FAF8] p-5"><b className="text-[#2F5145]">大切にしていること</b><br />見た目を整えるだけでなく、誰に何を伝えるWebサイトなのかを一緒に考えることを大切にしています。</p><p>全国オンライン対応<br />埼玉・東京エリアは、日程や場所により対面でのご相談も可能です。</p><Link href="/about" className="hws-secondary inline-block">プロフィールを見る</Link></div></div></Section>
      <FaqSection />
      <Cta title={<>Webサイトについて、<br />まずは話すところから始めませんか？</>} body="制作内容や予算が決まっていなくても問題ありません。今のお悩みや、作りたいWebサイトのイメージをお聞かせください。" note="初回相談無料・相談だけでもOK・強引な営業なし・全国オンライン対応" />
      <ContactSection />
    </main>
    <footer className="hws-footer bg-[#2F5145] px-5 py-12 text-white"><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-2"><div><p className="text-xl font-bold">Harvest Web Studio</p><p className="mt-2 text-sm text-white/80">個人事業主・小規模事業者向けの架空Webサイト制作サービスLP</p><p className="mt-5 text-sm">Harvest Web Studioは、<br />ポートフォリオ用に企画した架空のサービスです。</p></div><nav aria-label="フッターナビゲーション" className="grid gap-3 md:justify-self-end"><Link href="/">ポートフォリオへ戻る</Link><Link href="/about">制作者について</Link><Link href="/#works">その他の制作実績</Link><span className="text-sm text-white/70">プライバシーポリシー：デモのため未設置</span></nav></div><p className="mx-auto mt-10 max-w-[1180px] border-t border-white/20 pt-5 text-sm">© 2026 Harvest Web Studio</p></footer>
  </div>;
}

function Section({ id, kicker, title, lead, tone, children }: { id: string; kicker: string; title: React.ReactNode; lead?: React.ReactNode; tone?: boolean; children: React.ReactNode }) { return <section id={id} className={`hws-section scroll-mt-16 ${tone ? "bg-[#F8FAF8]" : "bg-white"}`}><div className="hws-container"><div className="hws-section-heading"><p className="hws-kicker">{kicker}</p><h2 className="hws-heading">{title}</h2>{lead && <p className="mb-8 mt-4 max-w-3xl text-lg leading-8 text-[#4B5563]">{lead}</p>}</div><div className={`hws-section-content ${lead ? "" : "mt-8"}`}>{children}</div></div></section>; }
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <article className={`hws-card rounded-3xl border border-[#DDE5E1] bg-white p-6 shadow-sm ${className}`}>{children}</article>; }
function Cta({ title, body, note }: { title: React.ReactNode; body: string; note?: React.ReactNode }) { return <section className="hws-cta bg-[#EAF2EE] px-5 py-14 text-center text-[#1F2937]"><div className="mx-auto max-w-3xl"><h2 className="text-3xl font-bold leading-tight text-[#2F5145] md:text-4xl">{title}</h2><p className="mt-4 text-lg leading-8 text-[#4B5563]">{body}</p><a href="#contact" className="hws-button mt-6 inline-block whitespace-nowrap">無料で相談してみる</a>{note && <p className="mt-4 text-sm text-[#4B5563]">{note}</p>}</div></section>; }
function PlanTitle({ name }: { name: string }) { return name === "スタンダードサイトプラン" ? <><span className="whitespace-nowrap">スタンダードサイト</span><wbr /><span className="whitespace-nowrap">プラン</span></> : name; }
function HeroVisual({ usePhoto }: { usePhoto: boolean }) {
  if (usePhoto) return <figure className="hws-hero hws-hero-delay hws-hero-visual mx-auto min-w-0 w-full max-w-xl xl:max-w-[500px]"><Image src={studioImages.hero} alt="個人事業主とWeb制作者がノートパソコンを見ながら相談している様子" width={1600} height={1200} sizes="(min-width: 1280px) 500px, (min-width: 768px) 576px, calc(100vw - 40px)" priority className="hws-hero-photo aspect-[4/3] h-auto w-full rounded-[1.75rem] border border-[#DDE5E1] object-cover object-center shadow-xl" /><figcaption className="mt-4 flex flex-wrap justify-center gap-2 text-sm font-bold text-[#2F5145]"><span className="rounded-full bg-white px-4 py-2 shadow-sm">あなたの事業に合う</span><span className="rounded-full bg-white px-4 py-2 shadow-sm">スマートフォン対応</span></figcaption></figure>;
  return <div className="hws-hero hws-hero-delay hws-hero-visual relative mx-auto min-w-0 w-full max-w-xl overflow-hidden pb-8 pr-5 xl:max-w-[500px]" role="img" aria-label="パソコンとスマートフォンに対応した架空Webサイトの画面イメージ"><div className="w-full rounded-[1.75rem] border border-[#DDE5E1] bg-[#2F5145] p-3 shadow-xl"><div className="overflow-hidden rounded-2xl bg-white"><div className="flex gap-2 bg-[#F5F0E8] p-3"><i className="h-3 w-3 rounded-full bg-[#D9834E]"/><i className="h-3 w-3 rounded-full bg-[#DDE5E1]"/><i className="h-3 w-3 rounded-full bg-[#DDE5E1]"/></div><div className="grid min-h-[310px] items-center gap-6 p-7 sm:grid-cols-2"><div><span className="rounded-full bg-[#EAF2EE] px-3 py-1 text-xs font-bold text-[#2F5145]">あなたの事業に合う</span><div className="mt-5 h-5 w-full rounded bg-[#2F5145]"/><div className="mt-3 h-5 w-4/5 rounded bg-[#3F6B5B]"/><div className="mt-6 h-3 w-full rounded bg-[#DDE5E1]"/><div className="mt-2 h-3 w-3/4 rounded bg-[#DDE5E1]"/><div className="mt-7 h-11 w-36 rounded-xl bg-[#3F6B5B]"/></div><div className="grid aspect-square place-items-center rounded-[40%_60%_45%_55%] bg-[#EAF2EE]"><span className="text-center text-sm font-bold leading-6 text-[#3F6B5B]">伝わる<br />デザイン</span></div></div></div></div><div className="absolute bottom-0 right-0 z-10 w-28 max-w-[30%] rounded-[1.5rem] border-[5px] border-[#2F5145] bg-white p-2 shadow-xl sm:w-32"><div className="aspect-[9/16] rounded-xl bg-[#F8FAF8] p-3"><div className="h-2 w-10 max-w-full rounded bg-[#D9834E]"/><div className="mt-4 h-3 w-full rounded bg-[#3F6B5B]"/><div className="mt-2 h-3 w-4/5 rounded bg-[#3F6B5B]"/><div className="mt-5 h-16 rounded-lg bg-[#EAF2EE]"/><div className="mt-4 rounded bg-[#2F5145] py-2 text-center text-[8px] font-bold text-white">スマートフォン対応</div></div></div></div>;
}

function WorkflowVisual() { const labels = ["ヒアリング", "内容整理", "ページ構成", "デザイン・公開"]; return <div className="rounded-3xl border border-[#DDE5E1] bg-[#EAF2EE] p-5 sm:p-8" role="img" aria-label="ヒアリングからデザイン・公開までの制作ワークフロー"><p className="text-sm font-bold tracking-wider text-[#3F6B5B]">SITE PLANNING</p><div className="mt-5 rounded-2xl bg-white p-5 shadow-sm"><div className="space-y-3">{labels.map((label, i) => <div key={label}><div className="flex items-center gap-3 rounded-xl border border-[#DDE5E1] p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#3F6B5B] text-sm font-bold text-white">{i + 1}</span><span className="break-keep font-bold text-[#2F5145]">{label}</span>{i < labels.length - 1 && <span className="ml-auto text-sm text-[#4B5563]">確認</span>}</div>{i < labels.length - 1 && <div className="ml-7 h-3 border-l-2 border-dashed border-[#9DB5AA]" />}</div>)}</div></div><p className="mt-4 text-center text-sm text-[#4B5563]">対話しながら、伝える内容を形にします。</p></div>; }

function WorkThumbnail({ index, title, usePhoto }: { index: number; title: string; usePhoto: boolean }) {
  if (index === 0) return <div className="aspect-[16/9] overflow-hidden"><Image src="/works/bakery-cafe-harvest/thumbnail.jpg" alt="Bakery & Cafe HarvestのWebサイト画面" width={960} height={540} className="h-full w-full object-cover" sizes="(min-width: 1024px) 360px, 100vw" /></div>;
  const salon = index === 1;
  if (usePhoto) return <div className="aspect-[16/9] overflow-hidden"><Image src={salon ? studioImages.salon : studioImages.legalOffice} alt={salon ? "自然光が入る落ち着いたリラクゼーションサロンの室内" : "書類とノートパソコンが置かれた落ち着いた行政書士事務所"} width={1600} height={900} className="h-full w-full object-cover object-center" sizes="(min-width: 1024px) 360px, 100vw" /></div>;
  return <div className={`aspect-[16/9] p-5 ${salon ? "bg-[#F5F0E8]" : "bg-[#E8EDF2]"}`} role="img" aria-label={`${title}の架空Webサイト画面イメージ`}><div className="h-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"><div className={`flex h-7 items-center gap-1 px-3 ${salon ? "bg-[#D9CDBD]" : "bg-[#30465B]"}`}><i className="h-2 w-2 rounded-full bg-white/70"/><i className="h-2 w-2 rounded-full bg-white/50"/></div><div className="grid h-[calc(100%-1.75rem)] grid-cols-[1.2fr_.8fr] gap-3 p-4"><div><div className={`h-3 w-16 rounded ${salon ? "bg-[#B79D82]" : "bg-[#30465B]"}`}/><div className="mt-4 h-4 w-full rounded bg-[#DDE5E1]"/><div className="mt-2 h-4 w-3/4 rounded bg-[#DDE5E1]"/><div className={`mt-5 h-8 w-24 rounded ${salon ? "bg-[#718B7B]" : "bg-[#30465B]"}`}/></div><div className={`rounded-lg ${salon ? "bg-[#EAF2EE]" : "bg-[#EEF2F5]"}`}><div className="grid h-full grid-cols-2 gap-2 p-3"><i className="rounded bg-white"/><i className="rounded bg-white"/><i className="rounded bg-white"/><i className="rounded bg-white"/></div></div></div></div></div>;
}

const hwsStyles = `
  .hws-container{max-width:1180px;margin-inline:auto;padding-inline:20px}
  .hws-section{padding-block:64px}
  .hws-root :where(h1,h2,h3,p,li,a,button,span){line-break:strict;word-break:normal;overflow-wrap:normal}
  .hws-title{font-size:clamp(2.125rem,5vw,3.5rem);max-width:11.5em;word-break:keep-all;overflow-wrap:normal}
  .hws-kicker{font-size:.75rem;letter-spacing:.18em;font-weight:800;color:#D06F37}
  .hws-heading{margin-top:12px;font-size:clamp(1.75rem,4vw,2.75rem);line-height:1.25;font-weight:800;color:#2F5145}
  .hws-button,.hws-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:50px;border-radius:12px;padding:12px 24px;border:1px solid #2F5145;font-weight:700;line-height:1.25;white-space:nowrap;transition:transform 180ms,background 180ms,color 180ms}
  .hws-button{background:#2F5145;color:#fff}
  .hws-button:hover{background:#243F36;transform:translateY(-2px)}
  .hws-button:active,.hws-secondary:active{transform:translateY(1px)}
  .hws-button:focus-visible,.hws-secondary:focus-visible{outline:3px solid #D9834E;outline-offset:3px}
  .hws-button:disabled{opacity:.55;cursor:not-allowed}
  .hws-secondary{color:#2F5145;background:#fff}
  .hws-secondary:hover{background:#EAF2EE;transform:translateY(-2px)}
  .hws-card{min-width:0;transition:transform 220ms,box-shadow 220ms}
  .hws-card:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(47,81,69,.1)}
  .hws-hero{animation:hwsFadeUp 600ms ease both}
  .hws-hero-delay{animation-delay:160ms}
  @keyframes hwsFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @media(max-width:420px){.hws-button,.hws-secondary{width:100%;padding-inline:16px}}
  @media(min-width:768px){.hws-section{padding-block:88px}.hws-container{padding-inline:28px}}
  @media(max-width:640px){.hws-hero-photo{object-position:center center}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.hws-root *{animation:none!important;transition:none!important}}
  @media print{
    .hws-root,.hws-root *{opacity:1!important;transform:none!important;animation:none!important;transition:none!important;filter:none!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
    .hws-root{overflow:visible!important}
    .hws-root header{display:none!important}
    .hws-root .hws-section{padding-block:44px!important}
    .hws-root .hws-cta{padding-block:34px!important}
    .hws-root .hws-section-heading{break-after:avoid;page-break-after:avoid}
    .hws-root .hws-section-content{break-inside:auto;page-break-inside:auto;margin-top:18px!important}
    .hws-root .hws-hero-section{padding-block:32px!important}
    .hws-root .hws-hero-grid{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:24px!important}
    .hws-root .hws-hero-grid>*{width:100%!important;max-width:100%!important}
    .hws-root .hws-hero-visual{width:100%!important;max-width:560px!important;margin-inline:auto!important;break-inside:avoid;page-break-inside:avoid}
    .hws-root .hws-hero-photo{width:560px!important;max-width:100%!important;height:auto!important;max-height:420px!important;aspect-ratio:4/3;object-fit:cover!important;box-shadow:none!important}
    .hws-root .hws-card-grid,.hws-root .hws-pricing-grid,.hws-root .hws-flow-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;break-inside:auto!important;page-break-inside:auto!important}
    .hws-root .hws-values-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;break-inside:auto!important;page-break-inside:auto!important}
    .hws-root .hws-values-grid>.hws-card{width:auto!important}
    .hws-root .hws-card,.hws-root .hws-flow-grid>li,.hws-root .hws-pricing-grid>article{break-inside:avoid;page-break-inside:avoid;box-shadow:none!important}
    .hws-root #problems .hws-card,.hws-root #features .hws-card,.hws-root #services .hws-card,.hws-root .hws-flow-grid>li{padding:16px!important}
    .hws-root #pricing h3{font-size:1rem!important;line-height:1.4!important}
    .hws-root #works h3{font-size:1.05rem!important;line-height:1.45!important}
    .hws-root #flow .hws-heading{break-after:avoid;page-break-after:avoid}
    .hws-root .hws-button{background:#2F5145!important;color:#fff!important;border:2px solid #2F5145!important}
    .hws-root .hws-secondary{background:#fff!important;color:#2F5145!important;border:2px solid #2F5145!important}
    .hws-root #contact .hws-section-heading,.hws-root #contact label,.hws-root #contact button{break-inside:avoid;page-break-inside:avoid}
    .hws-root .hws-contact-form{break-inside:auto;page-break-inside:auto}
    .hws-root footer{break-before:auto;page-break-before:auto;break-inside:avoid;page-break-inside:avoid;background:#fff!important;color:#1F2937!important;border-top:2px solid #2F5145;padding-block:20px!important}
    .hws-root footer *{color:#1F2937!important;opacity:1!important}
    .hws-root footer a{text-decoration:underline}
    .hws-root footer>p{margin-top:16px!important}
    .hws-root section{min-height:0!important}
  }
`;
