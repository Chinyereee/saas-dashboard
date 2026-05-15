"use client";

import { LayoutDashboard, LineChart, Users, CreditCard, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "overview",   label: "Overview",   icon: LayoutDashboard },
  { id: "analytics",  label: "Analytics",  icon: LineChart },
  { id: "customers",  label: "Customers",  icon: Users,       badge: "284" },
  { id: "revenue",    label: "Revenue",    icon: CreditCard },
  { id: "settings",   label: "Settings",   icon: Settings },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="flex flex-col h-screen w-[248px] flex-shrink-0 border-r border-[rgba(255,255,255,0.15)] bg-[rgba(0,0,0,0.25)] backdrop-blur-[52px] z-10">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[rgba(255,255,255,0.15)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#c084fc] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_rgba(168,85,247,0.35)] flex-shrink-0"
          style={{ fontFamily: "var(--font-syne)" }}>
          N
        </div>
        <span className="font-bold text-[var(--white)] text-base tracking-wide" style={{ fontFamily: "var(--font-syne)" }}>
          Nexus<span className="text-[var(--purple-bright)]">AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-0.5">
        <p className="px-3 pt-2 pb-1.5 text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--white-dim)]"
          style={{ fontFamily: "var(--font-mono)" }}>
          Main
        </p>

        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative text-left",
              activePage === id
                ? "bg-[rgba(168,85,247,0.14)] text-[var(--white)] border border-[rgba(255,255,255,0.15)]"
                : "text-[var(--white-mute)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[var(--white-soft)]"
            )}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {activePage === id && (
              <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r bg-gradient-to-b from-[var(--purple-bright)] to-[var(--pink)] shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
            )}
            <Icon size={15} className={cn("flex-shrink-0", activePage === id ? "text-[var(--purple-bright)]" : "")} />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(244,114,182,0.18)] text-[var(--pink-bright)] border border-[rgba(244,114,182,0.25)]"
                style={{ fontFamily: "var(--font-mono)" }}>
                {badge}
              </span>
            )}
          </button>
        ))}

        <p className="px-3 pt-4 pb-1.5 text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--white-dim)]"
          style={{ fontFamily: "var(--font-mono)" }}>
          System
        </p>
        <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-[var(--white-mute)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[var(--white-soft)] transition-all duration-200">
          <HelpCircle size={15} className="flex-shrink-0" />
          <span>Help &amp; Docs</span>
        </button>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.15)]">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[rgba(168,85,247,0.08)] cursor-pointer transition-all duration-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--pink)] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 border border-[rgba(255,255,255,0.15)]"
            style={{ fontFamily: "var(--font-syne)" }}>
            CJ
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--white-soft)] truncate">Chinyere J.</p>
            <p className="text-[10px] text-[var(--white-dim)]" style={{ fontFamily: "var(--font-mono)" }}>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
