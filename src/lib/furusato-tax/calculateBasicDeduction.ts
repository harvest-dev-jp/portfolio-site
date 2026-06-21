// src/lib/furusato-tax/calculateBasicDeduction.ts

import {
  taxRules2026,
  type BasicDeductionBracket,
} from "./rules/2026";

/**
 * 基礎控除の計算結果。
 */
export interface BasicDeductionResult {
  /**
   * 入力された合計所得金額。
   */
  totalIncomeAmount: number;

  /**
   * 適用された基礎控除額。
   */
  basicDeduction: number;

  /**
   * 計算に使用した所得区分。
   */
  appliedBracket: BasicDeductionBracket;
}

/**
 * 0以上の整数へ補正する。
 */
function normalizeNonNegativeInteger(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

/**
 * 合計所得金額に対応する基礎控除区分を取得する。
 */
function findBasicDeductionBracket(
  totalIncomeAmount: number,
): BasicDeductionBracket {
  const bracket =
    taxRules2026.basicDeductionBrackets.find((item) => {
      const isAboveMinimum =
        totalIncomeAmount >= item.minIncome;

      const isBelowMaximum =
        item.maxIncome === null ||
        totalIncomeAmount <= item.maxIncome;

      return isAboveMinimum && isBelowMaximum;
    });

  if (!bracket) {
    throw new Error(
      `合計所得金額 ${totalIncomeAmount}円 に対応する基礎控除区分がありません。`,
    );
  }

  return bracket;
}

/**
 * 2026年分の所得税における基礎控除額を計算する。
 *
 * @param totalIncomeAmount 合計所得金額
 * @returns 基礎控除額と適用区分
 */
export function calculateBasicDeduction(
  totalIncomeAmount: number,
): BasicDeductionResult {
  const normalizedIncome =
    normalizeNonNegativeInteger(totalIncomeAmount);

  const appliedBracket =
    findBasicDeductionBracket(normalizedIncome);

  return {
    totalIncomeAmount: normalizedIncome,
    basicDeduction: appliedBracket.deduction,
    appliedBracket,
  };
}
