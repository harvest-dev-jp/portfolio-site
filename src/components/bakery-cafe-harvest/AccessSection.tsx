import ScrollReveal from "./ScrollReveal";

const shopInfo = [
  ["住所", "〒325-0301 栃木県那須郡那須町大字高久乙1234-5"],
  ["営業時間", "8:00〜17:00"],
  ["ランチ", "11:00〜14:30"],
  ["定休日", "水曜日"],
  ["駐車場", "普通車20台"],
  ["電話番号", "0287-00-0000"],
];

export default function AccessSection() {
  return (
    <section id="access" className="bg-[#F7F3EA] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            Access
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#355746] sm:text-5xl">
            店舗情報
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ScrollReveal>
            <div className="rounded-3xl border border-[#E3D8C8] bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-[#355746]">
                Bakery & Cafe Harvest
              </h3>
              <dl className="mt-6 space-y-4">
                {shopInfo.map(([label, value]) => (
                  <div key={label} className="grid gap-1 border-b border-[#EFE6D8] pb-4 sm:grid-cols-[90px_1fr]">
                    <dt className="text-sm font-bold text-[#6B4E3D]">{label}</dt>
                    <dd className="text-sm leading-7 text-[#333]">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 rounded-xl bg-[#F7F3EA] p-4 text-xs leading-6 text-[#6B4E3D]">
                本サイトはポートフォリオ用に制作した架空店舗のWebサイトです。
                住所・電話番号は実在の店舗情報ではありません。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-[#E3D8C8] bg-[#DDE8D3] p-6">
              <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#ffffff55_1px,transparent_1px),linear-gradient(90deg,#ffffff55_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative z-10 flex h-full min-h-[310px] flex-col justify-between rounded-2xl bg-white/75 p-6 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-bold text-[#C98A45]">Google Maps風プレースホルダー</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#355746]">那須高原の森エリア</h3>
                </div>
                <div className="rounded-2xl bg-[#355746] p-4 text-sm leading-7 text-white">
                  東北自動車道 那須ICより車で約20分。
                  観光途中のランチやカフェ休憩に立ち寄りやすい架空ロケーションです。
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
