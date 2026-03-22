import { cn } from "@shared/utils/cn";
import { BiShield } from "react-icons/bi";

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-4 py-5 flex items-center justify-between border-b border-indigo-500/12 shrink-0",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-linear-to-br from-theme-400 to-theme-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          <BiShield size={18} />
        </div>
        <span className="text-[15px] font-bold text-white tracking-[0.05em]">AdminOS</span>
      </div>
      <span className="text-xs bg-theme-500/20 text-theme-400 px-2 py-0.5 rounded border border-theme-500/30 leading-none">
        v1.0
      </span>
    </div>
  );
}
