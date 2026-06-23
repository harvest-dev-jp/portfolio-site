// src/components/furusato-tax/FurusatoTaxSimulator.tsx

"use client";

import { useMemo, useState } from "react";

import {
  createDefaultSimulatorFormState,
} from "@/lib/furusato-tax/defaultValues";

import {
  simulateDetailedFurusatoTax,
  simulateFurusatoTax,
} from "@/lib/furusato-tax/simulateFurusatoTax";

import type {
  DetailedInput,
  InputMode,
  SimpleInput,
  SimulatorFormState,
} from "@/lib/furusato-tax/types";

import DetailedInputForm from "./DetailedInputForm";
import InputModeSelector from "./InputModeSelector";
import SimpleInputForm from "./SimpleInputForm";
import SimulationResultPanel from "./SimulationResultPanel";

export default function FurusatoTaxSimulator() {
  /**
   * かんたん入力・詳細入力を含む、
   * シミュレーター全体の入力状態。
   */
  const [formState, setFormState] =
    useState<SimulatorFormState>(
      createDefaultSimulatorFormState,
    );

  /**
   * 選択中の入力モードに応じて、
   * ふるさと納税の試算を自動実行する。
   */
  const simulation = useMemo(() => {
    try {
      const result =
        formState.mode === "simple"
          ? simulateFurusatoTax(
              formState.simple,
            )
          : simulateDetailedFurusatoTax(
              formState.detailed,
            );

      return {
        result,
        error: null,
      };
    } catch (error) {
      console.error(
        "ふるさと納税の試算中にエラーが発生しました。",
        error,
      );

      return {
        result: null,
        error:
          "入力内容を確認してください。試算処理中にエラーが発生しました。",
      };
    }
  }, [
    formState.mode,
    formState.simple,
    formState.detailed,
  ]);

  /**
   * 入力モードを切り替える。
   *
   * simpleとdetailedの入力値はそのまま保持する。
   */
  const handleModeChange = (
    mode: InputMode,
  ) => {
    setFormState((current) => ({
      ...current,
      mode,
    }));
  };

  /**
   * かんたん入力を部分更新する。
   */
  const handleSimpleInputChange = (
    updates: Partial<SimpleInput>,
  ) => {
    setFormState((current) => ({
      ...current,
      simple: {
        ...current.simple,
        ...updates,
      },
    }));
  };

  /**
   * 詳細入力を部分更新する。
   */
  const handleDetailedInputChange = (
    updates: Partial<DetailedInput>,
  ) => {
    setFormState((current) => ({
      ...current,
      detailed: {
        ...current.detailed,
        ...updates,
      },
    }));
  };

  /**
   * 入力内容を初期値へ戻す。
   */
  const handleReset = () => {
    const shouldReset = window.confirm(
      "入力内容をすべて初期値に戻しますか？",
    );

    if (!shouldReset) {
      return;
    }

    setFormState(
      createDefaultSimulatorFormState(),
    );
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ページタイトル */}
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-700">
          2026年分（令和8年分）
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ふるさと納税シミュレーション＋
        </h1>

        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          年収や家族構成に加え、iDeCoや住宅ローン控除なども考慮して、
          自己負担額を2,000円に収められる寄附上限額の目安を試算します。
        </p>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          本シミュレーションの結果は参考値です。実際の控除額は、
          所得・各種控除・申告方法・自治体・税制改正などにより
          異なる場合があります。
        </div>
      </header>

      {/* 入力モード選択 */}
      <div className="mb-8">
        <InputModeSelector
          value={formState.mode}
          onChange={handleModeChange}
        />
      </div>

      {/* 入力フォーム */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {formState.mode === "simple"
                ? "かんたん入力"
                : "詳細入力"}
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {formState.mode === "simple"
                ? "年収や家族構成、各種控除の見込額から試算します。"
                : "源泉徴収票の記載内容をもとに試算します。"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            入力をリセット
          </button>
        </div>

        {formState.mode === "simple" ? (
          <SimpleInputForm
            value={formState.simple}
            onChange={
              handleSimpleInputChange
            }
          />
        ) : (
          <DetailedInputForm
            value={formState.detailed}
            onChange={
              handleDetailedInputChange
            }
          />
        )}
      </div>

      {/* 試算結果 */}
      <div className="mt-10">
        {simulation.result && (
          <SimulationResultPanel
            result={simulation.result}
          />
        )}

        {simulation.error && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-900"
          >
            <h2 className="font-bold">
              試算できませんでした
            </h2>

            <p className="mt-2">
              {simulation.error}
            </p>
          </div>
        )}
      </div>

      {/* 免責事項 */}
      <footer className="mt-10 rounded-xl bg-slate-100 px-5 py-4 text-xs leading-6 text-slate-600">
        本アプリの試算結果は、入力された情報をもとに算出する参考値です。
        実際の税額や控除額を保証するものではありません。
        最終的な判断については、税務署、自治体または税理士などの
        専門家へご確認ください。
      </footer>
    </section>
  );
}
