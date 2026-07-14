// src/components/travel-simulator/ExportPanel.tsx

"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import type { TravelPlan } from "@/lib/travel-simulator/types";

import {
  createTravelPlanCsv,
  createTravelPlanJson,
  createTravelPlanJsonFilename,
  createTravelPlanText,
  downloadTextFile,
  parseTravelPlanJson,
} from "@/lib/travel-simulator/export";

interface ExportPanelProps {
  plan: TravelPlan;
  onLoadPlan: (plan: TravelPlan) => void;
}

export default function ExportPanel({
  plan,
  onLoadPlan,
}: ExportPanelProps) {
  const [copyMessage, setCopyMessage] = useState("");
  const [fileMessage, setFileMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filenameBase =
    plan.basicInfo.title.trim() || "travel-plan";
  const textPreview = createTravelPlanText(plan);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textPreview);
      setCopyMessage("コピーしました");
      window.setTimeout(() => setCopyMessage(""), 2500);
    } catch (error) {
      console.error("テキストのコピーに失敗しました。", error);
      setCopyMessage("コピーできませんでした");
      window.setTimeout(() => setCopyMessage(""), 2500);
    }
  };

  const handleSaveJson = () => {
    downloadTextFile(
      createTravelPlanJsonFilename(plan),
      createTravelPlanJson(plan),
      "application/json",
    );
    setFileMessage("JSONを保存しました");
    window.setTimeout(() => setFileMessage(""), 2500);
  };

  const handleLoadClick = () => {
    const shouldLoad = window.confirm(
      "現在の編集内容を破棄して読み込みますか？",
    );

    if (!shouldLoad) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const loadedPlan = parseTravelPlanJson(content);

      onLoadPlan(loadedPlan);
      setFileMessage("JSONを読み込みました");
      window.setTimeout(() => setFileMessage(""), 2500);
    } catch (error) {
      console.error("旅行計画JSONの読み込みに失敗しました。", error);
      setFileMessage("このファイルは読み込めません");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold text-emerald-700">
          EXPORT
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          保存・出力
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          入力内容はこのブラウザに自動保存されます。JSONで保存すると、別の旅行データとして後から読み込んで再編集できます。
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              テキスト出力プレビュー
            </h3>
            {copyMessage && (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                {copyMessage}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            コピー
          </button>
        </div>
        <pre className="mt-3 max-h-72 min-h-40 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {textPreview}
        </pre>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSaveJson}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          保存
        </button>

        <button
          type="button"
          onClick={handleLoadClick}
          className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
        >
          読込
        </button>

        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              `${filenameBase}.csv`,
              createTravelPlanCsv(plan),
              "text/csv",
            )
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          CSV出力
        </button>

        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              `${filenameBase}.txt`,
              textPreview,
              "text/plain",
            )
          }
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          TXT出力
        </button>

      </div>

      {fileMessage && (
        <p className="mt-3 text-sm font-medium text-emerald-700">
          {fileMessage}
        </p>
      )}
    </section>
  );
}
