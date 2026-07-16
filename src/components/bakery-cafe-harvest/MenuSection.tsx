import Image from "next/image";

import { menuItems } from "@/lib/bakery-cafe-harvest/data";

import ScrollReveal from "./ScrollReveal";

export default function MenuSection() {
  return (
    <section id="menu" className="scroll-mt-32 bg-[#F7F3EA] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C98A45]">
            Recommended Menu
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#355746] sm:text-5xl">
            おすすめメニュー
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <ScrollReveal key={item.name} delay={(index % 3) * 80}>
              <article className="group h-full overflow-hidden rounded-2xl border border-[#E3D8C8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE6D8]">
                  <Image
                    src={item.image}
                    alt={`${item.name}のイメージ`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {item.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#C98A45] px-3 py-1 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold text-[#355746]">{item.name}</h3>
                    <p className="shrink-0 font-bold text-[#C98A45]">{item.price}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#555]">{item.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
