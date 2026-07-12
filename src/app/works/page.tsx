import Link from "next/link";

export default function Works() {
  const projects = [
    {
      id: 1,
      icon: "🌾",
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
      icon: "📈",
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
      icon: "📱",
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
      icon: "🧳",
      status: "公開中",
      title: "トラベルシミュレーター",
      description:
        "旅行日程、費用、VLOG撮影計画をまとめて管理できる旅行プランニングアプリです。",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "/works/travel-simulator",
      linkLabel: "詳細を見る →",
      external: false,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="container-md pt-16 pb-8">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-4">Works</h1>
          <p className="text-lg text-harvest-600">
            業務改善や暮らしに役立つWebアプリを、シンプルで使いやすい形にまとめています。
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="container-md pt-0 pb-16">
        <div className="mx-auto grid max-w-4xl gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="card group transition-all hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Icon Area */}
                <div className="flex h-40 w-full items-center justify-center rounded-lg bg-harvest-100 md:h-36 md:w-48 md:flex-shrink-0">
                  <span className="text-6xl" aria-hidden="true">
                    {project.icon}
                  </span>
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
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-md section-py text-center">
        <h2 className="heading-2 mb-6">プロジェクトについてご質問ですか？</h2>
        <p className="mx-auto mb-8 max-w-2xl text-harvest-600">
          各プロジェクトの詳細や、新規開発のご相談はお気軽にお問い合わせください。
        </p>
        <Link href="/contact" className="btn-primary">
          お問い合わせ
        </Link>
      </section>
    </div>
  );
}
