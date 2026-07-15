import RetirementSimulator from "@/components/RetirementSimulator";
import Link from "next/link";

export default function FeaturedWorkPage() {
  return (
    <div>
      <section className="container-md section-py">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-harvest-700 mb-3">Featured Project</p>
          <h1 className="heading-1 mb-6">リタイアメント・シミュレーター</h1>
          <p className="text-lg text-harvest-600 mb-8">
            資産形成から引退後のキャッシュフローまでを見通すシミュレーションアプリ。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="inline-flex items-center rounded-full bg-harvest-100 px-3 py-1 text-sm font-medium text-harvest-700">
              Next.js / TypeScript / SVGグラフ
            </span>
          </div>
        </div>
      </section>

      <section className="container-md section-py">
        <div className="rounded-3xl border border-harvest-200 bg-harvest-50 p-6 shadow-sm">
          <h2 className="heading-2 mb-4">プロジェクト概要</h2>
          <p className="text-harvest-600 leading-relaxed mb-6">
            このプロジェクトは、リタイア後の資産寿命を予測するためのシミュレーターです。<br/>
            現在資産、生活費、年金、投資リターン、インフレ率などの条件を設定し、将来の資産推移を1か月単位で試算できます。<br/>
            想定寿命時点の資産残高を確認することで、生活費や積立額の見直しに役立てることができます。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 border border-harvest-200">
              <h3 className="heading-3 mb-2">主な特徴</h3>
              <ul className="list-disc list-inside text-harvest-600 space-y-2">
                <li>1か月単位の資産推移シミュレーション</li>
                <li>リタイア年齢・寿命・年金条件を自由に設定</li>
                <li>インフレを考慮した生活費シミュレーション</li>
                <li>資産寿命をグラフで可視化</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-5 border border-harvest-200">
              <h3 className="heading-3 mb-2">ユーザーへの価値</h3>
              <p className="text-harvest-600 leading-relaxed">
                将来の資産推移を理解し、不確実な市場環境でも安心して資産設計できるように支援します。<br/>個人のライフプランニングや退職計画に最適です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-md section-py">
        <div className="rounded-3xl border border-harvest-200 bg-white p-6 shadow-sm">
          <RetirementSimulator />
        </div>
      </section>
    </div>
  );
}
