import Link from "next/link";

export default function Footer() {
  return (
    <footer className="portfolio-footer border-t border-harvest-200 py-8 text-sm text-harvest-600">
      <div className="portfolio-footer-inner mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div className="min-w-0">
          <p className="font-bold text-harvest-900">Harvest</p>
          <p className="portfolio-footer-description mt-2 max-w-xl leading-6">
            <span className="whitespace-nowrap">個人事業主・小規模事業者</span>向けに、
            <span className="whitespace-nowrap">Webサイト・LP・小規模Webアプリ</span>を制作しています。
          </p>
          <p className="portfolio-footer-copyright mt-4">
            © 2026 Harvest. <span className="whitespace-nowrap">All rights reserved.</span>
          </p>
        </div>
        <nav aria-label="フッターナビゲーション" className="portfolio-footer-nav flex max-w-lg flex-wrap gap-x-5 gap-y-3 md:justify-end">
          {[
            ["Home", "/"],
            ["Services", "/#services"],
            ["Works", "/#works"],
            ["About", "/about"],
            ["Contact", "/contact"],
            ["Harvest Web Studio", "/works/harvest-web-studio"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/harvest-dev-jp"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
