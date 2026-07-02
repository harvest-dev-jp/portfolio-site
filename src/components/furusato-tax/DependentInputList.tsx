// src/components/furusato-tax/DependentInputList.tsx

import AgeSelect from "./AgeSelect";

import type {
  Dependent,
  DisabilityCategory,
  Relationship,
} from "@/lib/furusato-tax/types";

interface DependentInputListProps {
  value: Dependent[];
  onChange: (dependents: Dependent[]) => void;
}

const relationshipOptions: Array<{
  value: Relationship;
  label: string;
}> = [
  {
    value: "child",
    label: "子",
  },
  {
    value: "parent",
    label: "父母",
  },
  {
    value: "other",
    label: "その他",
  },
];

const disabilityOptions: Array<{
  value: DisabilityCategory;
  label: string;
}> = [
  {
    value: "none",
    label: "該当なし",
  },
  {
    value: "general",
    label: "一般障害者",
  },
  {
    value: "special",
    label: "特別障害者",
  },
];

/**
 * 新しい扶養親族の初期値を作成する。
 */
function createDependent(): Dependent {
  return {
    id: crypto.randomUUID(),
    relationship: "child",
    age: 16,
    salaryIncome: 0,
    livesTogether: true,
    disabilityCategory: "none",
  };
}

export default function DependentInputList({
  value,
  onChange,
}: DependentInputListProps) {
  /**
   * 扶養親族を追加する。
   */
  const handleAdd = () => {
    onChange([
      ...value,
      createDependent(),
    ]);
  };

  /**
   * 指定した扶養親族を部分更新する。
   */
  const handleUpdate = (
    id: string,
    updates: Partial<Dependent>,
  ) => {
    onChange(
      value.map((dependent) =>
        dependent.id === id
          ? {
              ...dependent,
              ...updates,
            }
          : dependent,
      ),
    );
  };

  /**
   * 指定した扶養親族を削除する。
   */
  const handleRemove = (id: string) => {
    onChange(
      value.filter(
        (dependent) => dependent.id !== id,
      ),
    );
  };

  return (
    <section className="mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            扶養親族
          </h4>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            2026年12月31日時点の年齢などを入力してください。
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={[
            "rounded-lg border border-emerald-600 px-4 py-2",
            "text-sm font-semibold text-emerald-700 transition",
            "hover:bg-emerald-50",
            "focus:outline-none focus:ring-2",
            "focus:ring-emerald-500 focus:ring-offset-2",
          ].join(" ")}
        >
          扶養親族を追加
        </button>
      </div>

      {value.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
          <p className="text-sm leading-6 text-slate-600">
            扶養親族は登録されていません。
          </p>

          <p className="mt-1 text-xs text-slate-500">
            扶養親族がいる場合は「扶養親族を追加」を押してください。
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {value.map((dependent, index) => {
            const relationshipId =
              `dependent-${dependent.id}-relationship`;

            const ageId =
              `dependent-${dependent.id}-age`;

            const salaryIncomeId =
              `dependent-${dependent.id}-salary-income`;

            const livingId =
              `dependent-${dependent.id}-living`;

            const disabilityId =
              `dependent-${dependent.id}-disability`;

            return (
              <div
                key={dependent.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h5 className="font-semibold text-slate-900">
                    扶養親族 {index + 1}
                  </h5>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(dependent.id)
                    }
                    className={[
                      "rounded-lg px-3 py-1.5",
                      "text-sm font-medium text-red-700",
                      "transition hover:bg-red-50",
                      "focus:outline-none focus:ring-2",
                      "focus:ring-red-500 focus:ring-offset-2",
                    ].join(" ")}
                  >
                    削除
                  </button>
                </div>

                <div className="mt-4 grid gap-5">
                  {/* 続柄 */}
                  <div>
                    <label
                      htmlFor={relationshipId}
                      className="block text-sm font-semibold text-slate-800"
                    >
                      続柄
                    </label>

                    <select
                      id={relationshipId}
                      value={dependent.relationship}
                      onChange={(event) =>
                        handleUpdate(
                          dependent.id,
                          {
                            relationship:
                              event.target
                                .value as Relationship,
                          },
                        )
                      }
                      className={[
                        "mt-2 w-full rounded-lg border",
                        "border-slate-300 bg-white",
                        "px-3 py-2.5 text-slate-900",
                        "shadow-sm outline-none transition",
                        "focus:border-emerald-500",
                        "focus:ring-2 focus:ring-emerald-200",
                      ].join(" ")}
                    >
                      {relationshipOptions.map(
                        (option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* 年齢 */}
                  <AgeSelect
                    id={ageId}
                    label="年齢"
                    value={dependent.age}
                    onChange={(age) =>
                      handleUpdate(
                        dependent.id,
                        { age },
                      )
                    }
                    min={0}
                    max={120}
                    description="2026年12月31日時点の年齢を選択します。"
                  />

                  {/* 年間給与収入 */}
                  <div>
                    <label
                      htmlFor={salaryIncomeId}
                      className="block text-sm font-semibold text-slate-800"
                    >
                      年間給与収入
                    </label>

                    <div className="relative mt-2">
                      <input
                        id={salaryIncomeId}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={10_000}
                        value={dependent.salaryIncome ?? 0}
                        onChange={(event) =>
                          handleUpdate(
                            dependent.id,
                            {
                              salaryIncome:
                                Math.max(
                                  0,
                                  Math.trunc(
                                    Number(event.target.value) ||
                                      0,
                                  ),
                                ),
                            },
                          )
                        }
                        className={[
                          "w-full rounded-lg border",
                          "border-slate-300 bg-white",
                          "px-3 py-2.5 pr-10 text-right",
                          "text-slate-900 shadow-sm",
                          "outline-none transition",
                          "focus:border-emerald-500",
                          "focus:ring-2 focus:ring-emerald-200",
                        ].join(" ")}
                      />

                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">
                        円
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      2026年中の給与・賞与の合計見込額です。給与収入がない場合は0円です。
                    </p>
                  </div>


                  {/* 同居区分 */}
                  <fieldset>
                    <legend
                      id={livingId}
                      className="text-sm font-semibold text-slate-800"
                    >
                      居住区分
                    </legend>

                    <div
                      aria-labelledby={livingId}
                      className="mt-2 flex flex-wrap gap-4"
                    >
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name={`dependent-living-${dependent.id}`}
                          checked={
                            dependent.livesTogether
                          }
                          onChange={() =>
                            handleUpdate(
                              dependent.id,
                              {
                                livesTogether: true,
                              },
                            )
                          }
                          className="h-4 w-4 accent-emerald-600"
                        />

                        <span className="text-sm text-slate-700">
                          同居
                        </span>
                      </label>

                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name={`dependent-living-${dependent.id}`}
                          checked={
                            !dependent.livesTogether
                          }
                          onChange={() =>
                            handleUpdate(
                              dependent.id,
                              {
                                livesTogether: false,
                              },
                            )
                          }
                          className="h-4 w-4 accent-emerald-600"
                        />

                        <span className="text-sm text-slate-700">
                          別居
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  {/* 障害者区分 */}
                  <div>
                    <label
                      htmlFor={disabilityId}
                      className="block text-sm font-semibold text-slate-800"
                    >
                      障害者区分
                    </label>

                    <select
                      id={disabilityId}
                      value={
                        dependent.disabilityCategory
                      }
                      onChange={(event) =>
                        handleUpdate(
                          dependent.id,
                          {
                            disabilityCategory:
                              event.target
                                .value as DisabilityCategory,
                          },
                        )
                      }
                      className={[
                        "mt-2 w-full rounded-lg border",
                        "border-slate-300 bg-white",
                        "px-3 py-2.5 text-slate-900",
                        "shadow-sm outline-none transition",
                        "focus:border-emerald-500",
                        "focus:ring-2 focus:ring-emerald-200",
                      ].join(" ")}
                    >
                      {disabilityOptions.map(
                        (option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">
        現在の登録人数：{value.length}人
      </p>
    </section>
  );
}
