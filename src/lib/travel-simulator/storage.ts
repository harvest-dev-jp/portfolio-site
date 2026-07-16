import {
  createDefaultVlogItem,
  createDefaultTravelPlan,
} from "./defaultValues";

import type { TravelPlan } from "./types";

const STORAGE_KEY = "harvest-travel-simulator-plan-v1";

export function normalizeTravelPlan(
  plan: Partial<TravelPlan>,
): TravelPlan {
  const defaultPlan = createDefaultTravelPlan();
  const basicInfo = {
    ...defaultPlan.basicInfo,
    ...plan.basicInfo,
  };
  const departureDate = basicInfo.departureDate;
  const schedules = Array.isArray(plan.schedules)
    ? plan.schedules
    : defaultPlan.schedules;
  const expenses = Array.isArray(plan.expenses)
    ? plan.expenses
    : defaultPlan.expenses;
  const vlogItems = Array.isArray(plan.vlogItems)
    ? plan.vlogItems
    : defaultPlan.vlogItems;

  return {
    ...defaultPlan,
    ...plan,
    basicInfo,
    vlogTitle: plan.vlogTitle ?? defaultPlan.vlogTitle,
    schedules: schedules.map((schedule, index) => ({
      ...schedule,
      date:
        index === 0 && !schedule.date
          ? departureDate
          : schedule.date,
      durationMinutes: Math.min(
        360,
        Math.max(0, schedule.durationMinutes),
      ),
    })),
    expenses: expenses.map((expense, index) => ({
      ...expense,
      paymentDate:
        index === 0 && !expense.paymentDate
          ? departureDate
          : expense.paymentDate,
      amount: Number.isFinite(expense.amount)
        ? Math.max(0, expense.amount)
        : 0,
    })),
    vlogItems: vlogItems.map((item) => {
      const defaultItem = createDefaultVlogItem();

      return {
        id: item.id ?? defaultItem.id,
        titleIdea: item.titleIdea ?? defaultItem.titleIdea,
        memo: item.memo ?? defaultItem.memo,
        isCaptured: item.isCaptured ?? defaultItem.isCaptured,
      };
    }),
  };
}

export function loadTravelPlan(): TravelPlan {
  if (typeof window === "undefined") {
    return createDefaultTravelPlan();
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return createDefaultTravelPlan();
  }

  try {
    return normalizeTravelPlan({
      ...createDefaultTravelPlan(),
      ...JSON.parse(storedValue),
    });
  } catch (error) {
    console.error("旅行計画の読み込みに失敗しました。", error);
    return createDefaultTravelPlan();
  }
}

export function saveTravelPlan(plan: TravelPlan) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...normalizeTravelPlan(plan),
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function clearTravelPlan() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
