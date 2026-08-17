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
   * 源泉徴収票の「所得控除の額の合計額」は
   * 所得税計算用の控除合計であり、
   * 住民税計算にそのまま流用してはいけない。
   *
   * そのため、詳細入力では
   * "所得税計算の総額" と
   * "住民税計算の再計算用内訳" を分離する。
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
   * 社会保険料等の金額にiDeCoが含まれている場合は、
   * 本計算では再度控除しない。
   *
   * iDeCoは比較用の説明としてのみ保持する。
   */
  const includedIdecoContribution =
    normalizeNonNegativeInteger(
      input.includedIdecoContribution,
    );

  const incomeTaxBasicDeduction =
    normalizeNonNegativeInteger(
      input.basicDeduction,
    );

  const residentTaxBasicDeduction =
    salaryIncomeAmount <= 24_000_000
      ? 430_000
      : salaryIncomeAmount <= 24_500_000
        ? 290_000
        : salaryIncomeAmount <= 25_000_000
          ? 150_000
          : 0;

  const residentSocialInsuranceDeduction =
    Math.max(
      0,
      normalizeNonNegativeInteger(
        input.socialInsuranceAndSmallBusinessPremium,
      ) -
        includedIdecoContribution,
    );

  const spouseDeduction =
    normalizeNonNegativeInteger(
      input.spouseDeduction,
    );

  const lifeInsuranceDeduction =
    normalizeNonNegativeInteger(
      input.lifeInsuranceDeduction,
    );

  const earthquakeInsuranceDeduction =
    normalizeNonNegativeInteger(
      input.earthquakeInsuranceDeduction,
    );

  const taxResidualDeduction =
    Math.max(
      0,
      totalIncomeDeduction -
        incomeTaxBasicDeduction -
        includedIdecoContribution,
    );

  const residentTaxOtherDeduction =
    Math.max(
      0,
      additionalIncomeDeduction,
    );

  const residentTaxDeductionTotal =
    residentTaxBasicDeduction +
    residentSocialInsuranceDeduction +
    spouseDeduction +
    lifeInsuranceDeduction +
    earthquakeInsuranceDeduction +
    additionalMedicalExpenseDeduction +
    residentTaxOtherDeduction;

  const incomeTaxOtherDeduction =
    taxResidualDeduction +
    additionalIncomeDeduction;

  return {
    taxYear: input.taxYear,
    sourceMode: "detailed",

    // 所得
    grossSalaryIncome,
    salaryIncomeAmount,

    /**
     * 詳細入力の本計算では、
     * 源泉徴収票の控除合計をそのまま住民税用控除へ流用しない。
     * 所得税計算では、残りの控除を総額として扱う。
     */
    basicDeduction: incomeTaxBasicDeduction,
    socialInsuranceDeduction: 0,
    idecoDeduction: 0,
    spouseDeduction,
    dependentDeduction: 0,
    disabilityDeduction: 0,
    lifeInsuranceDeduction,
    earthquakeInsuranceDeduction,

    /**
     * 年末調整後に追加する医療費控除。
     */
    medicalExpenseDeduction:
      additionalMedicalExpenseDeduction,

    otherIncomeDeduction:
      incomeTaxOtherDeduction,

    // 税額控除
    housingLoanTaxCredit:
      normalizeNonNegativeInteger(
        input.housingLoanTaxCredit,
      ),

    otherTaxCredit:
      normalizeNonNegativeInteger(
        input.additionalTaxCredit,
      ),

    specialDependentDeduction: 0,

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
      residentTaxDeductionTotal,

    residentTaxDeductions: {
      basic: residentTaxBasicDeduction,
      socialInsurance: residentSocialInsuranceDeduction,
      ideco: 0,
      spouse: spouseDeduction,
      dependent: 0,
      disability: 0,
      lifeInsurance: lifeInsuranceDeduction,
      earthquakeInsurance: earthquakeInsuranceDeduction,
      specialDependent: 0,
      medicalExpense:
        additionalMedicalExpenseDeduction,
      other: residentTaxOtherDeduction,
      total: residentTaxDeductionTotal,
    },
  };
}
