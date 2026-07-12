import {
  mediaTypeLabels,
  orientationLabels,
  type MediaType,
  type Orientation,
  type VlogItem,
} from "@/lib/travel-simulator/types";

import { createDefaultVlogItem } from "@/lib/travel-simulator/defaultValues";

interface VlogFormProps {
  value: VlogItem[];
  onChange: (items: VlogItem[]) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200";

const labelClass = "text-sm font-semibold text-slate-800";

const scenes = [
  "オープニング",
  "出発シーン",
  "移動中",
  "到着シーン",
  "観光地紹介",
  "食事シーン",
  "ホテル紹介",
  "夕景・夜景",
  "まとめ・エンディング",
];

const mediaTypes = Object.keys(mediaTypeLabels) as MediaType[];
const orientations = Object.keys(orientationLabels) as Orientation[];

export default function VlogForm({
  value,
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

        <button
          type="button"
          onClick={() =>
            onChange([...value, createDefaultVlogItem()])
          }
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          撮影メモを追加
        </button>
      </div>

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
              撮影メモ {index + 1}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                VLOGタイトル案
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

              <label className={labelClass}>
                想定シーン
                <select
                  value={item.scene}
                  onChange={(event) =>
                    updateItem(item.id, {
                      scene: event.target.value,
                    })
                  }
                  className={inputClass}
                >
                  {scenes.map((scene) => (
                    <option key={scene} value={scene}>
                      {scene}
                    </option>
                  ))}
                </select>
              </label>

              <label className={labelClass}>
                撮影ポイント
                <input
                  type="text"
                  value={item.shootingPoint}
                  onChange={(event) =>
                    updateItem(item.id, {
                      shootingPoint: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                字幕案
                <input
                  type="text"
                  value={item.subtitleIdea}
                  onChange={(event) =>
                    updateItem(item.id, {
                      subtitleIdea: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                静止画／動画
                <select
                  value={item.mediaType}
                  onChange={(event) =>
                    updateItem(item.id, {
                      mediaType: event.target.value as MediaType,
                    })
                  }
                  className={inputClass}
                >
                  {mediaTypes.map((mediaType) => (
                    <option key={mediaType} value={mediaType}>
                      {mediaTypeLabels[mediaType]}
                    </option>
                  ))}
                </select>
              </label>

              <label className={labelClass}>
                横動画／縦動画
                <select
                  value={item.orientation}
                  onChange={(event) =>
                    updateItem(item.id, {
                      orientation: event.target.value as Orientation,
                    })
                  }
                  className={inputClass}
                >
                  {orientations.map((orientation) => (
                    <option key={orientation} value={orientation}>
                      {orientationLabels[orientation]}
                    </option>
                  ))}
                </select>
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
    </section>
  );
}
