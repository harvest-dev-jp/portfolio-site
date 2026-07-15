import { commitments } from "@/lib/bakery-cafe-harvest/data";

import ScrollReveal from "./ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#F7F3EA] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            About Harvest
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#355746] sm:text-5xl">
              那須高原の森に囲まれた、
              <br />
              架空のベーカリーカフェ。
            </h2>
            <div className="space-y-4 text-base leading-8 text-[#333333]">
              <p>
                Bakery & Cafe Harvestは、那須高原の森に囲まれた架空のベーカリーカフェです。
                毎朝店内で焼き上げるパンと、地元の野菜や食材を使ったランチをご用意しています。
              </p>
              <p>
                木の温もりを感じる店内と、季節ごとに表情を変えるテラス席で、
                ゆっくりとした高原の時間をお楽しみください。
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {commitments.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 90}>
              <article className="h-full rounded-2xl border border-[#E3D8C8] bg-white/80 p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#355746] text-sm font-bold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-[#355746]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#555]">
                  {item.text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
