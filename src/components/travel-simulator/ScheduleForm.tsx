import type { ScheduleItem } from "@/lib/travel-simulator/types";

import { createDefaultScheduleItem } from "@/lib/travel-simulator/defaultValues";

interface ScheduleFormProps {
  value: ScheduleItem[];
  defaultDate: string;
  onChange: (items: ScheduleItem[]) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const labelClass = "text-sm font-semibold text-slate-800";

export default function ScheduleForm({
  value,
  defaultDate,
  onChange,
}: ScheduleFormProps) {
  const updateItem = (
    id: string,
    updates: Partial<ScheduleItem>,
  ) => {
    onChange(
      value.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    onChange(value.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            STEP 2
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            詳細日程
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange([
              ...value,
              createDefaultScheduleItem(defaultDate),
            ])
          }
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          日程を追加
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
                予定 {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-sm font-medium text-slate-500 transition hover:text-rose-700"
              >
                削除
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <label className={labelClass}>
                日付
                <input
                  type="date"
                  value={item.date}
                  onChange={(event) =>
                    updateItem(item.id, {
                      date: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                開始
                <input
                  type="time"
                  value={item.startTime}
                  onChange={(event) =>
                    updateItem(item.id, {
                      startTime: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                終了
                <input
                  type="time"
                  value={item.endTime}
                  onChange={(event) =>
                    updateItem(item.id, {
                      endTime: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor={`schedule-duration-${item.id}`}
                    className={labelClass}
                  >
                    所要時間
                  </label>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {item.durationMinutes}分
                  </span>
                </div>
                <input
                  id={`schedule-duration-${item.id}`}
                  type="range"
                  min={0}
                  max={720}
                  step={5}
                  value={item.durationMinutes}
                  onChange={(event) =>
                    updateItem(item.id, {
                      durationMinutes: Math.max(
                        0,
                        Number(event.target.value),
                      ),
                    })
                  }
                  className="mt-4 w-full accent-emerald-600"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>0分</span>
                  <span>720分</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                場所
                <input
                  type="text"
                  value={item.place}
                  onChange={(event) =>
                    updateItem(item.id, {
                      place: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                行動予定
                <input
                  type="text"
                  value={item.activity}
                  onChange={(event) =>
                    updateItem(item.id, {
                      activity: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
            </div>

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
