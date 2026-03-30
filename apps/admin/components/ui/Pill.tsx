import { cn } from "@shared/utils/cn";
import type React from "react";

export type PillStatus = "success" | "warning" | "error" | "unknown" | "default";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: PillStatus;
}

const statusDotClassName: Record<PillStatus, string> = {
  success: "bg-emerald-400 shadow-emerald-400/50",
  warning: "bg-amber-400 shadow-amber-400/50",
  error: "bg-red-500 shadow-red-500/50",
  unknown: "bg-zinc-500",
  default: "bg-theme-500",
};

const statusPillClassName: Record<PillStatus, string> = {
  success: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30",
  error: "bg-red-500/10 text-red-400 ring-1 ring-red-500/30",
  unknown: "bg-zinc-700/40 text-zinc-400",
  default: "bg-theme-700/40 text-theme-400",
};

export function Pill({
  children,
  className = "",
  status,
  ...props
}: React.PropsWithChildren<PillProps>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        "bg-theme-500/10 text-theme-400 ring-1 ring-theme-500/30",
        status && statusPillClassName[status],
        className,
      )}
      {...props}
    >
      {status && (
        <span className={`w-1.5 h-1.5 rounded-full shadow-sm ${statusDotClassName[status]}`} />
      )}
      {children}
    </span>
  );
}
