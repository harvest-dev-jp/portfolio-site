// src/components/furusato-tax/DetailedInputForm.tsx

import type {
  DetailedInput,
  FilingMethod,
  SafetyRate,
} from "@/lib/furusato-tax/types";

interface DetailedInputFormProps {
  value: DetailedInput;
  onChange: (updates: Partial<DetailedInput>) => void;
}

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  description?: string;
}

function NumberInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
  description,
}: NumberInputProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = event.target.value;

    if (nextValue === "") {
      onChange(0);
      return;
    }

    const parsedValue = Number(nextValue);

    if (!Number.isFinite(parsedValue)) {
      return;
    }

    const valueWithinMinimum = Math.max(min, parsedValue);

    if (max !== undefined) {
      onChange(Math.min(max, valueWithinMinimum));
      return;
    }

    onChange(valueWithinMinimum);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-800"
      >
        {label}
      </label>

      {description && (
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}

      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className={[
            "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5",
            "text-right text-slate-900 shadow-sm outline-none transition",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200",
            suffix ? "pr-12" : "",
          ].join(" ")}
        />

        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function DetailedInputForm({
  value,
  onChange,
}: DetailedInputFormProps) {
  const handleFilingMethodChange = (
    filingMethod: FilingMethod,
  ) => {
    onChange({ filingMethod });
  };

  const handleSafetyRateChange = (
    safetyRate: SafetyRate,
  ) => {
    onChange({ safetyRate });
  };

  return (
    <div className="space-y-8">
      {/* STEP 1 源泉徴収票の主要項目 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 1
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            源泉徴収票の主要項目
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            2026年分の見込額、または前年の源泉徴収票を参考に
            入力してください。
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="detailed-payment-amount"
            label="支払金額"
            value={value.paymentAmount}
            onChange={(paymentAmount) =>
              onChange({ paymentAmount })
            }
            step={10_000}
            suffix="円"
            description="源泉徴収票の「支払金額」を入力します。"
          />

          <NumberInput
            id="detailed-salary-income-after-deduction"
            label="給与所得控除後の金額"
            value={value.salaryIncomeAfterDeduction}
            onChange={(salaryIncomeAfterDeduction) =>
              onChange({ salaryIncomeAfterDeduction })
            }
            step={10_000}
            suffix="円"
            description="所得金額調整控除後の金額が記載されている場合は、その金額です。"
          />

          <NumberInput
            id="detailed-total-income-deduction"
            label="所得控除の額の合計額"
            value={value.totalIncomeDeduction}
            onChange={(totalIncomeDeduction) =>
              onChange({ totalIncomeDeduction })
            }
            step={1_000}
            suffix="円"
            description="源泉徴収票に記載された所得控除の合計額です。"
          />

          <NumberInput
            id="detailed-withholding-tax"
            label="源泉徴収税額"
            value={value.withholdingTaxAmount}
            onChange={(withholdingTaxAmount) =>
              onChange({ withholdingTaxAmount })
            }
            step={1_000}
            suffix="円"
            description="計算結果の確認・検算に利用します。"
          />

          <NumberInput
            id="detailed-housing-loan-tax-credit"
            label="住宅借入金等特別控除の額"
            value={value.housingLoanTaxCredit}
            onChange={(housingLoanTaxCredit) =>
              onChange({ housingLoanTaxCredit })
            }
            step={1_000}
            suffix="円"
            description="住宅ローン年末残高ではなく、適用された控除額です。"
          />
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* STEP 2 所得控除の内訳 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 2
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            所得控除の内訳
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            iDeCoあり・なしの比較や計算内訳の表示に使用します。
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="detailed-social-insurance-and-small-business"
            label="社会保険料等の金額"
            value={
              value.socialInsuranceAndSmallBusinessPremium
            }
            onChange={(
              socialInsuranceAndSmallBusinessPremium,
            ) =>
              onChange({
                socialInsuranceAndSmallBusinessPremium,
              })
            }
            step={1_000}
            suffix="円"
            description="源泉徴収票の「社会保険料等の金額」を入力します。"
          />

          <NumberInput
            id="detailed-included-ideco"
            label="うちiDeCo等の掛金額"
            value={value.includedIdecoContribution}
            onChange={(includedIdecoContribution) =>
              onChange({ includedIdecoContribution })
            }
            step={1_000}
            suffix="円"
            description="上記金額に含まれる小規模企業共済等掛金の金額です。"
          />

          <NumberInput
            id="detailed-life-insurance"
            label="生命保険料控除額"
            value={value.lifeInsuranceDeduction}
            onChange={(lifeInsuranceDeduction) =>
              onChange({ lifeInsuranceDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="detailed-earthquake-insurance"
            label="地震保険料控除額"
            value={value.earthquakeInsuranceDeduction}
            onChange={(earthquakeInsuranceDeduction) =>
              onChange({ earthquakeInsuranceDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="detailed-spouse-deduction"
            label="配偶者控除・配偶者特別控除額"
            value={value.spouseDeduction}
            onChange={(spouseDeduction) =>
              onChange({ spouseDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="detailed-basic-deduction"
            label="基礎控除額"
            value={value.basicDeduction}
            onChange={(basicDeduction) =>
              onChange({ basicDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="detailed-income-adjustment-deduction"
            label="所得金額調整控除額"
            value={value.incomeAdjustmentDeduction}
            onChange={(incomeAdjustmentDeduction) =>
              onChange({ incomeAdjustmentDeduction })
            }
            step={1_000}
            suffix="円"
            description="該当しない場合は0円のままにします。"
          />
        </div>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          「社会保険料等の金額」にiDeCoの掛金が含まれている場合、
          iDeCo額を別欄にも入力してください。計算時に二重控除を
          防ぎながら、iDeCoあり・なしの比較に使用します。
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* STEP 3 追加する控除 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 3
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            年末調整後に追加する控除
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            医療費控除など、源泉徴収票の所得控除合計に含まれて
            いない控除を入力します。
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="detailed-additional-medical-expense"
            label="医療費控除額"
            value={
              value.additionalMedicalExpenseDeduction
            }
            onChange={(
              additionalMedicalExpenseDeduction,
            ) =>
              onChange({
                additionalMedicalExpenseDeduction,
              })
            }
            step={1_000}
            suffix="円"
            description="医療費の支払総額ではなく、控除額を入力します。"
          />

          <NumberInput
            id="detailed-additional-income-deduction"
            label="その他の追加所得控除"
            value={value.additionalIncomeDeduction}
            onChange={(additionalIncomeDeduction) =>
              onChange({ additionalIncomeDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="detailed-additional-tax-credit"
            label="その他の追加税額控除"
            value={value.additionalTaxCredit}
            onChange={(additionalTaxCredit) =>
              onChange({ additionalTaxCredit })
            }
            step={1_000}
            suffix="円"
          />
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* STEP 4 寄附条件 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 4
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            寄附条件
          </h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="detailed-planned-donation"
            label="寄附予定額"
            value={value.plannedDonation}
            onChange={(plannedDonation) =>
              onChange({ plannedDonation })
            }
            step={1_000}
            suffix="円"
            description="未定の場合は0円のままで試算できます。"
          />

          <div>
            <label
              htmlFor="detailed-safety-rate"
              className="block text-sm font-semibold text-slate-800"
            >
              安全率
            </label>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              上限目安に対して、どの程度余裕を持たせるか選択します。
            </p>

            <select
              id="detailed-safety-rate"
              value={value.safetyRate}
              onChange={(event) =>
                handleSafetyRateChange(
                  Number(event.target.value) as SafetyRate,
                )
              }
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value={0.9}>90％</option>
              <option value={0.95}>95％</option>
              <option value={1}>100％</option>
            </select>
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold text-slate-800">
            申告方法
          </legend>

          <div className="mt-2 grid gap-3 xl:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <input
                type="radio"
                name="detailed-filing-method"
                checked={value.filingMethod === "one-stop"}
                onChange={() =>
                  handleFilingMethodChange("one-stop")
                }
                className="mt-1 h-4 w-4 accent-emerald-600"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  ワンストップ特例
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  確定申告を行わず、自治体へ申請する場合です。
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
              <input
                type="radio"
                name="detailed-filing-method"
                checked={
                  value.filingMethod === "tax-return"
                }
                onChange={() =>
                  handleFilingMethodChange("tax-return")
                }
                className="mt-1 h-4 w-4 accent-emerald-600"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  確定申告
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  医療費控除などと合わせて確定申告する場合です。
                </span>
              </span>
            </label>
          </div>
        </fieldset>
      </section>
    </div>
  );
}

