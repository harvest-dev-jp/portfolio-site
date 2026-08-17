// src/lib/furusato-tax/__tests__/taxCalculations.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { calculateBasicDeduction } from "../calculateBasicDeduction";
import { calculateDonationLimit } from "../calculateDonationLimit";
import { calculateIncomeDeductions } from "../calculateIncomeDeductions";
import { calculateIncomeTax } from "../calculateIncomeTax";
import { calculateResidentTax } from "../calculateResidentTax";
import { calculateSalaryIncome } from "../calculateSalaryIncome";
import { normalizeDetailedInput } from "../normalizeDetailedInput";
import { simulateDetailedFurusatoTax } from "../simulateFurusatoTax";

import type {
  DetailedInput,
  NormalizedTaxInput,
} from "../types";

/**
 * 各テストで共通利用する正規化済み入力。
 */
function createNormalizedInput(
  updates: Partial<NormalizedTaxInput> = {},
): NormalizedTaxInput {
  const defaultResidentTaxDeductions = {
    basic: 430_000,
    socialInsurance: 0,
    ideco: 276_000,
    spouse: 0,
    dependent: 0,
    disability: 0,
    lifeInsurance: 0,
    earthquakeInsurance: 0,
    medicalExpense: 0,
    other: 1_979_000,
    total: 2_685_000,
    specialDependentDeduction: 0,
  };

  return {
    taxYear: 2026,
    sourceMode: "detailed",

    grossSalaryIncome: 6_243_900,
    salaryIncomeAmount: 4_552_000,

    /**
     * 旧仕様との互換用。
     *
     * NormalizedTaxInputから削除済みの場合は、
     * この項目も削除してください。
     */
    residentTaxIncomeDeductionTotal:
      2_685_000,

    basicDeduction: 0,
    socialInsuranceDeduction: 0,
    idecoDeduction: 276_000,
    spouseDeduction: 0,
    dependentDeduction: 0,
    disabilityDeduction: 0,
    lifeInsuranceDeduction: 0,
    earthquakeInsuranceDeduction: 0,
    medicalExpenseDeduction: 0,

    /**
     * iDeCoを除いた源泉徴収票の所得控除額。
     *
     * 1,978,987円 + 276,000円
     * = 2,254,987円
     */
    otherIncomeDeduction: 1_978_987,

    housingLoanTaxCredit: 200_000,
    otherTaxCredit: 0,

    plannedDonation: 50_000,
    filingMethod: "one-stop",
    safetyRate: 0.95,

    residentTaxDeductions: {
      basic: 430_000,
      socialInsurance: 0,
      ideco: 276_000,
      spouse: 0,
      dependent: 0,
      specialDependent: 0,
      disability: 0,
      lifeInsurance: 0,
      earthquakeInsurance: 0,
      medicalExpense: 0,
      other: 1_979_000,
      total: 2_685_000,
    },
    ...updates,
  };
}

const residentTaxFixture2025: DetailedInput = {
  taxYear: 2026,
  paymentAmount: 6_243_900,
  salaryIncomeAfterDeduction: 4_552_000,
  totalIncomeDeduction: 2_254_987,
  withholdingTaxAmount: 0,
  socialInsuranceAndSmallBusinessPremium: 1_168_510,
  includedIdecoContribution: 276_000,
  lifeInsuranceDeduction: 26_477,
  earthquakeInsuranceDeduction: 0,
  spouseDeduction: 380_000,
  basicDeduction: 0,
  incomeAdjustmentDeduction: 0,
  housingLoanTaxCredit: 132_200,
  additionalMedicalExpenseDeduction: 0,
  additionalIncomeDeduction: 0,
  additionalTaxCredit: 0,
  plannedDonation: 0,
  filingMethod: "one-stop",
  safetyRate: 0.95,
};

describe(
  "詳細入力の控除整理",
  () => {
    it(
      "所得税用所得控除合計を住民税用所得控除として直接使わない",
      () => {
        const normalized =
          normalizeDetailedInput(
            residentTaxFixture2025,
          );

        expect(
          normalized.idecoDeduction,
        ).toBe(0);

        expect(
          normalized.residentTaxDeductions.ideco,
        ).toBe(0);

        expect(
          normalized.residentTaxDeductions.total,
        ).not.toBe(
          residentTaxFixture2025.totalIncomeDeduction,
        );

        expect(
          normalized.residentTaxDeductions.total,
        ).toBeLessThan(
          residentTaxFixture2025.totalIncomeDeduction,
        );
      },
    );

    it(
      "iDeCoを社会保険料等の金額から除いて二重控除しない",
      () => {
        const normalized =
          normalizeDetailedInput(
            residentTaxFixture2025,
          );

        const socialInsuranceDeduction =
          Math.max(
            0,
            residentTaxFixture2025.socialInsuranceAndSmallBusinessPremium -
              residentTaxFixture2025.includedIdecoContribution,
          );

        expect(
          normalized.residentTaxDeductions.socialInsurance,
        ).toBe(socialInsuranceDeduction);

        expect(
          normalized.residentTaxDeductions.ideco,
        ).toBe(0);
      },
    );

    it(
      "2025年実績の住民税課税所得は同程度の水準に収まる",
      () => {
        const normalized =
          normalizeDetailedInput(
            residentTaxFixture2025,
          );

        const incomeDeductions =
          calculateIncomeDeductions(
            normalized,
          );

        const incomeTax =
          calculateIncomeTax(
            normalized,
            incomeDeductions,
          );

        const residentTax =
          calculateResidentTax(
            normalized,
            incomeDeductions,
            incomeTax,
          );

        // 2025年通知書の実績値は、2026年ルールと入力の粒度差があるため
        // 厳密一致ではなく「おおむね2.8M〜3.0M」の水準を確認する。
        expect(
          residentTax.taxableIncome,
        ).toBeGreaterThan(2_800_000);

        expect(
          residentTax.taxableIncome,
        ).toBeLessThan(3_000_000);
      },
    );

    it(
      "市民税・県民税の税額控除前所得割額は実績値の近辺に収まる",
      () => {
        const normalized =
          normalizeDetailedInput(
            residentTaxFixture2025,
          );

        const incomeDeductions =
          calculateIncomeDeductions(
            normalized,
          );

        const incomeTax =
          calculateIncomeTax(
            normalized,
            incomeDeductions,
          );

        const residentTax =
          calculateResidentTax(
            normalized,
            incomeDeductions,
            incomeTax,
          );

        expect(
          residentTax.incomeBasedTaxBeforeCredits,
        ).toBeGreaterThan(220_000);

        expect(
          residentTax.incomeBasedTaxBeforeCredits,
        ).toBeLessThan(360_000);
      },
    );

    it(
      "寄附金特例控除の20%上限は最終所得割額を基準にする",
      () => {
        const normalized =
          normalizeDetailedInput(
            residentTaxFixture2025,
          );

        const incomeDeductions =
          calculateIncomeDeductions(
            normalized,
          );

        const incomeTax =
          calculateIncomeTax(
            normalized,
            incomeDeductions,
          );

        const residentTax =
          calculateResidentTax(
            normalized,
            incomeDeductions,
            incomeTax,
          );

        const donation =
          calculateDonationLimit(
            normalized,
            incomeTax,
            residentTax,
          );

        const specialDeductionLimit =
          Math.floor(
            residentTax.incomeBasedTaxAfterCredits *
              0.2,
          );

        expect(
          donation.deductionBreakdown
            .residentTaxSpecialDeduction,
        ).toBeLessThanOrEqual(
          specialDeductionLimit,
        );
      },
    );

    it(
      "詳細入力の本計算と比較用計算は独立している",
      () => {
        const result =
          simulateDetailedFurusatoTax(
            residentTaxFixture2025,
          );

        expect(
          result.comparison.items,
        ).toHaveLength(4);

        expect(
          result.comparison.items.map(
            (item) => item.scenario,
          ),
        ).toEqual([
          "basic",
          "with-ideco",
          "with-housing-credit",
          "with-all",
        ]);
      },
    );
  },
);

describe(
  "calculateSalaryIncome",
  () => {
    it(
      "給与収入600万円の給与所得を計算する",
      () => {
        const result =
          calculateSalaryIncome(
            6_000_000,
          );

        expect(
          result.salaryIncomeAmount,
        ).toBe(4_360_000);

        expect(
          result.salaryIncomeDeduction,
        ).toBe(1_640_000);
      },
    );

    it(
      "給与収入74万円以下は給与所得0円になる",
      () => {
        const result =
          calculateSalaryIncome(
            740_000,
          );

        expect(
          result.salaryIncomeAmount,
        ).toBe(0);
      },
    );

    it(
      "令和8年分の低所得帯特例を適用する",
      () => {
        expect(
          calculateSalaryIncome(
            2_191_000,
          ).salaryIncomeAmount,
        ).toBe(1_451_000);

        expect(
          calculateSalaryIncome(
            2_193_000,
          ).salaryIncomeAmount,
        ).toBe(1_453_000);

        expect(
          calculateSalaryIncome(
            2_196_000,
          ).salaryIncomeAmount,
        ).toBe(1_456_000);
      },
    );
    it(
      "給与収入136万円の給与所得は62万円になる",
      () => {
        const result =
          calculateSalaryIncome(
            1_360_000,
          );

        expect(
          result.salaryIncomeAmount,
        ).toBe(620_000);

        expect(
          result.salaryIncomeDeduction,
        ).toBe(740_000);
      },
    );
  },
);

describe(
  "calculateBasicDeduction",
  () => {
    it(
      "所得336万円以下の基礎控除を計算する",
      () => {
        const result =
          calculateBasicDeduction(
            3_000_000,
          );

        expect(
          result.basicDeduction,
        ).toBe(880_000);
      },
    );

    it(
      "所得336万円超489万円以下の基礎控除を計算する",
      () => {
        const result =
          calculateBasicDeduction(
            4_552_000,
          );

        expect(
          result.basicDeduction,
        ).toBe(680_000);
      },
    );
  },
);

describe(
  "所得税・住民税の連携",
  () => {
    it(
      "iDeCoを含む所得控除合計を計算する",
      () => {
        const input =
          createNormalizedInput();

        const deductions =
          calculateIncomeDeductions(
            input,
          );

        expect(
          deductions.total,
        ).toBe(2_254_987);
      },
    );

    it(
      "所得税の課税所得と住宅ローン控除を計算する",
      () => {
        const input =
          createNormalizedInput();

        const deductions =
          calculateIncomeDeductions(
            input,
          );

        const incomeTax =
          calculateIncomeTax(
            input,
            deductions,
          );

        expect(
          incomeTax.taxableIncome,
        ).toBe(2_297_000);

        expect(
          incomeTax.taxRate,
        ).toBe(0.1);

        expect(
          incomeTax.taxBeforeCredits,
        ).toBe(132_200);

        expect(
          incomeTax
            .housingLoanTaxCreditApplied,
        ).toBe(132_200);

        expect(
          incomeTax.taxAfterCredits,
        ).toBe(0);
      },
    );

    it(
      "所得税から引ききれない住宅ローン控除67,800円を住民税へ回す",
      () => {
        const input =
          createNormalizedInput({
            housingLoanTaxCredit:
              200_000,
          });

        const deductions =
          calculateIncomeDeductions(
            input,
          );

        const incomeTax =
          calculateIncomeTax(
            input,
            deductions,
          );

        const residentTax =
          calculateResidentTax(
            input,
            deductions,
            incomeTax,
          );

        expect(
          residentTax.taxableIncome,
        ).toBe(1_867_000);

        expect(
          residentTax
            .incomeBasedTaxBeforeCredits,
        ).toBe(186_700);

        expect(
          residentTax.adjustmentDeduction,
        ).toBe(2_500);

        expect(
          residentTax
            .housingLoanTaxCreditApplied,
        ).toBe(67_800);

        expect(
          residentTax
            .incomeBasedTaxAfterCredits,
        ).toBe(116_400);
      },
    );

    it(
      "住宅ローン控除132,200円なら住民税への繰越は0円になる",
      () => {
        const input =
          createNormalizedInput({
            housingLoanTaxCredit:
              132_200,
          });

        const deductions =
          calculateIncomeDeductions(
            input,
          );

        const incomeTax =
          calculateIncomeTax(
            input,
            deductions,
          );

        const residentTax =
          calculateResidentTax(
            input,
            deductions,
            incomeTax,
          );

        expect(
          residentTax.taxableIncome,
        ).toBe(1_867_000);

        expect(
          residentTax
            .incomeBasedTaxBeforeCredits,
        ).toBe(186_700);

        expect(
          residentTax.adjustmentDeduction,
        ).toBe(2_500);

        expect(
          residentTax
            .housingLoanTaxCreditApplied,
        ).toBe(0);

        expect(
          residentTax
            .incomeBasedTaxAfterCredits,
        ).toBe(184_200);
      },
    );
  },
);