// src/lib/furusato-tax/simulateFurusatoTax.ts

import type {
  ComparisonItem,
  ComparisonResult,
  DetailedInput,
  DiagnosisResult,
  DonationResult,
  NormalizedTaxInput,
  SimpleInput,
  SimulationResult,
} from "./types";

import { normalizeSimpleInput } from "./normalizeSimpleInput";
import { normalizeDetailedInput } from "./normalizeDetailedInput";
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
 * NormalizedTaxInputから主要な試算結果を計算する。
 */
function calculateCoreResult(
  normalizedInput: NormalizedTaxInput,
) {
  const incomeDeductions =
    calculateIncomeDeductions(
      normalizedInput,
    );

  const incomeTax =
    calculateIncomeTax(
      normalizedInput,
      incomeDeductions,
    );

  const residentTax =
  calculateResidentTax(
    normalizedInput,
    incomeDeductions,
    incomeTax,
  );

  const donation =
    calculateDonationLimit(
      normalizedInput,
      incomeTax,
      residentTax,
    );

  return {
    incomeDeductions,
    incomeTax,
    residentTax,
    donation,
  };
}

/**
 * 比較試算で寄附上限額だけを計算する。
 */
function calculateDonationForNormalizedInput(
  normalizedInput: NormalizedTaxInput,
): DonationResult {
  return calculateCoreResult(
    normalizedInput,
  ).donation;
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
  const normalizedDonationLimit =
    normalizeNonNegativeInteger(
      donationLimit,
    );

  const normalizedBasicDonationLimit =
    normalizeNonNegativeInteger(
      basicDonationLimit,
    );

  return {
    scenario,
    label,
    donationLimit:
      normalizedDonationLimit,

    /**
     * 差額はマイナスになる場合があるため、
     * 0以上への補正は行わない。
     */
    differenceFromBasic:
      normalizedDonationLimit -
      normalizedBasicDonationLimit,
  };
}

/**
 * iDeCo・住宅ローン控除の有無による比較結果を作成する。
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
        `安全寄附額の目安は` +
        `${safeDonationAmount.toLocaleString(
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
        "概算上限額以内ですが、安全率を考慮した目安を超えています。" +
        "収入や控除額の変動に注意してください。",
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
 * 正規化済み入力からシミュレーション全体を実行する。
 *
 * かんたん入力と詳細入力で共通利用する。
 */
function simulateNormalizedInput(
  normalizedInput: NormalizedTaxInput,
): SimulationResult {
  const {
    incomeDeductions,
    incomeTax,
    residentTax,
    donation,
  } = calculateCoreResult(
    normalizedInput,
  );

  const comparison =
    calculateComparison(
      normalizedInput,
    );

  const diagnosis =
    createDiagnosis(
      donation,
    );

  return {
    incomeDeductions,
    incomeTax,
    residentTax,
    donation,
    comparison,
    diagnosis,
  };
}

/**
 * かんたん入力によるシミュレーションを実行する。
 *
 * 既存コードとの互換性を保つため、
 * 関数名はそのまま維持する。
 */
export function simulateFurusatoTax(
  input: SimpleInput,
): SimulationResult {
  const normalizedInput =
    normalizeSimpleInput(
      input,
    );

  return simulateNormalizedInput(
    normalizedInput,
  );
}

/**
 * 詳細入力によるシミュレーションを実行する。
 */
export function simulateDetailedFurusatoTax(
  input: DetailedInput,
): SimulationResult {
  const normalizedInput =
    normalizeDetailedInput(
      input,
    );

  return simulateNormalizedInput(
    normalizedInput,
  );
}
