import Image from "next/image";
import Link from "next/link";

import type { Work } from "@/lib/portfolio/works";

export default function WorkCard({ work }: { work: Work }) {
  const isExternal = work.href.startsWith("http");
  const linkClassName =
    "mt-6 inline-flex min-h-12 items-center self-start rounded-lg font-semibold text-harvest-800 underline decoration-harvest-300 underline-offset-4 hover:text-harvest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-harvest-700";

  return (
    <article className="home-work-card home-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-harvest-200 bg-white">
      <div className="relative aspect-[16/9] overflow-hidden bg-harvest-50">
        <Image
          src={work.image}
          alt={work.imageAlt}
          fill
          sizes="(min-width: 768px) 550px, calc(100vw - 48px)"
          className={`object-center transition-transform duration-300 group-hover:scale-[1.02] ${
            work.imageFit === "contain"
              ? "object-contain p-2.5 sm:p-3"
              : "object-cover"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-harvest-100 px-3 py-1 text-harvest-800">
            {work.category}
          </span>
          <span className="rounded-full border border-harvest-200 px-3 py-1 text-stone-700">
            {work.kindLabel}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-harvest-900">
          {work.title}
        </h3>
        <p className="mt-3 flex-1 leading-7 text-stone-700">
          {work.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {work.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded bg-harvest-50 px-2.5 py-1 text-xs text-harvest-800"
            >
              {technology}
            </span>
          ))}
        </div>
        {isExternal ? (
          <a
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            詳しく見る
          </a>
        ) : (
          <Link href={work.href} className={linkClassName}>
            詳しく見る
          </Link>
        )}
      </div>
    </article>
  );
}
