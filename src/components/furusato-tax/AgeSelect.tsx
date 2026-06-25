// src/components/furusato-tax/AgeSelect.tsx

interface AgeSelectProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  description?: string;
}

/**
 * 年齢選択用の共通コンポーネント。
 *
 * Safariの日本語入力候補や数値入力の不安定な挙動を避けるため、
 * 年齢はプルダウンから選択する。
 */
export default function AgeSelect({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 120,
  description,
}: AgeSelectProps) {
  const ages = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index,
  );

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
      <div className="mt-2 flex justify-end">
        <div className="relative mt-2 w-full sm:ml-auto sm:w-40">
          <select
            id={id}
            value={value}
            onChange={(event) =>
              onChange(Number(event.target.value))
            }
            className={[
              "w-full appearance-none rounded-lg border border-slate-300",
              "bg-white px-3 py-2.5 pr-12 text-right text-slate-900",
              "shadow-sm outline-none transition",
              "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200",
            ].join(" ")}
          >
            {ages.map((age) => (
              <option
                key={age}
                value={age}
              >
                {age}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">
            歳
          </span>
        </div>
      </div>
    </div>
  );
}
