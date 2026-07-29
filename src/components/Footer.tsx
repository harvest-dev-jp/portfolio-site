import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-harvest-200 py-8 text-sm text-harvest-600">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-bold text-harvest-900">Harvest</p>
          <p className="mt-2 max-w-xl leading-6">
            個人事業主・小規模事業者向けに、Webサイト・LP・小規模Webアプリを制作しています。
          </p>
          <p className="mt-4">© 2026 Harvest. All rights reserved.</p>
        </div>
        <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
          <Link href="/" className="hover:text-harvest-900">Home</Link>
          <Link href="/#services" className="hover:text-harvest-900">Services</Link>
          <Link href="/works" className="hover:text-harvest-900">Works</Link>
          <Link href="/about" className="hover:text-harvest-900">About</Link>
          <Link href="/contact" className="hover:text-harvest-900">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
