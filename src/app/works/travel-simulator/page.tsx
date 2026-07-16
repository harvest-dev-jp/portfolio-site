import type { Metadata } from "next";

import TravelSimulator from "@/components/travel-simulator/TravelSimulator";

export const metadata: Metadata = {
  title: "トラベル・プランナー＋ | Harvest",
  description:
    "旅行日程、費用、VLOG撮影計画をまとめて管理し、CSVやテキストで出力できるWebアプリです。",
};

export default function TravelSimulatorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <TravelSimulator />
    </main>
  );
}
