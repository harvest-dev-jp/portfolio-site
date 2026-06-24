// src/lib/furusato-tax/__tests__/taxCalculations.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import { calculateBasicDeduction } from "../calculateBasicDeduction";
import { calculateIncomeDeductions } from "../calculateIncomeDeductions";
import { calculateIncomeTax } from "../calculateIncomeTax";
import { calculateResidentTax } from "../calculateResidentTax";
import { calculateSalaryIncome } from "../calculateSalaryIncome";

import type {
  NormalizedTaxInput,
} from "../types";

/**
 * 各テストで共通利用する正規化済み入力。
 */
function createNormalizedInput(
  updates: Partial<NormalizedTaxInput> = {},
): NormalizedTaxInput {
  return {
    taxYear: 2026,
    sourceMode: "detailed",

    grossSalaryIncome: 6_243_900,
    salaryIncomeAmount: 4_552_000,

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

    ...updates,
  };
}

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
          residentTax
            .housingLoanTaxCreditApplied,
        ).toBe(67_800);

        expect(
          residentTax
            .incomeBasedTaxAfterCredits,
        ).toBe(118_900);
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
          residentTax
            .housingLoanTaxCreditApplied,
        ).toBe(0);

        expect(
          residentTax
            .incomeBasedTaxAfterCredits,
        ).toBe(186_700);
      },
    );
  },
);
