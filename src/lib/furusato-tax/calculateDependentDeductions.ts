// src/lib/furusato-tax/calculateDependentDeductions.ts

import type {
  Dependent,
  DisabilityCategory,
} from "./types";

import {
  taxRules2026,
  type DependentDeductionRules,
  type DisabilityDeductionRules,
} from "./rules/2026";

import { calculateSalaryIncome } from "./calculateSalaryIncome";

/**
 * 扶養親族の控除区分。
 */
export type DependentAgeCategory =
  | "under16"
  | "general"
  | "specified"
  | "special-dependent"
  | "adult"
  | "elderly-other"
  | "elderly-living-together"
  | "not-eligible";

/**
 * 扶養親族1人分の控除計算結果。
 */
export interface DependentDeductionItem {
  id: string;
  age: number;

  salaryIncome: number;
  totalIncomeAmount: number;

  ageCategory: DependentAgeCategory;

  dependentDeduction: number;
  specialDependentDeduction: number;
  disabilityDeduction: number;
  totalDeduction: number;
}

/**
 * 扶養親族全体の控除計算結果。
 */
export interface DependentDeductionsResult {
  items: DependentDeductionItem[];

  dependentDeductionTotal: number;
  specialDependentDeductionTotal: number;
  disabilityDeductionTotal: number;
  totalDeduction: number;
}

function normalizeNonNegativeInteger(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.trunc(value));
}

/**
 * 年齢を0～120歳の整数へ補正する。
 */
function normalizeAge(age: number): number {
  if (!Number.isFinite(age)) {
    return 0;
  }

  return Math.min(
    120,
    Math.max(0, Math.trunc(age)),
  );
}

/**
 * 所得税の特定親族特別控除額。
 */
function calculateSpecialDependentDeduction(
  totalIncomeAmount: number,
): number {
  const income =
    normalizeNonNegativeInteger(
      totalIncomeAmount,
    );

  if (
    income <= 620_000 ||
    income > 1_230_000
  ) {
    return 0;
  }

  if (income <= 850_000) {
    return 630_000;
  }

  if (income <= 900_000) {
    return 610_000;
  }

  if (income <= 950_000) {
    return 510_000;
  }

  if (income <= 1_000_000) {
    return 410_000;
  }

  if (income <= 1_050_000) {
    return 310_000;
  }

  if (income <= 1_100_000) {
    return 210_000;
  }

  if (income <= 1_150_000) {
    return 110_000;
  }

  if (income <= 1_200_000) {
    return 60_000;
  }

  return 30_000;
}

/**
 * 年齢区分を判定する。
 */
function getDependentAgeCategory(
  dependent: Dependent,
  totalIncomeAmount: number,
): DependentAgeCategory {
  const age = normalizeAge(dependent.age);

  /**
   * 19～22歳で所得62万円超123万円以下なら、
   * 特定親族特別控除。
   */
  if (
    age >= 19 &&
    age < 23 &&
    totalIncomeAmount > 620_000 &&
    totalIncomeAmount <= 1_230_000
  ) {
    return "special-dependent";
  }

  /**
   * 通常の扶養控除は、
   * 合計所得62万円以下が条件。
   */
  if (totalIncomeAmount > 620_000) {
    return "not-eligible";
  }

  if (age < 16) {
    return "under16";
  }

  if (age < 19) {
    return "general";
  }

  if (age < 23) {
    return "specified";
  }

  if (age < 70) {
    return "adult";
  }

  const isLivingTogetherElderlyParent =
    dependent.relationship === "parent" &&
    dependent.livesTogether;

  return isLivingTogetherElderlyParent
    ? "elderly-living-together"
    : "elderly-other";
}

/**
 * 通常の扶養控除額を取得する。
 */
function getDependentDeduction(
  category: DependentAgeCategory,
  rules: DependentDeductionRules,
): number {
  switch (category) {
    case "under16":
      return rules.under16;

    case "general":
      return rules.general;

    case "specified":
      return rules.specified;

    case "adult":
      return rules.adult;

    case "elderly-other":
      return rules.elderlyOther;

    case "elderly-living-together":
      return rules.elderlyLivingTogether;

    case "special-dependent":
    case "not-eligible":
      return 0;

    default: {
      const exhaustiveCheck: never = category;

      throw new Error(
        `未対応の扶養親族区分です: ${exhaustiveCheck}`,
      );
    }
  }
}

/**
 * 障害者控除額を取得する。
 */
function getDisabilityDeduction(
  category: DisabilityCategory,
  livesTogether: boolean,
  isEligibleDependent: boolean,
  rules: DisabilityDeductionRules,
): number {
  if (!isEligibleDependent) {
    return 0;
  }

  switch (category) {
    case "none":
      return 0;

    case "general":
      return rules.general;

    case "special":
      return livesTogether
        ? rules.specialLivingTogether
        : rules.special;

    default: {
      const exhaustiveCheck: never = category;

      throw new Error(
        `未対応の障害者区分です: ${exhaustiveCheck}`,
      );
    }
  }
}

/**
 * 扶養親族1人分の控除額を計算する。
 */
function calculateDependentDeductionItem(
  dependent: Dependent,
): DependentDeductionItem {
  const age = normalizeAge(dependent.age);

  const salaryIncome =
    normalizeNonNegativeInteger(
      dependent.salaryIncome,
    );

  const totalIncomeAmount =
    calculateSalaryIncome(
      salaryIncome,
    ).salaryIncomeAmount;

  const ageCategory =
    getDependentAgeCategory(
      {
        ...dependent,
        age,
        salaryIncome,
      },
      totalIncomeAmount,
    );

  const dependentDeduction =
    getDependentDeduction(
      ageCategory,
      taxRules2026.dependentDeductions,
    );

  const specialDependentDeduction =
    ageCategory === "special-dependent"
      ? calculateSpecialDependentDeduction(
          totalIncomeAmount,
        )
      : 0;

  /**
   * 特定親族特別控除の対象者は、
   * 扶養親族には該当しないため、
   * 障害者控除の対象外として扱う。
   */
  const isEligibleDependent =
  totalIncomeAmount <= 620_000;

  const disabilityDeduction =
    getDisabilityDeduction(
      dependent.disabilityCategory,
      dependent.livesTogether,
      isEligibleDependent,
      taxRules2026.disabilityDeductions,
    );

  const totalDependentDeduction =
    dependentDeduction +
    specialDependentDeduction;

  return {
    id: dependent.id,
    age,
    salaryIncome,
    totalIncomeAmount,
    ageCategory,

    dependentDeduction:
      totalDependentDeduction,

    specialDependentDeduction,
    disabilityDeduction,

    totalDeduction:
      totalDependentDeduction +
      disabilityDeduction,
  };
}

/**
 * 扶養親族全員の控除を計算する。
 */
export function calculateDependentDeductions(
  dependents: Dependent[],
): DependentDeductionsResult {
  const items = dependents.map(
    calculateDependentDeductionItem,
  );

  const dependentDeductionTotal =
    items.reduce(
      (total, item) =>
        total + item.dependentDeduction,
      0,
    );

  const specialDependentDeductionTotal =
    items.reduce(
      (total, item) =>
        total +
        item.specialDependentDeduction,
      0,
    );

  const disabilityDeductionTotal =
    items.reduce(
      (total, item) =>
        total + item.disabilityDeduction,
      0,
    );

  return {
    items,
    dependentDeductionTotal,
    specialDependentDeductionTotal,
    disabilityDeductionTotal,

    totalDeduction:
      dependentDeductionTotal +
      disabilityDeductionTotal,
  };
}