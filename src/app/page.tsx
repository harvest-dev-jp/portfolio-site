import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Harvest｜個人事業主向けWebサイト・Webアプリ制作",
  description:
    "個人事業主・小規模事業者向けに、Webサイト、LP、既存サイト改善、小規模Webアプリの制作を行うHarvestのポートフォリオ・サービスサイトです。",
  openGraph: {
    title: "Harvest｜個人事業主向けWebサイト・Webアプリ制作",
    description:
      "個人事業主・小規模事業者向けのWebサイト・LP・小規模Webアプリ制作。",
    type: "website",
  },
};

const trustItems = [
  "初回相談無料",
  "全国オンライン対応",
  "埼玉・東京は対面相談可能",
  "内容整理から公開まで対応",
] as const;

const services = [
  {
    title: "Webサイト制作",
    description:
      "店舗、士業、個人事業主向けの小規模なWebサイトを制作します。",
    items: [
      "事業内容の整理",
      "ページ構成",
      "スマートフォン対応",
      "問い合わせ導線",
      "公開サポート",
    ],
    label: "制作事例を見る",
    href: "/works",
  },
  {
    title: "LP制作",
    description:
      "サービスや商品の魅力を、1ページで分かりやすく伝えるランディングページを制作します。",
    items: [
      "ターゲット整理",
      "セクション構成",
      "コピー整理",
      "CTA設計",
      "レスポンシブ対応",
    ],
    label: "LP制作事例を見る",
    href: "/works/harvest-web-studio",
  },
  {
    title: "既存サイト改善",
    description:
      "現在のWebサイトについて、文章、構成、スマートフォン表示、問い合わせ導線を見直します。",
    items: [
      "情報整理",
      "文章の読みやすさ",
      "余白・配色",
      "スマートフォン対応",
      "CTA改善",
    ],
    label: "相談する",
    href: "/contact",
  },
  {
    title: "小規模Webアプリ開発",
    description:
      "入力、計算、集計、保存、出力などを備えた、業務支援用の小規模Webアプリを制作します。",
    items: [
      "入力フォーム",
      "自動計算",
      "グラフ表示",
      "ローカル保存",
      "CSV・テキスト出力",
    ],
    label: "Webアプリ事例を見る",
    href: "/works",
  },
] as const;

const featuredWorks = [
  {
    title: "Harvest Web Studio",
    category: "LP・Web制作サービス",
    label: "自主制作・架空サービス",
    description:
      "個人事業主・小規模事業者向けのWeb制作サービスを想定したLP。サービス、料金、FAQ、相談フォームまでの導線を設計。",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/works/harvest-web-studio.webp",
    href: "/works/harvest-web-studio",
  },
  {
    title: "Lumière Relaxation Salon",
    category: "店舗Webサイト",
    label: "自主制作・架空案件",
    description:
      "個人経営のリラクゼーションサロンを想定したWebサイト。空間の安心感、メニュー、料金、予約導線を分かりやすく設計。",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/harvest-web-studio/work-salon.webp",
    href: "/works/relaxation-salon",
  },
  {
    title: "あおば行政書士事務所",
    category: "士業Webサイト",
    label: "自主制作・架空案件",
    description:
      "個人・小規模事業者向けの行政書士事務所を想定したWebサイト。専門性と相談しやすさを両立し、業務案内、料金、問い合わせ導線を設計。",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/harvest-web-studio/work-legal-office.webp",
    href: "/works/administrative-scrivener",
  },
  {
    title: "トラベル・プランナー＋",
    category: "Webアプリ",
    label: "個人開発",
    description:
      "旅行日程、費用、VLOG撮影メモをまとめて管理できる旅行計画アプリ。保存、CSV、テキスト出力などを実装。",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/works/travel-simulator.webp",
    href: "/works/travel-simulator",
  },
] as const;

const primaryButton =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg bg-harvest-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-harvest-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg border border-harvest-700 bg-white px-6 py-3 font-semibold text-harvest-800 transition-colors hover:bg-harvest-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700";

export default function Home() {
  return (
    <div className="home-sales overflow-x-clip pb-24 md:pb-0">
      <section className="home-hero bg-harvest-50/70 px-6 py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[0.16em] text-harvest-700">
              個人事業主・小規模事業者向け
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.25] text-harvest-900 sm:text-5xl lg:text-[3.35rem]">
              事業の魅力と仕組みを、
              <br />
              分かりやすい<span className="whitespace-nowrap">Webサイト</span>に。
            </h1>
            <div className="mt-6 space-y-3 text-lg leading-8 text-stone-700">
              <p>
                <span className="whitespace-nowrap">Webサイト制作</span>、
                <span className="whitespace-nowrap">LP制作</span>、既存サイト改善、
                <br className="hidden sm:block" />
                小規模な業務支援<span className="whitespace-nowrap">Webアプリ</span>の開発に対応します。
              </p>
              <p>
                初めての方にも、
                <br className="sm:hidden" />
                専門用語をできるだけ使わず丁寧にご案内します。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={primaryButton}>
                制作について相談する
              </Link>
              <Link href="/works" className={secondaryButton}>
                制作事例を見る
              </Link>
            </div>
            <ul className="mt-7 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              {[
                "初回相談無料",
                "全国オンライン対応",
                "埼玉・東京は対面相談可能",
                "個人事業主・小規模事業者向け",
              ].map((item) => (
                <li key={item} className="flex min-w-0 items-start gap-2">
                  <span aria-hidden="true" className="font-bold text-harvest-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="home-hero-visual grid min-w-0 grid-cols-2 gap-3">
            <figure className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-harvest-200 bg-white shadow-sm">
              <Image
                src="/works/harvest-web-studio.webp"
                alt="Harvest Web Studioの制作事例画面"
                fill
                priority
                sizes="(min-width: 1024px) 520px, calc(100vw - 48px)"
                className="object-cover object-top"
              />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-harvest-200 bg-white">
              <Image
                src="/images/harvest-web-studio/work-salon.webp"
                alt="Lumière Relaxation Salonの制作事例イメージ"
                fill
                sizes="(min-width: 1024px) 250px, calc((100vw - 60px) / 2)"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-harvest-200 bg-white">
              <Image
                src="/images/harvest-web-studio/work-legal-office.webp"
                alt="あおば行政書士事務所の制作事例イメージ"
                fill
                sizes="(min-width: 1024px) 250px, calc((100vw - 60px) / 2)"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      <section aria-label="相談対応について" className="border-y border-harvest-100 bg-white px-6 py-6">
        <ul className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <li
              key={item}
              className="flex min-h-12 items-center gap-3 rounded-lg bg-harvest-50 px-4 py-3 font-medium text-stone-700"
            >
              <span aria-hidden="true" className="font-bold text-harvest-700">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="services" className="scroll-mt-24 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="SERVICES"
            title="対応できること"
            lead={
              <>
                目的やご予算に合わせて、
                <br className="sm:hidden" />
                小規模事業者に必要なWeb制作・Webアプリ開発をご提案します。
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="home-card flex min-w-0 flex-col rounded-2xl border border-harvest-200 bg-harvest-50/60 p-6 md:p-7"
              >
                <h3 className="text-2xl font-bold text-harvest-900">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-stone-700">
                  {service.description}
                </p>
                <ul className="mt-5 grid flex-1 gap-2 text-sm text-stone-700 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-harvest-700">
                        ・
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex min-h-11 items-center self-start font-semibold text-harvest-800 underline decoration-harvest-300 underline-offset-4 hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700"
                >
                  {service.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta
        title={
          <>
            何を作ればよいか決まっていなくても、
            <br />
            まずはご相談ください。
          </>
        }
        description={
          <>
            現在のお困りごとや、
            <br className="sm:hidden" />
            作りたいもののイメージを伺いながら整理します。
          </>
        }
        note="初回相談無料・全国オンライン対応"
      />

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="FEATURED WORKS"
            title="おすすめ制作事例"
            lead={
              <>
                Webサイト、LP、Webアプリなど、
                <br className="sm:hidden" />
                目的に合わせて設計した制作事例をご紹介します。
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredWorks.map((work) => (
              <article
                key={work.title}
                className="home-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-harvest-200 bg-white"
              >
                <div className="relative aspect-[16/10] bg-harvest-50">
                  <Image
                    src={work.image}
                    alt={`${work.title}のサムネイル`}
                    fill
                    sizes="(min-width: 768px) 550px, calc(100vw - 48px)"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-harvest-100 px-3 py-1 text-harvest-800">
                      {work.category}
                    </span>
                    <span className="rounded-full border border-harvest-200 px-3 py-1 text-stone-700">
                      {work.label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-harvest-900">
                    {work.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-7 text-stone-700">
                    {work.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {work.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded bg-harvest-50 px-2.5 py-1 text-xs text-harvest-800"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={work.href}
                    className="mt-6 inline-flex min-h-11 items-center self-start font-semibold text-harvest-800 underline decoration-harvest-300 underline-offset-4 hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700"
                  >
                    詳しく見る
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/works" className={secondaryButton}>
              すべての制作事例を見る
            </Link>
          </div>
        </div>
      </section>

      <ConsultationCta
        final
        title="まだ内容が整理できていなくても大丈夫です。"
        description={
          <>
            Webサイト、LP、小規模Webアプリについて、
            <br />
            現在のお困りごとや作りたいものからお聞かせください。
          </>
        }
        note="初回相談無料・全国オンライン対応・埼玉・東京は対面相談可能"
      />

      <div className="home-mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-harvest-200 bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden print:hidden">
        <Link href="/contact" className={`${primaryButton} w-full`}>
          制作について相談する
        </Link>
      </div>
    </div>
  );
}

function SectionHeading({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead: React.ReactNode;
}) {
  return (
    <div className="home-section-heading">
      <p className="text-sm font-bold tracking-[0.18em] text-harvest-700">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-harvest-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">{lead}</p>
    </div>
  );
}

function ConsultationCta({
  title,
  description,
  note,
  final = false,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  note: string;
  final?: boolean;
}) {
  return (
    <section
      className={`home-cta px-6 py-14 md:py-16 ${
        final ? "bg-harvest-800 text-white" : "bg-harvest-100/70 text-harvest-900"
      }`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        <p
          className={`mt-5 text-lg leading-8 ${
            final ? "text-white/90" : "text-stone-700"
          }`}
        >
          {description}
        </p>
        <Link
          href="/contact"
          className={`mt-7 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
            final
              ? "bg-white text-harvest-900 hover:bg-harvest-50 focus-visible:outline-white"
              : "bg-harvest-700 text-white hover:bg-harvest-800 focus-visible:outline-harvest-700"
          }`}
        >
          制作について相談する
        </Link>
        <p className={`mt-4 text-sm ${final ? "text-white/80" : "text-stone-600"}`}>
          {note}
        </p>
      </div>
    </section>
  );
}
