import {
  expenseCategoryLabels,
  type TravelPlanSaveFile,
  type TravelPlan,
} from "./types";

import {
  calculateExpenseSummary,
  calculateTripDays,
  formatYen,
} from "./calculations";

import { normalizeTravelPlan } from "./storage";

function escapeCsv(value: string | number | boolean) {
  const text = String(value);

  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function toCsvRow(values: Array<string | number | boolean>) {
  return values.map(escapeCsv).join(",");
}

function sanitizeFilename(value: string) {
  return value
    .trim()
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_");
}

type DateGroup<T> = {
  date: string;
  items: T[];
};

function groupItemsByDate<T>(
  items: readonly T[],
  getDate: (item: T) => string,
): DateGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const date = getDate(item);
    const groupedItems = groups.get(date);

    if (groupedItems) {
      groupedItems.push(item);
    } else {
      groups.set(date, [item]);
    }
  }

  return Array.from(groups, ([date, groupedItems]) => ({
    date,
    items: groupedItems,
  }));
}

export function createTravelPlanJson(plan: TravelPlan) {
  const saveFile: TravelPlanSaveFile = {
    format: "TravelSimulator",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    travelPlan: normalizeTravelPlan(plan),
  };

  return JSON.stringify(saveFile, null, 2);
}

export function createTravelPlanJsonFilename(plan: TravelPlan) {
  const title = sanitizeFilename(plan.basicInfo.title) || "TravelPlan";
  const departureDate =
    sanitizeFilename(plan.basicInfo.departureDate) || "date-unset";

  return `${title}_${departureDate}.json`;
}

export function parseTravelPlanJson(content: string) {
  const parsedValue = JSON.parse(content) as Partial<TravelPlanSaveFile>;

  if (
    parsedValue.format !== "TravelSimulator" ||
    parsedValue.version !== "1.0" ||
    !parsedValue.travelPlan ||
    typeof parsedValue.travelPlan !== "object"
  ) {
    throw new Error("INVALID_TRAVEL_SIMULATOR_FILE");
  }

  return normalizeTravelPlan(parsedValue.travelPlan);
}

export function createTravelPlanCsv(plan: TravelPlan) {
  const rows = [
    toCsvRow(["区分", "項目1", "項目2", "項目3", "項目4", "メモ"]),
    toCsvRow([
      "基本情報",
      plan.basicInfo.title,
      plan.basicInfo.departureDate,
      `${plan.basicInfo.nights}泊${calculateTripDays(
        plan.basicInfo,
      )}日`,
      plan.basicInfo.destination,
      plan.basicInfo.memo,
    ]),
    ...plan.schedules.map((item) =>
      toCsvRow([
        "日程",
        item.date,
        `${item.startTime}-${item.endTime}`,
        item.place,
        item.activity,
        item.memo,
      ]),
    ),
    ...plan.expenses.map((item) =>
      toCsvRow([
        "費用",
        item.name,
        item.amount,
        expenseCategoryLabels[item.category],
        item.paymentDate,
        item.memo,
      ]),
    ),
    ...plan.vlogItems.map((item) =>
      toCsvRow([
        "VLOG",
        plan.vlogTitle,
        item.titleIdea,
        item.isCaptured ? "撮影済み" : "未撮影",
        "",
        item.memo,
      ]),
    ),
  ];

  return rows.join("\n");
}

export function createTravelPlanText(plan: TravelPlan) {
  const expenseSummary = calculateExpenseSummary(plan.expenses);
  const tripDays = calculateTripDays(plan.basicInfo);
  const sortedSchedules = plan.schedules
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (!a.item.date || !b.item.date) {
        if (a.item.date !== b.item.date) {
          return a.item.date ? -1 : 1;
        }
      }

      return (
        a.item.date.localeCompare(b.item.date) ||
        a.item.startTime.localeCompare(b.item.startTime) ||
        a.index - b.index
      );
    })
    .map(({ item }) => item);
  const sortedExpenses = plan.expenses
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (!a.item.paymentDate || !b.item.paymentDate) {
        if (a.item.paymentDate !== b.item.paymentDate) {
          return a.item.paymentDate ? -1 : 1;
        }
      }

      return (
        a.item.paymentDate.localeCompare(b.item.paymentDate) ||
        a.index - b.index
      );
    })
    .map(({ item }) => item);
  const scheduleLines = groupItemsByDate(
    sortedSchedules,
    (item) => item.date,
  ).flatMap(({ date, items }) => [
    date || "日付未設定",
    ...items.map(
      (item) =>
        `${item.startTime || "--:--"}-${item.endTime || "--:--"} ${
          item.place || "場所未設定"
        }：${item.activity || "予定未入力"}（${item.durationMinutes}分）`,
    ),
  ]);
  const expenseLines = groupItemsByDate(
    sortedExpenses,
    (item) => item.paymentDate,
  ).flatMap(({ date, items }) => [
    date || "支払日未設定",
    ...items.map(
      (item) =>
        `${item.name || "未入力"}：${formatYen(
          item.amount,
        )}（${expenseCategoryLabels[item.category]}）`,
    ),
  ]);

  const lines = [
    `旅行タイトル：${plan.basicInfo.title || "未設定"}`,
    `出発日：${plan.basicInfo.departureDate || "未設定"}`,
    `宿泊数：${plan.basicInfo.nights}泊`,
    `旅行日数：${tripDays}日間`,
    `主な行き先：${plan.basicInfo.destination || "未設定"}`,
    `費用合計：${formatYen(expenseSummary.total)}`,
    plan.basicInfo.memo ? `メモ：${plan.basicInfo.memo}` : null,
    "",
    "【詳細日程】",
    ...scheduleLines,
    "",
    "【費用】",
    ...expenseLines,
    "",
    "【VLOG撮影メモ】",
    `VLOGタイトル：${plan.vlogTitle || "未設定"}`,
    ...plan.vlogItems.map(
      (item) =>
        `${item.isCaptured ? "撮影済み" : "未撮影"} ${
          item.titleIdea || "シーン名未入力"
        }${item.memo ? `：${item.memo}` : ""}`,
    ),
  ];

  return lines
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function downloadTextFile(
  filename: string,
  content: string,
  mimeType: string,
) {
  const blob = new Blob([content], {
    type: `${mimeType};charset=utf-8`,
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
