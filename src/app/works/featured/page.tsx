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
            資産形成から引退後のキャッシュフローまでを見通すシミュレーションアプリ。モンテカルロ分析により不確実性を可視化し、最適な運用戦略を支援します。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/works" className="btn-secondary inline-flex items-center justify-center">
              Works に戻る
            </Link>
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
            このプロジェクトは、退職後のリタイアメント資産寿命を分析するインタラクティブなシミュレーターです。ユーザーの年齢、資産、収支、予想リターンを調整し、複数のシナリオを比較できます。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 border border-harvest-200">
              <h3 className="heading-3 mb-2">主な特徴</h3>
              <ul className="list-disc list-inside text-harvest-600 space-y-2">
                <li>モンテカルロシミュレーションによる不確実性分析</li>
                <li>引退年齢と生活費の変化を入力可能</li>
                <li>年金受取とインフレ影響の自動計算</li>
                <li>結果を即座にグラフで可視化</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-5 border border-harvest-200">
              <h3 className="heading-3 mb-2">ユーザーへの価値</h3>
              <p className="text-harvest-600 leading-relaxed">
                将来の資産推移を理解し、不確実な市場環境でも安心して資産設計できるように支援します。個人のライフプランニングや退職計画に最適です。
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
