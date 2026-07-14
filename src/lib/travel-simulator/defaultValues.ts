import type {
  ExpenseItem,
  ScheduleItem,
  TravelPlan,
  VlogItem,
} from "./types";

export function createId(prefix: string) {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export function createDefaultScheduleItem(
  initialDate = "",
  id = createId("schedule"),
): ScheduleItem {
  return {
    id,
    date: initialDate,
    startTime: "",
    endTime: "",
    place: "",
    activity: "",
    durationMinutes: 0,
    memo: "",
  };
}

export function createDefaultExpenseItem(
  initialPaymentDate = "",
  id = createId("expense"),
): ExpenseItem {
  return {
    id,
    name: "",
    amount: 0,
    category: "transport",
    paymentDate: initialPaymentDate,
    scheduleId: "",
    memo: "",
  };
}

export function createDefaultVlogItem(
  id = createId("vlog"),
): VlogItem {
  return {
    id,
    titleIdea: "",
    scene: "オープニング",
    subtitleIdea: "",
    shootingPoint: "",
    mediaType: "video",
    orientation: "landscape",
    memo: "",
    isCaptured: false,
  };
}

export function createDefaultTravelPlan(): TravelPlan {
  return {
    basicInfo: {
      title: "那須高原 1泊2日旅",
      departureDate: "",
      nights: 1,
      destination: "那須高原",
      memo: "",
      useVlog: false,
    },
    schedules: [
      createDefaultScheduleItem(
        "",
        "schedule-initial",
      ),
    ],
    expenses: [
      createDefaultExpenseItem(
        "",
        "expense-initial",
      ),
    ],
    vlogTitle: "",
    vlogItems: [createDefaultVlogItem("vlog-initial")],
    updatedAt: "",
  };
}
