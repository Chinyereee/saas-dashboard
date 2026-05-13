"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import GlassCard from "./GlassCard";

// ─── shared ───────────────────────────────────────────────────
const Eyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="w-2 h-2 rounded-full bg-[var(--pink)] shadow-[0_0_10px_var(--pink)] animate-pulse2" />
    <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[var(--pink)]"
      style={{ fontFamily: "var(--font-mono)" }}>{label}</span>
  </div>
);

const PageHeader = ({ eyebrow, title, italic, sub }: { eyebrow: string; title: string; italic: string; sub: string }) => (
  <div className="mb-6">
    <Eyebrow label={eyebrow} />
    <h2 className="text-2xl font-bold text-[var(--white)] tracking-tight mb-1" style={{ fontFamily: "var(--font-syne)" }}>
      {title} <em className="not-italic bg-gradient-to-r from-[var(--purple-bright)] to-[var(--pink)] bg-clip-text text-transparent">{italic}</em>
    </h2>
    <p className="text-sm text-[var(--white-mute)]">{sub}</p>
  </div>
);

const Tag = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "pink" | "green" | "amber" | "red" }) => {
  const styles: Record<string, string> = {
    default: "bg-[rgba(168,85,247,0.10)] text-[#d8b4fe] border-[rgba(168,85,247,0.22)]",
    pink:    "bg-[rgba(244,114,182,0.10)] text-[var(--pink-bright)] border-[rgba(244,114,182,0.22)]",
    green:   "bg-[rgba(52,211,153,0.10)] text-emerald-300 border-[rgba(52,211,153,0.22)]",
    amber:   "bg-[rgba(251,191,36,0.10)] text-amber-300 border-[rgba(251,191,36,0.22)]",
    red:     "bg-[rgba(248,113,113,0.10)] text-red-300 border-[rgba(248,113,113,0.22)]",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${styles[variant]}`}
      style={{ fontFamily: "var(--font-mono)" }}>{children}</span>
  );
};

// ─── ANALYTICS ────────────────────────────────────────────────
const monthlyData = [
  { m: "Jan", v: 4200 }, { m: "Feb", v: 5100 }, { m: "Mar", v: 4800 },
  { m: "Apr", v: 6200 }, { m: "May", v: 7100 }, { m: "Jun", v: 6800 },
  { m: "Jul", v: 8400 }, { m: "Aug", v: 8000 }, { m: "Sep", v: 9200 },
  { m: "Oct", v: 10100 }, { m: "Nov", v: 10900 }, { m: "Dec", v: 12480 },
];

const funnel = [
  { label: "Visitors",   n: "48,200", pct: 100 },
  { label: "Sign-ups",   n: "29,884", pct: 62 },
  { label: "Trial start",n: "18,316", pct: 38 },
  { label: "Paid",       n: "6,748",  pct: 14 },
];

const countries = [
  { flag: "🇺🇸", name: "USA",       pct: 64 },
  { flag: "🇬🇧", name: "UK",        pct: 18 },
  { flag: "🇩🇪", name: "Germany",   pct: 10 },
  { flag: "🇳🇬", name: "Nigeria",   pct: 8  },
  { flag: "🇸🇬", name: "Singapore", pct: 4  },
];

export function AnalyticsPage() {
  return (
    <div className="animate-fadeUp">
      <PageHeader eyebrow="Analytics" title="Performance" italic="Insights" sub="Trends, conversion, and geographic breakdown." />

      <GlassCard className="mb-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-[var(--white)]" style={{ fontFamily: "var(--font-syne)" }}>Monthly Revenue</h3>
            <p className="text-xs text-[var(--white-dim)] mt-0.5">2025 · full year</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[rgba(168,85,247,0.22)] bg-[rgba(168,85,247,0.06)] text-[var(--white-soft)] hover:border-[var(--purple-bright)] hover:text-[var(--white)] transition-all">
            <Download size={12} /> Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="m" tick={{ fill: "rgba(245,243,255,0.25)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "rgba(17,10,31,0.95)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 12, fontFamily: "JetBrains Mono", fontSize: 11 }} itemStyle={{ color: "#c084fc" }} labelStyle={{ color: "rgba(245,243,255,0.4)" }} />
            <Bar dataKey="v" radius={[4, 4, 0, 0]}>
              {monthlyData.map((entry, i) => (
                <Cell key={i} fill={entry.v > 9000 ? "#a855f7" : "rgba(124,58,237,0.65)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="text-sm font-bold text-[var(--white)] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Conversion Funnel</h3>
          <p className="text-xs text-[var(--white-dim)] mb-4">Visitor → Paid</p>
          {funnel.map((f) => (
            <div key={f.label} className="flex items-center gap-3 py-2.5 border-b border-[rgba(168,85,247,0.06)] last:border-none">
              <span className="text-xs text-[var(--white-soft)] w-24">{f.label}</span>
              <div className="flex-1 h-1.5 bg-[rgba(168,85,247,0.08)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink)]" style={{ width: `${f.pct}%` }} />
              </div>
              <span className="text-xs text-[var(--pink-bright)] w-14 text-right" style={{ fontFamily: "var(--font-mono)" }}>{f.n}</span>
            </div>
          ))}
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-bold text-[var(--white)] mb-1" style={{ fontFamily: "var(--font-syne)" }}>Top Countries</h3>
          <p className="text-xs text-[var(--white-dim)] mb-4">By revenue share</p>
          {countries.map((c) => (
            <div key={c.name} className="flex items-center gap-3 mb-3 last:mb-0">
              <span className="text-xs w-24 text-[var(--white-soft)]">{c.flag} {c.name}</span>
              <div className="flex-1 h-1.5 bg-[rgba(168,85,247,0.08)] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)]" style={{ width: `${c.pct}%` }} />
              </div>
              <span className="text-xs text-[var(--purple-bright)] w-8 text-right" style={{ fontFamily: "var(--font-mono)" }}>{c.pct}%</span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────
const customers = [
  { name: "Amara Osei",    email: "amara@techcorp.io",  plan: "Enterprise", mrr: "$2,400", status: "Active",    loc: "🇬🇭 Ghana",     joined: "Jan 2025", initials: "AM", color: "from-purple-800 to-purple-500" },
  { name: "James Lee",     email: "j.lee@startup.co",   plan: "Pro",        mrr: "$99",    status: "Active",    loc: "🇺🇸 USA",       joined: "Mar 2025", initials: "JL", color: "from-violet-900 to-violet-600" },
  { name: "Sofia Petrov",  email: "sofia@agency.eu",    plan: "Pro",        mrr: "$99",    status: "Trial",     loc: "🇩🇪 Germany",   joined: "Dec 2025", initials: "SP", color: "from-emerald-900 to-emerald-600" },
  { name: "Kwame Nkrumah", email: "k.nkrumah@dev.gh",  plan: "Starter",    mrr: "$29",    status: "Active",    loc: "🇬🇭 Ghana",     joined: "Jun 2025", initials: "KN", color: "from-amber-900 to-amber-600" },
  { name: "Mei Rodriguez", email: "mei@fintech.sg",     plan: "Enterprise", mrr: "$2,400", status: "Cancelled", loc: "🇸🇬 Singapore", joined: "Aug 2025", initials: "MR", color: "from-red-900 to-red-600" },
  { name: "Luca Moretti",  email: "luca@ventures.it",   plan: "Pro",        mrr: "$99",    status: "Active",    loc: "🇮🇹 Italy",     joined: "Sep 2025", initials: "LM", color: "from-blue-900 to-blue-600" },
];

const statusVar: Record<string, "green" | "amber" | "red" | "pink"> = { Active: "green", Trial: "amber", Cancelled: "red" };
const planVar: Record<string, "default" | "pink"> = { Enterprise: "default", Pro: "pink", Starter: "default" };

export function CustomersPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Active", "Trial", "Cancelled"];
  const filtered = filter === "All" ? customers : customers.filter(c => c.status === filter);

  return (
    <div className="animate-fadeUp">
      <PageHeader eyebrow="Customers" title="Your" italic="Accounts" sub="284 total accounts across all plans." />

      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1.5 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border transition-all ${filter === f ? "border-[var(--pink)] text-[var(--pink)] bg-[rgba(244,114,182,0.08)]" : "border-[rgba(168,85,247,0.22)] text-[var(--white-dim)] hover:border-[var(--pink)] hover:text-[var(--pink)]"}`}
              style={{ fontFamily: "var(--font-mono)" }}>{f}</button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] text-white font-semibold hover:shadow-[0_8px_24px_rgba(168,85,247,0.4)] hover:translate-y-[-1px] transition-all"
          style={{ fontFamily: "var(--font-inter)" }}>
          + Add Customer
        </button>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Customer","Plan","MRR","Status","Location","Joined",""].map(h => (
                  <th key={h} className="text-left pb-3 text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--white-dim)] border-b border-[rgba(168,85,247,0.10)] px-3 first:pl-0 last:pr-0"
                    style={{ fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.name} className="hover:bg-[rgba(168,85,247,0.04)] transition-colors">
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[9px] font-bold`}
                        style={{ fontFamily: "var(--font-syne)" }}>{c.initials}</div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--white)]">{c.name}</p>
                        <p className="text-[10px] text-[var(--white-dim)]" style={{ fontFamily: "var(--font-mono)" }}>{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3"><Tag variant={planVar[c.plan] ?? "default"}>{c.plan}</Tag></td>
                  <td className="py-3 px-3 text-xs font-semibold text-[var(--white)]" style={{ fontFamily: "var(--font-mono)" }}>{c.mrr}</td>
                  <td className="py-3 px-3"><Tag variant={statusVar[c.status] ?? "default"}>{c.status}</Tag></td>
                  <td className="py-3 px-3 text-xs text-[var(--white-mute)]">{c.loc}</td>
                  <td className="py-3 px-3 text-[11px] text-[var(--white-dim)]" style={{ fontFamily: "var(--font-mono)" }}>{c.joined}</td>
                  <td className="py-3 px-3 pr-0">
                    <button className="text-[10px] px-3 py-1 rounded-lg border border-[rgba(168,85,247,0.22)] bg-[rgba(168,85,247,0.06)] text-[var(--white-soft)] hover:border-[var(--purple-bright)] hover:text-[var(--white)] transition-all"
                      style={{ fontFamily: "var(--font-inter)" }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── REVENUE ──────────────────────────────────────────────────
export function RevenuePage() {
  return (
    <div className="animate-fadeUp">
      <PageHeader eyebrow="Revenue" title="Financial" italic="Overview" sub="Monthly recurring revenue and growth breakdown." />

      {/* MRR Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.22)] bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(244,114,182,0.08)] p-8 mb-5">
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--white-dim)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Monthly Recurring Revenue</p>
            <p className="text-5xl font-bold text-[var(--white)] tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)" }}>$12,480</p>
            <p className="text-sm text-emerald-400 flex items-center gap-1.5">↑ +22.1% from last month</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--white-dim)] mb-1" style={{ fontFamily: "var(--font-mono)" }}>Annual Run Rate</p>
            <p className="text-3xl font-bold text-[var(--white)] tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>$149,760</p>
            <button className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] text-white font-semibold hover:shadow-[0_8px_24px_rgba(168,85,247,0.4)] transition-all ml-auto"
              style={{ fontFamily: "var(--font-inter)" }}>
              <Download size={12} /> Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "New MRR",       value: "$3,240", change: "+14%", t: "up" },
          { label: "Expansion MRR", value: "$1,840", change: "+8%",  t: "up" },
          { label: "Churned MRR",   value: "$420",   change: "-2%",  t: "down" },
        ].map(s => (
          <div key={s.label} className="relative overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.22)] bg-[rgba(17,10,31,0.55)] p-5">
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--white-dim)] mb-2" style={{ fontFamily: "var(--font-mono)" }}>{s.label}</p>
            <p className="text-2xl font-bold text-[var(--white)] mb-1" style={{ fontFamily: "var(--font-syne)" }}>{s.value}</p>
            <p className={`text-xs ${s.t === "up" ? "text-emerald-400" : "text-red-400"}`}>{s.change}</p>
          </div>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-sm font-bold text-[var(--white)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>Revenue by Plan</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {["Plan","Accounts","MRR","Share","Growth"].map(h => (
                  <th key={h} className="text-left pb-3 text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--white-dim)] border-b border-[rgba(168,85,247,0.10)] px-3 first:pl-0 last:pr-0"
                    style={{ fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { plan: "Enterprise", v: "default", accounts: 12,  mrr: "$28,800", pct: 58, growth: "+31%" },
                { plan: "Pro",        v: "pink",    accounts: 84,  mrr: "$8,316",  pct: 33, growth: "+18%" },
                { plan: "Starter",    v: "default", accounts: 188, mrr: "$5,452",  pct: 22, growth: "+9%"  },
              ].map(r => (
                <tr key={r.plan} className="hover:bg-[rgba(168,85,247,0.04)] transition-colors">
                  <td className="py-3 px-3 pl-0"><Tag variant={r.v as any}>{r.plan}</Tag></td>
                  <td className="py-3 px-3 text-xs text-[var(--white-soft)]">{r.accounts}</td>
                  <td className="py-3 px-3 text-xs font-semibold text-[var(--white)]" style={{ fontFamily: "var(--font-mono)" }}>{r.mrr}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-[rgba(168,85,247,0.1)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)]" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-[10px] text-[var(--white-dim)]" style={{ fontFamily: "var(--font-mono)" }}>{r.pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 pr-0"><Tag variant="green">{r.growth}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────
export function SettingsPage() {
  const [toggles, setToggles] = useState({ email: true, churn: true, digest: false });

  return (
    <div className="animate-fadeUp">
      <PageHeader eyebrow="Settings" title="Account" italic="Settings" sub="Manage your profile, plan, and preferences." />

      <div className="grid grid-cols-2 gap-4">
        {/* Profile form */}
        <GlassCard>
          <h3 className="text-sm font-bold text-[var(--white)] mb-5" style={{ fontFamily: "var(--font-syne)" }}>Profile</h3>
          {[
            { label: "Full Name", value: "Chinyere John-Nnah" },
            { label: "Email",     value: "chinyere@nexusai.io" },
            { label: "Timezone",  value: "Africa/Lagos (UTC+1)" },
          ].map(f => (
            <div key={f.label} className="mb-4">
              <label className="block text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--white-dim)] mb-1.5"
                style={{ fontFamily: "var(--font-mono)" }}>{f.label}</label>
              <input defaultValue={f.value}
                className="w-full bg-[rgba(168,85,247,0.05)] border border-[rgba(168,85,247,0.22)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--white)] outline-none focus:border-[var(--purple-bright)] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.12)] transition-all"
                style={{ fontFamily: "var(--font-inter)" }} />
            </div>
          ))}
          <button className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] text-white font-semibold hover:shadow-[0_8px_24px_rgba(168,85,247,0.4)] hover:translate-y-[-1px] transition-all"
            style={{ fontFamily: "var(--font-inter)" }}>
            Save Changes
          </button>
        </GlassCard>

        <div className="flex flex-col gap-4">
          {/* Plan */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.22)] bg-gradient-to-br from-[rgba(124,58,237,0.12)] to-[rgba(244,114,182,0.06)] p-5">
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent" />
            <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] text-white mb-3 inline-block"
              style={{ fontFamily: "var(--font-mono)" }}>Pro Plan</span>
            <p className="text-3xl font-bold text-[var(--white)] mb-3" style={{ fontFamily: "var(--font-syne)" }}>
              $99<span className="text-sm text-[var(--white-dim)] font-normal">/month</span>
            </p>
            {["Unlimited dashboards","Up to 10,000 users","Advanced analytics","Priority support"].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs text-[var(--white-soft)] mb-2">
                <span className="text-[var(--purple-bright)]">✓</span>{f}
              </div>
            ))}
            <button className="w-full mt-4 text-sm py-2.5 rounded-lg bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] text-white font-semibold hover:shadow-[0_8px_24px_rgba(168,85,247,0.4)] transition-all justify-center"
              style={{ fontFamily: "var(--font-inter)" }}>
              Upgrade to Enterprise
            </button>
          </div>

          {/* Notifications */}
          <GlassCard>
            <h3 className="text-sm font-bold text-[var(--white)] mb-4" style={{ fontFamily: "var(--font-syne)" }}>Notifications</h3>
            {[
              { key: "email", label: "Email alerts",   sub: "New signups & payments" },
              { key: "churn", label: "Churn alerts",   sub: "When a customer cancels" },
              { key: "digest",label: "Weekly digest",  sub: "Summary every Monday" },
            ].map(({ key, label, sub }) => (
              <div key={key} className="flex items-center justify-between py-3.5 border-b border-[rgba(168,85,247,0.06)] last:border-none">
                <div>
                  <p className="text-sm font-medium text-[var(--white-soft)]">{label}</p>
                  <p className="text-xs text-[var(--white-dim)] mt-0.5">{sub}</p>
                </div>
                <button onClick={() => setToggles(t => ({ ...t, [key]: !t[key as keyof typeof t] }))}
                  className={`w-10 h-[22px] rounded-full border relative transition-all duration-300 flex-shrink-0 ${toggles[key as keyof typeof toggles] ? "bg-gradient-to-r from-[var(--purple-soft)] to-[var(--purple-bright)] border-[var(--purple-bright)] shadow-[0_0_12px_rgba(168,85,247,0.35)]" : "bg-[rgba(168,85,247,0.12)] border-[rgba(168,85,247,0.22)]"}`}>
                  <span className={`absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all duration-300 ${toggles[key as keyof typeof toggles] ? "left-[22px]" : "left-[3px]"}`} />
                </button>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
