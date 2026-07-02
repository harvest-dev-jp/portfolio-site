// src/lib/furusato-tax/calculateAdjustmentDeduction.ts

import type { NormalizedTaxInput } from "./types";

export interface AdjustmentDeductionResult {
  personalDeductionDifference: number;
  adjustmentDeduction: number;
}

function normalizeNonNegativeInteger(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

/**
 * 所得税と住民税の人的控除差を計算する。
 *
 * 基礎控除については、所得税の実際の控除額との差ではなく、
 * 調整控除計算上の人的控除差5万円を使用する。
 *
 * 配偶者・扶養・障害者控除については、
 * 所得税用控除と住民税用控除の差額を使用する。
 */
export function calculatePersonalDeductionDifference(
  input: NormalizedTaxInput,
): number {
  const totalIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  if (totalIncomeAmount > 25_000_000) {
    return 0;
  }

  const basicDifference = 50_000;

  const spouseDifference = Math.max(
    0,
    normalizeNonNegativeInteger(
      input.spouseDeduction,
    ) -
      normalizeNonNegativeInteger(
        input.residentTaxDeductions.spouse,
      ),
  );

  /**
 * 特定親族特別控除は、調整控除上の
 * 人的控除差を0円として扱う。
 *
 * そのため、所得税・住民税の扶養控除合計から
 * 特定親族特別控除分を除いて差額を計算する。
 */
const incomeTaxRegularDependentDeduction =
  Math.max(
    0,
    normalizeNonNegativeInteger(
      input.dependentDeduction,
    ) -
      normalizeNonNegativeInteger(
        input.specialDependentDeduction,
      ),
  );

const residentTaxRegularDependentDeduction =
  Math.max(
    0,
    normalizeNonNegativeInteger(
      input.residentTaxDeductions.dependent,
    ) -
      normalizeNonNegativeInteger(
        input.residentTaxDeductions
          .specialDependent,
      ),
  );

const dependentDifference = Math.max(
  0,
  incomeTaxRegularDependentDeduction -
    residentTaxRegularDependentDeduction,
);

  const disabilityDifference = Math.max(
    0,
    normalizeNonNegativeInteger(
      input.disabilityDeduction,
    ) -
      normalizeNonNegativeInteger(
        input.residentTaxDeductions.disability,
      ),
  );

  return (
    basicDifference +
    spouseDifference +
    dependentDifference +
    disabilityDifference
  );
}

/**
 * 住民税の調整控除額を計算する。
 */
export function calculateAdjustmentDeduction(
  input: NormalizedTaxInput,
  residentTaxableIncome: number,
): AdjustmentDeductionResult {
  const totalIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  const taxableIncome =
    normalizeNonNegativeInteger(
      residentTaxableIncome,
    );

  if (
    totalIncomeAmount > 25_000_000 ||
    taxableIncome === 0
  ) {
    return {
      personalDeductionDifference: 0,
      adjustmentDeduction: 0,
    };
  }

  const personalDeductionDifference =
    calculatePersonalDeductionDifference(
      input,
    );

  if (personalDeductionDifference === 0) {
    return {
      personalDeductionDifference: 0,
      adjustmentDeduction: 0,
    };
  }

  let adjustmentBase: number;

  if (taxableIncome <= 2_000_000) {
    adjustmentBase = Math.min(
      personalDeductionDifference,
      taxableIncome,
    );
  } else {
    adjustmentBase = Math.max(
      personalDeductionDifference -
        (taxableIncome - 2_000_000),
      50_000,
    );
  }

  const adjustmentDeduction = Math.floor(
    adjustmentBase * 0.05,
  );

  return {
    personalDeductionDifference,
    adjustmentDeduction,
  };
}