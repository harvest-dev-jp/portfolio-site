import { navItems } from "@/lib/bakery-cafe-harvest/data";

export default function BakeryFooter() {
  return (
    <footer className="bg-[#243A30] px-4 py-10 text-[#FFF8EB] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-serif text-2xl font-bold">Bakery & Cafe Harvest</h2>
          <p className="mt-3 text-sm leading-7 text-[#EBDDC9]">
            栃木県那須郡那須町大字高久乙1234-5
            <br />
            8:00〜17:00 / 水曜定休
          </p>
          <p className="mt-4 text-xs leading-6 text-[#D8C8B0]">
            本サイトはポートフォリオ用に制作した架空店舗サイトです。
          </p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-4 text-sm">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#F4D6A2]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {["IG", "X", "YT"].map((label) => (
              <a key={label} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold transition hover:bg-white/10">
                {label}
              </a>
            ))}
          </div>
          <p className="text-xs text-[#D8C8B0]">© 2026 Bakery & Cafe Harvest. Demo site.</p>
        </div>
      </div>
    </footer>
  );
}
