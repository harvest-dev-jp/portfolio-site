// src/lib/furusato-tax/calculateResidentTax.ts

import type {
  IncomeDeductionBreakdown,
  IncomeTaxResult,
  NormalizedTaxInput,
  ResidentTaxResult,
} from "./types";

import { taxRules2026 } from "./rules/2026";

/**
 * 住民税の基礎控除額。
 *
 * 現段階では一般的な43万円として扱う。
 */
const RESIDENT_TAX_BASIC_DEDUCTION = 430_000;

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
 * 4. 控除可能な住民税所得割額
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
   * 本アプリでは、所得税の課税所得を
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
  deductions: IncomeDeductionBreakdown,
  incomeTax: IncomeTaxResult,
): ResidentTaxResult {
  const salaryIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  const estimatedResidentTaxDeductions =
    normalizeNonNegativeInteger(
      input.residentTaxIncomeDeductionTotal,
    );

  /**
   * 住民税の課税所得。
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
   * 人的控除差の調整控除。
   *
   * 現段階では未実装。
   */
  const adjustmentDeduction = 0;

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

  const incomeBasedTaxAfterCredits =
    Math.max(
      0,
      incomeBasedTaxBeforeCredits -
        adjustmentDeduction -
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
