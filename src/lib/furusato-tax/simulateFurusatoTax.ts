// src/lib/furusato-tax/simulateFurusatoTax.ts

import type {
  ComparisonItem,
  ComparisonResult,
  DiagnosisResult,
  DonationResult,
  NormalizedTaxInput,
  SimpleInput,
  SimulationResult,
} from "./types";

import { normalizeSimpleInput } from "./normalizeSimpleInput";
import { calculateIncomeDeductions } from "./calculateIncomeDeductions";
import { calculateIncomeTax } from "./calculateIncomeTax";
import { calculateResidentTax } from "./calculateResidentTax";
import { calculateDonationLimit } from "./calculateDonationLimit";

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
 * 指定した条件で寄附上限額を計算する。
 *
 * 比較シミュレーションで使用する内部関数。
 */
function calculateDonationForNormalizedInput(
  normalizedInput: NormalizedTaxInput,
): DonationResult {
  const incomeDeductions =
    calculateIncomeDeductions(normalizedInput);

  const incomeTax =
    calculateIncomeTax(
      normalizedInput,
      incomeDeductions,
    );

  const residentTax =
    calculateResidentTax(
      normalizedInput,
      incomeDeductions,
    );

  return calculateDonationLimit(
    normalizedInput,
    incomeTax,
    residentTax,
  );
}

/**
 * 比較結果の1項目を生成する。
 */
function createComparisonItem(
  scenario: ComparisonItem["scenario"],
  label: string,
  donationLimit: number,
  basicDonationLimit: number,
): ComparisonItem {
  return {
    scenario,
    label,
    donationLimit:
      normalizeNonNegativeInteger(
        donationLimit,
      ),
    differenceFromBasic:
      normalizeNonNegativeInteger(
        donationLimit,
      ) -
      normalizeNonNegativeInteger(
        basicDonationLimit,
      ),
  };
}

/**
 * iDeCo・住宅ローン控除の有無による比較結果を作成する。
 *
 * basic:
 *   iDeCoなし・住宅ローン控除なし
 *
 * with-ideco:
 *   iDeCoあり・住宅ローン控除なし
 *
 * with-housing-credit:
 *   iDeCoなし・住宅ローン控除あり
 *
 * with-all:
 *   iDeCoあり・住宅ローン控除あり
 */
function calculateComparison(
  normalizedInput: NormalizedTaxInput,
): ComparisonResult {
  const basicInput: NormalizedTaxInput = {
    ...normalizedInput,
    idecoDeduction: 0,
    housingLoanTaxCredit: 0,
  };

  const withIdecoInput: NormalizedTaxInput = {
    ...normalizedInput,
    housingLoanTaxCredit: 0,
  };

  const withHousingCreditInput:
    NormalizedTaxInput = {
      ...normalizedInput,
      idecoDeduction: 0,
    };

  const withAllInput: NormalizedTaxInput = {
    ...normalizedInput,
  };

  const basicDonation =
    calculateDonationForNormalizedInput(
      basicInput,
    );

  const withIdecoDonation =
    calculateDonationForNormalizedInput(
      withIdecoInput,
    );

  const withHousingCreditDonation =
    calculateDonationForNormalizedInput(
      withHousingCreditInput,
    );

  const withAllDonation =
    calculateDonationForNormalizedInput(
      withAllInput,
    );

  const basicDonationLimit =
    basicDonation.estimatedDonationLimit;

  return {
    items: [
      createComparisonItem(
        "basic",
        "基本条件",
        basicDonationLimit,
        basicDonationLimit,
      ),

      createComparisonItem(
        "with-ideco",
        "iDeCoを反映",
        withIdecoDonation.estimatedDonationLimit,
        basicDonationLimit,
      ),

      createComparisonItem(
        "with-housing-credit",
        "住宅ローン控除を反映",
        withHousingCreditDonation
          .estimatedDonationLimit,
        basicDonationLimit,
      ),

      createComparisonItem(
        "with-all",
        "iDeCo・住宅ローン控除を反映",
        withAllDonation.estimatedDonationLimit,
        basicDonationLimit,
      ),
    ],
  };
}

/**
 * 寄附予定額と上限額から診断コメントを生成する。
 */
function createDiagnosis(
  donation: DonationResult,
): DiagnosisResult {
  const plannedDonation =
    normalizeNonNegativeInteger(
      donation.plannedDonation,
    );

  const safeDonationAmount =
    normalizeNonNegativeInteger(
      donation.safeDonationAmount,
    );

  const estimatedDonationLimit =
    normalizeNonNegativeInteger(
      donation.estimatedDonationLimit,
    );

  if (plannedDonation === 0) {
    return {
      level: "safe",
      title: "寄附予定額を入力してください",
      message:
        `安全寄附額の目安は${safeDonationAmount.toLocaleString(
          "ja-JP",
        )}円です。`,
    };
  }

  if (plannedDonation <= safeDonationAmount) {
    return {
      level: "safe",
      title: "安全圏内です",
      message:
        `寄附予定額は安全寄附額の目安以内です。` +
        `あと${donation.remainingAmount.toLocaleString(
          "ja-JP",
        )}円程度の余裕があります。`,
    };
  }

  if (
    plannedDonation <=
    estimatedDonationLimit
  ) {
    return {
      level: "caution",
      title: "上限額に近づいています",
      message:
        `概算上限額以内ですが、安全率を考慮した目安を超えています。` +
        `収入や控除額の変動に注意してください。`,
    };
  }

  return {
    level: "over",
    title: "上限超過の可能性があります",
    message:
      `寄附予定額が概算上限額を` +
      `${donation.excessAmount.toLocaleString(
        "ja-JP",
      )}円超えています。`,
  };
}

/**
 * かんたん入力によるふるさと納税シミュレーションを実行する。
 */
export function simulateFurusatoTax(
  input: SimpleInput,
): SimulationResult {
  /**
   * 画面入力を共通計算形式へ変換する。
   */
  const normalizedInput =
    normalizeSimpleInput(input);

  /**
   * 所得控除の内訳と合計を計算する。
   */
  const incomeDeductions =
    calculateIncomeDeductions(
      normalizedInput,
    );

  /**
   * 所得税を計算する。
   */
  const incomeTax =
    calculateIncomeTax(
      normalizedInput,
      incomeDeductions,
    );

  /**
   * 住民税所得割額を概算する。
   */
  const residentTax =
    calculateResidentTax(
      normalizedInput,
      incomeDeductions,
    );

  /**
   * 寄附上限額と控除内訳を計算する。
   */
  const donation =
    calculateDonationLimit(
      normalizedInput,
      incomeTax,
      residentTax,
    );

  /**
   * iDeCo・住宅ローン控除の影響を比較する。
   */
  const comparison =
    calculateComparison(
      normalizedInput,
    );

  /**
   * 寄附予定額について診断する。
   */
  const diagnosis =
    createDiagnosis(donation);

  return {
    incomeDeductions,
    incomeTax,
    residentTax,
    donation,
    comparison,
    diagnosis,
  };
}
