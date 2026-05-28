import Link from "next/link";
import { BarChart3, ChevronRight, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-on-background lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <div className="mb-10">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-on-surface-variant">
            DSN Group Dashboard
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white lg:text-6xl">
            Pilih tampilan dashboard
          </h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Link
            href="/dashboard-1"
            className="glass-card group flex min-h-72 flex-col justify-between rounded-xl p-6 lg:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="rounded-lg bg-accent-blue/10 p-4 text-accent-blue">
                <LayoutDashboard className="h-9 w-9" aria-hidden />
              </div>
              <ChevronRight
                className="h-6 w-6 text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-white"
                aria-hidden
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-accent-blue">
                Dashboard 1
              </p>
              <h2 className="text-3xl font-black text-white">
                Plant Performance
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
                Tampilan yang sudah ada, berisi mode multi dan single plant
                untuk sales, production, raw material, cost, dan HR.
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard-2"
            className="glass-card group flex min-h-72 flex-col justify-between rounded-xl border-[#f2be8c]/20 bg-[#0d1c2d]/70 p-6 lg:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div className="rounded-lg bg-[#f2be8c]/10 p-4 text-[#f2be8c]">
                <BarChart3 className="h-9 w-9" aria-hidden />
              </div>
              <ChevronRight
                className="h-6 w-6 text-on-surface-variant transition-transform group-hover:translate-x-1 group-hover:text-white"
                aria-hidden
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#f2be8c]">
                Dashboard 2
              </p>
              <h2 className="text-3xl font-black text-white">
                Executive Summary
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
                Tampilan ringkasan grup dengan KPI konsolidasi, leaderboard
                business unit, alerts, insights, dan trend analytics.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
