import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusAI — SaaS Dashboard",
  description: "A clean, data-rich SaaS analytics dashboard with revenue charts, user metrics, and activity feeds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {children}
      </body>
    </html>
  );
}
