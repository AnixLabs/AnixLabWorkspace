export function formatDuration(seconds: number, maxParts: 1 | 2 | 3 | 4 | 5 | 6 = 3): string {
  if (seconds == null) return "-";
  if (Number.isNaN(seconds)) return "-";
  if (!Number.isFinite(seconds)) return seconds > 0 ? "∞" : "-∞";

  const abs = Math.floor(Math.abs(seconds));

  const UNITS = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "day", value: 60 * 60 * 24 },
    { label: "hour", value: 60 * 60 },
    { label: "minute", value: 60 },
    { label: "second", value: 1 },
  ];

  let remaining = abs;
  const parts: string[] = [];

  for (const unit of UNITS) {
    if (parts.length >= maxParts) break;

    const qty = Math.floor(remaining / unit.value);

    if (qty > 0) {
      const label = qty === 1 ? unit.label : `${unit.label}s`;
      parts.push(`${qty} ${label}`);
      remaining -= qty * unit.value;
    }
  }

  return parts.length ? parts.join(" ") : "0 seconds";
}

export function formatTime(date: Date | number | string): string {
  if (date == null) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export function formatDateTime(date: Date | number | string): string {
  if (date == null) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function formatDate(date: Date | number | string): string {
  if (date == null) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatTimeAgo(
  date: Date | number | string,
  maxParts: 1 | 2 | 3 | 4 | 5 | 6 = 3,
): string {
  if (date == null) return "-";

  const now = Date.now();
  const time = new Date(date).getTime();

  if (isNaN(time)) return "-";

  const diffSec = Math.floor((now - time) / 1000);
  const isFuture = diffSec < 0;

  const duration = formatDuration(Math.abs(diffSec), maxParts);

  return isFuture ? `in ${duration}` : `${duration} ago`;
}

export function formatClock(seconds: number): string {
  if (seconds == null) return "-";
  if (Number.isNaN(seconds)) return "-";
  if (!Number.isFinite(seconds)) return "∞";

  const abs = Math.floor(Math.abs(seconds));

  const hrs = Math.floor(abs / 3600);
  const mins = Math.floor((abs % 3600) / 60);
  const secs = abs % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  return `${pad(mins)}:${pad(secs)}`;
}
