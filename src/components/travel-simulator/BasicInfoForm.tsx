import type { TripBasicInfo } from "@/lib/travel-simulator/types";

import { calculateTripDays } from "@/lib/travel-simulator/calculations";

interface BasicInfoFormProps {
  value: TripBasicInfo;
  onChange: (updates: Partial<TripBasicInfo>) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const labelClass = "text-sm font-semibold text-slate-800";

export default function BasicInfoForm({
  value,
  onChange,
}: BasicInfoFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold text-emerald-700">
          STEP 1
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          旅行基本情報
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          旅行タイトル
          <input
            type="text"
            value={value.title}
            onChange={(event) =>
              onChange({ title: event.target.value })
            }
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          主な行き先
          <input
            type="text"
            value={value.destination}
            onChange={(event) =>
              onChange({ destination: event.target.value })
            }
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          出発日
          <input
            type="date"
            value={value.departureDate}
            onChange={(event) =>
              onChange({ departureDate: event.target.value })
            }
            className={inputClass}
          />
        </label>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="travel-nights"
              className={labelClass}
            >
              宿泊数
            </label>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {value.nights}泊 / {calculateTripDays(value)}日間
            </span>
          </div>
          <input
            id="travel-nights"
            type="range"
            min={0}
            max={14}
            step={1}
            value={value.nights}
            onChange={(event) =>
              onChange({
                nights: Math.max(0, Number(event.target.value)),
              })
            }
            className="mt-4 w-full accent-emerald-600"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>0泊</span>
            <span>14泊</span>
          </div>
        </div>
      </div>

      <label className="mt-5 block text-sm font-semibold text-slate-800">
        メモ
        <textarea
          value={value.memo}
          onChange={(event) =>
            onChange({ memo: event.target.value })
          }
          rows={3}
          className={inputClass}
        />
      </label>
    </section>
  );
}
