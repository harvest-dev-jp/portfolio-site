// src/lib/furusato-tax/calculateSpouseDeduction.ts

import { calculateSalaryIncome } from "./calculateSalaryIncome";

/**
 * 配偶者控除の判定結果。
 */
export type SpouseDeductionType =
  | "none"
  | "spouse"
  | "special";

/**
 * 配偶者控除・配偶者特別控除の計算結果。
 */
export interface SpouseDeductionResult {
  /**
   * 配偶者の給与収入。
   */
  spouseSalaryIncome: number;

  /**
   * 配偶者の給与所得。
   *
   * 現在は配偶者の収入を給与収入のみとして計算する。
   */
  spouseTotalIncomeAmount: number;

  /**
   * 適用された控除の種類。
   */
  deductionType: SpouseDeductionType;

  /**
   * 配偶者控除または配偶者特別控除の額。
   */
  deductionAmount: number;
}

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
 * 納税者本人の所得区分を取得する。
 *
 * 0:
 *   900万円以下
 *
 * 1:
 *   900万円超950万円以下
 *
 * 2:
 *   950万円超1,000万円以下
 *
 * null:
 *   1,000万円超
 */
function getTaxpayerIncomeCategory(
  taxpayerTotalIncomeAmount: number,
): 0 | 1 | 2 | null {
  if (taxpayerTotalIncomeAmount <= 9_000_000) {
    return 0;
  }

  if (taxpayerTotalIncomeAmount <= 9_500_000) {
    return 1;
  }

  if (taxpayerTotalIncomeAmount <= 10_000_000) {
    return 2;
  }

  return null;
}

/**
 * 配偶者控除額を取得する。
 *
 * 現在は一般の控除対象配偶者として計算する。
 * 70歳以上の老人控除対象配偶者は未対応。
 */
function getRegularSpouseDeduction(
  taxpayerCategory: 0 | 1 | 2,
): number {
  const deductionAmounts = [
    380_000,
    260_000,
    130_000,
  ] as const;

  return deductionAmounts[taxpayerCategory];
}

/**
 * 配偶者特別控除額を取得する。
 */
function getSpecialSpouseDeduction(
  taxpayerCategory: 0 | 1 | 2,
  spouseTotalIncomeAmount: number,
): number {
  /**
   * 各配列は次の順番。
   *
   * 0: 本人所得900万円以下
   * 1: 本人所得900万円超950万円以下
   * 2: 本人所得950万円超1,000万円以下
   */
  if (spouseTotalIncomeAmount <= 950_000) {
    return [380_000, 260_000, 130_000][
      taxpayerCategory
    ];
  }

  if (spouseTotalIncomeAmount <= 1_000_000) {
    return [360_000, 240_000, 120_000][
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
 * 配偶者控除・配偶者特別控除を計算する。
 *
 * @param hasSpouse 配偶者の有無
 * @param taxpayerTotalIncomeAmount 納税者本人の合計所得金額
 * @param spouseSalaryIncome 配偶者の年間給与収入
 */
export function calculateSpouseDeduction(
  hasSpouse: boolean,
  taxpayerTotalIncomeAmount: number,
  spouseSalaryIncome: number,
): SpouseDeductionResult {
  const normalizedSpouseSalaryIncome =
    normalizeNonNegativeInteger(
      spouseSalaryIncome,
    );

  if (!hasSpouse) {
    return {
      spouseSalaryIncome:
        normalizedSpouseSalaryIncome,
      spouseTotalIncomeAmount: 0,
      deductionType: "none",
      deductionAmount: 0,
    };
  }

  const normalizedTaxpayerIncome =
    normalizeNonNegativeInteger(
      taxpayerTotalIncomeAmount,
    );

  const taxpayerCategory =
    getTaxpayerIncomeCategory(
      normalizedTaxpayerIncome,
    );

  /**
   * 本人の合計所得金額が1,000万円を超える場合は、
   * 配偶者控除・配偶者特別控除とも対象外。
   */
  if (taxpayerCategory === null) {
    return {
      spouseSalaryIncome:
        normalizedSpouseSalaryIncome,
      spouseTotalIncomeAmount:
        calculateSalaryIncome(
          normalizedSpouseSalaryIncome,
        ).salaryIncomeAmount,
      deductionType: "none",
      deductionAmount: 0,
    };
  }

  /**
   * 配偶者の給与収入から給与所得を計算する。
   */
  const spouseSalaryResult =
    calculateSalaryIncome(
      normalizedSpouseSalaryIncome,
    );

  const spouseTotalIncomeAmount =
    spouseSalaryResult.salaryIncomeAmount;

  /**
   * 配偶者の合計所得金額が58万円以下の場合。
   */
  if (spouseTotalIncomeAmount <= 580_000) {
    return {
      spouseSalaryIncome:
        normalizedSpouseSalaryIncome,
      spouseTotalIncomeAmount,
      deductionType: "spouse",
      deductionAmount:
        getRegularSpouseDeduction(
          taxpayerCategory,
        ),
    };
  }

  /**
   * 58万円超133万円以下の場合。
   */
  if (spouseTotalIncomeAmount <= 1_330_000) {
    return {
      spouseSalaryIncome:
        normalizedSpouseSalaryIncome,
      spouseTotalIncomeAmount,
      deductionType: "special",
      deductionAmount:
        getSpecialSpouseDeduction(
          taxpayerCategory,
          spouseTotalIncomeAmount,
        ),
    };
  }

  return {
    spouseSalaryIncome:
      normalizedSpouseSalaryIncome,
    spouseTotalIncomeAmount,
    deductionType: "none",
    deductionAmount: 0,
  };
}
