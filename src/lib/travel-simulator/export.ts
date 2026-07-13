import {
  expenseCategoryLabels,
  mediaTypeLabels,
  orientationLabels,
  type TravelPlan,
} from "./types";

import {
  calculateExpenseSummary,
  calculateTripDays,
  formatYen,
} from "./calculations";

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
        item.scene,
        item.shootingPoint,
        `${item.isCaptured ? "撮影済み" : "未撮影"} / ${
          mediaTypeLabels[item.mediaType]
        } / ${orientationLabels[item.orientation]} / ${item.memo}`,
      ]),
    ),
  ];

  return rows.join("\n");
}

export function createTravelPlanText(plan: TravelPlan) {
  const expenseSummary = calculateExpenseSummary(plan.expenses);
  const tripDays = calculateTripDays(plan.basicInfo);

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
    ...plan.schedules.map(
      (item) =>
        `${item.date || "日付未設定"} ${item.startTime || "--:--"}-${
          item.endTime || "--:--"
        } ${item.place || "場所未設定"}：${
          item.activity || "予定未入力"
        }（${item.durationMinutes}分）`,
    ),
    "",
    "【費用】",
    ...plan.expenses.map(
      (item) =>
        `${item.paymentDate || "支払日未設定"} ${
          item.name || "未入力"
        }：${formatYen(
          item.amount,
        )}（${expenseCategoryLabels[item.category]}）`,
    ),
    "",
    "【VLOG撮影メモ】",
    `VLOGタイトル：${plan.vlogTitle || "未設定"}`,
    ...plan.vlogItems.map(
      (item) =>
        `${item.isCaptured ? "撮影済み" : "未撮影"} ${
          item.titleIdea || item.scene
        }：${item.shootingPoint || "撮影ポイント未入力"}（${
          mediaTypeLabels[item.mediaType]
        } / ${
          orientationLabels[item.orientation]
        }）${item.memo ? ` ${item.memo}` : ""}`,
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
