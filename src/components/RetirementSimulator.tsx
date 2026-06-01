"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "deterministic" | "monteCarlo";

type SimulatorParams = {
  currentAge: number;
  retireAge: number;
  lifeExpectancy: number;
  currentAssets: number;
  annualContribution: number;
  annualExpenses: number;
  inflationRate: number;
  expectedReturn: number;
  volatility: number;
  pensionStartAge: number;
  pensionAnnualAmount: number;
  pensionInflationLinked: boolean;
  mode: Mode;
  monteCarloRuns: number;
};

type ChartResult = {
  years: number[];
  deterministic: number[];
  p20: number[];
  p50: number[];
  p80: number[];
  survivalRate: number;
  depletionAge: string;
  inflationMultiplier: number;
  finalExpense: number;
  maxValue: number;
};

const defaultParams: SimulatorParams = {
  currentAge: 40,
  retireAge: 65,
  lifeExpectancy: 90,
  currentAssets: 30000000,
  annualContribution: 1200000,
  annualExpenses: 4000000,
  inflationRate: 2.0,
  expectedReturn: 5.0,
  volatility: 15.0,
  pensionStartAge: 65,
  pensionAnnualAmount: 1500000,
  pensionInflationLinked: false,
  mode: "deterministic",
  monteCarloRuns: 300,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalRandom() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function quantile(sortedValues: number[], q: number) {
  if (!sortedValues.length) {
    return 0;
  }
  const pos = (sortedValues.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (base + 1 >= sortedValues.length) {
    return sortedValues[base];
  }
  return sortedValues[base] + rest * (sortedValues[base + 1] - sortedValues[base]);
}

function calculatePath(params: SimulatorParams, randomize: boolean) {
  const years = [];
  const assets: number[] = [];
  const inflation = params.inflationRate / 100;
  const expectedReturn = params.expectedReturn / 100;
  const volatility = params.volatility / 100;
  const pensionStartAge = params.pensionStartAge;
  const currentAge = params.currentAge;
  const retireAge = params.retireAge;
  const lifeExpectancy = params.lifeExpectancy;

  const ageCount = lifeExpectancy - currentAge + 1;
  let asset = params.currentAssets;

  for (let i = 0; i < ageCount; i += 1) {
    const age = currentAge + i;
    years.push(age);

    if (i === 0) {
      assets.push(asset);
      continue;
    }

    const annualReturn = randomize
      ? expectedReturn + volatility * normalRandom()
      : expectedReturn;

    if (age < retireAge) {
      asset = asset * (1 + annualReturn) + params.annualContribution;
    } else {
      const expense =
        params.annualExpenses * Math.pow(1 + inflation, age - currentAge);
      const pension =
        age >= pensionStartAge
          ? params.pensionAnnualAmount *
            (params.pensionInflationLinked
              ? Math.pow(1 + inflation, age - pensionStartAge)
              : 1)
          : 0;
      const withdrawal = Math.max(expense - pension, 0);
      asset = Math.max(0, asset * (1 + annualReturn) - withdrawal);
    }

    assets.push(asset);
  }

  return { years, assets };
}

function calcChartResult(params: SimulatorParams): ChartResult {
  const deterministic = calculatePath(params, false).assets;
  const years = calculatePath(params, false).years;
  const ageCount = years.length;

  const allPaths: number[][] = [];
  for (let i = 0; i < params.monteCarloRuns; i += 1) {
    allPaths.push(calculatePath(params, true).assets);
  }

  const p20: number[] = [];
  const p50: number[] = [];
  const p80: number[] = [];

  for (let i = 0; i < ageCount; i += 1) {
    const values = allPaths.map((path) => path[i]).sort((a, b) => a - b);
    p20.push(quantile(values, 0.2));
    p50.push(quantile(values, 0.5));
    p80.push(quantile(values, 0.8));
  }

  const survivors = allPaths.filter(
    (path) => path[path.length - 1] > 1,
  ).length;
  const survivalRate = survivors / params.monteCarloRuns;

  const depletionIndex = deterministic.findIndex((value) => value <= 0);
  const depletionAge =
    depletionIndex === -1
      ? "想定寿命まで維持"
      : `${years[depletionIndex]}歳`; 

  const inflationMultiplier = Number(
    Math.pow(1 + params.inflationRate / 100, params.lifeExpectancy - params.currentAge).toFixed(2),
  );

  // Y軸の上限を運用資産額の最大値の10%増しにする
  const maxValueBase = Math.max(...deterministic, 1000000);
  const maxValue = Math.ceil(maxValueBase * 1.1);

  return {
    years,
    deterministic,
    p20,
    p50,
    p80,
    survivalRate,
    depletionAge,
    inflationMultiplier,
    finalExpense:
      params.annualExpenses *
      Math.pow(1 + params.inflationRate / 100, params.lifeExpectancy - params.currentAge),
    maxValue,
  };
}

function formatYen(value: number) {
  return value.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  });
}

function formatManYen(value: number) {
  const man = Math.round(value / 10000);
  return `${man.toLocaleString("ja-JP")}万円`;
}

function formatNumberWithCommas(value: number) {
  return value.toLocaleString("ja-JP");
}

function parseInputNumber(input: string, fallback = 0) {
  const cleaned = String(input).replace(/[^0-9.-]/g, "");
  const n = Number(cleaned);
  return Number.isNaN(n) || cleaned === "" ? fallback : n;
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export default function RetirementSimulator() {
  const [params, setParams] = useState<SimulatorParams>(defaultParams);
  const [executedParams, setExecutedParams] = useState<SimulatorParams>(defaultParams);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>(
    "入力値を変更するたびにリアルタイムで再計算されます。",
  );
  const [chartType, setChartType] = useState<"line" | "bar">("bar");
  
  // ローカル入力状態（入力中の中間状態を許可）
  const [currentAgeInput, setCurrentAgeInput] = useState<string>(String(params.currentAge));
  const [retireAgeInput, setRetireAgeInput] = useState<string>(String(params.retireAge));
  const [lifeExpectancyInput, setLifeExpectancyInput] = useState<string>(String(params.lifeExpectancy));
  const [currentAssetsInput, setCurrentAssetsInput] = useState<string>(formatNumberWithCommas(params.currentAssets));
  const [annualContributionInput, setAnnualContributionInput] = useState<string>(formatNumberWithCommas(params.annualContribution));
  const [annualExpensesInput, setAnnualExpensesInput] = useState<string>(formatNumberWithCommas(params.annualExpenses));
  const [pensionStartAgeInput, setPensionStartAgeInput] = useState<string>(String(params.pensionStartAge));
  const [pensionAnnualAmountInput, setPensionAnnualAmountInput] = useState<string>(formatNumberWithCommas(params.pensionAnnualAmount));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const saved = window.localStorage.getItem("harvest-retirement-simulator");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as SimulatorParams;
        setParams(parsed);
        setExecutedParams(parsed);
      } catch {
        // ignore invalid local storage data
      }
    }
  }, []);

  useEffect(() => {
    if (params.mode === "deterministic") {
      setExecutedParams(params);
      setStatusMessage("入力値を変更するたびにリアルタイムで再計算されます。");
    } else {
      setStatusMessage(
        "モンテカルロモードでは「シミュレーション実行」を押して最新結果を反映します。",
      );
    }
  }, [params]);

  const chartResult = useMemo(() => {
    const result = calcChartResult(executedParams);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "harvest-retirement-simulator",
        JSON.stringify(executedParams),
      );
    }
    return result;
  }, [executedParams]);

  const displayValues =
    params.mode === "deterministic" ? chartResult.deterministic : chartResult.p50;
  const displayLabel =
    params.mode === "deterministic" ? "固定リターン資産額" : "中央値（50％）";

  const handleRun = () => {
    setExecutedParams(params);
    setShareUrl("");
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const query = new URLSearchParams({
      currentAge: String(params.currentAge),
      retireAge: String(params.retireAge),
      lifeExpectancy: String(params.lifeExpectancy),
      currentAssets: String(params.currentAssets),
      annualContribution: String(params.annualContribution),
      annualExpenses: String(params.annualExpenses),
      inflationRate: String(params.inflationRate),
      expectedReturn: String(params.expectedReturn),
      volatility: String(params.volatility),
      pensionStartAge: String(params.pensionStartAge),
      pensionAnnualAmount: String(params.pensionAnnualAmount),
      pensionInflationLinked: String(Number(params.pensionInflationLinked)),
      mode: params.mode,
      monteCarloRuns: String(params.monteCarloRuns),
    });
    const url = `${window.location.origin}${window.location.pathname}?${query.toString()}`;
    window.history.replaceState({}, "", url);
    setShareUrl(url);
  };

  const years = chartResult.years;
  const width = 760;
  const height = 360;
  const margin = { top: 24, right: 24, bottom: 36, left: 72 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xStep = years.length > 1 ? innerWidth / (years.length - 1) : innerWidth;
  const barWidth = Math.max(8, Math.min(32, innerWidth / years.length - 2));
  const maxValue = chartResult.maxValue;
  const yScale = maxValue > 0 ? innerHeight / maxValue : 1;
  const contributionValues = years.map((year) =>
    year < params.retireAge ? params.annualContribution : 0,
  );

  const createPath = (values: number[]) =>
    values
      .map((value, index) => {
        const x = margin.left + index * xStep;
        const y = margin.top + innerHeight - value * yScale;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  return (
    <section className="container-md section-py">
      <div className="grid gap-10 grid-cols-1">
        <div>
          <div className="card mb-6">
            <h2 className="heading-2 mb-4">動的リタイアメント・シミュレーター</h2>
            <p className="text-harvest-600 mb-4">
              インフレ、年金、資産リターンの変動を考慮したシミュレーション。固定リターンとモンテカルロの両方を切り替えて、資産寿命を可視化します。
            </p>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-harvest-700">
                  現在年齢
                  <input
                    type="number"
                    value={currentAgeInput}
                    step={1}
                    onChange={(e) => {
                      setCurrentAgeInput(e.target.value);
                      const numVal = Number(e.target.value);
                      if (!Number.isNaN(numVal)) {
                        setParams((prev) => ({
                          ...prev,
                          currentAge: numVal,
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(currentAgeInput) || params.currentAge;
                      const clamped = clamp(numVal, 20, 60);
                      setCurrentAgeInput(String(clamped));
                      setParams((prev) => ({
                        ...prev,
                        currentAge: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-harvest-700">
                  リタイア予定年齢
                  <input
                    type="number"
                    value={retireAgeInput}
                    step={1}
                    onChange={(e) => {
                      setRetireAgeInput(e.target.value);
                      const numVal = Number(e.target.value);
                      if (!Number.isNaN(numVal)) {
                        setParams((prev) => ({
                          ...prev,
                          retireAge: numVal,
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(retireAgeInput) || params.retireAge;
                      const clamped = clamp(numVal, params.currentAge + 1, 75);
                      setRetireAgeInput(String(clamped));
                      setParams((prev) => ({
                        ...prev,
                        retireAge: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-harvest-700">
                  想定寿命
                  <input
                    type="number"
                    value={lifeExpectancyInput}
                    step={1}
                    onChange={(e) => {
                      setLifeExpectancyInput(e.target.value);
                      const numVal = Number(e.target.value);
                      if (!Number.isNaN(numVal)) {
                        setParams((prev) => ({
                          ...prev,
                          lifeExpectancy: numVal,
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(lifeExpectancyInput) || params.lifeExpectancy;
                      const clamped = clamp(numVal, params.retireAge + 5, 110);
                      setLifeExpectancyInput(String(clamped));
                      setParams((prev) => ({
                        ...prev,
                        lifeExpectancy: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-harvest-700">
                  現在の運用資産額
                  <input
                    type="text"
                    inputMode="numeric"
                    value={currentAssetsInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const formatted = val ? formatNumberWithCommas(Number(val)) : "";
                      setCurrentAssetsInput(formatted);
                      if (val !== "") {
                        setParams((prev) => ({
                          ...prev,
                          currentAssets: Number(val),
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(currentAssetsInput.replace(/[^0-9]/g, "")) || params.currentAssets;
                      const clamped = clamp(numVal, 0, 999999999);
                      setCurrentAssetsInput(formatNumberWithCommas(clamped));
                      setParams((prev) => ({
                        ...prev,
                        currentAssets: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-harvest-700">
                  年間積立額
                  <input
                    type="text"
                    inputMode="numeric"
                    value={annualContributionInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const formatted = val ? formatNumberWithCommas(Number(val)) : "";
                      setAnnualContributionInput(formatted);
                      if (val !== "") {
                        setParams((prev) => ({
                          ...prev,
                          annualContribution: Number(val),
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(annualContributionInput.replace(/[^0-9]/g, "")) || params.annualContribution;
                      const clamped = clamp(numVal, 0, 99999999);
                      setAnnualContributionInput(formatNumberWithCommas(clamped));
                      setParams((prev) => ({
                        ...prev,
                        annualContribution: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
                <label className="block text-sm font-medium text-harvest-700">
                  年間想定生活費
                  <input
                    type="text"
                    inputMode="numeric"
                    value={annualExpensesInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const formatted = val ? formatNumberWithCommas(Number(val)) : "";
                      setAnnualExpensesInput(formatted);
                      if (val !== "") {
                        setParams((prev) => ({
                          ...prev,
                          annualExpenses: Number(val),
                        }));
                      }
                    }}
                    onBlur={() => {
                      const numVal = Number(annualExpensesInput.replace(/[^0-9]/g, "")) || params.annualExpenses;
                      const clamped = clamp(numVal, 0, 99999999);
                      setAnnualExpensesInput(formatNumberWithCommas(clamped));
                      setParams((prev) => ({
                        ...prev,
                        annualExpenses: clamped,
                      }));
                    }}
                    className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-medium text-harvest-700">
                  想定インフレ率 <span className="text-harvest-500">{params.inflationRate}%</span>
                  <input
                    type="range"
                    value={params.inflationRate}
                    min={0}
                    max={8}
                    step={0.1}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        inflationRate: Number(e.target.value),
                      }))
                    }
                    className="mt-2 w-full"
                  />
                </label>
                <label className="block text-sm font-medium text-harvest-700">
                  期待投資リターン <span className="text-harvest-500">{params.expectedReturn}%</span>
                  <input
                    type="range"
                    value={params.expectedReturn}
                    min={0}
                    max={12}
                    step={0.1}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        expectedReturn: Number(e.target.value),
                      }))
                    }
                    className="mt-2 w-full"
                  />
                </label>
              </div>

              <div className="grid gap-4">
                <label className="block text-sm font-medium text-harvest-700">
                  投資リターンの振れ幅（標準偏差） <span className="text-harvest-500">{params.volatility}%</span>
                  <input
                    type="range"
                    value={params.volatility}
                    min={0}
                    max={40}
                    step={0.5}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        volatility: Number(e.target.value),
                      }))
                    }
                    className="mt-2 w-full"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm font-medium text-harvest-700">
                    年金受給開始年齢
                    <input
                      type="number"
                      value={pensionStartAgeInput}
                      step={1}
                      onChange={(e) => {
                        setPensionStartAgeInput(e.target.value);
                        const numVal = Number(e.target.value);
                        if (!Number.isNaN(numVal)) {
                          setParams((prev) => ({
                            ...prev,
                            pensionStartAge: numVal,
                          }));
                        }
                      }}
                      onBlur={() => {
                        const numVal = Number(pensionStartAgeInput) || params.pensionStartAge;
                        const clamped = clamp(numVal, params.retireAge, 80);
                        setPensionStartAgeInput(String(clamped));
                        setParams((prev) => ({
                          ...prev,
                          pensionStartAge: clamped,
                        }));
                      }}
                      className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-harvest-700">
                    年間想定年金額
                    <input
                      type="text"
                      inputMode="numeric"
                      value={pensionAnnualAmountInput}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        const formatted = val ? formatNumberWithCommas(Number(val)) : "";
                        setPensionAnnualAmountInput(formatted);
                        if (val !== "") {
                          setParams((prev) => ({
                            ...prev,
                            pensionAnnualAmount: Number(val),
                          }));
                        }
                      }}
                      onBlur={() => {
                        const numVal = Number(pensionAnnualAmountInput.replace(/[^0-9]/g, "")) || params.pensionAnnualAmount;
                        const clamped = clamp(numVal, 0, 99999999);
                        setPensionAnnualAmountInput(formatNumberWithCommas(clamped));
                        setParams((prev) => ({
                          ...prev,
                          pensionAnnualAmount: clamped,
                        }));
                      }}
                      className="mt-2 w-full rounded-lg border border-harvest-200 px-3 py-2"
                    />
                  </label>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-harvest-700">
                <input
                  type="checkbox"
                  checked={params.pensionInflationLinked}
                  onChange={(e) =>
                    setParams((prev) => ({
                      ...prev,
                      pensionInflationLinked: e.target.checked,
                    }))
                  }
                  className="h-5 w-5 rounded border-harvest-300 text-harvest-700"
                />
                年金をインフレ連動させる
              </label>

              <label className="block text-sm font-medium text-harvest-700">
                モード
                <select
                  value={params.mode}
                  onChange={(e) =>
                    setParams((prev) => ({
                      ...prev,
                      mode: e.target.value as Mode,
                    }))
                  }
                  className="mt-2 w-full rounded-lg border border-harvest-200 bg-white px-3 py-2"
                >
                  <option value="deterministic">固定リターン</option>
                  <option value="monteCarlo">モンテカルロモード</option>
                </select>
              </label>

              {params.mode === "monteCarlo" ? (
                <label className="block text-sm font-medium text-harvest-700">
                  シミュレーション回数 <span className="text-harvest-500">{params.monteCarloRuns}</span>
                  <input
                    type="range"
                    value={params.monteCarloRuns}
                    min={100}
                    max={1000}
                    step={100}
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        monteCarloRuns: Number(e.target.value),
                      }))
                    }
                    className="mt-2 w-full"
                  />
                </label>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-3">
                {params.mode === "monteCarlo" ? (
                  <button type="button" onClick={handleRun} className="btn-primary">
                    シミュレーション実行
                  </button>
                ) : null}
                <button type="button" onClick={handleShare} className="btn-secondary">
                  シェア用URLを生成
                </button>
              </div>
              <p className="mt-3 text-sm text-harvest-500">{statusMessage}</p>
              {shareUrl ? (
                <p className="mt-2 rounded-lg bg-harvest-50 p-3 text-sm text-harvest-700">
                  共有URLを生成しました：
                  <br />
                  <a href={shareUrl} className="text-harvest-900 underline" target="_blank" rel="noreferrer">
                    {shareUrl}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="mb-6 flex flex-col gap-4">
              <div>
                <h3 className="heading-3">資産推移</h3>
                <p className="text-sm text-harvest-500">
                  {params.mode === "deterministic"
                    ? "固定リターンによる資産推移を1本のラインで表示します。"
                    : "モンテカルロによる中央値と20〜80パーセンタイルの範囲を表示します。"}
                </p>
              </div>
            </div>
            
            <div className="mb-6 rounded-2xl border border-harvest-100 bg-harvest-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-harvest-700">グラフタイプ</div>
                  <p className="text-sm text-harvest-500">棒グラフと折れ線グラフを切り替えます。</p>
                </div>
                <div className="inline-flex items-center gap-4 rounded-2xl bg-white p-3 border border-harvest-200">
                  <label className="inline-flex items-center gap-2 text-sm text-harvest-700">
                    <input
                      type="radio"
                      name="chartType"
                      value="line"
                      checked={chartType === "line"}
                      onChange={() => setChartType("line")}
                      className="h-4 w-4 text-harvest-700"
                    />
                    折れ線
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-harvest-700">
                    <input
                      type="radio"
                      name="chartType"
                      value="bar"
                      checked={chartType === "bar"}
                      onChange={() => setChartType("bar")}
                      className="h-4 w-4 text-harvest-700"
                    />
                    棒グラフ
                  </label>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-harvest-200 bg-white p-4 shadow-sm">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
                <defs>
                  <linearGradient id="monteArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#c6f6d5" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c6f6d5" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <g>
                  {/* 運用資産額の最大値に点線参考線を表示 */}
                  {displayValues.length > 0 && (
                    (() => {
                      const maxDataValue = Math.max(...displayValues);
                      const maxDataY = margin.top + innerHeight - maxDataValue * yScale;
                      return (
                        <g>
                          <line
                            x1={margin.left}
                            x2={width - margin.right}
                            y1={maxDataY}
                            y2={maxDataY}
                            stroke="#999"
                            strokeDasharray="4,4"
                            opacity="0.6"
                          />
                          <text
                            x={margin.left - 8}
                            y={maxDataY - 4}
                            textAnchor="end"
                            fontSize="12"
                            fill="#999"
                          >
                            {formatManYen(maxDataValue)}
                          </text>
                        </g>
                      );
                    })()
                  )}
                  {[0, 1, 2, 3, 4].map((index) => {
                    const y = margin.top + (innerHeight / 4) * index;
                    const value = Math.round(maxValue - (maxValue / 4) * index);
                    return (
                      <g key={index}>
                        <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} stroke="#efefef" />
                        <text x={margin.left - 8} y={y + 4} textAnchor="end" fontSize="12" fill="#6b7082">
                          {formatManYen(value)}
                        </text>
                      </g>
                    );
                  })}
                  {years.map((year, index) => {
                    if (index % 5 !== 0 && index !== years.length - 1) return null;
                    const x = margin.left + index * xStep;
                    return (
                      <g key={year}>
                        <line x1={x} x2={x} y1={margin.top} y2={margin.top + innerHeight} stroke="#f4f4f4" />
                        <text x={x} y={margin.top + innerHeight + 20} textAnchor="middle" fontSize="12" fill="#6b7082">
                          {year}
                        </text>
                      </g>
                    );
                  })}
                  {chartType === "bar" ? (
                    displayValues.map((value, index) => {
                      const x = margin.left + index * xStep - barWidth / 2;
                      const barHeight = value * yScale;
                      const y = margin.top + innerHeight - barHeight;
                      return (
                        <rect
                          key={index}
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill="#2563eb"
                          opacity="0.85"
                        />
                      );
                    })
                  ) : (
                    <path d={createPath(displayValues)} fill="none" stroke="#2563eb" strokeWidth="3" />
                  )}
                </g>
              </svg>
            </div>

            <div className="mt-6 rounded-3xl border border-harvest-200 bg-harvest-50 p-4">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="heading-3">年別の運用資産額</h3>
                  <p className="text-sm text-harvest-500">現在年齢から想定寿命までの一覧です。</p>
                </div>
                <div className="text-sm text-harvest-700">表示: {displayLabel}</div>
              </div>
              <div className="overflow-x-auto rounded-3xl border border-harvest-200 bg-white max-h-[520px] overflow-y-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-harvest-100 text-harvest-700 sticky top-0">
                    <tr>
                      <th className="px-4 py-3">年齢</th>
                      <th className="px-4 py-3">運用資産額</th>
                      <th className="px-4 py-3">年間積立額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {years.map((year, index) => {
                      // 5歳刻みの行のみ表示。ただし最終年は必ず表示
                      if ((year - years[0]) % 5 !== 0 && index !== years.length - 1) return null;
                      return (
                        <tr key={year} className={index % 2 === 0 ? "bg-white" : "bg-harvest-50"}>
                          <td className="px-4 py-3 text-harvest-700">{year}歳</td>
                          <td className="px-4 py-3 text-harvest-900">{formatYen(displayValues[index])}</td>
                          <td className="px-4 py-3 text-harvest-900">{formatYen(contributionValues[index])}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 統計カードは非表示（要望により削除） */}
          </div>
        </div>
      </div>
    </section>
  );
}
