import Image from "next/image";

import ScrollReveal from "./ScrollReveal";

const features = [
  "木を基調とした落ち着いた店内",
  "森を眺めるテラス席",
  "子ども連れでも利用しやすい空間",
  "ペット同伴可能なテラス席",
  "雨天でも一部利用できる屋根付きテラス",
];

export default function CafeSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <ScrollReveal>
          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#EFE6D8] shadow-xl">
              <Image
                src="/works/bakery-cafe-harvest/cafe-interior.jpg"
                alt="木を基調とした店内と森を眺める窓辺のイメージ"
                fill
                className="object-cover object-[52%_center]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#EFE6D8] shadow-md">
              <Image
                src="/works/bakery-cafe-harvest/cafe-terrace.jpg"
                alt="森を眺める木製テラス席のイメージ"
                fill
                className="object-cover object-[45%_center]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            Cafe & Terrace
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#355746] sm:text-5xl">
            森を眺めながら、
            <br />
            それぞれの休日を。
          </h2>
          <p className="mt-6 leading-8 text-[#444]">
            大きな窓のある店内と、木陰に包まれたテラス席。
            観光の途中のランチにも、ゆっくり本を読む午後にも使いやすい空間です。
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-[#355746] sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="rounded-full bg-[#F7F3EA] px-4 py-2">
                {feature}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
