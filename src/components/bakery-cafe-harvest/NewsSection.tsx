import { newsItems } from "@/lib/bakery-cafe-harvest/data";

import ScrollReveal from "./ScrollReveal";

export default function NewsSection() {
  return (
    <section id="news" className="scroll-mt-32 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            News
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#355746] sm:text-5xl">
            お知らせ
          </h2>
        </ScrollReveal>

        <div className="mt-10 divide-y divide-[#E3D8C8] rounded-2xl border border-[#E3D8C8] bg-[#F7F3EA]">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 80}>
              <article className="grid gap-3 p-5 transition hover:bg-white sm:grid-cols-[130px_120px_1fr] sm:items-center">
                <time className="text-sm font-bold text-[#6B4E3D]">{item.date}</time>
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#C98A45]">
                  {item.category}
                </span>
                <h3 className="font-bold text-[#355746]">{item.title}</h3>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
