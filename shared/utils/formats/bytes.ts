export function formatBytes(bytes: number, decimals: 1 | 2 | 3 | 4 = 2): string {
  if (bytes == null) return "-";
  if (Number.isNaN(bytes)) return "-";
  if (!Number.isFinite(bytes)) return bytes > 0 ? "∞" : "-∞";

  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const UNITS = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];

  const abs = Math.abs(bytes);
  const tier = Math.min(Math.floor(Math.log10(abs) / Math.log10(k)), UNITS.length - 1);

  const scaled = bytes / Math.pow(k, tier);

  return `${parseFloat(scaled.toFixed(decimals))} ${UNITS[tier]}`;
}
