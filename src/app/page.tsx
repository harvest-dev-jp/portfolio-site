import Image from "next/image";
import Link from "next/link";

export default function Home() {

const projects = [
  {
    id: 1,
    thumbnail: "/works/portfolio-site.png",
    status: "公開中",
    title: "Harvest Portfolio Site",
    description:
      "Next.js、TypeScript、Tailwind CSSで制作した個人ポートフォリオサイトです。",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub"],
    link: "https://github.com/harvest-dev-jp/portfolio-site",
    linkLabel: "GitHubを見る →",
    external: true,
  },
  {
    id: 2,
    thumbnail: "/works/retirement-simulator.png",
    status: "公開中",
    title: "リタイアメント・シミュレーター",
    description:
      "投資・年金・インフレを考慮して、将来の資産推移を試算するWebアプリです。",
    technologies: ["React", "TypeScript", "Recharts"],
    link: "/works/featured",
    linkLabel: "詳細を見る →",
    external: false,
  },
  {
    id: 3,
    thumbnail: "/works/furusato-tax.png",
    status: "公開中",
    title: "ふるさと納税シミュレーション＋",
    description:
      "iDeCoや住宅ローン控除も考慮できる、ふるさと納税上限額の試算アプリです。",
    technologies: ["React", "TypeScript", "Recharts"],
    link: "/works/furusato-tax",
    linkLabel: "詳細を見る →",
    external: false,
  },
  {
    id: 4,
    thumbnail: "/works/bakery-cafe-harvest/thumbnail.jpg",
    status: "公開中",
    title: "Bakery & Cafe Harvest",
    description:
      "那須高原の自然と焼きたてパンをテーマにした、架空のベーカリーカフェ公式サイト。季節感のあるデザイン、レスポンシブ対応、スクロールアニメーションを実装しています。",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    link: "/works/bakery-cafe-harvest",
    linkLabel: "詳しく見る",
    external: false,
  },
  {
    id: 5,
    thumbnail: "/works/travel-simulator.svg",
    status: "公開中",
    title: "トラベルシミュレーター",
    description:
      "旅行日程、費用、VLOG撮影メモをまとめて管理できる旅行計画アプリ。旅行前のスケジュール作成から、旅行後の動画制作までをサポートします。",
    features: [
      "旅行基本情報",
      "詳細日程",
      "費用合計",
      "VLOG撮影メモ",
      "CSV出力",
      "テキスト出力",
      "ローカル保存",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "/works/travel-simulator",
    linkLabel: "詳しく見る",
    external: false,
  },
];
  return (
    <div>
      {/* Hero Section */}
      <section className="container-md pt-6 pb-8">
        <div className="max-w-3xl">
          <p className="mb-6 max-w-2xl text-xl leading-relaxed text-harvest-600">
            AIとWeb技術を活用し、業務の効率化・見える化を支援します。<br />
            開発したProjectを随時公開していきます。
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="container-md pt-0 pb-16">
        <h2 className="heading-2 mb-6">Projects</h2>
        <div className="mx-auto grid max-w-4xl gap-6">
          {projects.map((project) => {
            const features =
              "features" in project ? project.features ?? [] : [];

            return (
              <article
                key={project.id}
                className="card group transition-all hover:shadow-lg"
              >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Thumbnail Area */}
                <div className="relative h-44 w-full overflow-hidden rounded-lg border border-harvest-100 bg-white md:h-40 md:w-64 md:flex-shrink-0">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title}のサムネイル`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 768px) 256px, 100vw"
                  />
                </div>

                {/* Text Area */}
                <div className="flex-1">
                  <span className="mb-3 inline-block rounded-full bg-harvest-100 px-3 py-1 text-xs text-harvest-700">
                    {project.status}
                  </span>

                  <h3 className="heading-3 mb-2">{project.title}</h3>

                  <p className="mb-4 text-harvest-600">
                    {project.description}
                  </p>

                  {features.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-white px-2.5 py-1 text-xs text-harvest-700 ring-1 ring-harvest-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-harvest-100 px-2 py-1 text-xs text-harvest-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link ? (
                    project.external ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-medium text-harvest-700 hover:text-harvest-900 group-hover:underline"
                      >
                        {project.linkLabel}
                      </a>
                    ) : (
                      <Link
                        href={project.link}
                        className="inline-block font-medium text-harvest-700 hover:text-harvest-900 group-hover:underline"
                      >
                        {project.linkLabel}
                      </Link>
                    )
                  ) : (
                    <span className="inline-block font-medium text-harvest-400">
                      {project.linkLabel}
                    </span>
                  )}
                </div>
              </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-md pt-6 pb-8">
        <h2 className="heading-2 mb-6">Concept</h2>
        <div className="max-w-3xl">
          <p className="mb-6 max-w-2xl text-xl leading-relaxed text-harvest-600">
            実りある成果、信頼、AI活用、落ち着いた雰囲気を追求するWebサイト
          </p>
        </div>
      </section>

    </div>
  );
}
