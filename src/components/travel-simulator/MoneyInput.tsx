"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

import {
  clampMoneyValue,
  formatMoneyText,
  normalizeMoneyText,
} from "@/lib/travel-simulator/moneyInput";

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
  description?: string;
}

export default function MoneyInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  suffix = "円",
  description,
}: MoneyInputProps) {
  const [text, setText] = useState(() => formatMoneyText(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setText(formatMoneyText(value));
    }
  }, [value, isFocused]);

  const commitValue = () => {
    const normalizedText = normalizeMoneyText(text);

    if (normalizedText === "") {
      const nextValue = clampMoneyValue(0, min, max);

      onChange(nextValue);
      setText(formatMoneyText(nextValue));
      return;
    }

    const parsedValue = Number(normalizedText);

    if (!Number.isFinite(parsedValue)) {
      setText(formatMoneyText(value));
      return;
    }

    const nextValue = clampMoneyValue(
      Math.trunc(parsedValue),
      min,
      max,
    );

    onChange(nextValue);
    setText(formatMoneyText(nextValue));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setText(normalizeMoneyText(event.target.value));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setText(normalizeMoneyText(text));
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
      setText(formatMoneyText(value));
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
          pattern="[0-9]*"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={text}
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
