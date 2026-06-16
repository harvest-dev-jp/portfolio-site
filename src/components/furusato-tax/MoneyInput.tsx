// src/components/furusato-tax/MoneyInput.tsx

"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * 全角数字を半角数字へ変換する。
 */
function convertFullWidthNumbers(value: string): string {
  return value.replace(/[０-９]/g, (character) =>
    String.fromCharCode(character.charCodeAt(0) - 0xfee0),
  );
}

/**
 * 数字以外の文字を除去する。
 *
 * 金額は0以上の整数として扱うため、
 * 小数点・マイナス記号・カンマも除去する。
 */
function sanitizeNumericText(value: string): string {
  const halfWidthValue = convertFullWidthNumbers(value);

  return halfWidthValue.replace(/\D/g, "");
}

/**
 * 表示用のカンマ区切り文字列へ変換する。
 *
 * Intl.NumberFormatは、サーバーとブラウザで
 * 表示差が発生する可能性があるため使用しない。
 */
function formatNumber(value: number): string {
  const safeValue = Math.max(0, Math.trunc(value));

  return safeValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 最小値・最大値の範囲へ補正する。
 */
function clampValue(
  value: number,
  min: number,
  max?: number,
): number {
  const valueWithMinimum = Math.max(min, value);

  if (max === undefined) {
    return valueWithMinimum;
  }

  return Math.min(max, valueWithMinimum);
}

/**
 * 金額入力用の共通コンポーネント。
 *
 * 入力中：
 * - 数字のみ表示
 * - 全角数字は半角へ変換
 * - カンマや記号を除去
 *
 * 確定後：
 * - カンマ区切りで表示
 * - blurまたはEnterでonChangeを呼び出す
 */
export default function MoneyInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix = "円",
  description,
  disabled = false,
  required = false,
}: MoneyInputProps) {
  const [text, setText] = useState(() => formatNumber(value));
  const [isFocused, setIsFocused] = useState(false);

  /**
   * 親コンポーネント側でvalueが変更された場合に、
   * 表示文字列も同期する。
   *
   * 入力中はユーザー操作を優先し、同期しない。
   */
  useEffect(() => {
    if (!isFocused) {
      setText(formatNumber(value));
    }
  }, [value, isFocused]);

  const commitValue = () => {
    const sanitizedText = sanitizeNumericText(text);

    if (sanitizedText === "") {
      const nextValue = clampValue(0, min, max);

      onChange(nextValue);
      setText(formatNumber(nextValue));
      return;
    }

    const parsedValue = Number(sanitizedText);

    if (!Number.isFinite(parsedValue)) {
      setText(formatNumber(value));
      return;
    }

    /**
     * step単位へ丸める。
     *
     * 例：
     * step={1000} の場合、12,500円は13,000円になる。
     */
    const roundedValue =
      step > 1
        ? Math.round(parsedValue / step) * step
        : Math.trunc(parsedValue);

    const nextValue = clampValue(
      roundedValue,
      min,
      max,
    );

    onChange(nextValue);
    setText(formatNumber(nextValue));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextText = sanitizeNumericText(
      event.target.value,
    );

    setText(nextText);
  };

  const handleFocus = () => {
    setIsFocused(true);

    /**
     * 編集中はカンマを外して数字だけ表示する。
     */
    setText(sanitizeNumericText(text));
  };

  const handleBlur = () => {
    setIsFocused(false);
    commitValue();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setText(formatNumber(value));
      event.currentTarget.blur();
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-800"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>

      {description && (
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}

      <div className="relative mt-2">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={text}
          disabled={disabled}
          required={required}
          aria-describedby={
            description ? `${id}-description` : undefined
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={[
            "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5",
            "text-right text-slate-900 shadow-sm outline-none transition",
            "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
            suffix ? "pr-12" : "",
          ].join(" ")}
        />

        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">
            {suffix}
          </span>
        )}
      </div>

      {description && (
        <span
          id={`${id}-description`}
          className="sr-only"
        >
          {description}
        </span>
      )}
    </div>
  );
}
