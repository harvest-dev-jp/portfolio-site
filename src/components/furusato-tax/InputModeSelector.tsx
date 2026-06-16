// src/components/furusato-tax/InputModeSelector.tsx

import type { InputMode } from "@/lib/furusato-tax/types";

interface InputModeSelectorProps {
  value: InputMode;
  onChange: (mode: InputMode) => void;
}

interface ModeOption {
  value: InputMode;
  title: string;
  description: string;
}

const modeOptions: ModeOption[] = [
  {
    value: "simple",
    title: "かんたん入力",
    description:
      "年収や家族構成、各種控除の見込額から寄附上限額を試算します。",
  },
  {
    value: "detailed",
    title: "詳細入力",
    description:
      "源泉徴収票の記載内容を入力して、より実態に近い試算を行います。",
  },
];

export default function InputModeSelector({
  value,
  onChange,
}: InputModeSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-bold text-slate-900">
        入力方法を選択
      </legend>

      <div className="grid gap-4 sm:grid-cols-2">
        {modeOptions.map((option) => {
          const isSelected = value === option.value;
          const inputId = `input-mode-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={[
                "relative cursor-pointer rounded-2xl border p-5 transition",
                "focus-within:ring-2 focus-within:ring-emerald-500",
                "focus-within:ring-offset-2",
                isSelected
                  ? "border-emerald-500 bg-emerald-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50",
              ].join(" ")}
            >
              <input
                id={inputId}
                type="radio"
                name="input-mode"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className={[
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-slate-400 bg-white",
                  ].join(" ")}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>

                <span>
                  <span
                    className={[
                      "block text-base font-bold",
                      isSelected
                        ? "text-emerald-950"
                        : "text-slate-900",
                    ].join(" ")}
                  >
                    {option.title}
                  </span>

                  <span
                    className={[
                      "mt-2 block text-sm leading-6",
                      isSelected
                        ? "text-emerald-900"
                        : "text-slate-600",
                    ].join(" ")}
                  >
                    {option.description}
                  </span>
                </span>
              </div>

              {isSelected && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
                  選択中
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

