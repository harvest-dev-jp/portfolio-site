// src/lib/furusato-tax/types.ts

/**
 * 対象年度
 *
 * v1.0では2026年分のみを対象とする。
 */
export type TaxYear = 2026;

/**
 * 入力モード
 */
export type InputMode = "simple" | "detailed";

/**
 * ふるさと納税の申告方法
 */
export type FilingMethod = "one-stop" | "tax-return";

/**
 * 安全寄附額の計算に使用する割合
 */
export type SafetyRate = 0.9 | 0.95 | 1;

/**
 * 扶養親族との続柄
 */
export type Relationship =
  | "child"
  | "parent"
  | "other";

/**
 * 障害者控除の区分
 */
export type DisabilityCategory =
  | "none"
  | "general"
  | "special";

/**
 * 診断結果の区分
 */
export type DiagnosisLevel =
  | "safe"
  | "caution"
  | "over";

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
  id: string;
  relationship: Relationship;
  age: number;
  livesTogether: boolean;
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
 */
export interface DetailedInput {
  taxYear: TaxYear;

  // 源泉徴収票の主要項目
  paymentAmount: number;
  salaryIncomeAfterDeduction: number;
  totalIncomeDeduction: number;
  withholdingTaxAmount: number;

  // 社会保険料・iDeCo
  socialInsuranceAndSmallBusinessPremium: number;
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
 */
export interface SimulatorFormState {
  mode: InputMode;
  simple: SimpleInput;
  detailed: DetailedInput;
}

/**
 * 共通計算用入力
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
 * 所得税計算結果
 */
export interface IncomeTaxResult {
  taxableIncome: number;
  taxRate: number;
  bracketDeductionAmount: number;

  taxBeforeCredits: number;
  housingLoanTaxCreditApplied: number;
  otherTaxCreditApplied: number;
  taxAfterCredits: number;
}

/**
 * 住民税計算結果
 */
export interface ResidentTaxResult {
  taxableIncome: number;
  incomeRate: number;

  incomeBasedTaxBeforeCredits: number;

  /**
   * 所得税と住民税の人的控除差を調整する控除。
   */
  adjustmentDeduction: number;

  /**
   * 所得税から控除しきれず、
   * 住民税から控除した住宅ローン控除額。
   */
  housingLoanTaxCreditApplied: number;

  /**
   * その他の住民税税額控除。
   */
  otherTaxCredits: number;

  incomeBasedTaxAfterCredits: number;
}


/**
 * ふるさと納税控除の内訳
 */
export interface DonationDeductionBreakdown {
  incomeTaxDeduction: number;
  residentTaxBasicDeduction: number;
  residentTaxSpecialDeduction: number;
  totalDeduction: number;
}

/**
 * ふるさと納税試算結果
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
 * 比較試算結果
 */
export interface ComparisonResult {
  items: ComparisonItem[];
}

/**
 * 診断結果
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
