import {
  createDefaultTravelPlan,
} from "./defaultValues";

import type { TravelPlan } from "./types";

const STORAGE_KEY = "harvest-travel-simulator-plan-v1";

function normalizeTravelPlan(plan: TravelPlan): TravelPlan {
  const departureDate = plan.basicInfo.departureDate;

  return {
    ...plan,
    vlogTitle: plan.vlogTitle ?? "",
    schedules: plan.schedules.map((schedule, index) => ({
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
    expenses: plan.expenses.map((expense, index) => ({
      ...expense,
      paymentDate:
        index === 0 && !expense.paymentDate
          ? departureDate
          : expense.paymentDate,
      amount: Number.isFinite(expense.amount)
        ? Math.max(0, expense.amount)
        : 0,
    })),
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
      ...plan,
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
