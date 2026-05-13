import { NextResponse } from "next/server";

export async function GET() {
  // generate 4 values that sum to 100
  const a = Math.round(35 + Math.random() * 6);
  const b = Math.round(25 + Math.random() * 6);
  const c = Math.round(18 + Math.random() * 4);
  const d = 100 - a - b - c;

  const data = [
    { name: "Organic", value: a, color: "#a855f7" },
    { name: "Referral", value: b, color: "#c084fc" },
    { name: "Direct",   value: c, color: "#f472b6" },
    { name: "Paid",     value: d, color: "rgba(244,114,182,0.4)" },
  ];

  return NextResponse.json(data);
}
