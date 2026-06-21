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

/**
 * 扶養控除の年齢区分。
 */
export type DependentAgeCategory =
  | "under16"
  | "general"
  | "specified"
  | "adult"
  | "elderly-other"
  | "elderly-living-together";

/**
 * 扶養親族1人分の控除計算結果。
 */
export interface DependentDeductionItem {
  id: string;
  age: number;
  ageCategory: DependentAgeCategory;

  dependentDeduction: number;
  disabilityDeduction: number;
  totalDeduction: number;
}

/**
 * 扶養親族全体の控除計算結果。
 */
export interface DependentDeductionsResult {
  items: DependentDeductionItem[];

  dependentDeductionTotal: number;
  disabilityDeductionTotal: number;
  totalDeduction: number;
}

/**
 * 年齢を0〜120歳の整数に補正する。
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
 * 扶養親族の年齢区分を判定する。
 *
 * 70歳以上の同居老親等は、
 * 続柄が「父母」で同居している場合に限る。
 */
function getDependentAgeCategory(
  dependent: Dependent,
): DependentAgeCategory {
  const age = normalizeAge(dependent.age);

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
 * 年齢区分から扶養控除額を取得する。
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

    default: {
      const exhaustiveCheck: never = category;

      throw new Error(
        `未対応の扶養親族年齢区分です: ${exhaustiveCheck}`,
      );
    }
  }
}

/**
 * 障害者区分から障害者控除額を取得する。
 *
 * 特別障害者かつ同居の場合は、
 * 同居特別障害者控除を適用する。
 */
function getDisabilityDeduction(
  category: DisabilityCategory,
  livesTogether: boolean,
  rules: DisabilityDeductionRules,
): number {
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

  const ageCategory =
    getDependentAgeCategory({
      ...dependent,
      age,
    });

  const dependentDeduction =
    getDependentDeduction(
      ageCategory,
      taxRules2026.dependentDeductions,
    );

  const disabilityDeduction =
    getDisabilityDeduction(
      dependent.disabilityCategory,
      dependent.livesTogether,
      taxRules2026.disabilityDeductions,
    );

  return {
    id: dependent.id,
    age,
    ageCategory,
    dependentDeduction,
    disabilityDeduction,
    totalDeduction:
      dependentDeduction + disabilityDeduction,
  };
}

/**
 * 扶養親族全員の扶養控除・障害者控除を計算する。
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

  const disabilityDeductionTotal =
    items.reduce(
      (total, item) =>
        total + item.disabilityDeduction,
      0,
    );

  return {
    items,
    dependentDeductionTotal,
    disabilityDeductionTotal,
    totalDeduction:
      dependentDeductionTotal +
      disabilityDeductionTotal,
  };
}
