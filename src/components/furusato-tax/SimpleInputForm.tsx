// src/components/furusato-tax/SimpleInputForm.tsx

import type {
  FilingMethod,
  SafetyRate,
  SimpleInput,
} from "@/lib/furusato-tax/types";

interface SimpleInputFormProps {
  value: SimpleInput;
  onChange: (updates: Partial<SimpleInput>) => void;
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

    onChange(Math.max(min, parsedValue));
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

export default function SimpleInputForm({
  value,
  onChange,
}: SimpleInputFormProps) {
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
      {/* STEP 1 基本情報 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 1
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            基本情報
          </h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="simple-salary-income"
            label="給与収入"
            value={value.salaryIncome}
            onChange={(salaryIncome) =>
              onChange({ salaryIncome })
            }
            step={10_000}
            suffix="円"
            description="2026年中に受け取る給与・賞与の合計見込額です。"
          />

          <NumberInput
            id="simple-taxpayer-age"
            label="本人の年齢"
            value={value.taxpayerAge}
            onChange={(taxpayerAge) =>
              onChange({ taxpayerAge })
            }
            min={18}
            max={120}
            suffix="歳"
            description="2026年12月31日時点の年齢を入力します。"
          />
        </div>

        <div className="mt-5">
          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">
              配偶者
            </legend>

            <div className="mt-2 flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="simple-has-spouse"
                  checked={!value.hasSpouse}
                  onChange={() =>
                    onChange({
                      hasSpouse: false,
                      spouseSalaryIncome: 0,
                    })
                  }
                  className="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm text-slate-700">
                  なし
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="simple-has-spouse"
                  checked={value.hasSpouse}
                  onChange={() =>
                    onChange({ hasSpouse: true })
                  }
                  className="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm text-slate-700">
                  あり
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        {value.hasSpouse && (
          <div className="mt-5">
            <NumberInput
              id="simple-spouse-salary-income"
              label="配偶者の年間給与収入"
              value={value.spouseSalaryIncome}
              onChange={(spouseSalaryIncome) =>
                onChange({ spouseSalaryIncome })
              }
              step={10_000}
              suffix="円"
              description="配偶者の2026年中の給与収入見込額です。"
            />
          </div>
        )}

        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            扶養親族
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            扶養親族の追加・削除機能は、後ほど
            DependentInputListコンポーネントとして実装します。
          </p>

          <p className="mt-2 text-xs text-slate-500">
            現在の登録人数：{value.dependents.length}人
          </p>
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* STEP 2 所得控除 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 2
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            所得控除
          </h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="simple-social-insurance"
            label="社会保険料"
            value={value.socialInsurancePremium}
            onChange={(socialInsurancePremium) =>
              onChange({ socialInsurancePremium })
            }
            step={10_000}
            suffix="円"
            description="健康保険、厚生年金、雇用保険などの年間合計額です。"
          />

          <NumberInput
            id="simple-ideco"
            label="iDeCo年間掛金"
            value={value.idecoContribution}
            onChange={(idecoContribution) =>
              onChange({ idecoContribution })
            }
            step={1_000}
            suffix="円"
            description="2026年中に支払う掛金の年間合計額です。"
          />

          <NumberInput
            id="simple-life-insurance"
            label="生命保険料控除額"
            value={value.lifeInsuranceDeduction}
            onChange={(lifeInsuranceDeduction) =>
              onChange({ lifeInsuranceDeduction })
            }
            step={1_000}
            suffix="円"
            description="保険料の支払額ではなく、控除額を入力します。"
          />

          <NumberInput
            id="simple-earthquake-insurance"
            label="地震保険料控除額"
            value={value.earthquakeInsuranceDeduction}
            onChange={(earthquakeInsuranceDeduction) =>
              onChange({ earthquakeInsuranceDeduction })
            }
            step={1_000}
            suffix="円"
          />

          <NumberInput
            id="simple-medical-expense"
            label="医療費控除額"
            value={value.medicalExpenseDeduction}
            onChange={(medicalExpenseDeduction) =>
              onChange({ medicalExpenseDeduction })
            }
            step={1_000}
            suffix="円"
            description="支払った医療費の総額ではなく、実際の控除額を入力します。"
          />

          <NumberInput
            id="simple-other-income-deduction"
            label="その他の所得控除"
            value={value.otherIncomeDeduction}
            onChange={(otherIncomeDeduction) =>
              onChange({ otherIncomeDeduction })
            }
            step={1_000}
            suffix="円"
          />
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* STEP 3 税額控除 */}
      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-emerald-700">
            STEP 3
          </p>

          <h3 className="mt-1 text-lg font-bold text-slate-900">
            税額控除
          </h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <NumberInput
            id="simple-housing-loan-tax-credit"
            label="住宅ローン控除見込額"
            value={value.housingLoanTaxCredit}
            onChange={(housingLoanTaxCredit) =>
              onChange({ housingLoanTaxCredit })
            }
            step={1_000}
            suffix="円"
            description="住宅ローン年末残高ではなく、住宅借入金等特別控除額を入力します。"
          />

          <NumberInput
            id="simple-other-tax-credit"
            label="その他の税額控除"
            value={value.otherTaxCredit}
            onChange={(otherTaxCredit) =>
              onChange({ otherTaxCredit })
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
            id="simple-planned-donation"
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
              htmlFor="simple-safety-rate"
              className="block text-sm font-semibold text-slate-800"
            >
              安全率
            </label>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              上限目安に対して、どの程度余裕を持たせるか選択します。
            </p>

            <select
              id="simple-safety-rate"
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
                name="simple-filing-method"
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
                name="simple-filing-method"
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

