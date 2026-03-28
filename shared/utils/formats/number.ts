export function formatCompactNumber(value: number, decimals: 1 | 2 | 3 | 4 = 2): string {
  if (value == null) return "-";
  if (!Number.isFinite(value)) return value > 0 ? "∞" : "-∞";
  if (Number.isNaN(value)) return "-";

  const abs = Math.abs(value);

  // handle small numbers (< 1000)
  if (abs < 1000) {
    return value.toFixed(decimals);
  }

  const UNITS = ["K", "M", "B", "T", "P", "E"];
  const tier = Math.floor(Math.log10(abs) / 3);

  // clamp index safely
  const unitIndex = Math.min(tier - 1, UNITS.length - 1);

  const scale = Math.pow(1000, tier);
  const scaled = value / scale;

  return `${parseFloat(scaled.toFixed(decimals))}${UNITS[unitIndex]}`;
}
