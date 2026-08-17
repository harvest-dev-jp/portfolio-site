import type { Metadata } from "next";
import Image from "next/image";

import PrintButton from "@/components/portfolio-book/PrintButton";
import { works } from "@/lib/portfolio/works";

import "./print.css";

export const metadata: Metadata = {
  title: "営業用ポートフォリオ | Harvest",
  description: "HarvestのWebサイト・Webアプリ制作実績をまとめた営業用ポートフォリオです。",
  robots: { index: false, follow: false },
};

const workBySlug = Object.fromEntries(works.map((work) => [work.slug, work]));

const services = [
  "Webサイト制作",
  "LP制作",
  "既存サイト改善",
  "小規模Webアプリ開発",
  "業務効率化ツール",
  "生成AIを活用した開発",
] as const;

const strengths = [
  "30年以上の業務システム経験",
  "要件整理から実装・確認まで一貫対応",
  "専門用語をできるだけ使わない説明",
  "納期と品質を重視",
  "生成AIを活用した効率的な開発",
  "スマートフォン表示まで丁寧に確認",
] as const;

const skills = [
  "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS",
  "Recharts", "Git", "GitHub", "Vercel", "ChatGPT", "Codex",
] as const;

const responsibilities = [
  "要件整理", "画面構成", "デザイン", "実装",
  "レスポンシブ対応", "テスト", "公開", "修正対応",
] as const;

export default function PortfolioBookPage() {
  return (
    <div className="portfolio-book">
      <div className="portfolio-book-toolbar">
        <p>印刷設定で「横向き」「背景グラフィック」を有効にしてください。</p>
        <PrintButton />
      </div>

      <BookPage page={1} className="portfolio-book-cover">
        <div className="portfolio-book-cover-mark">HARVEST</div>
        <div className="portfolio-book-cover-copy">
          <p className="portfolio-book-kicker">HARVEST PORTFOLIO</p>
          <h1>営業用<br />ポートフォリオ</h1>
          <p className="portfolio-book-role">Web制作者・Webアプリ開発者</p>
          <p className="portfolio-book-lead">
            30年以上のIT経験と生成AIを活用し、<br />
            分かりやすく使いやすいWebサイト・Webアプリを制作します。
          </p>
        </div>
        <ul className="portfolio-book-cover-services">
          {services.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </BookPage>

      <BookPage page={2} label="PROFILE" title="制作する人について">
        <div className="portfolio-book-profile-grid">
          <div className="portfolio-book-profile-copy">
            <p>30年以上にわたり、企業の業務システム開発・運用・プロジェクトマネジメントに携わってきました。</p>
            <p>現在は、Next.js、React、TypeScriptを用いたWebサイト・Webアプリケーションの制作に取り組んでいます。</p>
            <p>長年のIT業務経験を活かし、見た目だけでなく、目的や業務内容を整理しながら、分かりやすく使いやすい形へまとめることを大切にしています。</p>
            <p>生成AIも活用しながら、要件整理、構成、実装、確認まで丁寧に進めます。</p>
          </div>
          <div>
            <h3>強み</h3>
            <CheckList items={strengths} />
            <h3 className="portfolio-book-subheading">保有資格</h3>
            <TagList items={["基本情報技術者", "応用情報技術者", "プロジェクトマネージャ"]} />
          </div>
        </div>
      </BookPage>

      <BookPage page={3} label="SERVICES & SKILLS" title="対応可能な業務・使用技術">
        <div className="portfolio-book-three-columns">
          <InfoPanel title="対応可能業務">
            <CheckList items={["Webサイト制作", "ランディングページ制作", "既存Webサイトの改善", "レスポンシブ対応", "Webアプリケーション開発", "入力・計算・集計機能", "グラフ表示", "CSV・テキスト出力", "ローカルデータ保存", "問い合わせ導線の設計", "生成AIを活用した制作支援"]} />
          </InfoPanel>
          <InfoPanel title="使用技術"><TagList items={skills} /></InfoPanel>
          <InfoPanel title="担当可能範囲"><CheckList items={responsibilities} /></InfoPanel>
        </div>
      </BookPage>

      <BookPage page={4} label="WORK 01" title="Harvest Web Studio">
        <WorkLead category="LP・Web制作サービス" description="個人事業主・小規模事業者向けのWebサイト制作サービスを想定したランディングページです。Webサイト制作が初めての方にも内容が伝わるよう、サービス内容、悩み、制作の流れ、料金、FAQ、相談フォームまでの導線を設計しました。" />
        <div className="portfolio-book-feature-grid">
          <BookImage src="/works/harvest-web-studio.webp" alt="Harvest Web Studioのランディングページ" fit="cover" />
          <BookImage src="/works/harvest-web-studio.svg" alt="Harvest Web StudioのHero画面イメージ" fit="contain" />
        </div>
        <WorkMeta scope={["企画", "ターゲット整理", "ページ構成", "文章整理", "デザイン", "実装", "レスポンシブ対応", "表示確認"]} technologies={workBySlug["harvest-web-studio"].technologies} href="https://harvest-portfolio.vercel.app/works/harvest-web-studio" />
      </BookPage>

      <BookPage page={5} label="WORK 02" title="Bakery & Cafe Harvest">
        <WorkLead category="自主制作・架空店舗Webサイト" description="那須高原の自然と焼きたてパンをテーマにした、架空のベーカリーカフェ公式サイトです。店舗の世界観、季節ごとの魅力、メニュー、店内・テラス席、アクセス情報を分かりやすく構成しました。" />
        <div className="portfolio-book-bakery-grid">
          <BookImage src="/works/bakery-cafe-harvest/hero.jpg" alt="Bakery & Cafe HarvestのHero" fit="cover" />
          <BookImage src="/works/bakery-cafe-harvest/season-summer.jpg" alt="Bakery & Cafe Harvestの季節のイメージ" fit="cover" />
          <BookImage src="/works/bakery-cafe-harvest/menu-bread.jpg" alt="Bakery & Cafe Harvestのパンメニュー" fit="cover" />
        </div>
        <WorkMeta scope={["コンセプト設計", "ページ構成", "文章作成", "画像選定", "デザイン", "実装", "レスポンシブ対応"]} technologies={["Next.js", "React", "TypeScript", "Tailwind CSS"]} href="https://harvest-portfolio.vercel.app/works/bakery-cafe-harvest" />
      </BookPage>

      <BookPage page={6} label="WORKS" title="Webサイト制作事例">
        <div className="portfolio-book-site-works">
          <CompactWork
            title="Lumière Relaxation Salon"
            category="自主制作・架空案件"
            image="/images/harvest-web-studio/work-salon.webp"
            alt="Lumière Relaxation Salonの店内イメージ"
            description="個人経営のリラクゼーションサロンを想定したWebサイト。空間の安心感、施術メニュー、料金、予約導線を分かりやすく設計しました。"
            scope="企画・構成・デザイン・実装・レスポンシブ対応"
          />
          <CompactWork
            title="あおば行政書士事務所"
            category="自主制作・架空案件"
            image="/images/harvest-web-studio/work-legal-office.webp"
            alt="あおば行政書士事務所のイメージ"
            description="個人・小規模事業者向けの行政書士事務所を想定したWebサイト。専門性と相談しやすさを両立し、業務案内、料金、問い合わせ導線を設計しました。"
            scope="企画・構成・文章整理・デザイン・実装・表示確認"
          />
        </div>
      </BookPage>

      <BookPage page={7} label="WEB APPLICATIONS" title="Webアプリ制作実績">
        <div className="portfolio-book-app-grid">
          <AppWork slug="retirement-simulator" title="動的リタイアメント・シミュレーター" description="投資、年金、生活費、インフレなどを考慮し、将来の資産推移を試算するWebアプリ。" features={["入力・自動計算", "グラフ表示", "レスポンシブ対応"]} />
          <AppWork slug="furusato-tax" title="ふるさと納税シミュレーション＋" description="給与や各種控除を入力し、ふるさと納税の上限額を試算するWebアプリ。" features={["詳細入力", "自動計算", "グラフ表示"]} />
          <AppWork slug="travel-simulator" title="トラベル・プランナー＋" description="旅行日程、費用、メモをまとめて管理し、CSVやテキストで出力できる旅行計画アプリ。" features={["ローカル保存", "CSV出力", "テキスト出力"]} />
        </div>
      </BookPage>

      <BookPage page={8} className="portfolio-book-contact">
        <div>
          <p className="portfolio-book-kicker">CONTACT</p>
          <h2>制作のご相談について</h2>
          <p className="portfolio-book-contact-copy">Webサイト制作、LP制作、既存サイト改善、小規模Webアプリ開発についてご相談いただけます。<br />内容がまだ整理されていない段階でも、目的やご要望を伺いながら進めます。</p>
        </div>
        <div className="portfolio-book-links">
          <ContactLink label="ポートフォリオ" href="https://harvest-portfolio.vercel.app" />
          <ContactLink label="GitHub" href="https://github.com/harvest-dev-jp" />
        </div>
        <p className="portfolio-book-signature">Webサイト制作・LP制作・Webアプリ開発<br /><strong>Harvest</strong></p>
      </BookPage>
    </div>
  );
}

function BookPage({ page, label, title, className = "", children }: { page: number; label?: string; title?: string; className?: string; children: React.ReactNode }) {
  return <section className={`portfolio-book-page ${className}`}>
    {(label || title) && <header className="portfolio-book-page-header"><div><p>{label}</p><h2>{title}</h2></div><span>HARVEST PORTFOLIO</span></header>}
    {children}
    <span className="portfolio-book-page-number">{String(page).padStart(2, "0")}</span>
  </section>;
}

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="portfolio-book-panel"><h3>{title}</h3>{children}</section>;
}

function CheckList({ items }: { items: readonly string[] }) {
  return <ul className="portfolio-book-check-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function TagList({ items }: { items: readonly string[] }) {
  return <ul className="portfolio-book-tags">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function BookImage({ src, alt, fit }: { src: string; alt: string; fit: "cover" | "contain" }) {
  return <figure className="portfolio-book-image"><Image src={src} alt={alt} fill sizes="(min-width: 900px) 520px, 90vw" loading="eager" className={fit === "cover" ? "object-cover object-center" : "object-contain object-center"} /></figure>;
}

function WorkLead({ category, description }: { category: string; description: string }) {
  return <div className="portfolio-book-work-lead"><span>{category}</span><p>{description}</p></div>;
}

function WorkMeta({ scope, technologies, href }: { scope: readonly string[]; technologies: readonly string[]; href: string }) {
  return <div className="portfolio-book-work-meta"><div><strong>担当範囲</strong><TagList items={scope} /></div><div><strong>使用技術</strong><p>{technologies.join(" / ")}</p><a href={href}>公開ページを見る →</a></div></div>;
}

function CompactWork({ title, category, image, alt, description, scope }: { title: string; category: string; image: string; alt: string; description: string; scope: string }) {
  return <article className="portfolio-book-compact-work"><BookImage src={image} alt={alt} fit="cover" /><div><span>{category}</span><h3>{title}</h3><p>{description}</p><dl><dt>担当範囲</dt><dd>{scope}</dd><dt>使用技術</dt><dd>Next.js / React / TypeScript / Tailwind CSS</dd></dl></div></article>;
}

function AppWork({ slug, title, description, features }: { slug: "retirement-simulator" | "furusato-tax" | "travel-simulator"; title: string; description: string; features: readonly string[] }) {
  const work = workBySlug[slug];
  return <article className="portfolio-book-app-card"><BookImage src={work.image} alt={work.imageAlt} fit="contain" /><h3>{title}</h3><p>{description}</p><TagList items={features} /><small>{work.technologies.join(" / ")}</small></article>;
}

function ContactLink({ label, href }: { label: string; href: string }) {
  return <a href={href}><span>{label}</span><strong>{href}</strong></a>;
}
