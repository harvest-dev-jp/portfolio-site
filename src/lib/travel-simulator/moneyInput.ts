export function normalizeMoneyText(value: string) {
  const halfWidthValue = value.replace(/[０-９]/g, (character) =>
    String.fromCharCode(character.charCodeAt(0) - 0xfee0),
  );

  return halfWidthValue.replace(/\D/g, "");
}

export function formatMoneyText(value: number) {
  const safeValue = Number.isFinite(value)
    ? Math.max(0, Math.trunc(value))
    : 0;

  return safeValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function clampMoneyValue(
  value: number,
  min: number,
  max?: number,
) {
  const valueWithMinimum = Math.max(min, value);

  if (max === undefined) {
    return valueWithMinimum;
  }

  return Math.min(max, valueWithMinimum);
}
