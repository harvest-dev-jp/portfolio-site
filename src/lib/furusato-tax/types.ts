// src/lib/furusato-tax/types.ts

/**
 * 対象年度
 *
 * v1.0では2026年分のみを対象とする。
 */
export type TaxYear = 2026;

/**
 * 入力モード
 *
 * simple   : かんたん入力
 * detailed : 源泉徴収票を使った詳細入力
 */
export type InputMode = "simple" | "detailed";

/**
 * ふるさと納税の申告方法
 *
 * one-stop  : ワンストップ特例
 * tax-return: 確定申告
 */
export type FilingMethod = "one-stop" | "tax-return";

/**
 * 安全寄附額の計算に使用する割合
 */
export type SafetyRate = 0.9 | 0.95 | 1;

/**
 * 扶養親族との続柄
 */
export type Relationship = "child" | "parent" | "other";

/**
 * 障害者控除の区分
 */
export type DisabilityCategory = "none" | "general" | "special";

/**
 * 診断結果の区分
 */
export type DiagnosisLevel = "safe" | "caution" | "over";

/**
 * 比較試算のシナリオ
 */
export type ComparisonScenario =
  | "basic"
  | "with-ideco"
  | "with-housing-credit"
  | "with-all";

/**
 * 扶養親族
 */
export interface Dependent {
  /**
   * Reactの一覧表示で使用する一意のID
   */
  id: string;

  /**
   * 続柄
   */
  relationship: Relationship;

  /**
   * その年の12月31日時点の年齢
   */
  age: number;

  /**
   * 同居しているか
   */
  livesTogether: boolean;

  /**
   * 障害者控除の区分
   */
  disabilityCategory: DisabilityCategory;
}

/**
 * かんたん入力
 */
export interface SimpleInput {
  taxYear: TaxYear;

  // 基本情報
  salaryIncome: number;
  taxpayerAge: number;

  hasSpouse: boolean;
  spouseSalaryIncome: number;

  dependents: Dependent[];

  // 所得控除
  socialInsurancePremium: number;
  idecoContribution: number;
  lifeInsuranceDeduction: number;
  earthquakeInsuranceDeduction: number;
  medicalExpenseDeduction: number;
  otherIncomeDeduction: number;

  // 税額控除
  housingLoanTaxCredit: number;
  otherTaxCredit: number;

  // 寄附条件
  plannedDonation: number;
  filingMethod: FilingMethod;
  safetyRate: SafetyRate;
}

/**
 * 詳細入力
 *
 * 主に源泉徴収票に記載されている金額を入力する。
 */
export interface DetailedInput {
  taxYear: TaxYear;

  // 源泉徴収票の主要項目
  paymentAmount: number;
  salaryIncomeAfterDeduction: number;
  totalIncomeDeduction: number;
  withholdingTaxAmount: number;

  /**
   * 源泉徴収票の「社会保険料等の金額」
   *
   * iDeCoなどの小規模企業共済等掛金が
   * 含まれている場合がある。
   */
  socialInsuranceAndSmallBusinessPremium: number;

  /**
   * 上記金額に含まれるiDeCo等の年間掛金額
   *
   * 比較計算と二重控除の防止に使用する。
   */
  includedIdecoContribution: number;

  // 所得控除の内訳
  lifeInsuranceDeduction: number;
  earthquakeInsuranceDeduction: number;
  spouseDeduction: number;
  basicDeduction: number;
  incomeAdjustmentDeduction: number;

  // 税額控除
  housingLoanTaxCredit: number;

  // 年末調整後に追加する控除
  additionalMedicalExpenseDeduction: number;
  additionalIncomeDeduction: number;
  additionalTaxCredit: number;

  // 寄附条件
  plannedDonation: number;
  filingMethod: FilingMethod;
  safetyRate: SafetyRate;
}

/**
 * シミュレーター全体の入力状態
 *
 * 入力モードを切り替えても、
 * かんたん入力と詳細入力の値を保持する。
 */
export interface SimulatorFormState {
  mode: InputMode;
  simple: SimpleInput;
  detailed: DetailedInput;
}

/**
 * かんたん入力と詳細入力を、
 * 共通の計算形式に変換したデータ。
 */
export interface NormalizedTaxInput {
  taxYear: TaxYear;
  sourceMode: InputMode;

  // 所得
  grossSalaryIncome: number;
  salaryIncomeAmount: number;

  // 所得控除
  basicDeduction: number;
  socialInsuranceDeduction: number;
  idecoDeduction: number;
  spouseDeduction: number;
  dependentDeduction: number;
  disabilityDeduction: number;
  lifeInsuranceDeduction: number;
  earthquakeInsuranceDeduction: number;
  medicalExpenseDeduction: number;
  otherIncomeDeduction: number;

  // 税額控除
  housingLoanTaxCredit: number;
  otherTaxCredit: number;

  // 寄附条件
  plannedDonation: number;
  filingMethod: FilingMethod;
  safetyRate: SafetyRate;
}

/**
 * 所得控除の内訳
 */
export interface IncomeDeductionBreakdown {
  basic: number;
  socialInsurance: number;
  ideco: number;
  spouse: number;
  dependent: number;
  disability: number;
  lifeInsurance: number;
  earthquakeInsurance: number;
  medicalExpense: number;
  other: number;
  total: number;
}

/**
 * 所得税の計算結果
 */
export interface IncomeTaxResult {
  taxableIncome: number;
  taxRate: number;

  /**
   * 所得税の速算表で税率とともに使用する控除額
   */
  bracketDeductionAmount: number;

  taxBeforeCredits: number;
  housingLoanTaxCreditApplied: number;
  otherTaxCreditApplied: number;
  taxAfterCredits: number;
}

/**
 * 住民税の計算結果
 */
export interface ResidentTaxResult {
  taxableIncome: number;
  incomeRate: number;

  incomeBasedTaxBeforeCredits: number;
  adjustmentDeduction: number;
  otherTaxCredits: number;
  incomeBasedTaxAfterCredits: number;
}

/**
 * ふるさと納税による控除額の内訳
 */
export interface DonationDeductionBreakdown {
  incomeTaxDeduction: number;
  residentTaxBasicDeduction: number;
  residentTaxSpecialDeduction: number;
  totalDeduction: number;
}

/**
 * ふるさと納税の試算結果
 */
export interface DonationResult {
  estimatedDonationLimit: number;
  safeDonationAmount: number;

  plannedDonation: number;
  remainingAmount: number;
  excessAmount: number;

  estimatedSelfPayment: number;

  deductionBreakdown: DonationDeductionBreakdown;
}

/**
 * 比較試算の1項目
 */
export interface ComparisonItem {
  scenario: ComparisonScenario;
  label: string;
  donationLimit: number;
  differenceFromBasic: number;
}

/**
 * 比較試算の結果
 */
export interface ComparisonResult {
  items: ComparisonItem[];
}

/**
 * 診断コメント
 */
export interface DiagnosisResult {
  level: DiagnosisLevel;
  title: string;
  message: string;
}

/**
 * シミュレーション全体の計算結果
 */
export interface SimulationResult {
  incomeDeductions: IncomeDeductionBreakdown;
  incomeTax: IncomeTaxResult;
  residentTax: ResidentTaxResult;
  donation: DonationResult;
  comparison: ComparisonResult;
  diagnosis: DiagnosisResult;
}

