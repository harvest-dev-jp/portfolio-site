import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Harvest - Personal Developer Portfolio",
  description:
    "A personal developer portfolio showcasing projects and expertise in web development and AI implementation.",
  keywords: ["portfolio", "developer", "web development", "AI"],
  openGraph: {
    title: "Harvest - Personal Developer Portfolio",
    description:
      "A personal developer portfolio showcasing projects and expertise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-harvest-900">
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
