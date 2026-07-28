import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import ReservationForm from "@/components/relaxation-salon/ReservationForm";
import SalonFaq from "@/components/relaxation-salon/SalonFaq";
import SalonHeader from "@/components/relaxation-salon/SalonHeader";

export const metadata: Metadata = {
  title: "Lumière Relaxation Salon｜架空リラクゼーションサロン",
  description: "完全予約制の小さなリラクゼーションサロンを想定した、ポートフォリオ用の架空Webサイトです。",
  openGraph: {
    title: "Lumière Relaxation Salon｜架空リラクゼーションサロン",
    description: "自然光と静けさをテーマにした、ポートフォリオ用の架空サロンサイトです。",
    type: "website",
  },
};

const features = [
  ["完全予約制の静かな空間", "ほかのお客様を気にせず、ゆっくりとお過ごしいただけます。"],
  ["丁寧なカウンセリング", "体調やお疲れの箇所を伺い、無理のない施術をご提案します。"],
  ["無理な勧誘なし", "回数券や商品の購入を、強くおすすめすることはありません。"],
  ["その日の体調に合わせた施術", "肩、首、腰、脚など、お疲れの箇所に合わせて内容を調整します。"],
] as const;

const menus = [
  { name: "ボディケア", time: "60分", price: "6,600円", description: "肩、首、背中、腰、脚など、気になる箇所を伺いながら全身をゆっくりケアします。", fit: ["全身の疲れが気になる", "初めて利用する", "定期的に身体を休めたい"] },
  { name: "アロマトリートメント", time: "90分", price: "9,900円", description: "香りを選び、オイルを使って全身をゆったりとケアします。", fit: ["深くリラックスしたい", "ゆっくり過ごしたい", "特に疲れを感じている"] },
  { name: "ヘッド＆ボディ", time: "90分", price: "8,800円", description: "頭まわりと全身のボディケアを組み合わせたコースです。", fit: ["目や頭の疲れが気になる", "デスクワークが多い", "首や肩を中心に受けたい"] },
] as const;

const firstVisit = [
  ["服装について", "動きやすいお着替えをご用意しています。"],
  ["カウンセリングについて", "お疲れの箇所や体調について、施術前にゆっくり伺います。"],
  ["施術の強さについて", "強さのお好みは、施術中でも遠慮なくお伝えください。"],
  ["支払いについて", "現金と主要なキャッシュレス決済に対応している想定です。"],
  ["勧誘について", "回数券や商品購入の強い勧誘は行いません。"],
] as const;

const flow = [
  ["予約", "デモフォームからご希望日時を入力します。"],
  ["ご来店", "予約時間の5分前を目安にお越しください。"],
  ["カウンセリング", "体調やお疲れの箇所を伺います。"],
  ["施術", "お好みに合わせて強さを調整します。"],
  ["アフターティー・お会計", "施術後はゆっくりお過ごしください。"],
] as const;

const optionalImages = {
  space: "/images/relaxation-salon/salon-space.webp",
  therapist: "/images/relaxation-salon/therapist.webp",
} as const;

function imageExists(src: string) {
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

export default function RelaxationSalonPage() {
  const availableImages = {
    space: imageExists(optionalImages.space),
    therapist: imageExists(optionalImages.therapist),
  };

  return (
    <div id="salon-top" className="salon-root overflow-x-clip bg-[#FAF8F3] pb-20 text-[#2F3431] md:pb-0">
      <style dangerouslySetInnerHTML={{ __html: salonStyles }} />
      <SalonHeader />
      <main>
        <section className="px-5 py-14 md:py-20">
          <div className="mx-auto grid max-w-[1160px] items-center gap-10 xl:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] xl:gap-14">
            <div className="salon-fade min-w-0">
              <p className="salon-kicker">LUMIÈRE RELAXATION SALON</p>
              <h1 className="salon-hero-title mt-5 font-bold leading-tight text-[#53695A]">
                <span className="block whitespace-nowrap">忙しい毎日に、</span>
                <span className="block whitespace-nowrap">深呼吸できる</span>
                <span className="block whitespace-nowrap">ひとときを。</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#626862]">心と身体をゆるめる、<br />完全予約制の小さなリラクゼーションサロンです。</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#menu" className="salon-button">メニューを見る</a>
                <a href="#reservation" className="salon-secondary">予約について確認する</a>
              </div>
              <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
                {["完全予約制", "女性向け", "1日3名限定", "初めての方も歓迎"].map((item) => <li key={item}>○&nbsp; {item}</li>)}
              </ul>
            </div>
            <figure className="salon-fade salon-hero-visual min-w-0">
              <Image src="/images/harvest-web-studio/work-salon.webp" alt="自然光が入り、施術ベッドと植物が置かれた静かなリラクゼーションサロンの室内" width={1600} height={900} sizes="(min-width: 1024px) 600px, calc(100vw - 40px)" priority className="aspect-[4/3] h-auto w-full rounded-[2rem] border border-[#D8DED8] object-cover shadow-lg" />
              <figcaption className="mt-3 text-center text-sm text-[#626862]">完全予約制の小さなプライベート空間</figcaption>
            </figure>
          </div>
        </section>

        <SalonSection kicker="OUR PROMISE" title="Lumièreが大切にしていること" tone>
          <div className="salon-card-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, description], index) => <SalonCard key={title}><span className="text-2xl font-bold text-[#C89B7B]">0{index + 1}</span><h3 className="mt-4 text-lg font-bold text-[#53695A]">{title}</h3><p className="mt-3 leading-7 text-[#626862]">{description}</p></SalonCard>)}
          </div>
        </SalonSection>

        <SalonSection id="concept" kicker="CONCEPT" title={<>ただ休むだけではなく、<br />自分を整える時間を。</>}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5 text-lg leading-9 text-[#626862]"><p>Lumièreは、毎日を頑張る方が少しだけ立ち止まり、心と身体をゆるめられる場所を目指しています。</p><p>大きなサロンではありませんが、一人ひとりのお話を丁寧に伺い、その日の体調や気分に合わせて施術します。</p><p>初めての方にも安心していただけるよう、施術内容や料金を分かりやすくご案内します。</p></div>
            <div className="rounded-[2rem] border border-[#D8DED8] bg-white p-7 shadow-sm" aria-label="サロンで大切にしている自然光、植物、タオル、ハーブティーのイメージ"><div className="grid grid-cols-2 gap-4">{["自然光", "植物", "清潔なタオル", "ハーブティー"].map((item, index) => <div key={item} className={`grid min-h-32 place-items-center rounded-2xl text-center font-bold text-[#53695A] ${index % 2 ? "bg-[#F3EEE6]" : "bg-[#E6EEE8]"}`}>{item}</div>)}</div></div>
          </div>
        </SalonSection>

        <SalonSection kicker="FOR YOUR DAY" title="こんなときにご利用ください" tone>
          <ul className="salon-card-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3">{["肩や首の疲れが気になる", "座り仕事で腰や脚が重い", "眠りが浅く、疲れが抜けにくい", "家事や育児で自分の時間が少ない", "静かな場所でリラックスしたい", "初めてでも相談しやすいサロンを探している"].map((item) => <li key={item} className="rounded-2xl border border-[#D8DED8] bg-white p-5 leading-7">✓&nbsp; {item}</li>)}</ul>
        </SalonSection>

        <SalonSection id="menu" kicker="MENU & PRICE" title="その日の気分とお疲れに合わせて">
          <div className="salon-menu-grid grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {menus.map((menu) => <article key={menu.name} className="salon-card flex min-w-0 flex-col rounded-3xl border border-[#D8DED8] bg-white p-6 shadow-sm"><p className="text-sm font-bold text-[#9A6E50]">{menu.time}</p><h3 className="mt-2 text-2xl font-bold text-[#53695A]">{menu.name}</h3><p className="mt-4 whitespace-nowrap text-3xl font-bold">{menu.price}<small className="ml-1 text-sm font-normal">（税込）</small></p><p className="mt-5 leading-7 text-[#626862]">{menu.description}</p><div className="mt-5 flex-1 rounded-2xl bg-[#FAF8F3] p-4"><p className="font-bold">向いている方</p><ul className="mt-2 space-y-2 text-sm">{menu.fit.map((item) => <li key={item}>・{item}</li>)}</ul></div><a href="#reservation" className="salon-button mt-6">このメニューを予約する</a></article>)}
          </div>
          <p className="mt-7 rounded-xl bg-[#F3EEE6] p-4 text-sm leading-7">表示料金は、ポートフォリオ用の架空サロンとして設定した参考価格です。施術はリラクゼーションを目的としたもので、医療行為ではありません。</p>
        </SalonSection>

        <SalonSection kicker="FIRST VISIT" title={<>初めての方も、<br />安心してお越しください。</>} tone>
          <div className="salon-first-visit-grid salon-card-grid grid gap-4 md:grid-cols-2 lg:grid-cols-3">{firstVisit.map(([title, body]) => <SalonCard key={title}><h3 className="text-lg font-bold text-[#53695A]">{title}</h3><p className="mt-3 leading-7 text-[#626862]">{body}</p></SalonCard>)}</div>
        </SalonSection>

        <SalonSection kicker="OUR SPACE" title={<>静かに過ごせる、<br />小さなプライベート空間</>}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]"><SpaceVisual usePhoto={availableImages.space} /><div><div className="grid grid-cols-2 gap-3">{["完全個室", "自然光", "清潔なタオル", "アフターティー"].map((item) => <div key={item} className="grid min-h-14 place-items-center rounded-xl border border-[#D8DED8] bg-white px-3 py-4 text-center font-bold text-[#53695A]"><span className="whitespace-nowrap">{item}</span></div>)}</div><p className="mt-5 leading-7 text-[#626862]">施術ベッド1台の静かな空間です。植物のある待合スペースで、施術後はハーブティーをお楽しみいただく想定です。</p></div></div>
        </SalonSection>

        <SalonSection id="therapist" kicker="THERAPIST" title="安心して話せることも、大切に。" tone>
          <div className="grid items-center gap-10 lg:grid-cols-[.7fr_1.3fr]"><TherapistVisual usePhoto={availableImages.therapist} /><div><p className="font-bold text-[#9A6E50]">セラピスト</p><h3 className="mt-2 text-2xl font-bold text-[#53695A]">高橋 美咲</h3><div className="mt-5 space-y-4 leading-8 text-[#626862]"><p>会社員として働いていた頃、忙しさの中で身体を休める時間の大切さを感じ、リラクゼーションの仕事を学びました。</p><p>施術だけでなく、安心して話せることや、静かに過ごせることも大切にしています。初めての方にも緊張せずお越しいただけるよう、丁寧なご案内を心がけています。</p><div className="rounded-2xl bg-white p-5"><h4 className="font-bold text-[#53695A]">初めての方へ</h4><p className="mt-2 leading-7">緊張せずに過ごしていただけるよう、施術前のご説明とカウンセリングを大切にしています。強さや室温なども、遠慮なくお申し付けください。</p></div></div><ul className="mt-5 flex flex-wrap gap-2 text-sm">{["リラクゼーション技術講座修了", "接客経験", "サロン勤務経験"].map((item) => <li key={item} className="rounded-full bg-white px-4 py-2">{item}</li>)}</ul><p className="mt-4 text-xs text-[#626862]">※プロフィールはポートフォリオ用の架空設定です。</p></div></div>
        </SalonSection>

        <SalonSection kicker="FLOW" title="ご予約からご来店まで">
          <ol className="salon-flow-grid grid gap-4 md:grid-cols-2 lg:grid-cols-5">{flow.map(([title, body], index) => <li key={title} className="rounded-2xl border border-[#D8DED8] bg-white p-5"><span className="font-bold text-[#C89B7B]">STEP {index + 1}</span><h3 className="mt-3 font-bold text-[#53695A]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#626862]">{body}</p></li>)}</ol>
        </SalonSection>

        <SalonSection kicker="VOICE" title="お客様の声" tone>
          <div className="salon-card-grid grid gap-5 lg:grid-cols-3">{[["40代・会社員（架空）", "初めてでしたが、流れや施術内容を丁寧に説明してもらえたので安心できました。"], ["30代・自営業（架空）", "静かな空間で、周囲を気にせずゆっくり過ごせました。"], ["50代・パート勤務（架空）", "施術中も強さを確認してもらえたので、無理なく受けられました。"]].map(([person, voice]) => <SalonCard key={person}><p className="font-bold text-[#9A6E50]">{person}</p><p className="mt-4 leading-8">“ {voice} ”</p></SalonCard>)}</div><p className="mt-6 text-sm text-[#626862]">掲載している感想は、ポートフォリオ用に作成した架空の内容です。</p>
        </SalonSection>

        <SalonFaq />

        <SalonSection id="access" kicker="ACCESS" title="アクセス・営業時間">
          <div className="grid gap-8 lg:grid-cols-2"><div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm"><Info label="住所" value={<>埼玉県○○市○○町 1-2-3<br />Lumière Building 2F</>} /><Info label="営業時間" value="10:00〜19:00（最終受付 17:30）" /><Info label="定休日" value="火曜日・不定休" /><Info label="アクセス" value="最寄り駅から徒歩7分" /><Info label="駐車場" value="近隣コインパーキングをご利用ください" /></div><div className="relative min-h-80 overflow-hidden rounded-3xl border border-[#D8DED8] bg-[#E6EEE8] p-6" role="img" aria-label="駅からLumièreまでの架空のアクセスマップ"><div className="absolute left-1/4 top-0 h-full w-10 rotate-12 bg-white/80" /><div className="absolute left-0 top-1/2 h-10 w-full -rotate-6 bg-white/80" /><span className="absolute bottom-8 left-8 rounded-lg bg-[#53695A] px-4 py-2 font-bold text-white">最寄り駅</span><span className="absolute right-8 top-10 rounded-full bg-[#C89B7B] px-4 py-3 font-bold text-white">Lumière</span><p className="absolute bottom-4 right-5 text-xs text-[#626862]">架空のアクセスマップ</p></div></div>
        </SalonSection>

        <section className="salon-cta bg-[#53695A] px-5 py-14 text-center text-white"><div className="mx-auto max-w-3xl"><p className="text-sm font-bold tracking-widest text-white/80">RESERVATION</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">ご予約・お問い合わせ</h2><p className="mt-5 text-lg leading-8 text-white/90">メニューが決まっていない場合も、<br />ご希望やお疲れの箇所を伺いながらご案内します。</p><a href="#reservation" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-white px-7 py-3 font-bold text-[#53695A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">予約フォームへ進む</a><p className="mt-5 text-sm text-white/80">完全予約制・1日3名限定・無理な勧誘なし・初めての方歓迎</p></div></section>

        <ReservationForm />
      </main>
      <footer className="salon-footer bg-[#2F3431] px-5 py-12 text-white"><div className="mx-auto grid max-w-[1160px] gap-8 md:grid-cols-2"><div><p className="text-xl font-bold">Lumière Relaxation Salon</p><p className="mt-2 text-sm text-white/75">架空のリラクゼーションサロンWebサイト</p><p className="mt-5 text-sm leading-6">Lumière Relaxation Salonは、<br />ポートフォリオ用に企画した架空のサロンです。</p></div><nav aria-label="フッターナビゲーション" className="grid gap-2 md:justify-self-end">{[["Concept", "#concept"], ["Menu", "#menu"], ["Therapist", "#therapist"], ["FAQ", "#faq"], ["Access", "#access"], ["ご予約", "#reservation"]].map(([label, href]) => <a key={href} href={href}>{label}</a>)}<Link href="/">ポートフォリオへ戻る</Link><Link href="/works/harvest-web-studio">Harvest Web Studioを見る</Link></nav></div><div className="mx-auto mt-8 max-w-[1160px] border-t border-white/20 pt-5 text-sm"><p>制作：<Link href="/works/harvest-web-studio" className="underline">Harvest Web Studio</Link></p><p className="mt-1 text-white/75">このサイトはHarvest Web Studioのポートフォリオ用制作事例です。</p><p className="mt-5">© 2026 Lumière Relaxation Salon</p></div></footer>
      <nav aria-label="スマートフォン用予約ショートカット" className="salon-mobile-cta fixed inset-x-2 bottom-0 z-40 mx-auto grid max-w-md grid-cols-2 gap-2 rounded-t-xl border border-b-0 border-[#D8DED8] bg-white/95 p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"><a href="#menu" className="salon-secondary min-h-11">メニュー</a><a href="#reservation" className="salon-button min-h-11">予約する</a></nav>
    </div>
  );
}

function SalonSection({ id, kicker, title, tone, children }: { id?: string; kicker: string; title: React.ReactNode; tone?: boolean; children: React.ReactNode }) {
  return <section id={id} className={`salon-section scroll-mt-16 ${tone ? "bg-[#F3EEE6]" : "bg-[#FAF8F3]"}`}><div className="salon-container"><div className="salon-section-heading"><p className="salon-kicker">{kicker}</p><h2 className="salon-heading">{title}</h2></div><div className="mt-8">{children}</div></div></section>;
}
function SpaceVisual({ usePhoto }: { usePhoto: boolean }) {
  if (usePhoto) return <figure className="salon-space-visual overflow-hidden rounded-[2rem] border border-[#D8DED8] bg-white"><Image src={optionalImages.space} alt="自然光が入る静かなリラクゼーションサロンの室内" width={1600} height={1200} sizes="(min-width:1024px) 620px, 100vw" className="aspect-[4/3] h-auto w-full object-cover" /><figcaption className="p-3 text-center text-sm text-[#626862]">静かに過ごせるプライベート空間</figcaption></figure>;
  return <div className="salon-space-visual rounded-[2rem] border border-[#D8DED8] bg-[#E6EEE8] p-6 sm:p-8" role="img" aria-label="施術ベッド、自然光、タオル、植物があるプライベートサロンのイメージ"><div className="rounded-2xl bg-white p-5 shadow-sm"><div className="h-28 rounded-xl bg-[#F3EEE6]" /><div className="mt-4 grid grid-cols-[1fr_.45fr] gap-4"><div className="h-24 rounded-xl border-4 border-white bg-[#D7E2D9] shadow-sm" /><div className="grid place-items-center rounded-full bg-[#738B78] text-sm font-bold text-white">植物</div></div><div className="mt-4 flex justify-end gap-2"><span className="h-8 w-16 rounded-lg bg-white shadow-sm" /><span className="h-8 w-16 rounded-lg bg-white shadow-sm" /></div></div><p className="mt-4 text-center text-sm text-[#626862]">静かに過ごせる一室をイメージした図</p></div>;
}
function TherapistVisual({ usePhoto }: { usePhoto: boolean }) {
  if (usePhoto) return <figure className="salon-therapist-visual mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-[#D8DED8] bg-white"><Image src={optionalImages.therapist} alt="サロンで施術の準備をする架空の女性セラピスト" width={900} height={1100} sizes="(min-width:1024px) 360px, 80vw" className="aspect-[4/5] h-auto w-full object-cover" /><figcaption className="p-3 text-center text-xs text-[#626862]">ポートフォリオ用の架空人物イメージ</figcaption></figure>;
  return <div className="salon-therapist-visual mx-auto grid aspect-square w-56 place-items-center rounded-full bg-[#E6EEE8] text-5xl font-bold text-[#738B78]" aria-label="架空のセラピスト高橋美咲のイニシャル">M</div>;
}
function SalonCard({ children }: { children: React.ReactNode }) { return <article className="salon-card min-w-0 rounded-3xl border border-[#D8DED8] bg-white p-6 shadow-sm">{children}</article>; }
function Info({ label, value }: { label: string; value: React.ReactNode }) { return <div className="border-b border-[#D8DED8] pb-4 last:border-0"><p className="text-sm font-bold text-[#9A6E50]">{label}</p><p className="mt-1 leading-7">{value}</p></div>; }

const salonStyles = `
  .salon-container{max-width:1160px;margin-inline:auto;padding-inline:20px}
  .salon-section{padding-block:68px}
  .salon-hero-title{font-size:clamp(2.25rem,5vw,3.5rem);max-width:10em;word-break:keep-all}
  .salon-kicker{font-size:.75rem;letter-spacing:.18em;font-weight:800;color:#9A6E50}
  .salon-heading{margin-top:12px;font-size:clamp(1.8rem,4vw,2.75rem);line-height:1.3;font-weight:800;color:#53695A}
  .salon-button,.salon-secondary{display:inline-flex;min-height:50px;align-items:center;justify-content:center;border-radius:12px;padding:12px 22px;border:1px solid #53695A;font-weight:700;white-space:nowrap;transition:background 180ms,transform 180ms}
  .salon-button{background:#53695A;color:#fff}.salon-button:hover{background:#405347;transform:translateY(-2px)}
  .salon-secondary{background:#fff;color:#53695A}.salon-secondary:hover{background:#E6EEE8;transform:translateY(-2px)}
  .salon-button:focus-visible,.salon-secondary:focus-visible{outline:3px solid #C89B7B;outline-offset:3px}
  .salon-card{transition:transform 220ms,box-shadow 220ms}.salon-card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(83,105,90,.1)}
  .salon-root :where(h1,h2,h3,p,li,a,button,span){line-break:strict;word-break:normal}
  .salon-fade{animation:salonFade 650ms ease both}.salon-hero-visual{animation-delay:150ms}
  @keyframes salonFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  @media(min-width:768px){.salon-section{padding-block:92px}.salon-container{padding-inline:28px}}
  @media(max-width:420px){.salon-button,.salon-secondary{width:100%;padding-inline:14px}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.salon-root *{animation:none!important;transition:none!important}}
  @media print{
    .salon-root,.salon-root *{opacity:1!important;transform:none!important;animation:none!important;transition:none!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
    .salon-root .salon-header,.salon-root .salon-mobile-cta{display:none!important}.salon-root{overflow:visible!important;padding-bottom:0!important}
    .salon-root .salon-section{padding-block:42px!important}.salon-root .salon-cta{padding-block:32px!important}
    .salon-root .salon-section-heading{break-after:avoid;page-break-after:avoid}
    .salon-root .salon-hero-visual,.salon-root .salon-space-visual,.salon-root .salon-therapist-visual,.salon-root .salon-card,.salon-root .salon-flow-grid>li{break-inside:avoid;page-break-inside:avoid}
    .salon-root .salon-hero-visual img{max-height:420px!important;object-fit:cover!important}
    .salon-root .salon-card-grid,.salon-root .salon-flow-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;break-inside:auto!important}
    .salon-root .salon-first-visit-grid{break-inside:auto!important;page-break-inside:auto!important}
    .salon-root .salon-first-visit-grid>.salon-card{break-inside:avoid!important;page-break-inside:avoid!important;padding:16px!important}
    .salon-root .salon-menu-grid{grid-template-columns:minmax(0,1fr)!important;break-inside:auto!important}
    .salon-root .salon-menu-grid>.salon-card{break-inside:avoid!important;page-break-inside:avoid!important}
    .salon-root .salon-reservation-form{break-inside:auto!important}.salon-root .salon-reservation-form label,.salon-root .salon-reservation-form button{break-inside:avoid;page-break-inside:avoid}
    .salon-root .salon-footer{break-inside:avoid;page-break-inside:avoid;background:#fff!important;color:#2F3431!important;padding-block:20px!important;border-top:2px solid #53695A}
    .salon-root .salon-footer *{color:#2F3431!important;opacity:1!important}
  }
`;
