import { NextResponse } from "next/server";

const pool = [
  { name: "Amara Osei",     email: "amara@techcorp.io",  plan: "Enterprise", amount: 2400, status: "Paid",    initials: "AM", color: "from-purple-800 to-purple-500" },
  { name: "James Lee",      email: "j.lee@startup.co",   plan: "Pro",        amount: 99,   status: "Paid",    initials: "JL", color: "from-violet-900 to-violet-600" },
  { name: "Sofia Petrov",   email: "sofia@agency.eu",    plan: "Pro",        amount: 99,   status: "Pending", initials: "SP", color: "from-emerald-900 to-emerald-600" },
  { name: "Kwame Nkrumah",  email: "k.nkrumah@dev.gh",  plan: "Starter",    amount: 29,   status: "Paid",    initials: "KN", color: "from-amber-900 to-amber-600" },
  { name: "Mei Rodriguez",  email: "mei@fintech.sg",     plan: "Enterprise", amount: 2400, status: "Failed",  initials: "MR", color: "from-red-900 to-red-600" },
  { name: "Luca Moretti",   email: "luca@ventures.it",   plan: "Pro",        amount: 99,   status: "Paid",    initials: "LM", color: "from-blue-900 to-blue-600" },
  { name: "Yuki Tanaka",    email: "yuki@saas.jp",       plan: "Enterprise", amount: 2400, status: "Paid",    initials: "YT", color: "from-pink-900 to-pink-600" },
  { name: "Fatima Al-Amin", email: "fatima@corp.ae",     plan: "Starter",    amount: 29,   status: "Paid",    initials: "FA", color: "from-teal-900 to-teal-600" },
];

function minutesAgo(n: number) {
  const d = new Date(Date.now() - n * 60000);
  return `${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
}

export async function GET() {
  // shuffle and pick 5
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  const data = shuffled.map((t, i) => ({
    ...t,
    amount: `$${t.amount.toLocaleString()}`,
    time: minutesAgo(i * 3 + Math.round(Math.random() * 4)),
  }));

  return NextResponse.json(data);
}
