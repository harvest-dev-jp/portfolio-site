import type { TravelPlan } from "@/lib/travel-simulator/types";

import {
  createTravelPlanCsv,
  createTravelPlanText,
  downloadTextFile,
} from "@/lib/travel-simulator/export";

interface ExportPanelProps {
  plan: TravelPlan;
  onReset: () => void;
}

export default function ExportPanel({
  plan,
  onReset,
}: ExportPanelProps) {
  const filenameBase =
    plan.basicInfo.title.trim() || "travel-plan";
  const textPreview = createTravelPlanText(plan);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold text-emerald-700">
          EXPORT
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          保存・出力
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          入力内容はこのブラウザに自動保存されます。旅行後の整理用にCSVまたはテキストで出力できます。
        </p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-bold text-slate-900">
          テキスト出力プレビュー
        </h3>
        <pre className="mt-3 max-h-72 min-h-40 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {textPreview}
        </pre>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              `${filenameBase}.csv`,
              createTravelPlanCsv(plan),
              "text/csv",
            )
          }
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          CSV出力
        </button>

        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              `${filenameBase}.txt`,
              textPreview,
              "text/plain",
            )
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          テキスト出力
        </button>

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
        >
          入力をリセット
        </button>
      </div>
    </section>
  );
}
