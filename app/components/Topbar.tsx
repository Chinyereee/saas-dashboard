"use client";

import { Search, Bell, Mail } from "lucide-react";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <div className="h-[60px] flex-shrink-0 flex items-center gap-4 px-7 bg-[rgba(0,0,0,0.2)] backdrop-blur-[52px] border-b border-[rgba(255,255,255,0.15)] z-10">
      <h1 className="flex-1 text-base font-bold text-[var(--white)] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-syne)" }}>
        {title}
        <span className="ml-2 text-xs font-normal text-[var(--white-dim)]"
          style={{ fontFamily: "var(--font-inter)" }}>
          / Dashboard
        </span>
      </h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[rgba(0,0,0,0.28)] border border-[rgba(255,255,255,0.18)] rounded-lg px-3 py-1.5 w-52 focus-within:border-[var(--purple-bright)] focus-within:shadow-[0_0_0_3px_rgba(168,85,247,0.12)] transition-all">
        <Search size={12} className="text-[var(--white-dim)] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-xs text-[var(--white)] placeholder-[var(--white-dim)] w-full"
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="w-[34px] h-[34px] rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(0,0,0,0.28)] flex items-center justify-center text-[var(--white-mute)] hover:border-[var(--purple-bright)] hover:text-[var(--purple-bright)] hover:bg-[rgba(0,0,0,0.40)] transition-all relative">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--pink)] shadow-[0_0_6px_var(--pink)]" />
        </button>
        <button className="w-[34px] h-[34px] rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(0,0,0,0.28)] flex items-center justify-center text-[var(--white-mute)] hover:border-[var(--purple-bright)] hover:text-[var(--purple-bright)] hover:bg-[rgba(0,0,0,0.40)] transition-all">
          <Mail size={14} />
        </button>
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--pink)] flex items-center justify-center text-white text-[11px] font-bold cursor-pointer border border-[rgba(168,85,247,0.22)] hover:shadow-[0_0_0_3px_rgba(168,85,247,0.25)] transition-all"
          style={{ fontFamily: "var(--font-syne)" }}>
          CJ
        </div>
      </div>
    </div>
  );
}
