import type { Metadata } from "next";

import BakeryCafeHarvest from "@/components/bakery-cafe-harvest/BakeryCafeHarvest";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Bakery & Cafe Harvest | 那須高原の架空ベーカリーカフェ",
  description:
    "那須高原の森に囲まれた架空のベーカリーカフェ「Bakery & Cafe Harvest」のポートフォリオ用Webサイトです。焼きたてパン、ランチ、テラス席、四季の魅力をご紹介します。",
  openGraph: {
    title: "Bakery & Cafe Harvest | 那須高原の架空ベーカリーカフェ",
    description:
      "焼きたてパン、ランチ、テラス席、四季の魅力を紹介するポートフォリオ用の架空店舗サイトです。",
    type: "website",
    images: [
      {
        url: "/works/bakery-cafe-harvest/thumbnail.jpg",
        width: 960,
        height: 540,
        alt: "Bakery & Cafe Harvestのサイトイメージ",
      },
    ],
  },
};

export default function BakeryCafeHarvestPage() {
  return <BakeryCafeHarvest />;
}
