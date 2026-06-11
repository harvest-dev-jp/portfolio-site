"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SimulationInput = {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentAssets: number;
  annualSavings: number;
  annualLivingCost: number;
  pensionStartAge: number;
  annualPension: number;
  annualReturnRate: number;
  inflationRate: number;
};

type ChartData = {
  age: number;
  assets: number;
};

type SimulationResult = {
  depletionAge: number | null;
  finalAssets: number;
  assetsAtMinus10: number;
  assetsAtLifeExpectancy: number;
  assetsAtPlus10: number;
  chartData: ChartData[];
};

const clamp = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const parseManYen = (value: string, min: number, max: number) => {
  const normalized = value
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0)
    )
    .replace(/,/g, "")
    .replace(/[^\d]/g, "");

  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) return min;

  return clamp(parsed, min, max);
};

const formatManYen = (value: number) => {
  return Math.round(value).toLocaleString();
};

function getStatusColor(
  depletionAge: number | null,
  lifeExpectancy: number
) {
  if (depletionAge === null) {
    return "success";
  }

  if (depletionAge >= lifeExpectancy + 10) {
    return "success";
  }

  if (depletionAge >= lifeExpectancy) {
    return "warning";
  }

  return "danger";
}

const formatInputNumber = (value: number) => {
  return value.toLocaleString();
};

const createRange = (start: number, end: number, step = 1) => {
  const values: number[] = [];

  for (let value = start; value <= end; value += step) {
    values.push(value);
  }

  return values;
};

function getAssetStatus(asset: number) {
  if (asset >= 3000) return "success";
  if (asset >= 500) return "warning";
  return "danger";
}

function simulateRetirement(input: SimulationInput): SimulationResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAssets,
    annualSavings,
    annualLivingCost,
    pensionStartAge,
    annualPension,
    annualReturnRate,
    inflationRate,
  } = input;

  const monthlyReturnRate = annualReturnRate / 12 / 100;
  const annualInflationRate = inflationRate / 100;

  const simulationEndAge = Math.min(lifeExpectancy + 10, 110);
  const totalMonths = Math.max(0, (simulationEndAge - currentAge) * 12);

  let assets = currentAssets;
  let depletionAge: number | null = null;

  let assetsAtMinus10 = 0;
  let assetsAtLifeExpectancy = 0;
  let assetsAtPlus10 = 0;

  const minus10Age = Math.max(currentAge, lifeExpectancy - 10);
  const plus10Age = Math.min(lifeExpectancy + 10, 110);

  const chartData: ChartData[] = [
    {
      age: currentAge,
      assets: Math.max(0, Math.round(assets)),
    },
  ];

  for (let month = 1; month <= totalMonths; month++) {
    const currentMonthAge = currentAge + month / 12;
    const elapsedYears = Math.floor(month / 12);

    const monthlySavings =
      currentMonthAge < retirementAge ? annualSavings / 12 : 0;

    const monthlyPension =
      currentMonthAge >= pensionStartAge ? annualPension / 12 : 0;

    const monthlyLivingCost =
      (annualLivingCost / 12) *
      Math.pow(1 + annualInflationRate, elapsedYears);

    assets =
      assets * (1 + monthlyReturnRate) +
      monthlySavings -
      monthlyLivingCost +
      monthlyPension;

    if (assets <= 0 && depletionAge === null) {
      depletionAge = Math.round(currentMonthAge * 10) / 10;
      assets = 0;
    }

    if (month % 12 === 0) {
      const age = Math.round(currentMonthAge);
      const roundedAssets = Math.max(0, Math.round(assets));

      chartData.push({
        age,
        assets: roundedAssets,
      });

      if (age === minus10Age) {
        assetsAtMinus10 = roundedAssets;
      }

      if (age === lifeExpectancy) {
        assetsAtLifeExpectancy = roundedAssets;
      }

      if (age === plus10Age) {
        assetsAtPlus10 = roundedAssets;
      }
    }
  }

  return {
    depletionAge,
    finalAssets: assetsAtLifeExpectancy,
    assetsAtMinus10,
    assetsAtLifeExpectancy,
    assetsAtPlus10,
    chartData,
  };
}



type LivingCostSuggestion = {
  recommendedLivingCost: number;
  reductionAmount: number;
  extraSpendableAmount: number;
  isAlreadySafe: boolean;
};

function findRecommendedLivingCost(input: SimulationInput): LivingCostSuggestion {
  const currentResult = simulateRetirement(input);

  if (currentResult.depletionAge === null) {
    let maxLivingCost = input.annualLivingCost;

    for (
      let livingCost = input.annualLivingCost + 10;
      livingCost <= 2000;
      livingCost += 10
    ) {
      const result = simulateRetirement({
        ...input,
        annualLivingCost: livingCost,
      });

      if (result.depletionAge === null) {
        maxLivingCost = livingCost;
      } else {
        break;
      }
    }

    //console.log("maxLivingCost", maxLivingCost);
    //console.log("currentLivingCost", input.annualLivingCost);

    return {
      recommendedLivingCost: maxLivingCost,
      reductionAmount: 0,
      extraSpendableAmount: maxLivingCost - input.annualLivingCost,
      isAlreadySafe: true,
    };
  }

  for (
    let livingCost = input.annualLivingCost;
    livingCost >= 0;
    livingCost -= 10
  ) {
    const result = simulateRetirement({
      ...input,
      annualLivingCost: livingCost,
    });

    if (result.depletionAge === null) {
      return {
        recommendedLivingCost: livingCost,
        reductionAmount: input.annualLivingCost - livingCost,
        extraSpendableAmount: 0,
        isAlreadySafe: false,
      };
    }
  }

  return {
    recommendedLivingCost: 0,
    reductionAmount: input.annualLivingCost,
    extraSpendableAmount: 0,
    isAlreadySafe: false,
  };
}
function createResultMessage(
  lifeExpectancy: number,
  depletionAge: number | null,
  assetsAtLifeExpectancy: number,
  assetsAtPlus10: number
) {
  if (depletionAge === null) {
    return `想定寿命${lifeExpectancy}歳を超えても、資産は枯渇しない見込みです。長寿リスクに対して比較的余裕のある計画です。`;
  }

  if (depletionAge <= lifeExpectancy) {
    return `想定寿命${lifeExpectancy}歳より前の${depletionAge}歳で資産が枯渇する見込みです。生活費の見直し、積立額の増加、リタイア年齢の再検討が必要です。`;
  }

  if (assetsAtPlus10 <= 0) {
    return `想定寿命${lifeExpectancy}歳時点では${formatManYen(
      assetsAtLifeExpectancy
    )}万円の資産が残る見込みです。ただし${depletionAge}歳で資産が枯渇するため、長寿リスクに備える場合は生活費の見直しが有効です。`;
  }

  return `想定寿命${lifeExpectancy}歳時点では${formatManYen(
    assetsAtLifeExpectancy
  )}万円、${Math.min(lifeExpectancy + 10, 110)}歳時点でも${formatManYen(
    assetsAtPlus10
  )}万円の資産が残る見込みです。比較的安定した計画です。`;
}

export default function RetirementSimulator() {
  const [currentAge, setCurrentAge] = useState(58);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [pensionStartAge, setPensionStartAge] = useState(65);

  const [currentAssetsText, setCurrentAssetsText] = useState("6,000");
  const [annualSavingsText, setAnnualSavingsText] = useState("120");
  const [annualLivingCostText, setAnnualLivingCostText] = useState("430");
  const [annualPensionText, setAnnualPensionText] = useState("264");

  const [currentAssets, setCurrentAssets] = useState(6000);
  const [annualSavings, setAnnualSavings] = useState(120);
  const [annualLivingCost, setAnnualLivingCost] = useState(430);
  const [annualPension, setAnnualPension] = useState(264);

  const [annualReturnRate, setAnnualReturnRate] = useState(5.0);
  const [inflationRate, setInflationRate] = useState(2.0);

  useEffect(() => {
    if (retirementAge < currentAge) {
      setRetirementAge(currentAge);
    }

    if (lifeExpectancy < retirementAge) {
      setLifeExpectancy(retirementAge);
    }
  }, [currentAge, retirementAge, lifeExpectancy]);

  const result = useMemo(() => {
    return simulateRetirement({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentAssets,
      annualSavings,
      annualLivingCost,
      pensionStartAge,
      annualPension,
      annualReturnRate,
      inflationRate,
    });
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAssets,
    annualSavings,
    annualLivingCost,
    pensionStartAge,
    annualPension,
    annualReturnRate,
    inflationRate,
  ]);

  const livingCostSuggestion = useMemo(() => {
    return findRecommendedLivingCost({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentAssets,
      annualSavings,
      annualLivingCost,
      pensionStartAge,
      annualPension,
      annualReturnRate,
      inflationRate,
    });
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAssets,
    annualSavings,
    annualLivingCost,
    pensionStartAge,
    annualPension,
    annualReturnRate,
    inflationRate,
  ]);

  const resultMessage = useMemo(() => {
    return createResultMessage(
      lifeExpectancy,
      result.depletionAge,
      result.assetsAtLifeExpectancy,
      result.assetsAtPlus10
    );
  }, [
    lifeExpectancy,
    result.depletionAge,
    result.assetsAtLifeExpectancy,
    result.assetsAtPlus10,
  ]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          動的リタイアメント・シミュレーター
        </h1>
        <p className="mt-3 text-gray-600">
          年齢、資産、積立額、生活費、年金、投資リターン、インフレ率をもとに、<br/>
          将来の資産推移を1ヶ月単位で試算します。
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-md md:p-8">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">入力条件</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <InputSelect
            label="現在の年齢"
            value={currentAge}
            options={createRange(20, 80)}
            unit="歳"
            onChange={setCurrentAge}
          />

          <InputSelect
            label="リタイア予定年齢"
            value={retirementAge}
            options={createRange(currentAge, 85)}
            unit="歳"
            onChange={setRetirementAge}
          />

          <InputSelect
            label="想定寿命"
            value={lifeExpectancy}
            options={createRange(retirementAge, 100)}
            unit="歳"
            onChange={setLifeExpectancy}
          />

          <MoneyInput
            label="現在の運用資産額"
            value={currentAssetsText}
            unit="万円"
            onChange={setCurrentAssetsText}
            onBlur={() => {
              const value = parseManYen(currentAssetsText, 0, 50000);
              setCurrentAssets(value);
              setCurrentAssetsText(formatInputNumber(value));
            }}
          />

          <MoneyInput
            label="年間積立額"
            value={annualSavingsText}
            unit="万円"
            onChange={setAnnualSavingsText}
            onBlur={() => {
              const value = parseManYen(annualSavingsText, 0, 1000);
              setAnnualSavings(value);
              setAnnualSavingsText(formatInputNumber(value));
            }}
          />

          <MoneyInput
            label="年間想定生活費"
            value={annualLivingCostText}
            unit="万円"
            onChange={(text) => {
              setAnnualLivingCostText(text);
              setAnnualLivingCost(parseManYen(text, 0, 2000));
            }}
            onBlur={() => {
              const value = parseManYen(annualLivingCostText, 0, 2000);
              setAnnualLivingCost(value);
              setAnnualLivingCostText(formatInputNumber(value));
            }}
          />

          <InputSelect
            label="年金受給開始年齢"
            value={pensionStartAge}
            options={createRange(60, 75)}
            unit="歳"
            onChange={setPensionStartAge}
          />

          <MoneyInput
            label="年間想定年金額"
            value={annualPensionText}
            unit="万円"
            onChange={setAnnualPensionText}
            onBlur={() => {
              const value = parseManYen(annualPensionText, 0, 500);
              setAnnualPension(value);
              setAnnualPensionText(formatInputNumber(value));
            }}
          />

          <RateSlider
            label="想定投資リターン"
            value={annualReturnRate}
            min={0}
            max={10}
            step={0.1}
            unit="%"
            onChange={setAnnualReturnRate}
          />

          <RateSlider
            label="想定インフレ率"
            value={inflationRate}
            min={0}
            max={5}
            step={0.1}
            unit="%"
            onChange={setInflationRate}
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-md md:p-8">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">試算結果</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <ResultCard
              label="資産枯渇年齢"
              value={
                result.depletionAge === null
                  ? "安泰"
                  : `${result.depletionAge}歳`
              }
              status={getStatusColor(
                result.depletionAge,
                lifeExpectancy
              )}
            />

            <ResultCard
              label={`${Math.max(currentAge, lifeExpectancy - 10)}歳時点の資産`}
              value={`${formatManYen(result.assetsAtMinus10)}万円`}
              status={getAssetStatus(result.assetsAtMinus10)}
            />

            <ResultCard
              label={`${lifeExpectancy}歳時点の資産`}
              value={`${formatManYen(result.assetsAtLifeExpectancy)}万円`}
              status={getAssetStatus(result.assetsAtLifeExpectancy)}
            />

            <ResultCard
              label={`${Math.min(lifeExpectancy + 10, 110)}歳時点の資産`}
              value={`${formatManYen(result.assetsAtPlus10)}万円`}
              status={getAssetStatus(result.assetsAtPlus10)}
            />
          </div>
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-5">
            <p className="text-sm font-semibold text-amber-700">診断コメント</p>
            <p className="mt-2 leading-relaxed text-amber-700">
              {resultMessage}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-semibold text-green-700">改善提案</p>

            {livingCostSuggestion.isAlreadySafe ? (
        <div className="mt-2 space-y-2 text-green-700">
          <p>
            現在の年間生活費
            {formatManYen(annualLivingCost)}
            万円でも、{Math.min(lifeExpectancy + 10, 110)}
            歳まで資産を維持できる見込みです。
          </p>

          {livingCostSuggestion.extraSpendableAmount > 0 ? (
                <p className="font-semibold">
                  さらに年間
                  {formatManYen(livingCostSuggestion.extraSpendableAmount)}
                  万円程度まで生活費を増やせる可能性があります。
                </p>
              ) : (
                <p className="font-semibold">
                  現在の生活費は、目標年齢まで資産を維持するための上限に近い水準です。
                </p>
              )}
            </div>
          ) : (
            <div className="mt-2 space-y-2 text-green-700">
              <p>
                {Math.min(lifeExpectancy + 10, 110)}
                歳まで資産を維持するには、 年間生活費を
                {formatManYen(livingCostSuggestion.recommendedLivingCost)}
                万円程度に抑える必要があります。
              </p>
              <p className="font-semibold">
                現在より年間
                {formatManYen(livingCostSuggestion.reductionAmount)}
                万円の削減が目安です。
              </p>
            </div>
          )}
          </div>
        
        <div className="mt-8 h-[400px] w-full">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={result.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" unit="歳" />
              <YAxis
                tickFormatter={(value) => `${Number(value).toLocaleString()}`}
              />
              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString()}万円`,
                  "資産残高",
                ]}
                labelFormatter={(label) => `${label}歳`}
              />
              <Line
                type="monotone"
                dataKey="assets"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          ※このシミュレーションは概算です。税金、社会保険料、手数料、相場変動などは考慮していません。
        </p>
      </div>
    </section>
  );
}

type InputSelectProps = {
  label: string;
  value: number;
  options: number[];
  unit: string;
  onChange: (value: number) => void;
};

function InputSelect({
  label,
  value,
  options,
  unit,
  onChange,
}: InputSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="whitespace-nowrap text-sm text-gray-600">{unit}</span>
      </div>
    </label>
  );
}

type MoneyInputProps = {
  label: string;
  value: string;
  unit: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function MoneyInput({
  label,
  value,
  unit,
  onChange,
  onBlur,
}: MoneyInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.currentTarget.blur();
            }
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <span className="whitespace-nowrap text-sm text-gray-600">{unit}</span>
      </div>
    </label>
  );
}

type RateSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
};

function RateSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: RateSliderProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <div className="rounded-lg border border-gray-300 px-3 py-3">
        <div className="mb-2 text-base font-semibold text-gray-900">
          {value.toFixed(1)}
          {unit}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full"
        />
      </div>
    </label>
  );
}

type ResultCardProps = {
  label: string;
  value: string;
  status?: "success" | "warning" | "danger";
};

function ResultCard({
  label,
  value,
  status = "success",
}: ResultCardProps) {
  const colorClass = {
    success:
      "bg-green-50 border border-green-200",

    warning:
      "bg-yellow-50 border border-yellow-200",

    danger:
      "bg-red-50 border border-red-200",
  };
  return (
    
    <div className={`rounded-xl p-5 ${colorClass[status]}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
    
    
  );
}
