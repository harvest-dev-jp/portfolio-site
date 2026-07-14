export type ExpenseCategory =
  | "transport"
  | "lodging"
  | "food"
  | "sightseeing"
  | "parking"
  | "souvenir"
  | "other";

export type MediaType = "video" | "photo";

export type Orientation = "landscape" | "portrait" | "none";

export interface TripBasicInfo {
  title: string;
  departureDate: string;
  nights: number;
  destination: string;
  memo: string;
  useVlog: boolean;
}

export interface ScheduleItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  place: string;
  activity: string;
  durationMinutes: number;
  memo: string;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  paymentDate: string;
  scheduleId: string;
  memo: string;
}

export interface VlogItem {
  id: string;
  titleIdea: string;
  scene: string;
  subtitleIdea: string;
  shootingPoint: string;
  mediaType: MediaType;
  orientation: Orientation;
  memo: string;
  isCaptured: boolean;
}

export interface TravelPlan {
  basicInfo: TripBasicInfo;
  schedules: ScheduleItem[];
  expenses: ExpenseItem[];
  vlogTitle: string;
  vlogItems: VlogItem[];
  updatedAt: string;
}

export interface TravelPlanSaveFile {
  format: "TravelSimulator";
  version: "1.0";
  exportedAt: string;
  travelPlan: TravelPlan;
}

export interface ExpenseSummary {
  total: number;
  byCategory: Record<ExpenseCategory, number>;
  byDate: Record<string, number>;
}

export const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  transport: "交通費",
  lodging: "宿泊費",
  food: "食費",
  sightseeing: "観光費",
  parking: "駐車場代",
  souvenir: "お土産",
  other: "その他",
};

export const mediaTypeLabels: Record<MediaType, string> = {
  video: "動画",
  photo: "静止画",
};

export const orientationLabels: Record<Orientation, string> = {
  landscape: "横",
  portrait: "縦",
  none: "指定なし",
};
