// src/lib/furusato-tax/calculateDonationLimit.ts

import type {
  DonationDeductionBreakdown,
  DonationResult,
  IncomeTaxResult,
  NormalizedTaxInput,
  ResidentTaxResult,
} from "./types";

import { taxRules2026 } from "./rules/2026";

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
 * 0以上の有限数へ補正する。
 */
function normalizeNonNegativeNumber(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

/**
 * 所得税率に復興特別所得税率を加味した実効税率を求める。
 *
 * 例：
 * 所得税率10％の場合
 * 10％ × 1.021 ＝ 10.21％
 */
function calculateEffectiveIncomeTaxRate(
  incomeTaxRate: number,
): number {
  const normalizedRate =
    normalizeNonNegativeNumber(incomeTaxRate);

  if (normalizedRate === 0) {
    return 0;
  }

  return (
    normalizedRate *
    (1 + taxRules2026.reconstructionIncomeTaxRate)
  );
}

/**
 * 自己負担2,000円となる寄附上限額を概算する。
 *
 * 住民税特例控除の上限：
 *
 * 住民税所得割額 × 20％
 *
 * 寄附上限：
 *
 * 2,000円
 * ＋ 特例控除上限
 * ÷（90％－復興特別所得税を含む所得税率）
 */
function calculateEstimatedDonationLimit(
  incomeTaxRate: number,
  residentTaxIncomeBasedAmount: number,
): number {
  const effectiveIncomeTaxRate =
    calculateEffectiveIncomeTaxRate(
      incomeTaxRate,
    );

  const specialDeductionRate =
    1 -
    taxRules2026.donation.residentTaxBasicRate -
    effectiveIncomeTaxRate;

  if (specialDeductionRate <= 0) {
    return taxRules2026.donation.minimumSelfPayment;
  }

  const residentTaxSpecialLimit =
    normalizeNonNegativeInteger(
      residentTaxIncomeBasedAmount,
    ) *
    taxRules2026.donation.residentTaxSpecialLimitRate;

  return Math.max(
    taxRules2026.donation.minimumSelfPayment,
    Math.floor(
      taxRules2026.donation.minimumSelfPayment +
        residentTaxSpecialLimit /
          specialDeductionRate,
    ),
  );
}

/**
 * 寄附額に対する控除内訳を計算する。
 *
 * この内訳は確定申告を行った場合を基準とした概算。
 * ワンストップ特例では所得税相当分も住民税から控除されるが、
 * 控除総額と寄附上限の考え方は原則として同じ。
 */
function calculateDeductionBreakdown(
  donationAmount: number,
  incomeTaxRate: number,
  residentTaxIncomeBasedAmount: number,
): DonationDeductionBreakdown {
  const normalizedDonation =
    normalizeNonNegativeInteger(
      donationAmount,
    );

  const minimumSelfPayment =
    taxRules2026.donation.minimumSelfPayment;

  /**
   * 控除計算の対象は、寄附額から2,000円を引いた部分。
   */
  const deductionEligibleAmount =
    Math.max(
      0,
      normalizedDonation -
        minimumSelfPayment,
    );

  if (deductionEligibleAmount === 0) {
    return {
      incomeTaxDeduction: 0,
      residentTaxBasicDeduction: 0,
      residentTaxSpecialDeduction: 0,
      totalDeduction: 0,
    };
  }

  const effectiveIncomeTaxRate =
    calculateEffectiveIncomeTaxRate(
      incomeTaxRate,
    );

  /**
   * 所得税の寄附金控除による軽減額。
   */
  const incomeTaxDeduction =
    Math.floor(
      deductionEligibleAmount *
        effectiveIncomeTaxRate,
    );

  /**
   * 住民税の基本控除。
   */
  const residentTaxBasicDeduction =
    Math.floor(
      deductionEligibleAmount *
        taxRules2026.donation.residentTaxBasicRate,
    );

  /**
   * 住民税の特例控除率。
   */
  const residentTaxSpecialRate =
    Math.max(
      0,
      1 -
        taxRules2026.donation.residentTaxBasicRate -
        effectiveIncomeTaxRate,
    );

  const residentTaxSpecialDeductionBeforeLimit =
    Math.floor(
      deductionEligibleAmount *
        residentTaxSpecialRate,
    );

  /**
   * 特例控除は住民税所得割額の20％が上限。
   */
  const residentTaxSpecialDeductionLimit =
    Math.floor(
      normalizeNonNegativeInteger(
        residentTaxIncomeBasedAmount,
      ) *
        taxRules2026.donation
          .residentTaxSpecialLimitRate,
    );

  const residentTaxSpecialDeduction =
    Math.min(
      residentTaxSpecialDeductionBeforeLimit,
      residentTaxSpecialDeductionLimit,
    );

  const totalDeduction =
    incomeTaxDeduction +
    residentTaxBasicDeduction +
    residentTaxSpecialDeduction;

  return {
    incomeTaxDeduction,
    residentTaxBasicDeduction,
    residentTaxSpecialDeduction,
    totalDeduction,
  };
}

/**
 * ふるさと納税の寄附上限と控除額を計算する。
 */
export function calculateDonationLimit(
  input: NormalizedTaxInput,
  incomeTax: IncomeTaxResult,
  residentTax: ResidentTaxResult,
): DonationResult {
  const estimatedDonationLimit =
    calculateEstimatedDonationLimit(
      incomeTax.taxRate,
      residentTax.incomeBasedTaxAfterCredits,
    );

  /**
   * 安全率を適用した推奨寄附額。
   *
   * 90％・95％・100％から選択する想定。
   */
  const safeDonationAmount =
    Math.floor(
      estimatedDonationLimit *
        input.safetyRate,
    );

  const plannedDonation =
    normalizeNonNegativeInteger(
      input.plannedDonation,
    );

  const remainingAmount =
    Math.max(
      0,
      safeDonationAmount -
        plannedDonation,
    );

  const excessAmount =
    Math.max(
      0,
      plannedDonation -
        estimatedDonationLimit,
    );

  const deductionBreakdown =
    calculateDeductionBreakdown(
      plannedDonation,
      incomeTax.taxRate,
      residentTax.incomeBasedTaxAfterCredits,
    );

  /**
   * 実質自己負担額。
   *
   * 上限内ならおおむね2,000円。
   * 上限超過分や、2,000円未満の寄附も反映する。
   */
  const estimatedSelfPayment =
    Math.max(
      0,
      plannedDonation -
        deductionBreakdown.totalDeduction,
    );

  return {
    estimatedDonationLimit,
    safeDonationAmount,

    plannedDonation,
    remainingAmount,
    excessAmount,

    estimatedSelfPayment,

    deductionBreakdown,
  };
}
