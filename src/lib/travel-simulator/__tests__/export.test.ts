import { describe, expect, it } from "vitest";

import { createTravelPlanText } from "../export";
import type {
  ExpenseItem,
  ScheduleItem,
  TravelPlan,
} from "../types";

function createPlan(
  schedules: ScheduleItem[],
  expenses: ExpenseItem[],
): TravelPlan {
  return {
    basicInfo: {
      title: "富士山周辺旅行",
      departureDate: "2026-08-12",
      nights: 1,
      destination: "富士山周辺",
      memo: "",
      useVlog: false,
    },
    schedules,
    expenses,
    vlogTitle: "",
    vlogItems: [],
    updatedAt: "",
  };
}

function schedule(
  id: string,
  date: string,
  startTime: string,
  endTime: string,
  place: string,
  activity: string,
  durationMinutes: number,
): ScheduleItem {
  return {
    id,
    date,
    startTime,
    endTime,
    place,
    activity,
    durationMinutes,
    memo: "",
  };
}

function expense(
  id: string,
  paymentDate: string,
  name: string,
  amount: number,
  category: ExpenseItem["category"] = "transport",
): ExpenseItem {
  return {
    id,
    paymentDate,
    name,
    amount,
    category,
    scheduleId: "",
    memo: "",
  };
}

function getSection(text: string, heading: string, nextHeading: string) {
  return text.slice(
    text.indexOf(heading),
    text.indexOf(nextHeading),
  ).trimEnd();
}

describe("createTravelPlanText", () => {
  it("詳細日程を日付順・開始時刻順でグループ化する", () => {
    const plan = createPlan(
      [
        schedule("3", "2026-08-13", "10:30", "11:00", "富士本宮浅間大社", "参拝", 30),
        schedule("2", "2026-08-12", "10:30", "11:00", "富士山ワイナリー", "見学", 30),
        schedule("1", "2026-08-12", "09:00", "10:00", "精進湖", "撮影", 60),
        schedule("5", "2026-08-12", "11:30", "12:30", "田貫湖", "散策", 60),
        schedule("6", "2026-08-12", "13:00", "13:00", "休暇村富士", "宿泊費", 0),
        schedule("4", "2026-08-13", "11:30", "12:00", "JAふじ伊豆う宮〜な", "お土産、焼きそば", 30),
      ],
      [],
    );

    expect(
      getSection(createTravelPlanText(plan), "【詳細日程】", "【費用】"),
    ).toBe(`【詳細日程】
2026-08-12
09:00-10:00 精進湖：撮影（60分）
10:30-11:00 富士山ワイナリー：見学（30分）
11:30-12:30 田貫湖：散策（60分）
13:00-13:00 休暇村富士：宿泊費（0分）
2026-08-13
10:30-11:00 富士本宮浅間大社：参拝（30分）
11:30-12:00 JAふじ伊豆う宮〜な：お土産、焼きそば（30分）`);
  });

  it("同じ日付・開始時刻の予定は登録順を維持する", () => {
    const plan = createPlan(
      [
        schedule("1", "2026-08-12", "09:00", "10:00", "精進湖", "撮影", 60),
        schedule("2", "2026-08-12", "09:00", "09:30", "展望台", "休憩", 30),
      ],
      [],
    );

    expect(createTravelPlanText(plan)).toContain(
      "09:00-10:00 精進湖：撮影（60分）\n09:00-09:30 展望台：休憩（30分）",
    );
  });

  it("費用を日付順にまとめ、同一日付内の登録順を維持する", () => {
    const plan = createPlan(
      [],
      [
        expense("5", "2026-08-13", "ランチ2", 5_000),
        expense("1", "2026-08-12", "宿泊費", 43_900, "lodging"),
        expense("2", "2026-08-12", "高速代", 10_000),
        expense("3", "2026-08-12", "ランチ1", 4_000, "food"),
        expense("4", "2026-08-12", "飲み物代", 5_000, "food"),
        expense("6", "2026-08-13", "お土産", 5_000),
      ],
    );

    expect(
      getSection(createTravelPlanText(plan), "【費用】", "【VLOG撮影メモ】"),
    ).toBe(`【費用】
2026-08-12
宿泊費：43,900円（宿泊費）
高速代：10,000円（交通費）
ランチ1：4,000円（食費）
飲み物代：5,000円（食費）
2026-08-13
ランチ2：5,000円（交通費）
お土産：5,000円（交通費）`);
  });

  it("1件だけでも日付見出しを表示する", () => {
    const plan = createPlan(
      [],
      [expense("1", "2026-08-12", "宿泊費", 43_900, "lodging")],
    );

    expect(createTravelPlanText(plan)).toContain(
      "【費用】\n2026-08-12\n宿泊費：43,900円（宿泊費）",
    );
  });

  it("日付未入力データを設定済み日付の後にまとめる", () => {
    const plan = createPlan(
      [schedule("1", "", "", "", "", "", 0)],
      [
        expense("1", "", "未入力日", 100),
        expense("2", "2026-08-12", "入力済み日", 200),
      ],
    );
    const text = createTravelPlanText(plan);

    expect(text).toContain(
      "【詳細日程】\n日付未設定\n--:-----:-- 場所未設定：予定未入力（0分）",
    );
    expect(text).toContain(
      "2026-08-12\n入力済み日：200円（交通費）\n支払日未設定\n未入力日：100円（交通費）",
    );
  });

  it("日程と費用が空でも不正な値を出力しない", () => {
    const text = createTravelPlanText(createPlan([], []));

    expect(text).toContain("【詳細日程】\n\n【費用】");
    expect(text).not.toContain("undefined");
    expect(text).not.toContain("null");
    expect(text).not.toContain("[object Object]");
  });
});
