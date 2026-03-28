import { AdminSidebar } from "@/components/AdminSidebar";
import { Suspense } from "react";

export default function AdminAccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex font-['Syne',sans-serif]">
      <Suspense fallback={<div className="max-md:hidden w-70 h-screen bg-[#01010c]" />}>
        <AdminSidebar />
      </Suspense>

      <div className="flex-1 flex flex-col items-center">
        {/* Topbar */}
        <div className="flex items-center justify-center h-12 gap-1.5 text-sm font-['JetBrains_Mono',monospace] text-slate-400/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pulse" />
          System Operational
        </div>

        {/* Content */}
        <div className="p-5 w-full md:w-[92%] overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
