import type {
  ExpenseCategory,
  ExpenseItem,
  ExpenseSummary,
  TripBasicInfo,
  VlogItem,
} from "./types";

import { expenseCategoryLabels } from "./types";

export function calculateTripDays(basicInfo: TripBasicInfo) {
  return Math.max(1, Number(basicInfo.nights) + 1);
}

export function calculateExpenseSummary(
  expenses: ExpenseItem[],
): ExpenseSummary {
  const byCategory = Object.keys(expenseCategoryLabels).reduce(
    (summary, category) => ({
      ...summary,
      [category]: 0,
    }),
    {} as Record<ExpenseCategory, number>,
  );

  const byDate: Record<string, number> = {};

  const total = expenses.reduce((sum, expense) => {
    const amount = Number.isFinite(expense.amount)
      ? expense.amount
      : 0;

    byCategory[expense.category] += amount;

    if (expense.paymentDate) {
      byDate[expense.paymentDate] =
        (byDate[expense.paymentDate] ?? 0) + amount;
    }

    return sum + amount;
  }, 0);

  return {
    total,
    byCategory,
    byDate,
  };
}

export function calculateCapturedVlogCount(vlogItems: VlogItem[]) {
  return vlogItems.filter((item) => item.isCaptured).length;
}

export function formatYen(amount: number) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return `${new Intl.NumberFormat("ja-JP", {
    maximumFractionDigits: 0,
  }).format(safeAmount)}円`;
}
