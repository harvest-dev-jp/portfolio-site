// src/lib/furusato-tax/calculateSalaryIncome.ts

import {
  taxRules2026,
  type SalaryIncomeBracket,
} from "./rules/2026";

/**
 * 給与所得の計算結果。
 */
export interface SalaryIncomeResult {
  /**
   * 入力された給与収入。
   */
  grossSalaryIncome: number;

  /**
   * 給与所得控除額。
   */
  salaryIncomeDeduction: number;

  /**
   * 給与所得控除後の給与所得。
   */
  salaryIncomeAmount: number;

  /**
   * 計算に使用した給与収入区分。
   */
  appliedBracket: SalaryIncomeBracket;
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
 * 給与収入を4で割り、1,000円未満を切り捨てる。
 *
 * 例：
 * 3,001,234円
 * ÷ 4 = 750,308.5円
 * → 750,000円
 */
function calculateQuarterRoundedAmount(
  salaryIncome: number,
): number {
  return Math.floor(salaryIncome / 4 / 1_000) * 1_000;
}

/**
 * 給与収入に対応する計算区分を取得する。
 */
function findSalaryIncomeBracket(
  salaryIncome: number,
): SalaryIncomeBracket {
  const bracket =
    taxRules2026.salaryIncomeBrackets.find((item) => {
      const isAboveMinimum =
        salaryIncome >= item.minSalary;

      const isBelowMaximum =
        item.maxSalary === null ||
        salaryIncome <= item.maxSalary;

      return isAboveMinimum && isBelowMaximum;
    });

  if (!bracket) {
    throw new Error(
      `給与収入 ${salaryIncome}円 に対応する給与所得区分がありません。`,
    );
  }

  return bracket;
}

/**
 * 給与所得を計算する。
 *
 * @param grossSalaryIncome 給与・賞与の年間収入額
 * @returns 給与所得控除額と給与所得
 */
export function calculateSalaryIncome(
  grossSalaryIncome: number,
): SalaryIncomeResult {
  const salaryIncome =
    normalizeNonNegativeInteger(grossSalaryIncome);

  const appliedBracket =
    findSalaryIncomeBracket(salaryIncome);

  let salaryIncomeAmount = 0;

  switch (appliedBracket.method) {
    case "fixed-deduction": {
      const fixedDeduction =
        appliedBracket.fixedDeduction ?? 0;

      salaryIncomeAmount = Math.max(
        0,
        salaryIncome - fixedDeduction,
      );

      break;
    }

    case "fixed-income": {
    salaryIncomeAmount = Math.max(
        0,
        appliedBracket.fixedIncomeAmount ?? 0,
    );

    break;
    }

    case "quarter-round-2.8":
    case "quarter-round-3.2": {
      const quarterRoundedAmount =
        calculateQuarterRoundedAmount(salaryIncome);

      const incomeRate =
        appliedBracket.incomeRate ?? 0;

      const incomeSubtraction =
        appliedBracket.incomeSubtraction ?? 0;

      salaryIncomeAmount = Math.max(
        0,
        Math.trunc(
          quarterRoundedAmount * incomeRate -
            incomeSubtraction,
        ),
      );

      break;
    }

    case "rate": {
      const incomeRate =
        appliedBracket.incomeRate ?? 0;

      const incomeSubtraction =
        appliedBracket.incomeSubtraction ?? 0;

      salaryIncomeAmount = Math.max(
        0,
        Math.trunc(
          salaryIncome * incomeRate -
            incomeSubtraction,
        ),
      );

      break;
    }

    case "maximum-deduction": {
      const fixedDeduction =
        appliedBracket.fixedDeduction ?? 0;

      salaryIncomeAmount = Math.max(
        0,
        salaryIncome - fixedDeduction,
      );

      break;
    }

    default: {
      const exhaustiveCheck: never =
        appliedBracket.method;

      throw new Error(
        `未対応の給与所得計算方式です: ${exhaustiveCheck}`,
      );
    }
  }

  /**
   * 給与所得控除額は、
   * 給与収入－給与所得で求める。
   */
  const salaryIncomeDeduction = Math.max(
    0,
    salaryIncome - salaryIncomeAmount,
  );

  return {
    grossSalaryIncome: salaryIncome,
    salaryIncomeDeduction,
    salaryIncomeAmount,
    appliedBracket,
  };
}
