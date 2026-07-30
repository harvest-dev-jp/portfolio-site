export type WorkImageFit = "cover" | "contain";

export type Work = {
  slug: string;
  title: string;
  category: string;
  kindLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit: WorkImageFit;
  href: string;
  technologies: readonly string[];
};

export const works: readonly Work[] = [
  {
    slug: "harvest-web-studio",
    title: "Harvest Web Studio",
    category: "LP・Web制作サービス",
    kindLabel: "自主制作・架空サービス",
    description:
      "個人事業主・小規模事業者向けのWeb制作サービスを想定したLP。サービス、料金、FAQ、相談フォームまでの導線を設計。",
    image: "/works/harvest-web-studio.webp",
    imageAlt: "Harvest Web Studioの制作事例画面",
    imageFit: "cover",
    href: "/works/harvest-web-studio",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "relaxation-salon",
    title: "Lumière Relaxation Salon",
    category: "店舗Webサイト",
    kindLabel: "自主制作・架空案件",
    description:
      "個人経営のリラクゼーションサロンを想定したWebサイト。空間の安心感、メニュー、料金、予約導線を分かりやすく設計。",
    image: "/images/harvest-web-studio/work-salon.webp",
    imageAlt: "自然光が入るLumière Relaxation Salonの店内イメージ",
    imageFit: "cover",
    href: "/works/relaxation-salon",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "administrative-scrivener",
    title: "あおば行政書士事務所",
    category: "士業Webサイト",
    kindLabel: "自主制作・架空案件",
    description:
      "個人・小規模事業者向けの行政書士事務所を想定したWebサイト。専門性と相談しやすさを両立し、業務案内、料金、問い合わせ導線を設計。",
    image: "/images/harvest-web-studio/work-legal-office.webp",
    imageAlt: "あおば行政書士事務所の制作事例イメージ",
    imageFit: "cover",
    href: "/works/administrative-scrivener",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "travel-simulator",
    title: "トラベル・プランナー＋",
    category: "Webアプリ",
    kindLabel: "個人開発",
    description:
      "旅行日程、費用、VLOG撮影メモをまとめて管理できる旅行計画アプリ。保存、CSV、テキスト出力などを実装。",
    image: "/works/travel-simulator.webp",
    imageAlt: "トラベル・プランナー＋の旅行計画画面",
    imageFit: "contain",
    href: "/works/travel-simulator",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "bakery-cafe-harvest",
    title: "Bakery & Cafe Harvest",
    category: "店舗Webサイト",
    kindLabel: "自主制作・架空案件",
    description:
      "那須高原の自然と焼きたてパンをテーマにした、架空のベーカリーカフェ公式サイトです。",
    image: "/works/bakery-cafe-harvest/thumbnail.jpg",
    imageAlt: "Bakery & Cafe Harvestの店舗Webサイト",
    imageFit: "cover",
    href: "/works/bakery-cafe-harvest",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    slug: "furusato-tax",
    title: "ふるさと納税シミュレーション＋",
    category: "Webアプリ",
    kindLabel: "個人開発",
    description:
      "iDeCoや住宅ローン控除も考慮できる、ふるさと納税上限額の試算アプリです。",
    image: "/works/furusato-tax2.png",
    imageAlt: "ふるさと納税シミュレーション＋の試算画面",
    imageFit: "contain",
    href: "/works/furusato-tax",
    technologies: ["React", "TypeScript", "Recharts"],
  },
  {
    slug: "retirement-simulator",
    title: "リタイアメント・シミュレーター",
    category: "Webアプリ",
    kindLabel: "個人開発",
    description:
      "投資・年金・インフレを考慮して、将来の資産推移を試算するWebアプリです。",
    image: "/works/retirement-simulator2.png",
    imageAlt: "リタイアメント・シミュレーターの資産推移画面",
    imageFit: "contain",
    href: "/works/featured",
    technologies: ["React", "TypeScript", "Recharts"],
  },
  {
    slug: "portfolio-site",
    title: "Harvest Portfolio Site",
    category: "ポートフォリオサイト",
    kindLabel: "自主制作",
    description:
      "Next.js、TypeScript、Tailwind CSSで制作した個人ポートフォリオサイトです。",
    image: "/works/portfolio-site.png",
    imageAlt: "Harvest Portfolio Siteのトップページ",
    imageFit: "contain",
    href: "https://github.com/harvest-dev-jp/portfolio-site",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub"],
  },
];
