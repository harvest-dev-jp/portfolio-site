import type { VlogItem } from "@/lib/travel-simulator/types";

import { createDefaultVlogItem } from "@/lib/travel-simulator/defaultValues";

interface VlogFormProps {
  title: string;
  value: VlogItem[];
  onTitleChange: (title: string) => void;
  onChange: (items: VlogItem[]) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const labelClass = "text-sm font-semibold text-slate-800";

export default function VlogForm({
  title,
  value,
  onTitleChange,
  onChange,
}: VlogFormProps) {
  const updateItem = (
    id: string,
    updates: Partial<VlogItem>,
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
            STEP 4
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            VLOG撮影計画
          </h2>
        </div>
      </div>

      <label className="mb-5 block text-sm font-semibold text-slate-800">
        VLOGタイトル
        <input
          type="text"
          value={title}
          onChange={(event) =>
            onTitleChange(event.target.value)
          }
          placeholder="那須高原1泊2日 大人の癒し旅"
          className={inputClass}
        />
      </label>

      <div className="space-y-4">
        {value.map((item, index) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={item.isCaptured}
                  onChange={(event) =>
                    updateItem(item.id, {
                      isCaptured: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-emerald-600"
                />
                撮影済み
              </label>
              <button
                type="button"
                onClick={() =>
                  onChange(value.filter((vlogItem) => vlogItem.id !== item.id))
                }
                className="text-sm font-medium text-slate-500 transition hover:text-rose-700"
              >
                削除
              </button>
            </div>

            <h3 className="mb-4 font-bold text-slate-900">
              シーン {index + 1}
            </h3>

            <div className="grid gap-4">
              <label className={labelClass}>
                シーン名
                <input
                  type="text"
                  value={item.titleIdea}
                  onChange={(event) =>
                    updateItem(item.id, {
                      titleIdea: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-800">
              撮影メモ
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

      <button
        type="button"
        onClick={() =>
          onChange([...value, createDefaultVlogItem()])
        }
        className="mt-5 w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 sm:w-auto sm:py-2"
      >
        撮影メモを追加
      </button>
    </section>
  );
}
