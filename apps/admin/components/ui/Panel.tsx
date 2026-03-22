import { cn } from "@shared/utils/cn";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-sm border border-indigo-500/12 rounded-2xl overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  right?: React.ReactNode;
}

export function PanelHeader({
  title,
  right,
  className,
  ...props
}: Omit<PanelHeaderProps, "children">) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-b border-indigo-500/10 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <span className="text-[11px] font-bold text-white/80 uppercase tracking-[0.06em] font-['JetBrains_Mono',monospace]">
        {title}
      </span>
      {right}
    </div>
  );
}
