// src/lib/furusato-tax/defaultValues.ts

import type {
  DetailedInput,
  SimpleInput,
  SimulatorFormState,
} from "./types";

/**
 * かんたん入力の初期値
 *
 * 金額はすべて円単位で管理する。
 */
export const defaultSimpleInput: SimpleInput = {
  taxYear: 2026,

  // 基本情報
  salaryIncome: 6_000_000,
  taxpayerAge: 40,

  hasSpouse: false,
  spouseSalaryIncome: 0,

  dependents: [],

  // 所得控除
  socialInsurancePremium: 900_000,
  idecoContribution: 0,
  lifeInsuranceDeduction: 0,
  earthquakeInsuranceDeduction: 0,
  medicalExpenseDeduction: 0,
  otherIncomeDeduction: 0,

  // 税額控除
  housingLoanTaxCredit: 0,
  otherTaxCredit: 0,

  // 寄附条件
  plannedDonation: 0,
  filingMethod: "one-stop",
  safetyRate: 0.95,
};

/**
 * 詳細入力の初期値
 *
 * 源泉徴収票を確認しながら入力することを想定し、
 * 初期値は原則として0にしている。
 */
export const defaultDetailedInput: DetailedInput = {
  taxYear: 2026,

  // 源泉徴収票の主要項目
  paymentAmount: 0,
  salaryIncomeAfterDeduction: 0,
  totalIncomeDeduction: 0,
  withholdingTaxAmount: 0,

  // 社会保険料・iDeCo
  socialInsuranceAndSmallBusinessPremium: 0,
  includedIdecoContribution: 0,

  // 所得控除の内訳
  lifeInsuranceDeduction: 0,
  earthquakeInsuranceDeduction: 0,
  spouseDeduction: 0,
  basicDeduction: 0,
  incomeAdjustmentDeduction: 0,

  // 税額控除
  housingLoanTaxCredit: 0,

  // 年末調整後に追加する控除
  additionalMedicalExpenseDeduction: 0,
  additionalIncomeDeduction: 0,
  additionalTaxCredit: 0,

  // 寄附条件
  plannedDonation: 0,
  filingMethod: "one-stop",
  safetyRate: 0.95,
};

/**
 * シミュレーター全体の初期状態
 *
 * 初期表示は「かんたん入力」とする。
 * 詳細入力の値も同時に保持し、
 * モードを切り替えても入力内容が消えない構造にする。
 */
export const defaultSimulatorFormState: SimulatorFormState = {
  mode: "simple",
  simple: defaultSimpleInput,
  detailed: defaultDetailedInput,
};

/**
 * 入力内容をリセットするときに使用する。
 *
 * 配列やオブジェクトの参照を共有しないように、
 * 新しいオブジェクトを毎回返す。
 */
export function createDefaultSimulatorFormState(): SimulatorFormState {
  return {
    mode: "simple",

    simple: {
      ...defaultSimpleInput,
      dependents: [],
    },

    detailed: {
      ...defaultDetailedInput,
    },
  };
}
