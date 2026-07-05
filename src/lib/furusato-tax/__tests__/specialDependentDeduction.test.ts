// src/lib/furusato-tax/__tests__/specialDependentDeduction.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateSalaryIncome,
} from "../calculateSalaryIncome";

import {
  calculateDependentDeductions,
} from "../calculateDependentDeductions";

import {
  calculateResidentTaxDeductions,
} from "../calculateResidentTaxDeductions";

import {
  calculatePersonalDeductionDifference,
} from "../calculateAdjustmentDeduction";

import type {
  Dependent,
  NormalizedTaxInput,
  SimpleInput,
} from "../types";

/**
 * 扶養親族のテストデータを作成する。
 */
function createDependent(
  updates: Partial<Dependent> = {},
): Dependent {
  return {
    id: "dependent-1",
    relationship: "child",
    age: 20,
    salaryIncome: 0,
    livesTogether: true,
    disabilityCategory: "none",
    ...updates,
  };
}

/**
 * 住民税用所得控除のテストに使用する
 * かんたん入力データ。
 */
function createSimpleInput(
  dependent: Dependent,
): SimpleInput {
  return {
    taxYear: 2026,

    salaryIncome: 6_000_000,
    taxpayerAge: 58,

    hasSpouse: false,
    spouseSalaryIncome: 0,

    dependents: [dependent],

    socialInsurancePremium: 0,
    idecoContribution: 0,
    lifeInsuranceDeduction: 0,
    earthquakeInsuranceDeduction: 0,
    medicalExpenseDeduction: 0,
    otherIncomeDeduction: 0,

    housingLoanTaxCredit: 0,
    otherTaxCredit: 0,

    plannedDonation: 0,
    filingMethod: "one-stop",
    safetyRate: 0.95,
  };
}

/**
 * 調整控除テスト用の正規化済み入力。
 */
function createNormalizedInput(
  updates: Partial<NormalizedTaxInput> = {},
): NormalizedTaxInput {
  const defaultResidentTaxDeductions = {
    basic: 430_000,
    socialInsurance: 0,
    ideco: 0,
    spouse: 0,

    /**
     * 特定親族特別控除45万円を含む。
     */
    dependent: 450_000,
    specialDependent: 450_000,

    disability: 0,
    lifeInsurance: 0,
    earthquakeInsurance: 0,
    medicalExpense: 0,
    other: 0,
    total: 880_000,
  };

  const residentTaxDeductions = {
    ...defaultResidentTaxDeductions,
    ...updates.residentTaxDeductions,
  };

  return {
    taxYear: 2026,
    sourceMode: "simple",

    grossSalaryIncome: 6_000_000,
    salaryIncomeAmount: 4_360_000,

    basicDeduction: 680_000,
    socialInsuranceDeduction: 0,
    idecoDeduction: 0,
    spouseDeduction: 0,

    /**
     * 所得税の特定親族特別控除63万円を含む。
     */
    dependentDeduction: 630_000,
    specialDependentDeduction: 630_000,

    disabilityDeduction: 0,
    lifeInsuranceDeduction: 0,
    earthquakeInsuranceDeduction: 0,
    medicalExpenseDeduction: 0,
    otherIncomeDeduction: 0,

    residentTaxDeductions,

    /**
     * 旧項目をまだ型に残している場合に使用する。
     */
    residentTaxIncomeDeductionTotal:
      residentTaxDeductions.total,

    housingLoanTaxCredit: 0,
    otherTaxCredit: 0,

    plannedDonation: 0,
    filingMethod: "one-stop",
    safetyRate: 0.95,

    ...updates,

    /**
     * updatesのresidentTaxDeductionsで
     * オブジェクト全体が上書きされないよう、
     * 最後にマージ済みの値を設定する。
     */
    residentTaxDeductions,
  };
}

describe(
  "所得税の特定親族特別控除",
  () => {
    it(
      "20歳・給与収入136万円は特定扶養控除63万円になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              salaryIncome: 1_360_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(630_000);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(0);

        expect(
          result.items[0].ageCategory,
        ).toBe("specified");
      },
    );

    it(
      "20歳・給与収入150万円は特定親族特別控除63万円になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              salaryIncome: 1_500_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(630_000);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(630_000);

        expect(
          result.items[0].ageCategory,
        ).toBe("special-dependent");
      },
    );

    it(
      "20歳・給与収入160万円は特定親族特別控除61万円になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              salaryIncome: 1_600_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(610_000);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(610_000);

        expect(
          result.items[0].ageCategory,
        ).toBe("special-dependent");
      },
    );

    it(
      "20歳・給与収入197万円は特定親族特別控除3万円になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              salaryIncome: 1_970_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(30_000);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(30_000);

        expect(
          result.items[0].ageCategory,
        ).toBe("special-dependent");
      },
    );

    it(
      "20歳・給与収入197万円超は控除対象外になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              salaryIncome: 1_971_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(0);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(0);

        expect(
          result.items[0].ageCategory,
        ).toBe("not-eligible");
      },
    );

    it(
      "18歳は給与収入150万円でも特定親族特別控除の対象外になる",
      () => {
        const result =
          calculateDependentDeductions([
            createDependent({
              age: 18,
              salaryIncome: 1_500_000,
            }),
          ]);

        expect(
          result.dependentDeductionTotal,
        ).toBe(0);

        expect(
          result
            .specialDependentDeductionTotal,
        ).toBe(0);

        expect(
          result.items[0].ageCategory,
        ).toBe("not-eligible");
      },
    );
  },
);

describe(
  "住民税の特定親族特別控除",
  () => {
    it(
      "20歳・給与収入150万円は住民税控除45万円になる",
      () => {
        const dependent =
          createDependent({
            salaryIncome: 1_500_000,
          });

        const result =
          calculateResidentTaxDeductions(
            createSimpleInput(dependent),
            4_360_000,
          );

        expect(
          result.dependent,
        ).toBe(450_000);

        expect(
          result.specialDependent,
        ).toBe(450_000);
      },
    );

    it(
      "20歳・給与収入197万円は住民税控除3万円になる",
      () => {
        const dependent =
          createDependent({
            salaryIncome: 1_970_000,
          });

        const result =
          calculateResidentTaxDeductions(
            createSimpleInput(dependent),
            4_360_000,
          );

        expect(
          result.dependent,
        ).toBe(30_000);

        expect(
          result.specialDependent,
        ).toBe(30_000);
      },
    );

    it(
      "20歳・給与収入197万円超は住民税控除の対象外になる",
      () => {
        const dependent =
          createDependent({
            salaryIncome: 1_971_000,
          });

        const result =
          calculateResidentTaxDeductions(
            createSimpleInput(dependent),
            4_360_000,
          );

        expect(
          result.dependent,
        ).toBe(0);

        expect(
          result.specialDependent,
        ).toBe(0);
      },
    );
  },
);

describe(
  "特定親族特別控除と調整控除",
  () => {
    it(
      "特定親族特別控除の所得税と住民税の差額を人的控除差へ加算しない",
      () => {
        const input =
          createNormalizedInput();

        const result =
          calculatePersonalDeductionDifference(
            input,
          );

        /**
         * 特定親族特別控除：
         * 所得税63万円、住民税45万円。
         *
         * 実際の差額18万円は、
         * 調整控除の人的控除差へ含めない。
         *
         * このケースでは基礎控除差5万円のみ。
         */
        expect(result).toBe(50_000);
      },
    );
  },
);

const salaryResult =
  calculateSalaryIncome(1_360_000);
