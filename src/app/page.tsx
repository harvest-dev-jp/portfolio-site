import Link from "next/link";

export default function Home() {
  const featuredProjects = [
    {
      id: 1,
      title: "Harvest Portfolio Site",
      description:
        "Next.js、TypeScript、Tailwind CSSを使用して開発した個人ポートフォリオサイト。",
      link: "/works",
    },
    {
      id: 2,
      title: "動的リタイアメント・シミュレーター",
      description:
        "投資リターン、インフレ率、年金受給を考慮した資産推移シミュレーション。",
      link: "/works",
    },
    {
      id: 3,
      title: "ふるさと納税シミュレーション＋",
      description:
        "年収や家族構成だけでなく、iDeCoや住宅ローン控除なども考慮し、自己負担額を2,000円に収められる寄附上限額の目安を試算するWebアプリ。",
      link: "/works",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="container-md section-py">
        <div className="min-h-screen flex flex-col justify-center items-start gap-8">
          <div className="space-y-4">
            <h1 className="heading-1">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-harvest-700 to-harvest-600 bg-clip-text text-transparent">
                Harvest
              </span>
            </h1>
            <p className="text-xl text-harvest-600 max-w-2xl leading-relaxed">
              業務システム開発30年以上の経験を活かし、AIとWeb技術で業務改善を支援します。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/works" className="btn-primary">
              プロジェクトを見る
            </Link>
            <Link href="/contact" className="btn-secondary">
              お問い合わせ
            </Link>
          </div>

          {/* Brand Values */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="card">
              <h3 className="heading-3 mb-2">実り</h3>
              <p className="text-harvest-600">
                困難を乗り越えたプロジェクトが生み出す成果の喜び
              </p>
            </div>
            <div className="card">
              <h3 className="heading-3 mb-2">信頼</h3>
              <p className="text-harvest-600">
                高い品質とセキュリティを備えた確実なソリューション
              </p>
            </div>
            <div className="card">
              <h3 className="heading-3 mb-2">AI活用</h3>
              <p className="text-harvest-600">
                最新のAI技術を活用した革新的な実装
              </p>
            </div>
            <div className="card">
              <h3 className="heading-3 mb-2">落ち着いた雰囲気</h3>
              <p className="text-harvest-600">
                シンプルで分かりやすい、清潔なデザイン
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Preview 
      <section className="bg-harvest-50 section-py">
        <div className="container-md">
          <h2 className="heading-2 mb-12 text-center">最近のプロジェクト</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="card group hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-harvest-700 to-harvest-600 rounded mb-4 flex items-center justify-center text-white text-4xl">
                  <span className="text-white/30">#{project.id}</span>
                </div>

                <h3 className="heading-3 mb-2">{project.title}</h3>

                <p className="text-harvest-600 mb-4">{project.description}</p>

                <Link
                  href={project.link}
                  className="text-harvest-700 hover:text-harvest-900 font-medium"
                >
                  詳細を見る →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/works" className="btn-primary">
              すべてのプロジェクトを見る
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="container-md section-py">
        <div className="bg-gradient-to-r from-harvest-700 to-harvest-600 rounded-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            一緒にプロジェクトを進めませんか？
          </h2>
          <p className="text-harvest-100 mb-8 max-w-2xl mx-auto">
            お仕事のご依頼、コラボレーション、ご質問などお気軽にご連絡ください。
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-harvest-700 rounded-lg hover:bg-harvest-50 transition-colors font-medium"
          >
            コンタクト
          </Link>
        </div>
      </section>
    </div>
  );
}