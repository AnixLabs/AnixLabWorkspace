import { Panel, PanelHeader } from "@/components/ui/Panel";
import Link from "next/link";

interface DashboardQuickAction {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

const quickActionData: DashboardQuickAction[] = [
  { label: "All Users", href: "/users", icon: "👥", desc: "Browse & manage" },
  { label: "Create User", href: "/users/create", icon: "➕", desc: "Add new account" },
];

export default function DashboardQuickActions() {
  return (
    <Panel>
      <PanelHeader>Quick Actions</PanelHeader>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActionData.map((a) => (
          <Link key={a.label} href={a.href}>
            <div className="rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all p-4 text-center group">
              <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform inline-block">
                {a.icon}
              </div>
              <p className="text-sm font-semibold text-zinc-200">{a.label}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">{a.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </Panel>
  );
}
