import Link from "next/link";

export default function Works() {
  const projects = [
    {
      id: 1,
      icon: "🌾",
      status: "公開中",
      title: "Harvest Portfolio Site",
      description:
        "Next.js、TypeScript、Tailwind CSSを使用して開発した個人ポートフォリオサイト。レスポンシブ対応を行い、開発実績やスキル、活動内容を紹介しています。",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub"],
      link: "https://github.com/harvest-dev-jp/portfolio-site",
      linkLabel: "GitHubを見る →",
      external: true,
    },
    {
      id: 2,
      icon: "📈",
      status: "公開中",
      title: "動的リタイアメント・シミュレーター",
      description:
        "投資リターン、インフレ率、年金受給を考慮し、月次単位で資産推移を計算するWebアプリケーション。React、TypeScript、Rechartsを利用して開発中。",
      technologies: ["React", "TypeScript", "Recharts"],
      link: "/works/featured",
      linkLabel: "詳細を見る →",
      external: false,
    },
    {
      id: 3,
      icon: "📱",
      status: "準備中",
      title: "ふるさと納税シミュレーション＋",
      description:
        "年収や家族構成だけでなく、iDeCoや住宅ローン控除なども考慮し、自己負担額を2,000円に収められる寄附上限額の目安を試算するWebアプリ。",
      technologies: ["React", "TypeScript", "Recharts"],
      link: "",
      linkLabel: "準備中",
      external: false,
    },
  ];



  return (
    <div>
      {/* Hero Section */}
      <section className="container-md section-py">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-6">Works</h1>
          <p className="text-lg text-harvest-600">
            これまでに開発したプロジェクトと、業務改善やAI活用を支える技術スタックを紹介します。
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container-md section-py">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card group hover:shadow-lg transition-all">
              <div className="h-48 bg-gradient-to-br from-harvest-700 to-harvest-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="h-48 bg-gradient-to-br from-harvest-50 to-harvest-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="w-28 h-28 rounded-full bg-white shadow-md border border-harvest-200 flex items-center justify-center">
                    <span className="text-6xl" aria-hidden="true">
                      {project.icon}
                    </span>
                  </div>
                </div>
              </div>
              <span className="inline-block mb-3 px-3 py-1 bg-harvest-100 text-harvest-700 rounded-full text-xs">
              {project.status}
            </span>
              <h3 className="heading-3 mb-2">{project.title}</h3>
              <p className="text-harvest-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-harvest-100 text-harvest-700 rounded text-xs">
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
                    className="inline-block text-harvest-700 hover:text-harvest-900 font-medium group-hover:underline"
                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    className="inline-block text-harvest-700 hover:text-harvest-900 font-medium group-hover:underline"
                  >
                    {project.linkLabel}
                  </Link>
                )
              ) : (
                <span className="inline-block text-harvest-400 font-medium">
                  {project.linkLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project Summary */}
      <section className="container-md section-py">
        <div className="rounded-3xl border border-harvest-200 bg-harvest-50 p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-harvest-700 mb-3">Featured Project</p>
              <h2 className="heading-2 mb-3">リタイアメント・シミュレーター</h2>
              <p className="text-harvest-600 mb-4">
                投資リターン、インフレ、年金受取を含む未来シナリオを視覚化し、資産寿命を分析するインタラクティブなプロジェクトです。
              </p>
              <Link href="/works/featured" className="btn-primary inline-flex items-center justify-center">
                詳細を見る
              </Link>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-harvest-200">
              <p className="text-sm text-harvest-500">プロジェクトタイプ</p>
              <div className="mt-3 text-2xl font-semibold text-harvest-900">金融シミュレーション</div>
              <div className="mt-4 grid gap-3 text-sm text-harvest-600">
                <div>Next.js / TypeScript</div>
                <div>月次資産推移シミュレーション</div>
                <div>インフレ・年金反映</div>
                <div>データ可視化</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-harvest-900 text-white section-py">
        <div className="container-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-harvest-400">30年+</div>
              <p className="text-harvest-200">業務システム開発経験</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-harvest-400">AI</div>
              <p className="text-harvest-200">Web開発学習中</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-harvest-400">3</div>
              <p className="text-harvest-200">個人開発プロジェクト</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-md section-py text-center">
        <h2 className="heading-2 mb-6">プロジェクトについてご質問ですか？</h2>
        <p className="text-harvest-600 mb-8 max-w-2xl mx-auto">
          各プロジェクトの詳細や、新規開発のご相談はお気軽にお問い合わせください。
        </p>
        <a href="/contact" className="btn-primary">
          お問い合わせ
        </a>
      </section>
    </div>
  );
}
