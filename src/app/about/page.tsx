import Link from "next/link";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container-md section-py">
        <div className="max-w-3xl">
          <h1 className="heading-1 mb-6">About Harvest</h1>
          <p className="text-lg text-harvest-600 mb-8">
            個人開発エンジニアとして、信頼できるソリューションとAI活用による創新的なプロジェクトを追求しています。
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="bg-harvest-50 section-py">
        <div className="container-md">
          <h2 className="heading-2 mb-12">プロフィール</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="w-64 h-64 bg-gradient-to-br from-harvest-700 to-harvest-600 rounded-lg"></div>
            </div>

            <div>
              <div className="space-y-6 bg-white/60 dark:bg-gray-800/60 p-6 rounded-lg shadow-sm">
                <div>
                  <h3 className="heading-3 mb-2">概要</h3>
                  <p className="text-harvest-600">業務システム開発の実務経験が30年以上あります。要件定義から設計、実装、テスト、リリース、保守運用まで一貫して担当してきました。</p>
                </div>

                <div>
                  <h3 className="heading-3 mb-2">主要経験技術</h3>
                  <ul className="list-inside list-disc text-harvest-600 space-y-1">
                    <li>言語: C、VB6、VB.NET</li>
                    <li>業務システム設計・保守運用の実務経験</li>
                    <li>現在: AI活用とWeb開発を学習中（実践的な適用を模索しています）</li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-3 mb-2">保有資格</h3>
                  <div className="flex flex-wrap gap-2 text-harvest-600">
                    <span className="px-3 py-1 bg-harvest-100 text-harvest-700 rounded-full text-sm">プロジェクトマネージャ</span>
                    <span className="px-3 py-1 bg-harvest-100 text-harvest-700 rounded-full text-sm">応用情報技術者</span>
                    <span className="px-3 py-1 bg-harvest-100 text-harvest-700 rounded-full text-sm">基本情報技術者</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="container-md section-py">
        <h2 className="heading-2 mb-12">Harvestのコンセプト</h2>

        <div className="space-y-8">
          <div className="border-l-4 border-harvest-700 pl-6">
            <h3 className="heading-3 mb-2">実り（実りある成果）</h3>
            <p className="text-harvest-600">
              すべてのプロジェクトから実りある成果を生み出すことを目指しています。困難な課題に取り組み、その過程から学び、最終的には価値のあるソリューションを提供することが私たちの使命です。
            </p>
          </div>

          <div className="border-l-4 border-harvest-700 pl-6">
            <h3 className="heading-3 mb-2">信頼（信頼できるソリューション）</h3>
            <p className="text-harvest-600">
              品質、セキュリティ、パフォーマンスのすべてにおいて妥協せず、信頼できるソリューションを提供します。ユーザーの期待を超える経験を常に目指しています。
            </p>
          </div>

          <div className="border-l-4 border-harvest-700 pl-6">
            <h3 className="heading-3 mb-2">AI活用（イノベーション）</h3>
            <p className="text-harvest-600">
              最新のAI技術を活用して、従来の方法では不可能だった問題解決と価値創造を実現しています。技術の進化に適応し、常に学習し続けることを大切にしています。
            </p>
          </div>

          <div className="border-l-4 border-harvest-700 pl-6">
            <h3 className="heading-3 mb-2">落ち着いた雰囲気（シンプルなデザイン）</h3>
            <p className="text-harvest-600">
              余計な装飾を排除し、シンプルで分かりやすい、清潔なデザインを心がけています。ユーザーが直感的に理解でき、ストレスなく利用できるインターフェースが重要です。
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-harvest-50 section-py">
        <div className="container-md">
          <h2 className="heading-2 mb-12">経歴</h2>

          <div className="space-y-6">
            {[
              {
                year: "2024年",
                title: "独立エンジニア活動開始",
                description: "個人開発エンジニアとして本格的に活動を開始",
              },
              {
                year: "2023年",
                title: "AI技術の深化",
                description: "機械学習とLLMの実装経験を積む",
              },
              {
                year: "2022年",
                title: "フルスタック開発の実践",
                description: "複数のプロジェクトでフルスタック開発を実施",
              },
            ].map((item, index) => (
              <div key={index} className="card">
                <h3 className="text-harvest-700 font-semibold mb-1">{item.year}</h3>
                <h4 className="heading-3 mb-2">{item.title}</h4>
                <p className="text-harvest-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-md section-py text-center">
        <h2 className="heading-2 mb-6">プロジェクトを詳しく見る</h2>
        <p className="text-harvest-600 mb-8 max-w-2xl mx-auto">
          詳細なプロジェクト情報をご覧になりたい場合は、以下をご確認ください。
        </p>
        <Link href="/works" className="btn-primary">
          プロジェクト一覧
        </Link>
      </section>
    </div>
  );
}
