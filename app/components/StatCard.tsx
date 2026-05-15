import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export default function StatCard({ label, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <div className="glass-card relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-default group">

      <div className="w-9 h-9 rounded-lg bg-[rgba(168,85,247,0.12)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center mb-4 group-hover:bg-[rgba(168,85,247,0.18)] transition-colors">
        <Icon size={16} className="text-[var(--purple-bright)]" />
      </div>

      <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--white-dim)] mb-1.5"
        style={{ fontFamily: "var(--font-mono)" }}>
        {label}
      </p>

      <p className="text-3xl font-bold text-[var(--white)] mb-1.5 tracking-tight"
        style={{ fontFamily: "var(--font-syne)" }}>
        {value}
      </p>

      <div className={cn("flex items-center gap-1 text-xs font-medium", trend === "up" ? "text-emerald-400" : "text-red-400")}>
        {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </div>
    </div>
  );
}
