// src/lib/furusato-tax/calculateResidentTaxDeductions.ts

import type {
  Dependent,
  ResidentTaxDeductionBreakdown,
  SimpleInput,
} from "./types";

import { calculateSalaryIncome } from "./calculateSalaryIncome";

function normalizeNonNegativeInteger(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

/**
 * 住民税の基礎控除を計算する。
 */
function calculateResidentBasicDeduction(
  totalIncomeAmount: number,
): number {
  const income =
    normalizeNonNegativeInteger(
      totalIncomeAmount,
    );

  if (income <= 24_000_000) {
    return 430_000;
  }

  if (income <= 24_500_000) {
    return 290_000;
  }

  if (income <= 25_000_000) {
    return 150_000;
  }

  return 0;
}

/**
 * 納税者本人の所得区分。
 */
function getTaxpayerIncomeCategory(
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
 * 住民税の配偶者控除・配偶者特別控除を計算する。
 */
function calculateResidentSpouseDeduction(
  input: SimpleInput,
  taxpayerTotalIncomeAmount: number,
): number {
  if (!input.hasSpouse) {
    return 0;
  }

  const taxpayerCategory =
    getTaxpayerIncomeCategory(
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

  if (spouseTotalIncomeAmount <= 580_000) {
    return [330_000, 220_000, 110_000][
      taxpayerCategory
    ];
  }

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

interface ResidentDependentDeductionResult {
  dependent: number;
  specialDependent: number;
}

/**
 * 住民税の特定親族特別控除額を計算する。
 */
function calculateResidentSpecialDependentDeduction(
  totalIncomeAmount: number,
): number {
  const income =
    normalizeNonNegativeInteger(
      totalIncomeAmount,
    );

  if (
    income <= 620_000 ||
    income > 1_230_000
  ) {
    return 0;
  }

  if (income <= 950_000) {
    return 450_000;
  }

  if (income <= 1_000_000) {
    return 410_000;
  }

  if (income <= 1_050_000) {
    return 310_000;
  }

  if (income <= 1_100_000) {
    return 210_000;
  }

  if (income <= 1_150_000) {
    return 110_000;
  }

  if (income <= 1_200_000) {
    return 60_000;
  }

  return 30_000;
}

/**
 * 扶養親族1人分の住民税扶養控除を計算する。
 */
function calculateResidentDependentDeduction(
  dependent: Dependent,
): ResidentDependentDeductionResult {
  const age = Math.min(
    120,
    Math.max(
      0,
      Math.trunc(dependent.age),
    ),
  );

  const salaryIncome =
    normalizeNonNegativeInteger(
      dependent.salaryIncome,
    );

  const totalIncomeAmount =
    calculateSalaryIncome(
      salaryIncome,
    ).salaryIncomeAmount;

  /**
   * 19歳以上23歳未満で、
   * 合計所得62万円超123万円以下なら
   * 特定親族特別控除を適用する。
   */
  if (
    age >= 19 &&
    age < 23 &&
    totalIncomeAmount > 620_000 &&
    totalIncomeAmount <= 1_230_000
  ) {
    const specialDependent =
      calculateResidentSpecialDependentDeduction(
        totalIncomeAmount,
      );

    return {
      dependent: specialDependent,
      specialDependent,
    };
  }

  /**
   * 通常の扶養控除は、
   * 合計所得62万円以下を条件とする。
   */
  if (totalIncomeAmount > 620_000) {
    return {
      dependent: 0,
      specialDependent: 0,
    };
  }

  if (age < 16) {
    return {
      dependent: 0,
      specialDependent: 0,
    };
  }

  if (age < 19) {
    return {
      dependent: 330_000,
      specialDependent: 0,
    };
  }

  if (age < 23) {
    return {
      dependent: 450_000,
      specialDependent: 0,
    };
  }

  if (age < 70) {
    return {
      dependent: 330_000,
      specialDependent: 0,
    };
  }

  const isLivingTogetherParent =
    dependent.relationship === "parent" &&
    dependent.livesTogether;

  return {
    dependent:
      isLivingTogetherParent
        ? 450_000
        : 380_000,

    specialDependent: 0,
  };
}

/**
 * 扶養親族1人分の住民税障害者控除。
 */
function calculateResidentDisabilityDeduction(
  dependent: Dependent,
): number {
  const salaryIncome =
    normalizeNonNegativeInteger(
      dependent.salaryIncome,
    );

  const totalIncomeAmount =
    calculateSalaryIncome(
      salaryIncome,
    ).salaryIncomeAmount;

  /**
   * 扶養親族の所得要件を超える場合は、
   * 障害者控除の対象外として扱う。
   */
  if (totalIncomeAmount > 620_000) {
    return 0;
  }

  switch (dependent.disabilityCategory) {
    case "none":
      return 0;

    case "general":
      return 260_000;

    case "special":
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
 * かんたん入力から住民税用所得控除を計算する。
 */
export function calculateResidentTaxDeductions(
  input: SimpleInput,
  totalIncomeAmount: number,
): ResidentTaxDeductionBreakdown {
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

  const dependentResults =
    input.dependents.map(
      calculateResidentDependentDeduction,
    );

  const dependent =
    dependentResults.reduce(
      (total, item) =>
        total + item.dependent,
      0,
    );

  const specialDependent =
    dependentResults.reduce(
      (total, item) =>
        total + item.specialDependent,
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
    specialDependent,
    disability,
    lifeInsurance,
    earthquakeInsurance,
    medicalExpense,
    other,
    total,
  };
}