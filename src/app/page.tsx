import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortfolioFaq from "@/components/PortfolioFaq";
import WorkCard from "@/components/WorkCard";
import { works } from "@/lib/portfolio/works";

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
  "内容整理から対応",
  "スマートフォン対応",
  "公開までサポート",
  "同じ担当者が一貫対応",
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
      "問い合わせ・公開サポート",
    ],
    label: "制作事例を見る",
    href: "/#works",
  },
  {
    title: "LP制作",
    description:
      "サービスや商品の魅力を、1ページで分かりやすく伝えるランディングページを制作します。",
    items: [
      "ターゲット整理",
      "セクション構成",
      "コピー・CTA設計",
      "レスポンシブ対応",
    ],
    label: "LP制作事例を見る",
    href: "/#works",
  },
  {
    title: "既存サイト改善",
    description:
      "現在のWebサイトについて、文章、構成、スマートフォン表示、問い合わせ導線を見直します。",
    items: [
      "情報・文章整理",
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
      "入力・自動計算",
      "グラフ・集計",
      "ローカル保存",
      "CSV・テキスト出力",
    ],
    label: "Webアプリ事例を見る",
    href: "/#works",
  },
] as const;

const approaches = [
  ["専門用語をできるだけ使わない", <>Web制作が初めての方にも、<NoBreak>分かりやすい言葉</NoBreak>でご案内します。</>],
  ["目的と情報を整理する", <>すぐに制作へ入るのではなく、<NoBreak>何を誰に伝えたいのか</NoBreak>を整理します。</>],
  ["料金と対応範囲を明確にする", <>作業開始前に、<NoBreak>対応内容と費用の目安</NoBreak>をご案内します。</>],
  ["スマートフォンでの使いやすさ", <>PCだけでなく、<NoBreak>スマートフォン</NoBreak>でも読みやすく操作しやすい構成にします。</>],
  ["公開まで同じ担当者が対応", <>相談、構成、制作、確認、公開まで、<NoBreak>一貫して対応</NoBreak>します。</>],
] as const;

const flowSteps = [
  ["無料相談", "現在のお困りごとや、作りたいもののイメージを伺います。"],
  ["目的・内容の整理", "対象者、必要な情報、サイトやアプリの目的を整理します。"],
  ["構成・お見積もり", "制作内容、ページ構成、費用、期間の目安をご案内します。"],
  ["デザイン・実装", "確認いただきながら、画面と機能を制作します。"],
  ["確認・修正", "PC・スマートフォンで確認し、必要な修正を行います。"],
  ["公開・納品", "最終確認後、公開または納品を行います。"],
] as const;

const pricing = [
  {
    title: "既存サイト改善",
    price: "49,800円〜",
    description:
      "文章、構成、余白、配色、スマートフォン表示、問い合わせ導線などを見直します。",
    items: ["現状確認", "改善案", "軽微な文章・レイアウト修正", "スマートフォン表示調整"],
    label: "改善について相談する",
  },
  {
    title: "LP制作",
    price: "98,000円〜",
    description:
      "サービスや商品を1ページで伝えるランディングページを制作します。",
    items: ["ターゲット整理", "ページ構成", "コピー整理", "デザイン・実装", "スマートフォン対応"],
    label: "LP制作について相談する",
  },
  {
    title: "小規模Webサイト制作",
    price: "198,000円〜",
    description:
      "店舗、士業、個人事業主向けの小規模なWebサイトを制作します。",
    items: ["3〜5ページ程度", "ページ構成", "デザイン・実装", "スマートフォン対応", "問い合わせ・公開サポート"],
    label: "Webサイト制作について相談する",
  },
  {
    title: "小規模Webアプリ開発",
    price: "内容によりお見積もり",
    description:
      "入力、計算、集計、保存、出力などを備えた小規模な業務支援Webアプリを制作します。",
    items: ["入力フォーム", "自動計算", "グラフ表示", "ローカル保存", "CSV・テキスト出力"],
    label: "Webアプリについて相談する",
  },
] as const;

const buttonStyles = {
  primary:
    "home-button-primary border border-harvest-800 bg-harvest-800 text-white hover:border-harvest-700 hover:bg-harvest-700 focus-visible:outline-harvest-800",
  secondary:
    "border border-harvest-700 bg-white text-harvest-900 hover:bg-harvest-50 focus-visible:outline-harvest-700",
  text:
    "text-harvest-800 underline decoration-harvest-300 underline-offset-4 hover:text-harvest-900 focus-visible:outline-harvest-700",
} as const;

export default function Home() {
  return (
    <div className="home-sales overflow-x-clip pb-24 md:pb-0">
      <section className="home-hero bg-harvest-50/70 px-6 py-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[0.16em] text-harvest-700">
              個人事業主・小規模事業者向け
            </p>
            <h1 className="home-hero-title mt-5 max-w-[12em] text-4xl font-bold leading-[1.25] text-harvest-900 sm:text-5xl lg:text-[3.25rem]">
              事業の魅力と仕組みを、
              <br />
              分かりやすい<NoBreak>Webサイトに。</NoBreak>
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
              <CtaLink href="/contact" variant="primary">
                制作について相談する
              </CtaLink>
              <CtaLink href="/#works" variant="secondary">
                制作事例を見る
              </CtaLink>
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
              className="home-trust-item flex min-h-12 min-w-0 items-center gap-3 rounded-lg bg-harvest-50 px-4 py-3 font-medium text-stone-700"
            >
              <span aria-hidden="true" className="font-bold text-harvest-700">
                ✓
              </span>
              <span className="whitespace-nowrap">{item}</span>
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
                      <span className="whitespace-nowrap">{item}</span>
                    </li>
                  ))}
                </ul>
                <CtaLink href={service.href} variant="text" className="mt-6 self-start">
                  {service.label}
                </CtaLink>
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

      <section id="works" className="scroll-mt-24 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="WORKS"
            title="制作事例"
            lead={
              <>
                Webサイト、LP、Webアプリなど、
                <br className="sm:hidden" />
                目的に合わせて設計した制作事例をご紹介します。
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {works.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-harvest-50/60 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="PROFILE"
            title="制作する人について"
            lead="業務内容を理解し、目的と情報を整理するところから丁寧に進めます。"
          />
          <div className="home-profile-card mt-10 grid items-center gap-10 rounded-2xl border border-harvest-200 bg-white p-6 md:p-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-12">
            <figure className="home-profile-visual mx-auto w-full max-w-[17rem] text-center">
              <Image
                src="/profile.png"
                alt="Web制作者・Webアプリ開発者 Takeshi Akaguma"
                width={320}
                height={320}
                sizes="(min-width: 1024px) 272px, min(272px, calc(100vw - 96px))"
                className="aspect-square h-auto w-full rounded-full border-4 border-harvest-100 object-cover"
              />
              <figcaption className="mt-4 font-semibold text-harvest-900">
                Web制作者・Webアプリ開発者
              </figcaption>
            </figure>
            <div className="min-w-0">
              <div className="space-y-4 leading-8 text-stone-700">
                <p>
                  業務システムの開発・運用に30年以上携わり、現在はNext.js、React、TypeScriptを用いた
                  Webサイト・Webアプリ制作に取り組んでいます。
                </p>
                <p>
                  長年のIT業務経験を活かし、見た目だけでなく、目的や業務内容を整理しながら
                  分かりやすく使いやすい形へまとめることを大切にしています。
                </p>
                <p>
                  生成AIも活用しながら、要件整理、構成、実装、確認まで丁寧に進めます。
                </p>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <ProfileList
                  title="資格"
                  items={["基本情報技術者", "応用情報技術者", "プロジェクトマネージャ"]}
                />
                <ProfileList
                  title="得意分野"
                  items={[
                    "要件整理",
                    "業務内容の可視化",
                    "Webサイト構成",
                    "シミュレーション系Webアプリ",
                    "入力・計算・保存・出力機能",
                    "スマートフォン対応",
                  ]}
                />
              </div>
              <CtaLink href="/about" variant="secondary" className="home-profile-cta mt-7">
                詳しいプロフィールを見る
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="OUR APPROACH"
            title="制作で大切にしていること"
            lead="相談から公開まで、分かりやすさと使いやすさを意識して進めます。"
          />
          <div className="home-approach-grid mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {approaches.map(([title, description], index) => (
              <article
                key={title}
                className="home-card min-w-0 rounded-2xl border border-harvest-200 bg-harvest-50/60 p-6"
              >
                <p className="text-sm font-bold text-harvest-700">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-bold leading-snug text-harvest-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-stone-700">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-harvest-50/60 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="FLOW"
            title="制作の流れ"
            lead={
              <>
                初めての方にも進み方が分かるよう、
                <br className="sm:hidden" />
                ご相談から公開までの流れをご案内します。
              </>
            }
          />
          <ol className="home-flow-grid mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flowSteps.map(([title, description], index) => (
              <li
                key={title}
                className="home-card min-w-0 rounded-2xl border border-harvest-200 bg-white p-6"
              >
                <p className="font-bold text-harvest-700">STEP {index + 1}</p>
                <h3 className="mt-3 text-xl font-bold text-harvest-900">{title}</h3>
                <p className="mt-3 leading-7 text-stone-700">{description}</p>
              </li>
            ))}
          </ol>
          <ul className="home-flow-note mt-7 space-y-2 rounded-xl border border-harvest-200 bg-white p-5 text-sm leading-6 text-stone-700">
            <li>・内容により工程は変わる場合があります。</li>
            <li>・Webアプリでは仕様確認やテスト工程が増える場合があります。</li>
            <li>・素材や原稿の準備状況により期間は変動します。</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="PRICING"
            title="料金の目安"
            lead={
              <>
                制作内容を確認したうえで、
                <br className="sm:hidden" />
                正式なお見積もりをご案内します。
              </>
            }
          />
          <div className="home-pricing-grid mt-10 grid gap-6 md:grid-cols-2">
            {pricing.map((plan) => (
              <article
                key={plan.title}
                className="home-card flex min-w-0 flex-col rounded-2xl border border-harvest-200 bg-white p-6 md:p-7"
              >
                <h3 className="text-xl font-bold text-harvest-900">{plan.title}</h3>
                <p className="mt-4 text-3xl font-bold leading-tight text-harvest-900">
                  <span className="whitespace-nowrap">{plan.price}</span>
                </p>
                <p className="mt-4 leading-7 text-stone-700">{plan.description}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-stone-700">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-harvest-700">・</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <CtaLink href="/contact" variant="primary" className="mt-7 w-full">
                  {plan.label}
                </CtaLink>
              </article>
            ))}
          </div>
          <div className="home-pricing-note mt-8 rounded-xl bg-harvest-50 p-5 text-sm leading-7 text-stone-700">
            <p className="font-bold text-harvest-900">表示料金は参考価格です。</p>
            <p className="mt-2">
              ページ数、機能、原稿・画像の準備状況、修正回数、公開方法などにより料金は変わります。
              正式な料金は、内容を確認したうえでお見積もりします。
            </p>
          </div>
        </div>
      </section>

      <PortfolioFaq />

      <ConsultationCta
        final
        title={
          <>
            まだ内容が整理できていなくても
            <span className="whitespace-nowrap">大丈夫です。</span>
          </>
        }
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
        <CtaLink href="/contact" variant="primary" className="w-full">
          制作について相談する
        </CtaLink>
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

function ProfileList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="home-profile-group min-w-0">
      <h3 className="font-bold text-harvest-900">{title}</h3>
      <ul className="mt-2 flex flex-wrap gap-2 text-sm text-stone-700">
        {items.map((item) => (
          <li
            key={item}
            className="whitespace-nowrap rounded-full bg-harvest-50 px-3 py-1.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoBreak({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}

function CtaLink({
  href,
  variant,
  className = "",
  children,
}: {
  href: string;
  variant: keyof typeof buttonStyles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
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
        final
          ? "home-cta-final bg-harvest-800 text-white"
          : "bg-harvest-100/70 text-harvest-900"
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
        <CtaLink
          href="/contact"
          variant={final ? "secondary" : "primary"}
          className="mt-7"
        >
          制作について相談する
        </CtaLink>
        <p className={`mt-4 text-sm ${final ? "text-white/80" : "text-stone-600"}`}>
          {note}
        </p>
      </div>
    </section>
  );
}
