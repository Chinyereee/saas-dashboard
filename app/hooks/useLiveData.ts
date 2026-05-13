"use client";

import { useState, useEffect, useCallback } from "react";

export interface Stats {
  revenue: number;
  activeUsers: number;
  churnRate: number;
  mrr: number;
  revenueChange: string;
  usersChange: string;
  churnChange: string;
  mrrChange: string;
  timestamp: string;
}

export interface ChartPoint  { month: string; revenue: number; }
export interface TrafficItem { name: string; value: number; color: string; }
export interface Transaction {
  name: string; email: string; plan: string;
  amount: string; status: string; time: string;
  initials: string; color: string;
}

export interface LiveData {
  stats:        Stats | null;
  chart:        ChartPoint[];
  traffic:      TrafficItem[];
  transactions: Transaction[];
  loading:      boolean;
  lastUpdated:  Date | null;
  refresh:      () => void;
}

const INTERVAL_MS = 8000; // refresh every 8 seconds

export function useLiveData(): LiveData {
  const [stats,        setStats]        = useState<Stats | null>(null);
  const [chart,        setChart]        = useState<ChartPoint[]>([]);
  const [traffic,      setTraffic]      = useState<TrafficItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [lastUpdated,  setLastUpdated]  = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [s, c, tr, tx] = await Promise.all([
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/chart").then(r => r.json()),
        fetch("/api/traffic").then(r => r.json()),
        fetch("/api/transactions").then(r => r.json()),
      ]);
      setStats(s);
      setChart(c);
      setTraffic(tr);
      setTransactions(tx);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Live data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchAll]);

  return { stats, chart, traffic, transactions, loading, lastUpdated, refresh: fetchAll };
}
