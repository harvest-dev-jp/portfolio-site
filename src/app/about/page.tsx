import Image from "next/image";

export default function About() {
  const skills = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "GitHub",
    "ChatGPT",
  ];

  const qualifications = [
    "プロジェクトマネージャ",
    "応用情報技術者",
    "基本情報技術者",
  ];

  const careers = [
    {
      year: "1990年代〜",
      title: "業務システム開発のキャリア開始",
      description:
        "C言語、VBを中心に、業務システムの設計・開発・保守に従事。要件定義から運用まで幅広い工程を経験しました。",
    },
    {
      year: "2000年代〜2020年代",
      title: "プロジェクト推進とマネジメント",
      description:
        "基幹システムや業務改善プロジェクトに参画。プロジェクト管理、品質向上、運用改善を担当してきました。",
    },
    {
      year: "2025年〜",
      title: "AI活用とWeb開発への挑戦",
      description:
        "ChatGPTや生成AIを活用しながら、Next.js、TypeScript、GitHubを使った個人開発に取り組んでいます。",
    },
    {
      year: "2026年〜",
      title: "Harvest Portfolio公開",
      description:
        "ポートフォリオサイト、リタイアメント・シミュレーター、ふるさと納税シミュレーションを公開しました。",
    },
  ];

  return (
    <div>
      {/* Profile Hero */}
      <section className="container-md pt-10 pb-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/profile.png"
            alt="Takeshi Akaguma"
            width={120}
            height={120}
            className="rounded-full border-4 border-harvest-100 shadow-lg"
            priority
          />

          <h2 className="text-2xl text-harvest-900">
            Takeshi Akaguma
          </h2>

          <p className="mt-3 max-w-2xl text-harvest-600">
            業務システム開発とプロジェクトマネジメントの経験をもとに、<br />
            AI活用とWeb開発に取り組んでいます。
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-harvest-100 px-3 py-1 text-sm text-harvest-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Summary */}
      <section className="bg-harvest-50 py-10">
        <div className="container-md">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h2 className="heading-3 mb-3">概要</h2>
              <p className="text-harvest-600">
                業務システム開発の実務経験が30年以上あります。
                要件定義、設計、実装、テスト、リリース、保守運用まで、
                一連の工程に携わってきました。
              </p>
            </div>

            <div className="card">
              <h2 className="heading-3 mb-3">現在の取り組み</h2>
              <p className="text-harvest-600">
                これまでの業務経験に、AIとWeb技術を組み合わせ、
                業務改善やシミュレーション系Webアプリの個人開発を進めています。
              </p>
            </div>

            <div className="card">
              <h2 className="heading-3 mb-3">主要経験技術</h2>
              <ul className="list-inside list-disc space-y-1 text-harvest-600">
                <li>C、VB6、VB.NET、DB設計、SQL</li>
                <li>業務システム設計・開発・保守運用</li>
                <li>プロジェクト管理・品質改善・運用改善</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="heading-3 mb-3">保有資格</h2>
              <div className="flex flex-wrap gap-2">
                {qualifications.map((qualification) => (
                  <span
                    key={qualification}
                    className="rounded-full bg-harvest-100 px-3 py-1 text-sm text-harvest-700"
                  >
                    {qualification}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container-md py-10">
        <h2 className="heading-2 mb-6">経歴</h2>

        <div className="space-y-5">
          {careers.map((item) => (
            <div key={`${item.year}-${item.title}`} className="card">
              <p className="mb-1 font-semibold text-harvest-700">
                {item.year}
              </p>
              <h3 className="heading-3 mb-2">{item.title}</h3>
              <p className="text-harvest-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}