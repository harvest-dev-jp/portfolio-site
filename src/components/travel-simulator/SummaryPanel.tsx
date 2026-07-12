import {
  expenseCategoryLabels,
  type TravelPlan,
} from "@/lib/travel-simulator/types";

import {
  calculateCapturedVlogCount,
  calculateExpenseSummary,
  calculateTripDays,
  formatYen,
} from "@/lib/travel-simulator/calculations";

interface SummaryPanelProps {
  plan: TravelPlan;
}

export default function SummaryPanel({
  plan,
}: SummaryPanelProps) {
  const expenseSummary = calculateExpenseSummary(plan.expenses);
  const capturedCount = calculateCapturedVlogCount(plan.vlogItems);
  const categoryEntries = Object.entries(
    expenseSummary.byCategory,
  ).filter(([, amount]) => amount > 0);
  const dateEntries = Object.entries(expenseSummary.byDate).sort(
    ([dateA], [dateB]) => dateA.localeCompare(dateB),
  );

  return (
    <aside className="space-y-5">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-800">
          SUMMARY
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          {plan.basicInfo.title || "旅行計画"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {plan.basicInfo.destination || "行き先未設定"} /{" "}
          {plan.basicInfo.nights}泊
          {calculateTripDays(plan.basicInfo)}日
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900">
          費用合計
        </h3>
        <p className="mt-3 text-3xl font-bold text-emerald-700">
          {formatYen(expenseSummary.total)}
        </p>

        <div className="mt-5 space-y-2 text-sm">
          {categoryEntries.length === 0 ? (
            <p className="text-slate-500">
              費用を入力するとカテゴリ別に表示されます。
            </p>
          ) : (
            categoryEntries.map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between gap-4 text-slate-700"
              >
                <span>
                  {
                    expenseCategoryLabels[
                      category as keyof typeof expenseCategoryLabels
                    ]
                  }
                </span>
                <span className="font-semibold">
                  {formatYen(amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900">
          日別合計
        </h3>
        <div className="mt-4 space-y-2 text-sm">
          {dateEntries.length === 0 ? (
            <p className="text-slate-500">
              支払予定日を入力すると日別に集計されます。
            </p>
          ) : (
            dateEntries.map(([date, amount]) => (
              <div
                key={date}
                className="flex items-center justify-between gap-4 text-slate-700"
              >
                <span>{date}</span>
                <span className="font-semibold">
                  {formatYen(amount)}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-900">
          VLOG進捗
        </h3>
        <p className="mt-3 text-sm text-slate-700">
          {capturedCount} / {plan.vlogItems.length} 件撮影済み
        </p>
      </section>
    </aside>
  );
}
