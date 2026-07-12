import {
  expenseCategoryLabels,
  type ExpenseCategory,
  type ExpenseItem,
  type ScheduleItem,
} from "@/lib/travel-simulator/types";

import { createDefaultExpenseItem } from "@/lib/travel-simulator/defaultValues";
import { formatYen } from "@/lib/travel-simulator/calculations";

interface ExpenseFormProps {
  value: ExpenseItem[];
  schedules: ScheduleItem[];
  defaultPaymentDate: string;
  onChange: (items: ExpenseItem[]) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const labelClass = "text-sm font-semibold text-slate-800";

const categories = Object.keys(
  expenseCategoryLabels,
) as ExpenseCategory[];

export default function ExpenseForm({
  value,
  schedules,
  defaultPaymentDate,
  onChange,
}: ExpenseFormProps) {
  const updateItem = (
    id: string,
    updates: Partial<ExpenseItem>,
  ) => {
    onChange(
      value.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            STEP 3
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            費用
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...value,
              createDefaultExpenseItem(defaultPaymentDate),
            ])
          }
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          費用を追加
        </button>
      </div>

      <div className="space-y-4">
        {value.map((item, index) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-bold text-slate-900">
                費用 {index + 1}
              </h3>
              <button
                type="button"
                onClick={() =>
                  onChange(value.filter((expense) => expense.id !== item.id))
                }
                className="text-sm font-medium text-slate-500 transition hover:text-rose-700"
              >
                削除
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                費用項目名
                <input
                  type="text"
                  value={item.name}
                  onChange={(event) =>
                    updateItem(item.id, {
                      name: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor={`expense-amount-${item.id}`}
                    className={labelClass}
                  >
                    金額
                  </label>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {formatYen(item.amount)}
                  </span>
                </div>
                <input
                  id={`expense-amount-${item.id}`}
                  type="range"
                  min={0}
                  max={300000}
                  step={1000}
                  value={item.amount}
                  onChange={(event) =>
                    updateItem(item.id, {
                      amount: Math.max(0, Number(event.target.value)),
                    })
                  }
                  className="mt-4 w-full accent-emerald-600"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>0円</span>
                  <span>300,000円</span>
                </div>
              </div>
              <label className={labelClass}>
                カテゴリ
                <select
                  value={item.category}
                  onChange={(event) =>
                    updateItem(item.id, {
                      category: event.target.value as ExpenseCategory,
                    })
                  }
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {expenseCategoryLabels[category]}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                支払予定日
                <input
                  type="date"
                  value={item.paymentDate}
                  onChange={(event) =>
                    updateItem(item.id, {
                      paymentDate: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-800">
              関連する日程
              <select
                value={item.scheduleId}
                onChange={(event) =>
                  updateItem(item.id, {
                    scheduleId: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">未指定</option>
                {schedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.date || "日付未設定"} /{" "}
                    {schedule.place || schedule.activity || "予定"}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm font-semibold text-slate-800">
              メモ
              <textarea
                value={item.memo}
                onChange={(event) =>
                  updateItem(item.id, {
                    memo: event.target.value,
                  })
                }
                rows={2}
                className={inputClass}
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
