"use client";

import { FormEvent, useState } from "react";

type ErrorKey = "name" | "email" | "menu" | "date" | "time" | "message" | "phone";
type Errors = Partial<Record<ErrorKey, string>>;
const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-[#BFC9C0] bg-white px-4 py-3 outline-none focus:border-[#53695A] focus:ring-2 focus:ring-[#738B78]/25";

export default function ReservationForm() {
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const required = ["name", "email", "menu", "date", "time", "message"] as const;
    required.forEach((key) => {
      if (!String(data.get(key) || "").trim()) next[key] = "入力または選択してください。";
    });
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "正しいメール形式で入力してください。";
    if (phone && !/^[0-9()+\-\s]{8,20}$/.test(phone)) next.phone = "数字とハイフンを中心に入力してください。";
    setErrors(next);
    if (Object.keys(next).length === 0) setComplete(true);
    setSubmitting(false);
  };

  return (
    <section id="reservation" className="salon-section scroll-mt-16 bg-[#E6EEE8]">
      <div className="salon-container max-w-4xl">
        <div className="salon-section-heading">
          <p className="salon-kicker">RESERVATION</p>
          <h2 className="salon-heading">デモ予約フォーム</h2>
          <p className="mt-4 rounded-xl border border-[#C89B7B] bg-white p-4 font-medium">
            このフォームはポートフォリオ用のデモです。<br />
            入力内容は実際には送信されません。
          </p>
        </div>
        {complete ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm" role="status">
            <h3 className="text-2xl font-bold text-[#53695A]">入力ありがとうございました。</h3>
            <p className="mt-4 leading-7">
              このフォームはポートフォリオ用のデモのため、<br />
              実際の予約・送信は行われていません。
            </p>
            <button type="button" className="salon-secondary mt-6" onClick={() => setComplete(false)}>
              入力へ戻る
            </button>
          </div>
        ) : (
          <form className="salon-reservation-form mt-8 grid gap-5 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8" noValidate onSubmit={submit}>
            <TextField name="name" label="お名前" required maxLength={100} error={errors.name} />
            <TextField name="email" label="メールアドレス" required type="email" error={errors.email} />
            <SelectField name="menu" label="希望メニュー" required error={errors.menu} options={["ボディケア 60分", "アロマトリートメント 90分", "ヘッド＆ボディ 90分", "相談して決めたい"]} />
            <SelectField name="visit" label="初回・再来" options={["初回", "再来"]} />
            <TextField name="date" label="希望日" required type="date" error={errors.date} />
            <SelectField name="time" label="希望時間帯" required error={errors.time} options={["10:00", "13:00", "16:00", "相談したい"]} />
            <TextField name="phone" label="電話番号" type="tel" error={errors.phone} />
            <SelectField name="pressure" label="施術の強さ" options={["弱め", "普通", "やや強め", "相談したい"]} />
            <TextField name="tiredArea" label="お疲れの箇所" />
            <TextField name="request" label="その他要望" />
            <label className="md:col-span-2">
              <span className="font-bold">ご相談・確認事項 <b className="text-[#8A4D32]">（必須）</b></span>
              <textarea name="message" maxLength={1000} className={`${inputClass} min-h-36`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "salon-message-error" : undefined} />
              {errors.message && <span id="salon-message-error" className="mt-1 block text-sm font-medium text-[#9B372C]">エラー：{errors.message}</span>}
            </label>
            <button type="submit" disabled={submitting} className="salon-button md:col-span-2 disabled:opacity-50">
              予約内容を入力して完了する（デモ）
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function TextField({ name, label, required, type = "text", maxLength, error }: { name: string; label: string; required?: boolean; type?: string; maxLength?: number; error?: string }) {
  return <label><span className="font-bold">{label} <b className={required ? "text-[#8A4D32]" : "font-normal text-[#626862]"}>（{required ? "必須" : "任意"}）</b></span><input name={name} type={type} maxLength={maxLength} className={inputClass} aria-invalid={Boolean(error)} aria-describedby={error ? `salon-${name}-error` : undefined} />{error && <span id={`salon-${name}-error`} className="mt-1 block text-sm font-medium text-[#9B372C]">エラー：{error}</span>}</label>;
}

function SelectField({ name, label, required, options, error }: { name: string; label: string; required?: boolean; options: readonly string[]; error?: string }) {
  return <label><span className="font-bold">{label} <b className={required ? "text-[#8A4D32]" : "font-normal text-[#626862]"}>（{required ? "必須" : "任意"}）</b></span><select name={name} className={inputClass} aria-invalid={Boolean(error)} aria-describedby={error ? `salon-${name}-error` : undefined}><option value="">選択してください</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{error && <span id={`salon-${name}-error`} className="mt-1 block text-sm font-medium text-[#9B372C]">エラー：{error}</span>}</label>;
}
