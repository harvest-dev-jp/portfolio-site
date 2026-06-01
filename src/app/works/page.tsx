import Link from "next/link";

export default function Works() {
  const projects = [
    {
      id: 1,
      title: "業務改善ダッシュボード",
      description: "既存業務フローを可視化し、AI予測と自動化で作業効率を向上させたダッシュボードシステム。",
      technologies: ["Next.js", "TypeScript", "Python", "AI"],
      link: "#",
    },
    {
      id: 2,
      title: "AIチャット窓口システム",
      description: "問い合わせ受付と分類をAIで支援し、迅速な対応と業務負荷の削減を実現した社内向けサービス。",
      technologies: ["React", "Node.js", "OpenAI API", "AWS"],
      link: "#",
    },
    {
      id: 3,
      title: "保守重視の基幹システム",
      description: "長期運用を見据えた設計と保守性に重点を置いた、業務システムの基幹プラットフォーム。",
      technologies: ["NestJS", "PostgreSQL", "Docker"],
      link: "#",
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
                <span className="text-white/30 text-6xl font-bold">{project.id}</span>
              </div>

              <h3 className="heading-3 mb-2">{project.title}</h3>
              <p className="text-harvest-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-harvest-100 text-harvest-700 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <a href={project.link} className="inline-block text-harvest-700 hover:text-harvest-900 font-medium group-hover:underline">
                詳細を見る →
              </a>
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
                <div>モンテカルロシミュレーション</div>
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
              <div className="text-4xl font-bold mb-2 text-harvest-400">30+</div>
              <p className="text-harvest-200">導入プロジェクト</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-harvest-400">20+</div>
              <p className="text-harvest-200">業務改善実績</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-harvest-400">30年+</div>
              <p className="text-harvest-200">開発経験</p>
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
