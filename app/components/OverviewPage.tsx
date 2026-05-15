"use client";

import { DollarSign, Users, RotateCcw, PieChart, RefreshCw } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart as RPieChart, Pie, Cell,
} from "recharts";
import StatCard from "./StatCard";
import GlassCard from "./GlassCard";
import { useLiveData } from "../hooks/useLiveData";

const statusStyles: Record<string, string> = {
  Paid:    "bg-[rgba(52,211,153,0.10)] text-emerald-300 border border-[rgba(52,211,153,0.22)]",
  Pending: "bg-[rgba(251,191,36,0.10)] text-amber-300 border border-[rgba(251,191,36,0.22)]",
  Failed:  "bg-[rgba(248,113,113,0.10)] text-red-300 border border-[rgba(248,113,113,0.22)]",
};
const planStyles: Record<string, string> = {
  Enterprise: "bg-[rgba(168,85,247,0.10)] text-[#d8b4fe] border border-[rgba(168,85,247,0.22)]",
  Pro:        "bg-[rgba(244,114,182,0.10)] text-[var(--pink-bright)] border border-[rgba(244,114,182,0.22)]",
  Starter:    "bg-[rgba(245,243,255,0.06)] text-[var(--white-dim)] border border-[rgba(245,243,255,0.12)]",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[rgba(0,0,0,0.85)] border border-[rgba(255,255,255,0.15)] rounded-xl px-4 py-3 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
      <p className="text-[var(--white-dim)] mb-1">{label}</p>
      <p className="text-[var(--purple-bright)] font-semibold">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

export default function OverviewPage() {
  const { stats, chart, traffic, transactions, loading, lastUpdated, refresh } = useLiveData();

  return (
    <div className="animate-fadeUp">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--pink)] shadow-[0_0_10px_var(--pink)] animate-pulse2" />
            <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[var(--pink)]" style={{ fontFamily: "var(--font-mono)" }}>Dashboard</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--white)] tracking-tight mb-1" style={{ fontFamily: "var(--font-syne)" }}>
            Good morning, <em className="not-italic bg-gradient-to-r from-[var(--purple-bright)] to-[var(--pink)] bg-clip-text text-transparent">Chinyere</em>
          </h2>
          <p className="text-sm text-[var(--white-mute)]">Here&apos;s what&apos;s happening with NexusAI today.</p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          {lastUpdated && (
            <span className="text-[10px] text-[var(--white-dim)]" style={{ fontFamily: "var(--font-mono)" }}>
              {lastUpdated.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium" style={{ fontFamily: "var(--font-mono)" }}>LIVE</span>
          </div>
          <button onClick={refresh} className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(0,0,0,0.28)] flex items-center justify-center text-[var(--white-mute)] hover:text-[var(--purple-bright)] hover:border-[var(--purple-bright)] transition-all">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Total Revenue" value={stats ? `$${stats.revenue.toLocaleString()}` : "—"} change={stats?.revenueChange ?? ""} trend="up"   icon={DollarSign} />
        <StatCard label="Active Users"  value={stats ? stats.activeUsers.toLocaleString()     : "—"} change={stats?.usersChange   ?? ""} trend="up"   icon={Users} />
        <StatCard label="Churn Rate"    value={stats ? `${stats.churnRate}%`                  : "—"} change={stats?.churnChange   ?? ""} trend="down" icon={RotateCcw} />
        <StatCard label="MRR"           value={stats ? `$${stats.mrr.toLocaleString()}`       : "—"} change={stats?.mrrChange     ?? ""} trend="up"   icon={PieChart} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-[1.8fr_1fr] gap-4 mb-5">
        <GlassCard>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-[var(--white)]" style={{ fontFamily: "var(--font-syne)" }}>Revenue Trend</h3>
              <p className="text-xs text-[var(--white-dim)] mt-0.5">Jan – Dec · live</p>
            </div>
            <div className="flex gap-1">
              {["1Y","6M","1M"].map((t,i) => (
                <button key={t} className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${i===0?"border-[var(--purple-bright)] text-[var(--purple-bright)] bg-[rgba(168,85,247,0.10)]":"border-[rgba(255,255,255,0.18)] text-[var(--white-dim)] hover:border-[var(--purple-bright)] hover:text-[var(--purple-bright)]"}`}
                  style={{ fontFamily:"var(--font-mono)" }}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={chart} margin={{ top:0, right:0, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#f472b6"/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill:"rgba(245,243,255,0.25)", fontSize:10, fontFamily:"JetBrains Mono" }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip content={<CustomTooltip/>}/>
              <Area type="monotone" dataKey="revenue" stroke="url(#lineGrad)" strokeWidth={1.5} fill="url(#grad1)" dot={false} activeDot={{ r:4, fill:"#f472b6", stroke:"none" }}/>
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[var(--white)]" style={{ fontFamily:"var(--font-syne)" }}>Traffic Sources</h3>
            <p className="text-xs text-[var(--white-dim)] mt-0.5">Updates every 8s</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ResponsiveContainer width={130} height={130}>
              <RPieChart>
                <Pie data={traffic} cx="50%" cy="50%" innerRadius={42} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {traffic.map((e,i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
              </RPieChart>
            </ResponsiveContainer>
            <div className="w-full">
              {traffic.map(item => (
                <div key={item.name} className="flex items-center gap-2 py-1.5 border-b border-[rgba(168,85,247,0.06)] last:border-none">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:item.color }}/>
                  <span className="flex-1 text-xs text-[var(--white-mute)]">{item.name}</span>
                  <span className="text-xs text-[var(--white-soft)] tabular-nums" style={{ fontFamily:"var(--font-mono)" }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Transactions */}
      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-[var(--white)]" style={{ fontFamily:"var(--font-syne)" }}>Recent Transactions</h3>
            <p className="text-xs text-[var(--white-dim)] mt-0.5">Refreshes automatically</p>
          </div>
          <button onClick={refresh} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(0,0,0,0.28)] text-[var(--white-soft)] hover:border-[var(--purple-bright)] hover:text-[var(--white)] transition-all"
            style={{ fontFamily:"var(--font-inter)" }}>
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Customer","Plan","Amount","Status","Time"].map(h => (
                  <th key={h} className="text-left pb-3 text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--white-dim)] border-b border-[rgba(168,85,247,0.10)] px-3 first:pl-0 last:pr-0"
                    style={{ fontFamily:"var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t,i) => (
                <tr key={`${t.name}-${i}`} className="hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}
                        style={{ fontFamily:"var(--font-syne)" }}>{t.initials}</div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--white)]">{t.name}</p>
                        <p className="text-[10px] text-[var(--white-dim)]" style={{ fontFamily:"var(--font-mono)" }}>{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded ${planStyles[t.plan]}`} style={{ fontFamily:"var(--font-mono)" }}>{t.plan}</span></td>
                  <td className="py-3 px-3 text-xs font-semibold text-[var(--white)] tabular-nums" style={{ fontFamily:"var(--font-mono)" }}>{t.amount}</td>
                  <td className="py-3 px-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded ${statusStyles[t.status]}`} style={{ fontFamily:"var(--font-mono)" }}>{t.status}</span></td>
                  <td className="py-3 px-3 pr-0 text-[11px] text-[var(--white-dim)]" style={{ fontFamily:"var(--font-mono)" }}>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
