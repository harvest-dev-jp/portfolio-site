"use client";

import { useState, type FormEvent } from "react";

export default function ContactSection() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      "お問い合わせありがとうございます。このフォームはポートフォリオ用のデモです。",
    );
  };

  return (
    <section id="contact" className="bg-[#355746] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#F4D6A2]">
            Contact
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
            那須高原で、
            <br />
            焼きたての時間を。
          </h2>
          <p className="mt-6 leading-8 text-[#FFF8EB]">
            アクセスや営業時間を確認して、森の中の小さなベーカリーカフェへ。
            フォームは作品確認用のダミーです。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#access" className="rounded-full bg-[#C98A45] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[#B67834]">
              アクセスを見る
            </a>
            <a href="#top" className="rounded-full border border-white/50 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">
              ページ上部へ
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-[#333] shadow-xl">
          <div className="grid gap-5">
            <label className="text-sm font-bold text-[#355746]">
              お名前
              <input required type="text" className="mt-2 w-full rounded-xl border border-[#E3D8C8] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C98A45]" />
            </label>
            <label className="text-sm font-bold text-[#355746]">
              メールアドレス
              <input required type="email" className="mt-2 w-full rounded-xl border border-[#E3D8C8] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C98A45]" />
            </label>
            <label className="text-sm font-bold text-[#355746]">
              お問い合わせ内容
              <textarea required rows={5} className="mt-2 w-full rounded-xl border border-[#E3D8C8] px-4 py-3 outline-none focus:ring-2 focus:ring-[#C98A45]" />
            </label>
          </div>
          <button type="submit" className="mt-5 w-full rounded-full bg-[#355746] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2A4638]">
            送信する
          </button>
          {message && <p className="mt-4 rounded-xl bg-[#F7F3EA] p-4 text-sm leading-6 text-[#355746]">{message}</p>}
        </form>
      </div>
    </section>
  );
}
