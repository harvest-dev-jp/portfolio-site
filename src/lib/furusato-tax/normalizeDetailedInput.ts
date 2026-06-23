// src/lib/furusato-tax/normalizeDetailedInput.ts

import type {
  DetailedInput,
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
 * 詳細入力を税計算用の共通形式へ変換する。
 *
 * 詳細入力では、源泉徴収票に記載された
 * 「給与所得控除後の金額」と
 * 「所得控除の額の合計額」を主に利用する。
 */
export function normalizeDetailedInput(
  input: DetailedInput,
): NormalizedTaxInput {
  const grossSalaryIncome =
    normalizeNonNegativeInteger(
      input.paymentAmount,
    );

  const salaryIncomeAmount =
    normalizeNonNegativeInteger(
      input.salaryIncomeAfterDeduction,
    );

  /**
   * 源泉徴収票の「所得控除の額の合計額」には、
   * 社会保険料控除、基礎控除、配偶者控除などが
   * 原則として含まれている。
   *
   * ただし、NormalizedTaxInputは控除を項目別に持つため、
   * 詳細入力では合計額を otherIncomeDeduction に集約する。
   *
   * 年末調整後に追加する医療費控除などは、
   * 別項目として加算する。
   */
  const totalIncomeDeduction =
    normalizeNonNegativeInteger(
      input.totalIncomeDeduction,
    );

  const additionalMedicalExpenseDeduction =
    normalizeNonNegativeInteger(
      input.additionalMedicalExpenseDeduction,
    );

  const additionalIncomeDeduction =
    normalizeNonNegativeInteger(
      input.additionalIncomeDeduction,
    );

  /**
   * 源泉徴収票の社会保険料等の金額には、
   * iDeCo掛金が含まれている場合がある。
   *
   * 控除合計を二重計上しないため、
   * 詳細入力では社会保険料・iDeCoの個別項目を
   * NormalizedTaxInputへ重ねて加算しない。
   *
   * 内訳としての表示精度は、後続工程で改善する。
   */
  const includedIdecoContribution =
    normalizeNonNegativeInteger(
      input.includedIdecoContribution,
    );

  void includedIdecoContribution;

  return {
    taxYear: input.taxYear,
    sourceMode: "detailed",

    // 所得
    grossSalaryIncome,
    salaryIncomeAmount,

    /**
     * 詳細入力では所得控除合計を一括利用するため、
     * 個別項目は0円とする。
     */
    basicDeduction: 0,
    socialInsuranceDeduction: 0,
    idecoDeduction:
      includedIdecoContribution,
    spouseDeduction: 0,
    dependentDeduction: 0,
    disabilityDeduction: 0,
    lifeInsuranceDeduction: 0,
    earthquakeInsuranceDeduction: 0,

    /**
     * 年末調整後に追加する医療費控除。
     */
    medicalExpenseDeduction:
      additionalMedicalExpenseDeduction,


    /**
     * 源泉徴収票の所得控除合計からiDeCo分を分離する。
     *
     * iDeCo分はidecoDeductionへ格納するため、
     * otherIncomeDeductionから差し引いて二重計上を防ぐ。
     */
    otherIncomeDeduction:
        Math.max(
            0,
            totalIncomeDeduction -
            includedIdecoContribution,
        ) +
        additionalIncomeDeduction,


    // 税額控除
    housingLoanTaxCredit:
      normalizeNonNegativeInteger(
        input.housingLoanTaxCredit,
      ),

    otherTaxCredit:
      normalizeNonNegativeInteger(
        input.additionalTaxCredit,
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
  };
}
