import { NextResponse } from "next/server";

function rand(base: number, variance: number) {
  return Math.round(base + (Math.random() - 0.5) * variance * 2);
}

function randFloat(base: number, variance: number) {
  return parseFloat((base + (Math.random() - 0.5) * variance * 2).toFixed(1));
}

export async function GET() {
  const data = {
    revenue:     rand(84240, 1200),
    activeUsers: rand(2840, 40),
    churnRate:   randFloat(2.4, 0.3),
    mrr:         rand(12480, 300),
    revenueChange:    `+${randFloat(18.4, 1.5)}%`,
    usersChange:      `+${randFloat(6.2, 0.8)}%`,
    churnChange:      `-${randFloat(0.8, 0.2)}%`,
    mrrChange:        `+${randFloat(22.1, 2.0)}%`,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
