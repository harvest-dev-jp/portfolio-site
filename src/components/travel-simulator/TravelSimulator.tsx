"use client";

import { useEffect, useState } from "react";

import BasicInfoForm from "./BasicInfoForm";
import ExpenseForm from "./ExpenseForm";
import ExportPanel from "./ExportPanel";
import ScheduleForm from "./ScheduleForm";
import SummaryPanel from "./SummaryPanel";
import VlogForm from "./VlogForm";

import {
  createDefaultTravelPlan,
} from "@/lib/travel-simulator/defaultValues";

import {
  loadTravelPlan,
  normalizeTravelPlan,
  saveTravelPlan,
} from "@/lib/travel-simulator/storage";

import type { TravelPlan } from "@/lib/travel-simulator/types";

export default function TravelSimulator() {
  const [plan, setPlan] = useState<TravelPlan>(
    createDefaultTravelPlan,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPlan(loadTravelPlan());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    saveTravelPlan(plan);
  }, [isLoaded, plan]);

  const updatePlan = (updates: Partial<TravelPlan>) => {
    setPlan((current) => ({
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleBasicInfoChange = (
    basicInfo: Partial<TravelPlan["basicInfo"]>,
  ) => {
    setPlan((current) => {
      const nextBasicInfo = {
        ...current.basicInfo,
        ...basicInfo,
      };

      if (
        basicInfo.departureDate === undefined ||
        basicInfo.departureDate === current.basicInfo.departureDate
      ) {
        return {
          ...current,
          basicInfo: nextBasicInfo,
          updatedAt: new Date().toISOString(),
        };
      }

      return {
        ...current,
        basicInfo: nextBasicInfo,
        schedules: current.schedules.map((schedule, index) =>
          index === 0
            ? {
                ...schedule,
                date: basicInfo.departureDate ?? "",
              }
            : schedule,
        ),
        expenses: current.expenses.map((expense, index) =>
          index === 0
            ? {
                ...expense,
                paymentDate: basicInfo.departureDate ?? "",
              }
            : expense,
        ),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleLoadPlan = (loadedPlan: TravelPlan) => {
    const nextPlan = normalizeTravelPlan(loadedPlan);

    setPlan(nextPlan);
    saveTravelPlan(nextPlan);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-700">
          Domestic Travel Planner
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          トラベル・プランナー＋
        </h1>

        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          旅行日程、費用、VLOG撮影計画をひとつの画面で整理できます。
          入力内容はブラウザに自動保存され、CSVやテキストで書き出せます。
        </p>

        <div className="mt-5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900">
          初期版は日本国内旅行・円表示に対応しています。ログインや外部データベースは使わず、この端末のブラウザ内に保存します。
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-8">
          <BasicInfoForm
            value={plan.basicInfo}
            onChange={handleBasicInfoChange}
          />

          <ScheduleForm
            value={plan.schedules}
            defaultDate={plan.basicInfo.departureDate}
            onChange={(schedules) =>
              updatePlan({ schedules })
            }
          />

          <ExpenseForm
            value={plan.expenses}
            schedules={plan.schedules}
            defaultPaymentDate={plan.basicInfo.departureDate}
            onChange={(expenses) =>
              updatePlan({ expenses })
            }
          />

          {plan.basicInfo.useVlog && (
            <VlogForm
              title={plan.vlogTitle}
              value={plan.vlogItems}
              onTitleChange={(vlogTitle) =>
                updatePlan({ vlogTitle })
              }
              onChange={(vlogItems) =>
                updatePlan({ vlogItems })
              }
            />
          )}

          <ExportPanel
            plan={plan}
            onLoadPlan={handleLoadPlan}
          />
        </div>

        <div className="lg:sticky lg:top-28">
          <SummaryPanel plan={plan} />
        </div>
      </div>
    </section>
  );
}
