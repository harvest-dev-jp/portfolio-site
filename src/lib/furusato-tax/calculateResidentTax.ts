// src/lib/furusato-tax/calculateResidentTax.ts

import type {
  IncomeDeductionBreakdown,
  IncomeTaxResult,
  NormalizedTaxInput,
  ResidentTaxResult,
} from "./types";

import { calculateAdjustmentDeduction } from "./calculateAdjustmentDeduction";
import { taxRules2026 } from "./rules/2026";

/**
 * 2022年以降入居の場合の一般的な
 * 住民税住宅ローン控除限度額。
 *
 * 所得税の課税総所得金額等の5％、
 * かつ最高97,500円。
 */
const RESIDENT_HOUSING_LOAN_CREDIT_RATE = 0.05;
const RESIDENT_HOUSING_LOAN_CREDIT_MAX = 97_500;

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
function floorToThousand(
  value: number,
): number {
  return (
    Math.floor(
      normalizeNonNegativeInteger(value) /
        1_000,
    ) * 1_000
  );
}

/**
 * 住民税から控除する住宅ローン控除額を概算する。
 *
 * 次のうち最も小さい額を適用する。
 *
 * 1. 所得税から引ききれなかった住宅ローン控除額
 * 2. 所得税の課税所得×5％
 * 3. 97,500円
 * 4. 調整控除後の住民税所得割額
 */
function calculateResidentHousingLoanCredit(
  input: NormalizedTaxInput,
  incomeTax: IncomeTaxResult,
  availableResidentTax: number,
): number {
  const housingLoanTaxCredit =
    normalizeNonNegativeInteger(
      input.housingLoanTaxCredit,
    );

  /**
   * 所得税で実際に使用した住宅ローン控除を
   * 差し引き、未使用額を求める。
   */
  const unusedHousingLoanTaxCredit =
    Math.max(
      0,
      housingLoanTaxCredit -
        normalizeNonNegativeInteger(
          incomeTax
            .housingLoanTaxCreditApplied,
        ),
    );

  /**
   * 所得税の課税総所得金額等の5％。
   *
   * 本アプリでは所得税の課税所得を、
   * 課税総所得金額等の概算値として利用する。
   */
  const taxableIncomeLimit =
    Math.floor(
      normalizeNonNegativeInteger(
        incomeTax.taxableIncome,
      ) *
        RESIDENT_HOUSING_LOAN_CREDIT_RATE,
    );

  return Math.min(
    unusedHousingLoanTaxCredit,
    taxableIncomeLimit,
    RESIDENT_HOUSING_LOAN_CREDIT_MAX,
    normalizeNonNegativeInteger(
      availableResidentTax,
    ),
  );
}

/**
 * 住民税所得割額を概算する。
 */
export function calculateResidentTax(
  input: NormalizedTaxInput,
  _deductions: IncomeDeductionBreakdown,
  incomeTax: IncomeTaxResult,
): ResidentTaxResult {
  const salaryIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  const estimatedResidentTaxDeductions =
    normalizeNonNegativeInteger(
      input.residentTaxDeductions.total,
    );

  /**
   * 住民税の課税所得。
   *
   * 給与所得から住民税用所得控除を差し引き、
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
   */
  const incomeBasedTaxBeforeCredits =
    normalizeNonNegativeInteger(
      taxableIncome * incomeRate,
    );

  /**
   * 所得税と住民税の人的控除差に対する
   * 調整控除を計算する。
   */
  const adjustmentResult =
    calculateAdjustmentDeduction(
      input,
      taxableIncome,
    );

  const adjustmentDeduction =
    normalizeNonNegativeInteger(
      adjustmentResult.adjustmentDeduction,
    );

  /**
   * 調整控除適用後の住民税所得割額。
   *
   * 住宅ローン控除は、この金額を上限として
   * 適用する。
   */
  const availableTaxAfterAdjustment =
    Math.max(
      0,
      incomeBasedTaxBeforeCredits -
        adjustmentDeduction,
    );

  /**
   * 所得税から控除しきれなかった
   * 住宅ローン控除を住民税へ適用する。
   */
  const housingLoanTaxCreditApplied =
    calculateResidentHousingLoanCredit(
      input,
      incomeTax,
      availableTaxAfterAdjustment,
    );

  /**
   * その他の住民税税額控除。
   *
   * 現段階では未実装。
   */
  const otherTaxCredits = 0;

  /**
   * 調整控除、住宅ローン控除、
   * その他税額控除を適用した後の
   * 最終的な住民税所得割額。
   */
  const incomeBasedTaxAfterCredits =
    Math.max(
      0,
      availableTaxAfterAdjustment -
        housingLoanTaxCreditApplied -
        otherTaxCredits,
    );

  return {
    taxableIncome,
    incomeRate,
    incomeBasedTaxBeforeCredits,
    adjustmentDeduction,
    housingLoanTaxCreditApplied,
    otherTaxCredits,
    incomeBasedTaxAfterCredits,
  };
}