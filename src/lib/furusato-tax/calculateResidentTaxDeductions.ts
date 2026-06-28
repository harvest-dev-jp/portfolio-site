// src/lib/furusato-tax/calculateResidentTaxDeductions.ts

import type {
  Dependent,
  SimpleInput,
} from "./types";

import { calculateSalaryIncome } from "./calculateSalaryIncome";

/**
 * 住民税用所得控除の計算結果。
 */
export interface ResidentTaxDeductionResult {
  basic: number;
  socialInsurance: number;
  ideco: number;
  spouse: number;
  dependent: number;
  disability: number;
  lifeInsurance: number;
  earthquakeInsurance: number;
  medicalExpense: number;
  other: number;
  total: number;
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
 * 住民税の基礎控除。
 */
function calculateResidentBasicDeduction(
  totalIncomeAmount: number,
): number {
  if (totalIncomeAmount <= 24_000_000) {
    return 430_000;
  }

  if (totalIncomeAmount <= 24_500_000) {
    return 290_000;
  }

  if (totalIncomeAmount <= 25_000_000) {
    return 150_000;
  }

  return 0;
}

/**
 * 納税者本人の所得区分。
 */
function getTaxpayerCategory(
  totalIncomeAmount: number,
): 0 | 1 | 2 | null {
  if (totalIncomeAmount <= 9_000_000) {
    return 0;
  }

  if (totalIncomeAmount <= 9_500_000) {
    return 1;
  }

  if (totalIncomeAmount <= 10_000_000) {
    return 2;
  }

  return null;
}

/**
 * 住民税の配偶者控除・配偶者特別控除。
 */
function calculateResidentSpouseDeduction(
  input: SimpleInput,
  taxpayerTotalIncomeAmount: number,
): number {
  if (!input.hasSpouse) {
    return 0;
  }

  const taxpayerCategory =
    getTaxpayerCategory(
      taxpayerTotalIncomeAmount,
    );

  if (taxpayerCategory === null) {
    return 0;
  }

  const spouseTotalIncomeAmount =
    calculateSalaryIncome(
      normalizeNonNegativeInteger(
        input.spouseSalaryIncome,
      ),
    ).salaryIncomeAmount;

  /**
   * 配偶者控除。
   */
  if (spouseTotalIncomeAmount <= 580_000) {
    return [330_000, 220_000, 110_000][
      taxpayerCategory
    ];
  }

  /**
   * 配偶者特別控除。
   */
  if (spouseTotalIncomeAmount <= 1_000_000) {
    return [330_000, 220_000, 110_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_050_000) {
    return [310_000, 210_000, 110_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_100_000) {
    return [260_000, 180_000, 90_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_150_000) {
    return [210_000, 140_000, 70_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_200_000) {
    return [160_000, 110_000, 60_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_250_000) {
    return [110_000, 80_000, 40_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_300_000) {
    return [60_000, 40_000, 20_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_330_000) {
    return [30_000, 20_000, 10_000][
      taxpayerCategory
    ];
  }

  return 0;
}

/**
 * 扶養親族1人分の住民税扶養控除。
 */
function calculateResidentDependentDeduction(
  dependent: Dependent,
): number {
  const age = Math.min(
    120,
    Math.max(
      0,
      Math.trunc(dependent.age),
    ),
  );

  if (age < 16) {
    return 0;
  }

  if (age < 19) {
    return 330_000;
  }

  if (age < 23) {
    return 450_000;
  }

  if (age < 70) {
    return 330_000;
  }

  const isLivingTogetherParent =
    dependent.relationship === "parent" &&
    dependent.livesTogether;

  return isLivingTogetherParent
    ? 450_000
    : 380_000;
}

/**
 * 扶養親族1人分の住民税障害者控除。
 */
function calculateResidentDisabilityDeduction(
  dependent: Dependent,
): number {
  switch (dependent.disabilityCategory) {
    case "none":
      return 0;

    case "general":
      return 260_000;

    case "special":
      /**
       * 同居特別障害者：
       * 特別障害者控除30万円
       * ＋同居特別障害者加算23万円
       */
      return dependent.livesTogether
        ? 530_000
        : 300_000;

    default: {
      const exhaustiveCheck: never =
        dependent.disabilityCategory;

      throw new Error(
        `未対応の障害者区分です: ${exhaustiveCheck}`,
      );
    }
  }
}

/**
 * かんたん入力から住民税用の所得控除を計算する。
 */
export function calculateResidentTaxDeductions(
  input: SimpleInput,
  totalIncomeAmount: number,
): ResidentTaxDeductionResult {
  const basic =
    calculateResidentBasicDeduction(
      totalIncomeAmount,
    );

  const socialInsurance =
    normalizeNonNegativeInteger(
      input.socialInsurancePremium,
    );

  const ideco =
    normalizeNonNegativeInteger(
      input.idecoContribution,
    );

  const spouse =
    calculateResidentSpouseDeduction(
      input,
      totalIncomeAmount,
    );

  const dependent =
    input.dependents.reduce(
      (total, item) =>
        total +
        calculateResidentDependentDeduction(
          item,
        ),
      0,
    );

  const disability =
    input.dependents.reduce(
      (total, item) =>
        total +
        calculateResidentDisabilityDeduction(
          item,
        ),
      0,
    );

  /**
   * 生命保険料・地震保険料控除は、
   * 支払保険料からの再計算に必要な情報がないため、
   * 現段階では入力された控除額を使用する。
   */
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
