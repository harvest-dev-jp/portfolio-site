// src/lib/furusato-tax/calculateIncomeDeductions.ts

import type {
  IncomeDeductionBreakdown,
  NormalizedTaxInput,
} from "./types";

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
 * 所得控除の内訳と合計額を計算する。
 *
 * NormalizedTaxInputに格納された各控除額は、
 * すでに個別の計算や入力値の補正を終えた金額として扱う。
 */
export function calculateIncomeDeductions(
  input: NormalizedTaxInput,
): IncomeDeductionBreakdown {
  const basic =
    normalizeNonNegativeInteger(
      input.basicDeduction,
    );

  const socialInsurance =
    normalizeNonNegativeInteger(
      input.socialInsuranceDeduction,
    );

  const ideco =
    normalizeNonNegativeInteger(
      input.idecoDeduction,
    );

  const spouse =
    normalizeNonNegativeInteger(
      input.spouseDeduction,
    );

  const dependent =
    normalizeNonNegativeInteger(
      input.dependentDeduction,
    );

  const disability =
    normalizeNonNegativeInteger(
      input.disabilityDeduction,
    );

  const lifeInsurance =
    normalizeNonNegativeInteger(
      input.lifeInsuranceDeduction,
    );

  const earthquakeInsurance =
    normalizeNonNegativeInteger(
      input.earthquakeInsuranceDeduction,
    );

  const medicalExpense =
    normalizeNonNegativeInteger(
      input.medicalExpenseDeduction,
    );

  const other =
    normalizeNonNegativeInteger(
      input.otherIncomeDeduction,
    );

  const total =
    basic +
    socialInsurance +
    ideco +
    spouse +
    dependent +
    disability +
    lifeInsurance +
    earthquakeInsurance +
    medicalExpense +
    other;

  return {
    basic,
    socialInsurance,
    ideco,
    spouse,
    dependent,
    disability,
    lifeInsurance,
    earthquakeInsurance,
    medicalExpense,
    other,
    total,
  };
}
