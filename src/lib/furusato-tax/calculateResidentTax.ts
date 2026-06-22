// src/lib/furusato-tax/calculateResidentTax.ts

import type {
  IncomeDeductionBreakdown,
  NormalizedTaxInput,
  ResidentTaxResult,
} from "./types";

import { taxRules2026 } from "./rules/2026";

/**
 * 住民税の基礎控除額。
 *
 * 現段階では一般的な基礎控除額43万円として扱う。
 * 合計所得金額が高い場合の逓減は、後続工程で対応する。
 */
const RESIDENT_TAX_BASIC_DEDUCTION = 430_000;

/**
 * 0以上の整数へ補正する。
 */
function normalizeNonNegativeInteger(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

/**
 * 1,000円未満を切り捨てる。
 */
function floorToThousand(value: number): number {
  return (
    Math.floor(
      normalizeNonNegativeInteger(value) / 1_000,
    ) * 1_000
  );
}

/**
 * 住民税用の所得控除合計を概算する。
 *
 * 所得税の所得控除合計から所得税の基礎控除を除き、
 * 住民税の基礎控除43万円へ置き換える。
 *
 * 注意：
 * 配偶者控除・扶養控除・障害者控除・生命保険料控除なども
 * 本来は所得税と住民税で金額が異なる。
 * 現段階では、それらは所得税用の控除額を流用する。
 */
function calculateEstimatedResidentTaxDeductions(
  deductions: IncomeDeductionBreakdown,
): number {
  const incomeTaxDeductionTotal =
    normalizeNonNegativeInteger(
      deductions.total,
    );

  const incomeTaxBasicDeduction =
    normalizeNonNegativeInteger(
      deductions.basic,
    );

  const deductionsExceptBasic =
    Math.max(
      0,
      incomeTaxDeductionTotal -
        incomeTaxBasicDeduction,
    );

  return (
    deductionsExceptBasic +
    RESIDENT_TAX_BASIC_DEDUCTION
  );
}

/**
 * 住民税所得割額を概算する。
 *
 * 計算順序：
 *
 * 1. 給与所得から住民税用所得控除を差し引く
 * 2. 課税所得の1,000円未満を切り捨てる
 * 3. 標準税率10％を適用する
 * 4. 調整控除・その他税額控除を差し引く
 *
 * 現段階では調整控除を0円としているため、
 * この結果はふるさと納税上限計算用の概算値となる。
 */
export function calculateResidentTax(
  input: NormalizedTaxInput,
  deductions: IncomeDeductionBreakdown,
): ResidentTaxResult {
  const salaryIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  const estimatedResidentTaxDeductions =
    calculateEstimatedResidentTaxDeductions(
      deductions,
    );

  /**
   * 住民税の課税所得。
   *
   * 0円未満にならないよう補正し、
   * 1,000円未満を切り捨てる。
   */
  const taxableIncome =
    floorToThousand(
      salaryIncomeAmount -
        estimatedResidentTaxDeductions,
    );

  const incomeRate =
    taxRules2026.residentTaxIncomeRate;

  /**
   * 税額控除前の住民税所得割額。
   *
   * 標準税率は市民税・県民税を合わせて10％。
   */
  const incomeBasedTaxBeforeCredits =
    normalizeNonNegativeInteger(
      taxableIncome * incomeRate,
    );

  /**
   * 所得税と住民税の人的控除差を調整する控除。
   *
   * 現段階では未実装のため0円。
   */
  const adjustmentDeduction = 0;

  /**
   * 住民税から差し引くその他の税額控除。
   *
   * 現在の入力値は所得税用の税額控除として扱っているため、
   * 二重控除を避けて現段階では0円とする。
   */
  const otherTaxCredits = 0;

  const incomeBasedTaxAfterCredits =
    Math.max(
      0,
      incomeBasedTaxBeforeCredits -
        adjustmentDeduction -
        otherTaxCredits,
    );

  return {
    taxableIncome,
    incomeRate,
    incomeBasedTaxBeforeCredits,
    adjustmentDeduction,
    otherTaxCredits,
    incomeBasedTaxAfterCredits,
  };
}
