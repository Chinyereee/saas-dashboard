"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewPage from "./components/OverviewPage";
import { AnalyticsPage, CustomersPage, RevenuePage, SettingsPage } from "./components/OtherPages";

const pageTitles: Record<string, string> = {
  overview:  "Overview",
  analytics: "Analytics",
  customers: "Customers",
  revenue:   "Revenue",
  settings:  "Settings",
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar title={pageTitles[activePage]} />

        <main className="flex-1 overflow-y-auto p-7">
          {activePage === "overview"  && <OverviewPage />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "customers" && <CustomersPage />}
          {activePage === "revenue"   && <RevenuePage />}
          {activePage === "settings"  && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
