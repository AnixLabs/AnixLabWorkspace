"use client";

import { signOut } from "@shared/auth/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiBarChartSquare, BiChevronRight, BiLogOut, BiMenu, BiX } from "react-icons/bi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineLocalActivity,
  MdOutlinePeople,
  MdOutlineSearch,
} from "react-icons/md";
import { Logo } from "./logo";

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: MdOutlineAdminPanelSettings },
      { name: "Analytics", href: "/analytics", icon: BiBarChartSquare },
      { name: "Activity Log", href: "/activity", icon: MdOutlineLocalActivity },
    ],
  },
  {
    label: "Users",
    items: [
      { name: "Search User", href: "/search-user", icon: MdOutlineSearch },
      { name: "All Users", href: "/users", icon: MdOutlinePeople },
    ],
  },
  {
    label: "Finance",
    items: [{ name: "Transactions", href: "/transactions", icon: BiBarChartSquare }],
  },
  {
    label: "Communications",
    items: [
      { name: "Broadcast", href: "/broadcast", icon: MdOutlineSearch },
      { name: "Notifications", href: "/notifications", icon: MdOutlineSearch },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/settings", icon: MdOutlineAdminPanelSettings },
      { name: "Security", href: "/security", icon: MdOutlineLocalActivity },
      { name: "Alerts", href: "/alerts", icon: MdOutlineLocalActivity },
    ],
  },
];

function SidebarContent({
  pathname,
  closeSidebar,
}: {
  pathname: string;
  closeSidebar: () => void;
}) {
  return (
    <aside className="w-70 h-screen bg-[#01010c] border-r border-indigo-500/15 flex flex-col font-['JetBrains_Mono','Fira_Code',monospace]">
      {/* Header */}
      <Logo />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(99,102,241,0.3)_transparent]">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <span className="block text-[9px] uppercase tracking-[0.15em] text-slate-400/40 px-2 mb-1">
              {group.label}
            </span>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={[
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] no-underline transition-all duration-150 mb-0.5",
                    isActive
                      ? "bg-theme-500/15 text-theme-400 border border-theme-500/20"
                      : "text-slate-400/70 border border-transparent hover:bg-theme-500/8 hover:text-white/90",
                  ].join(" ")}
                  onClick={closeSidebar}
                >
                  <Icon size={16} className="shrink-0 opacity-80" />
                  <span>{item.name}</span>
                  {isActive && <BiChevronRight size={14} className="ml-auto opacity-60" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-theme-500/12 flex items-center gap-2.5 shrink-0">
        <div className="flex-1 flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-theme-500 to-theme-500 flex items-center justify-center text-[13px] font-bold text-white shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-white/90 font-semibold leading-none mb-0.5">Admin</p>
            <p className="text-[10px] text-theme-500 leading-none">Owner</p>
          </div>
        </div>
        <button
          title="Logout"
          className="w-8 h-8 rounded-lg border border-theme-500/20 bg-transparent text-slate-400/60 flex items-center justify-center cursor-pointer transition-all duration-150 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          onClick={() =>
            void signOut({
              fetchOptions: { onSuccess: () => window.location.reload() },
            })
          }
        >
          <BiLogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-45 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`max-md:fixed top-0 left-0 z-55 h-screen md:-ml-2 transition-transform duration-300 ease-in-out ${
          isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-70"
        }`}
      >
        <SidebarContent pathname={pathname} closeSidebar={() => setIsOpen(false)} />
        <button
          className="md:hidden fixed top-2 -right-12 z-60 w-9 h-9 bg-[#0a0a0f] border border-theme-500/30 rounded-lg flex items-center justify-center text-theme-400 shadow-lg cursor-pointer transition-colors hover:border-theme-400/60"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <BiX size={20} /> : <BiMenu size={20} />}
        </button>
      </div>
    </>
  );
}
