import {
  createDefaultTravelPlan,
} from "./defaultValues";

import type { TravelPlan } from "./types";

const STORAGE_KEY = "harvest-travel-simulator-plan-v1";

export function loadTravelPlan(): TravelPlan {
  if (typeof window === "undefined") {
    return createDefaultTravelPlan();
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return createDefaultTravelPlan();
  }

  try {
    return {
      ...createDefaultTravelPlan(),
      ...JSON.parse(storedValue),
    };
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
