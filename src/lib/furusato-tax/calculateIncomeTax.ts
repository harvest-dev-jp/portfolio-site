//src/lib/furusato-tax/calculateIncomeTax.ts

import type {
  IncomeDeductionBreakdown,
  IncomeTaxResult,
  NormalizedTaxInput,
} from "./types";

import {
  taxRules2026,
  type IncomeTaxBracket,
} from "./rules/2026";

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
function floorToThousand(value: number): number {
  return Math.floor(
    normalizeNonNegativeInteger(value) / 1_000,
  ) * 1_000;
}

/**
 * 課税所得に対応する所得税率区分を取得する。
 */
function findIncomeTaxBracket(
  taxableIncome: number,
): IncomeTaxBracket {
  const bracket =
    taxRules2026.incomeTaxBrackets.find((item) => {
      const isAboveMinimum =
        taxableIncome >= item.min;

      const isBelowMaximum =
        item.max === null ||
        taxableIncome <= item.max;

      return isAboveMinimum && isBelowMaximum;
    });

  if (!bracket) {
    throw new Error(
      `課税所得 ${taxableIncome}円 に対応する所得税率区分がありません。`,
    );
  }

  return bracket;
}

/**
 * 利用可能な税額を上限として税額控除を適用する。
 */
function applyTaxCredit(
  availableTax: number,
  requestedCredit: number,
): number {
  return Math.min(
    normalizeNonNegativeInteger(availableTax),
    normalizeNonNegativeInteger(requestedCredit),
  );
}

/**
 * 所得税および復興特別所得税を計算する。
 *
 * 計算順序：
 *
 * 1. 給与所得から所得控除合計を差し引く
 * 2. 課税所得の1,000円未満を切り捨てる
 * 3. 所得税の速算表を適用する
 * 4. 住宅ローン控除などの税額控除を適用する
 * 5. 税額控除後の所得税に復興特別所得税を加算する
 */
export function calculateIncomeTax(
  input: NormalizedTaxInput,
  deductions: IncomeDeductionBreakdown,
): IncomeTaxResult {
  const salaryIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAmount,
    );

  const totalIncomeDeduction =
    normalizeNonNegativeInteger(
      deductions.total,
    );

  /**
   * 課税所得は0円未満にならないようにしたうえで、
   * 1,000円未満を切り捨てる。
   */
  const taxableIncome =
    floorToThousand(
      salaryIncomeAmount -
        totalIncomeDeduction,
    );

  const appliedBracket =
    findIncomeTaxBracket(taxableIncome);

  /**
   * 所得税の速算表による税額。
   *
   * 課税所得 × 税率 − 控除額
   */
  const taxBeforeCredits =
    normalizeNonNegativeInteger(
      taxableIncome * appliedBracket.rate -
        appliedBracket.deduction,
    );

  /**
   * 住宅ローン控除を先に適用する。
   */
  const housingLoanTaxCreditApplied =
    applyTaxCredit(
      taxBeforeCredits,
      input.housingLoanTaxCredit,
    );

  const taxAfterHousingCredit =
    taxBeforeCredits -
    housingLoanTaxCreditApplied;

  /**
   * その他の税額控除を、残っている所得税額を
   * 上限として適用する。
   */
  const otherTaxCreditApplied =
    applyTaxCredit(
      taxAfterHousingCredit,
      input.otherTaxCredit,
    );

  /**
   * 税額控除後の所得税。
   * 復興特別所得税の計算基礎となる。
   */
  const baseIncomeTaxAfterCredits =
    taxAfterHousingCredit -
    otherTaxCreditApplied;

  /**
   * 復興特別所得税。
   *
   * 1円未満を切り捨てる。
   */
  const reconstructionSpecialIncomeTax =
    Math.floor(
      baseIncomeTaxAfterCredits *
        taxRules2026.reconstructionIncomeTaxRate,
    );

  /**
   * 所得税と復興特別所得税の合計。
   *
   * 現在のIncomeTaxResultでは、
   * taxAfterCreditsに合計額を格納する。
   */
  const taxAfterCredits =
    baseIncomeTaxAfterCredits +
    reconstructionSpecialIncomeTax;

  return {
    taxableIncome,
    taxRate: appliedBracket.rate,
    bracketDeductionAmount:
      appliedBracket.deduction,

    taxBeforeCredits,
    housingLoanTaxCreditApplied,
    otherTaxCreditApplied,
    taxAfterCredits,
  };
}
