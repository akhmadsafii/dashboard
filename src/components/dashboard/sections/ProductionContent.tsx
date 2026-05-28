import React from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Factory,
} from "lucide-react";
import type { ProductionDashboardData, PlantStatus } from "@/types";

interface ProductionContentProps {
  data: ProductionDashboardData;
}

function getStatusColor(status: PlantStatus | string): string {
  switch (status) {
    case "Optimal":
    case "Target":
    case "Stable":
      return "bg-emerald-500";
    case "Alert":
    case "Watch":
      return "bg-amber-500";
    case "Critical":
      return "bg-red-500";
    default:
      return "bg-[#f2be8c]";
  }
}

export function ProductionContent({ data }: ProductionContentProps) {
  return (
    <>
      {/* TOP ROW: Summary KPIs */}
      <section className="grid h-32 shrink-0 grid-cols-5 gap-4">
        <div className="flex flex-col justify-between rounded-lg border-l-4 border-[#f2be8c] border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
            TOTAL PRODUCTION OUTPUT
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-[#f2be8c]">{data.output.value}</span>
            <span className="text-sm text-[#d4c4b7]">{data.output.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <TrendingUp className="h-4 w-4" aria-hidden />
            <span className="font-mono text-xs font-medium">{data.output.target} vs Target</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
            OVERALL EFFECTIVENESS (OEE)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-white">{data.oee.value}</span>
            <span className="text-sm text-[#d4c4b7]">{data.oee.unit}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-[#f2be8c]" style={{ width: `${data.oee.progress}%` }} />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
            ENERGY CONSUMPTION INDEX
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-white">{data.energy.value}</span>
            <span className="text-sm text-[#d4c4b7]">{data.energy.unit}</span>
          </div>
          <span className="font-mono text-xs text-[#d4c4b7]">Status: {data.energy.status}</span>
        </div>

        <div className="flex flex-col justify-between rounded-lg border-l-4 border-l-red-500 border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
            DOWNTIME TOTAL
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-red-500">{data.downtime.value}</span>
            <span className="text-sm text-red-400">{data.downtime.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <TrendingDown className="h-4 w-4" aria-hidden />
            <span className="font-mono text-xs font-medium">Trend: {data.downtime.trend}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
            QUALITY PASS RATE
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-white">{data.quality.value}</span>
            <span className="text-sm text-[#d4c4b7]">{data.quality.unit}</span>
          </div>
          <span className="font-mono text-xs text-emerald-400">{data.quality.status}</span>
        </div>
      </section>

      {/* MIDDLE ROW: Plant Performance Matrix & Sidebar */}
      <section className="grid min-h-0 flex-1 grid-cols-12 gap-4">
        <section className="col-span-9 flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#122131]/40 backdrop-blur-xl">
          <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-white/[0.03] px-6 py-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#f2be8c]">
              PRODUCTION PERFORMANCE BY BUSINESS UNIT & PLANT
            </span>
            <div className="flex gap-4">
              {["Optimal", "Alert", "Critical"].map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
                  <span className="text-[10px] font-bold uppercase text-[#d4c4b7]">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <thead className="bg-[#1c2b3c]/60">
                <tr className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                  <th className="px-6 py-4">UNIT / PLANT NAME</th>
                  <th className="px-6 py-4 text-right">OUTPUT (M²)</th>
                  <th className="px-6 py-4 text-right">OEE %</th>
                  <th className="px-6 py-4 text-right">EFF. GAP</th>
                  <th className="px-6 py-4 text-right">YIELD %</th>
                  <th className="px-6 py-4 text-center">7-DAY TREND</th>
                  <th className="px-6 py-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.plants.map((division) => (
                  <React.Fragment key={division.division}>
                    <tr className="bg-[#f2be8c]/5">
                      <td className="px-6 py-2 font-mono text-[10px] font-semibold uppercase text-[#f2be8c]" colSpan={7}>
                        {division.division}
                      </td>
                    </tr>
                    {division.items.map((plant) => (
                      <tr key={plant.name} className="transition-colors hover:bg-white/5">
                        <td className="px-6 py-3 text-sm text-white">{plant.name}</td>
                        <td className="px-6 py-3 text-right font-mono text-sm text-[#d4c4b7]">{plant.output}</td>
                        <td className={`px-6 py-3 text-right font-mono text-sm ${plant.status === "Critical" ? "text-red-500" : "text-[#d4c4b7]"}`}>
                          {plant.oee}%
                        </td>
                        <td className={`px-6 py-3 text-right font-mono text-sm ${plant.gap.startsWith("-") ? "text-emerald-400" : "text-red-500"}`}>
                          {plant.gap}
                        </td>
                        <td className="px-6 py-3 text-right font-mono text-sm text-[#d4c4b7]">{plant.yield}%</td>
                        <td className="px-6 py-3">
                          <div className="flex h-8 items-end justify-center gap-1">
                            {plant.trend.map((height, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-t ${getStatusColor(plant.status)} ${i === plant.trend.length - 1 ? "" : "opacity-40"}`}
                                style={{ height: `${height}%` }}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-center">
                          <span className={`inline-block h-3 w-3 rounded-full ${getStatusColor(plant.status)}`} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SIDEBAR: Anomalies & Insights */}
        <aside className="col-span-3 flex min-h-0 flex-col gap-4 overflow-hidden">
          {/* Anomalies */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
            <div className="mb-4 flex shrink-0 items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-red-500">
                PRODUCTION ANOMALIES
              </span>
            </div>
            <div className="space-y-3 overflow-auto">
              {data.anomalies.map((anomaly, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 ${anomaly.bgColor} ${anomaly.borderColor}`}
                  style={anomaly.shadowColor ? { boxShadow: `0 0 15px ${anomaly.shadowColor}` } : {}}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`font-mono text-[10px] font-bold uppercase ${
                        anomaly.type === "Critical"
                          ? "text-red-500"
                          : anomaly.type === "Alert"
                            ? "text-amber-500"
                            : "text-[#d4c4b7]"
                      }`}
                    >
                      {anomaly.type}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(anomaly.type === "Critical" ? "Critical" : anomaly.type === "Alert" ? "Alert" : "Optimal")}`} />
                  </div>
                  <p className="mt-1 text-xs leading-normal text-[#d4c4b7]">{anomaly.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="shrink-0 rounded-lg border-t-2 border-t-[#f2be8c] border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#f2be8c]" aria-hidden />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#f2be8c]">
                STRATEGIC AI INSIGHTS
              </span>
            </div>
            <p className="rounded bg-[#482904]/20 p-2 text-xs leading-tight italic text-[#482904]">
              &ldquo;Opportunity: Shift production of Grade B to Plant B to save 12% in energy costs based on current grid rates.&rdquo;
            </p>
          </div>

          {/* Value at Risk */}
          <div className="shrink-0 flex flex-col items-center justify-center rounded-lg border border-red-500/10 bg-red-500/5 p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-red-400">VALUE AT RISK</span>
            <span className="mt-1 text-[32px] font-bold text-red-500">$42,800</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Potential Daily Loss</span>
          </div>
        </aside>
      </section>

      {/* BOTTOM ROW: Intelligence Sections */}
      <section className="grid h-[180px] shrink-0 grid-cols-12 gap-4">
        {/* Top SKUs */}
        <section className="col-span-4 flex flex-col rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            TOP SKUS BY VOLUME
          </span>
          <div className="space-y-3">
            {data.skus.map((sku, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white/5">
                    <Factory className="h-5 w-5 text-[#f2be8c]" aria-hidden />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{sku.name}</div>
                    <div className="text-[10px] uppercase text-[#d4c4b7]">{sku.division}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-[#d4c4b7]">{sku.volume}</div>
                  <div className="text-[10px] text-emerald-400">{sku.eff} EFF</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Machine Health */}
        <section className="col-span-4 flex flex-col rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            MACHINE HEALTH & MAINTENANCE
          </span>
          <div className="space-y-4">
            {data.machines.map((machine, idx) => (
              <div key={idx}>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="truncate text-[#d4c4b7]">{machine.name}</span>
                  <span className={`font-bold ${machine.statusColor}`}>{machine.status}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#1c2b3c]">
                  <div
                    className={`h-full ${
                      machine.health > 50 ? "bg-[#f2be8c]" : machine.health > 0 ? "bg-amber-500" : "bg-[#c8c6c5]"
                    }`}
                    style={{ width: `${machine.health}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Energy Mix */}
        <section className="col-span-4 flex flex-col rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            ENERGY MIX & RESOURCE USAGE
          </span>
          <div className="flex flex-1 items-center gap-6">
            <div className="relative h-28 w-28">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle className="text-[#1c2b3c]" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="10" />
                <circle className="text-[#f2be8c]" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251" strokeDashoffset="90" strokeWidth="10" />
                <circle className="text-[#482904]" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251" strokeDashoffset="200" strokeWidth="10" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-white">65%</span>
                <span className="text-[8px] uppercase text-[#d4c4b7]">Renewable</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {[
                { label: "Timber", percent: "82%", color: "bg-[#f2be8c]" },
                { label: "Glue/Resin", percent: "12%", color: "bg-[#482904]" },
                { label: "Energy", percent: "6%", color: "bg-[#c8c6c5]" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-[#d4c4b7]">{item.label}</span>
                  </div>
                  <span className="font-mono text-sm">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
