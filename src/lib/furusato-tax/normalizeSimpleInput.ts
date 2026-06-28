// src/lib/furusato-tax/normalizeSimpleInput.ts

import type {
  NormalizedTaxInput,
  SimpleInput,
} from "./types";

import { calculateSalaryIncome } from "./calculateSalaryIncome";
import { calculateBasicDeduction } from "./calculateBasicDeduction";
import { calculateDependentDeductions } from "./calculateDependentDeductions";

import { calculateSpouseDeduction } from "./calculateSpouseDeduction";
import { calculateResidentTaxDeductions } from "./calculateResidentTaxDeductions";

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
 * かんたん入力を税計算用の共通形式へ変換する。
 *
 * 現時点では給与所得のみを対象とし、
 * 給与所得以外の収入は扱わない。
 */
export function normalizeSimpleInput(
  input: SimpleInput,
): NormalizedTaxInput {
  const grossSalaryIncome =
    normalizeNonNegativeInteger(
      input.salaryIncome,
    );

  /**
   * 給与収入から給与所得を計算する。
   */
  const salaryResult =
    calculateSalaryIncome(
      grossSalaryIncome,
    );

  /**
   * 現在は給与所得のみを合計所得金額として扱う。
   */
  const totalIncomeAmount =
    salaryResult.salaryIncomeAmount;

  /**
   * 合計所得金額から基礎控除額を計算する。
   */
  const basicDeductionResult =
    calculateBasicDeduction(
      totalIncomeAmount,
    );

  /**
   * 扶養控除と障害者控除を計算する。
   */
  const dependentResult =
    calculateDependentDeductions(
      input.dependents,
    );

  const spouseResult =
  calculateSpouseDeduction(
    input.hasSpouse,
    totalIncomeAmount,
    input.spouseSalaryIncome,
  );
  const residentTaxDeductions =
  calculateResidentTaxDeductions(
    input,
    totalIncomeAmount,
  );
  

  return {
    taxYear: input.taxYear,
    sourceMode: "simple",

    // 所得
    grossSalaryIncome,
    salaryIncomeAmount:
      salaryResult.salaryIncomeAmount,

    // 所得控除
    basicDeduction:
      basicDeductionResult.basicDeduction,

    socialInsuranceDeduction:
      normalizeNonNegativeInteger(
        input.socialInsurancePremium,
      ),

    idecoDeduction:
      normalizeNonNegativeInteger(
        input.idecoContribution,
      ),

    /**
     * 配偶者控除は、次工程で専用計算を追加する。
     * 現段階では0円として扱う。
     */
    spouseDeduction:
      spouseResult.deductionAmount,

    dependentDeduction:
      dependentResult.dependentDeductionTotal,

    disabilityDeduction:
      dependentResult.disabilityDeductionTotal,

    lifeInsuranceDeduction:
      normalizeNonNegativeInteger(
        input.lifeInsuranceDeduction,
      ),

    earthquakeInsuranceDeduction:
      normalizeNonNegativeInteger(
        input.earthquakeInsuranceDeduction,
      ),

    medicalExpenseDeduction:
      normalizeNonNegativeInteger(
        input.medicalExpenseDeduction,
      ),

    otherIncomeDeduction:
      normalizeNonNegativeInteger(
        input.otherIncomeDeduction,
      ),

    // 税額控除
    housingLoanTaxCredit:
      normalizeNonNegativeInteger(
        input.housingLoanTaxCredit,
      ),

    otherTaxCredit:
      normalizeNonNegativeInteger(
        input.otherTaxCredit,
      ),

    // 寄附条件
    plannedDonation:
      normalizeNonNegativeInteger(
        input.plannedDonation,
      ),

    filingMethod:
      input.filingMethod,

    safetyRate:
      input.safetyRate,

    residentTaxIncomeDeductionTotal:
      residentTaxDeductions.total,
  };
}
