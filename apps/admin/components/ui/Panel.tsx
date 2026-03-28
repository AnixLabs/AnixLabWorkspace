import { cn } from "@shared/utils/cn";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <section
      className={cn(
        "my-6 p-6 backdrop-blur-xs border-2 border-theme-500/20 rounded-2xl overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  right?: React.ReactNode;
}

export function PanelHeader({ children, right, className, ...props }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 -mt-4 pb-2 border-b-2 border-theme-500/20 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      <h2 className="font-bold text-white/80 uppercase tracking-[0.06em] font-['JetBrains_Mono',monospace]">
        {children}
      </h2>
      {right}
    </div>
  );
}
