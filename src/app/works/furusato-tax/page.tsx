// src/app/works/furusato-tax/page.tsx

import type { Metadata } from "next";

import FurusatoTaxSimulator from "@/components/furusato-tax/FurusatoTaxSimulator";

export const metadata: Metadata = {
  title: "ふるさと納税シミュレーション＋ | Harvest",
  description:
    "年収や家族構成に加え、iDeCoや住宅ローン控除なども考慮して、自己負担額を2,000円に収められる寄附上限額の目安を試算するWebアプリです。",
};

export default function FurusatoTaxPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <FurusatoTaxSimulator />
    </main>
  );
}
