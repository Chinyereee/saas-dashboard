import { NextResponse } from "next/server";

const base = [4200, 5100, 4800, 6200, 7100, 6800, 8400, 8000, 9200, 10100, 10900, 12480];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export async function GET() {
  const data = base.map((v, i) => ({
    month: months[i],
    revenue: Math.round(v + (Math.random() - 0.5) * 400),
  }));

  return NextResponse.json(data);
}
