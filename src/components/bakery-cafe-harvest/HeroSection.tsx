import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#F7F3EA]"
    >
      <Image
        src="/works/bakery-cafe-harvest/hero.svg"
        alt="那須高原の森にある木造ベーカリーカフェと焼きたてパンのイメージ"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1f3028]/70 via-[#1f3028]/38 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="bakery-hero-item text-sm font-semibold uppercase tracking-[0.28em] text-[#F4D6A2]">
            Bakery & Cafe Harvest
          </p>
          <h1 className="bakery-hero-item mt-5 font-serif text-4xl font-bold leading-tight sm:text-6xl">
            森の中で、
            <br />
            焼きたての幸せを。
          </h1>
          <p className="bakery-hero-item mt-6 max-w-xl text-base leading-8 text-[#FFF8EB] sm:text-lg">
            那須高原の自然と、毎朝焼き上げるパンを楽しむ小さなベーカリーカフェ。
          </p>
          <div className="bakery-hero-item mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="rounded-full bg-[#C98A45] px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#B67834]"
            >
              メニューを見る
            </a>
            <a
              href="#access"
              className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              店舗情報を見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
