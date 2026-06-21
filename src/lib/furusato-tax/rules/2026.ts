// src/lib/furusato-tax/rules/2026.ts

import type { TaxYear } from "../types";

/**
 * 所得税の税率区分。
 */
export interface IncomeTaxBracket {
  /**
   * この区分が適用される課税所得の最低額。
   */
  min: number;

  /**
   * この区分が適用される課税所得の最高額。
   * 上限なしの場合はnull。
   */
  max: number | null;

  /**
   * 所得税率。
   *
   * 例：5％の場合は0.05。
   */
  rate: number;

  /**
   * 所得税の速算表における控除額。
   */
  deduction: number;
}

/**
 * 基礎控除の所得区分。
 */
export interface BasicDeductionBracket {
  /**
   * 合計所得金額の最低額。
   */
  minIncome: number;

  /**
   * 合計所得金額の最高額。
   * 上限なしの場合はnull。
   */
  maxIncome: number | null;

  /**
   * 基礎控除額。
   */
  deduction: number;
}

/**
 * 給与所得の計算方式。
 */
export type SalaryIncomeCalculationMethod =
  | "fixed-deduction"
  |  "fixed-income"
  | "quarter-round-2.8"
  | "quarter-round-3.2"
  | "rate"
  | "maximum-deduction";

/**
 * 給与所得計算の区分。
 */
export interface SalaryIncomeBracket {
  minSalary: number;
  maxSalary: number | null;
  method: SalaryIncomeCalculationMethod;

  fixedDeduction?: number;

  /**
   * 給与所得を固定額で設定する特例区分に使用する。
   */
  fixedIncomeAmount?: number;

  incomeRate?: number;
  incomeSubtraction?: number;
}

/**
 * 扶養控除額。
 */
export interface DependentDeductionRules {
  /**
   * 16歳未満。
   *
   * 扶養控除は0円だが、障害者控除の対象にはなり得る。
   */
  under16: number;

  /**
   * 16歳以上19歳未満。
   */
  general: number;

  /**
   * 19歳以上23歳未満。
   */
  specified: number;

  /**
   * 23歳以上70歳未満。
   */
  adult: number;

  /**
   * 70歳以上で同居老親等以外。
   */
  elderlyOther: number;

  /**
   * 70歳以上の同居老親等。
   */
  elderlyLivingTogether: number;
}

/**
 * 障害者控除額。
 */
export interface DisabilityDeductionRules {
  general: number;
  special: number;
  specialLivingTogether: number;
}

/**
 * ふるさと納税計算用の共通ルール。
 */
export interface DonationRules {
  /**
   * 自己負担額。
   */
  minimumSelfPayment: number;

  /**
   * 住民税基本分の控除率。
   */
  residentTaxBasicRate: number;

  /**
   * 住民税特例分の上限割合。
   *
   * 住民税所得割額に対する割合。
   */
  residentTaxSpecialLimitRate: number;
}

/**
 * 2026年分の税制ルール。
 */
export interface TaxRules2026 {
  taxYear: TaxYear;

  salaryIncomeBrackets: SalaryIncomeBracket[];
  basicDeductionBrackets: BasicDeductionBracket[];
  incomeTaxBrackets: IncomeTaxBracket[];

  dependentDeductions: DependentDeductionRules;
  disabilityDeductions: DisabilityDeductionRules;

  /**
   * 復興特別所得税率。
   */
  reconstructionIncomeTaxRate: number;

  /**
   * 住民税所得割の標準税率。
   */
  residentTaxIncomeRate: number;

  donation: DonationRules;
}

/**
 * 2026年分の給与所得計算区分。
 *
 * 190万円以下：
 *   給与所得控除74万円
 *
 * 190万円超660万円未満：
 *   給与収入を4で割り、千円未満を切り捨てた金額Aを使用する。
 *
 * 660万円以上：
 *   通常の速算式を使用する。
 */

export const salaryIncomeBrackets2026: SalaryIncomeBracket[] = [
  /**
   * 219万1,000円未満
   *
   * 給与所得控除74万円。
   * 収入が74万円以下の場合は、給与所得は0円となる。
   */
  {
    minSalary: 0,
    maxSalary: 2_190_999,
    method: "fixed-deduction",
    fixedDeduction: 740_000,
  },

  /**
   * 219万1,000円以上219万3,000円未満
   */
  {
    minSalary: 2_191_000,
    maxSalary: 2_192_999,
    method: "fixed-income",
    fixedIncomeAmount: 1_451_000,
  },

  /**
   * 219万3,000円以上219万6,000円未満
   */
  {
    minSalary: 2_193_000,
    maxSalary: 2_195_999,
    method: "fixed-income",
    fixedIncomeAmount: 1_453_000,
  },

  /**
   * 219万6,000円以上220万円未満
   */
  {
    minSalary: 2_196_000,
    maxSalary: 2_199_999,
    method: "fixed-income",
    fixedIncomeAmount: 1_456_000,
  },

  /**
   * 220万円以上360万円未満
   */
  {
    minSalary: 2_200_000,
    maxSalary: 3_599_999,
    method: "quarter-round-2.8",
    incomeRate: 2.8,
    incomeSubtraction: 80_000,
  },

  /**
   * 360万円以上660万円未満
   */
  {
    minSalary: 3_600_000,
    maxSalary: 6_599_999,
    method: "quarter-round-3.2",
    incomeRate: 3.2,
    incomeSubtraction: 440_000,
  },

  /**
   * 660万円以上850万円未満
   */
  {
    minSalary: 6_600_000,
    maxSalary: 8_499_999,
    method: "rate",
    incomeRate: 0.9,
    incomeSubtraction: 1_100_000,
  },

  /**
   * 850万円以上
   */
  {
    minSalary: 8_500_000,
    maxSalary: null,
    method: "maximum-deduction",
    fixedDeduction: 1_950_000,
  },
];


/**
 * 2026年分の所得税基礎控除。
 *
 * 合計所得金額に応じて控除額が変化する。
 */
export const basicDeductionBrackets2026: BasicDeductionBracket[] = [
  {
    minIncome: 0,
    maxIncome: 1_320_000,
    deduction: 1_040_000,
  },
  {
    minIncome: 1_320_001,
    maxIncome: 3_360_000,
    deduction: 880_000,
  },
  {
    minIncome: 3_360_001,
    maxIncome: 4_890_000,
    deduction: 680_000,
  },
  {
    minIncome: 4_890_001,
    maxIncome: 6_550_000,
    deduction: 670_000,
  },
  {
    minIncome: 6_550_001,
    maxIncome: 23_500_000,
    deduction: 620_000,
  },
  {
    minIncome: 23_500_001,
    maxIncome: 24_000_000,
    deduction: 480_000,
  },
  {
    minIncome: 24_000_001,
    maxIncome: 24_500_000,
    deduction: 320_000,
  },
  {
    minIncome: 24_500_001,
    maxIncome: 25_000_000,
    deduction: 160_000,
  },
  {
    minIncome: 25_000_001,
    maxIncome: null,
    deduction: 0,
  },
];

/**
 * 所得税の速算表。
 *
 * 課税所得は1,000円未満を切り捨ててから適用する。
 */
export const incomeTaxBrackets2026: IncomeTaxBracket[] = [
  {
    min: 0,
    max: 1_949_000,
    rate: 0.05,
    deduction: 0,
  },
  {
    min: 1_950_000,
    max: 3_299_000,
    rate: 0.1,
    deduction: 97_500,
  },
  {
    min: 3_300_000,
    max: 6_949_000,
    rate: 0.2,
    deduction: 427_500,
  },
  {
    min: 6_950_000,
    max: 8_999_000,
    rate: 0.23,
    deduction: 636_000,
  },
  {
    min: 9_000_000,
    max: 17_999_000,
    rate: 0.33,
    deduction: 1_536_000,
  },
  {
    min: 18_000_000,
    max: 39_999_000,
    rate: 0.4,
    deduction: 2_796_000,
  },
  {
    min: 40_000_000,
    max: null,
    rate: 0.45,
    deduction: 4_796_000,
  },
];

/**
 * 所得税の扶養控除額。
 *
 * 年齢はその年の12月31日時点で判定する。
 */
export const dependentDeductions2026: DependentDeductionRules = {
  under16: 0,
  general: 380_000,
  specified: 630_000,
  adult: 380_000,
  elderlyOther: 480_000,
  elderlyLivingTogether: 580_000,
};

/**
 * 所得税の障害者控除額。
 */
export const disabilityDeductions2026: DisabilityDeductionRules = {
  general: 270_000,
  special: 400_000,
  specialLivingTogether: 750_000,
};

/**
 * 2026年分の税制ルール。
 */
export const taxRules2026: TaxRules2026 = {
  taxYear: 2026,

  salaryIncomeBrackets: salaryIncomeBrackets2026,
  basicDeductionBrackets: basicDeductionBrackets2026,
  incomeTaxBrackets: incomeTaxBrackets2026,

  dependentDeductions: dependentDeductions2026,
  disabilityDeductions: disabilityDeductions2026,

  reconstructionIncomeTaxRate: 0.021,

  residentTaxIncomeRate: 0.1,

  donation: {
    minimumSelfPayment: 2_000,
    residentTaxBasicRate: 0.1,
    residentTaxSpecialLimitRate: 0.2,
  },
};
