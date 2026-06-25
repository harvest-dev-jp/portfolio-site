// src/components/furusato-tax/SimulationResultPanel.tsx

import type {
  DiagnosisLevel,
  SimulationResult,
} from "@/lib/furusato-tax/types";

interface SimulationResultPanelProps {
  result: SimulationResult;
}

/**
 * 金額を「○○円」の形式に変換する。
 */
function formatYen(value: number): string {
  if (!Number.isFinite(value)) {
    return "0円";
  }

  return `${Math.max(
    0,
    Math.trunc(value),
  ).toLocaleString("ja-JP")}円`;
}

/**
 * 診断レベルごとの表示スタイルを返す。
 */
function getDiagnosisStyle(
  level: DiagnosisLevel,
): string {
  switch (level) {
    case "safe":
      return (
        "border-emerald-200 " +
        "bg-emerald-50 " +
        "text-emerald-900"
      );

    case "caution":
      return (
        "border-amber-200 " +
        "bg-amber-50 " +
        "text-amber-900"
      );

    case "over":
      return (
        "border-rose-200 " +
        "bg-rose-50 " +
        "text-rose-900"
      );

    default: {
      const exhaustiveCheck: never = level;

      throw new Error(
        `未対応の診断レベルです: ${exhaustiveCheck}`,
      );
    }
  }
}

/**
 * 金額表示用カード。
 */
function AmountCard({
  label,
  value,
  description,
  emphasized = false,
}: {
  label: string;
  value: number;
  description?: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 shadow-sm",
        emphasized
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <p className="text-sm font-medium text-slate-600">
        {label}
      </p>

      <p
        className={[
          "mt-2 font-bold tracking-tight",
          emphasized
            ? "text-3xl text-blue-700"
            : "text-2xl text-slate-900",
        ].join(" ")}
      >
        {formatYen(value)}
      </p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * ふるさと納税の試算結果を表示する。
 */
export default function SimulationResultPanel({
  result,
}: SimulationResultPanelProps) {
  const {
    donation,
    diagnosis,
    comparison,
    incomeTax,
    residentTax,
    incomeDeductions,
  } = result;

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          試算結果
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          ふるさと納税の目安
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          入力内容をもとにした2026年分の概算です。
          実際の税額や寄附上限を保証するものではありません。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AmountCard
          label="概算寄附上限額"
          value={donation.estimatedDonationLimit}
          description="自己負担がおおむね2,000円に収まる上限の概算です。"
          emphasized
        />

        <AmountCard
          label="安全寄附額"
          value={donation.safeDonationAmount}
          description="選択した安全率を概算上限額に適用しています。"
        />

        <AmountCard
          label="寄附予定額"
          value={donation.plannedDonation}
          description="入力された年間寄附予定額です。"
        />

        <AmountCard
          label="安全寄附額までの残り"
          value={donation.remainingAmount}
          description="安全寄附額から寄附予定額を差し引いた金額です。"
        />

        <AmountCard
          label="概算上限の超過額"
          value={donation.excessAmount}
          description="概算上限を超えていない場合は0円です。"
        />

        <AmountCard
          label="実質自己負担額の概算"
          value={donation.estimatedSelfPayment}
          description="寄附予定額から控除見込額を差し引いた概算です。"
        />
      </div>

      <div
        className={[
          "rounded-2xl border p-5",
          getDiagnosisStyle(diagnosis.level),
        ].join(" ")}
      >
        <p className="text-sm font-semibold">
          診断
        </p>

        <h3 className="mt-1 text-xl font-bold">
          {diagnosis.title}
        </h3>

        <p className="mt-2 text-sm leading-6">
          {diagnosis.message}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          控除額の内訳
        </h3>

        <dl className="mt-4 divide-y divide-slate-100">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm text-slate-600">
              所得税からの控除
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                donation.deductionBreakdown
                  .incomeTaxDeduction,
              )}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm text-slate-600">
              住民税の基本控除
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                donation.deductionBreakdown
                  .residentTaxBasicDeduction,
              )}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm text-slate-600">
              住民税の特例控除
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                donation.deductionBreakdown
                  .residentTaxSpecialDeduction,
              )}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="font-semibold text-slate-900">
              控除合計
            </dt>

            <dd className="text-lg font-bold text-blue-700">
              {formatYen(
                donation.deductionBreakdown
                  .totalDeduction,
              )}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          iDeCo・住宅ローン控除との比較
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          基本条件を基準として、各控除を反映した場合の概算上限額を比較します。
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                  条件
                </th>

                <th className="px-3 py-3 text-right text-sm font-semibold text-slate-600">
                  概算上限額
                </th>

                <th className="px-3 py-3 text-right text-sm font-semibold text-slate-600">
                  基本条件との差
                </th>
              </tr>
            </thead>

            <tbody>
              {comparison.items.map((item) => (
                <tr
                  key={item.scenario}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-3 py-4 text-sm font-medium text-slate-900">
                    {item.label}
                  </td>

                  <td className="px-3 py-4 text-right text-sm font-semibold text-slate-900">
                    {formatYen(item.donationLimit)}
                  </td>

                  <td className="px-3 py-4 text-right text-sm text-slate-700">
                    {item.differenceFromBasic > 0
                      ? "+"
                      : ""}
                    {item.differenceFromBasic.toLocaleString(
                      "ja-JP",
                    )}
                    円
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <summary className="cursor-pointer font-semibold text-slate-900">
          税額計算の詳細
        </summary>

        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              所得控除合計
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(incomeDeductions.total)}
            </dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              所得税の課税所得
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(incomeTax.taxableIncome)}
            </dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              所得税率
            </dt>

            <dd className="font-semibold text-slate-900">
              {(incomeTax.taxRate * 100).toLocaleString(
                "ja-JP",
              )}
              ％
            </dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              税額控除後の所得税等
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(incomeTax.taxAfterCredits)}
            </dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              住民税の課税所得
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(residentTax.taxableIncome)}
            </dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              住民税所得割額
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                residentTax.incomeBasedTaxAfterCredits,
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              住民税の住宅ローン控除
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                residentTax
                  .housingLoanTaxCreditApplied,
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-4 rounded-xl bg-white p-3">
            <dt className="text-slate-600">
              住民税の住宅ローン控除
            </dt>

            <dd className="font-semibold text-slate-900">
              {formatYen(
                residentTax.housingLoanTaxCreditApplied,
              )}
            </dd>
          </div>
        </dl>
      </details>
    </section>
  );
}
