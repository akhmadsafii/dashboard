"use client";

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Brain,
  Clock,
  Factory,
  Filter,
  Info,
  Lightbulb,
  LineChart,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Truck,
  UserRound,
} from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { ExecutiveKPIs, ProductionContent } from "@/components/dashboard/sections";
import type {
  DashboardTwoCategory,
  DashboardTwoBusinessUnit,
  DashboardTwoRegion,
  DashboardTwoPeriod,
} from "@/types";

type SyncTime = string;
type CanvasSize = {
  scale: number;
  left: number;
  top: number;
};

const FULL_HD_WIDTH = 1920;
const FULL_HD_HEIGHT = 1080;

const productionBars = [
  ["JAN", 60],
  ["FEB", 75],
  ["MAR", 85],
  ["APR", 70],
  ["MAY", 90],
  ["JUN", 95],
  ["JUL", 80],
  ["AUG", 75],
  ["SEP", 85],
  ["OCT", 100],
  ["NOV", 40],
  ["DEC", 40],
] as const;

function formatSyncTime(): SyncTime {
  const now = new Date();

  return `${now
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .toUpperCase()} CST`;
}

function useSyncTime() {
  const [syncTime, setSyncTime] = useState<SyncTime>("SYNCING...");

  useEffect(() => {
    setSyncTime(formatSyncTime());
    const interval = window.setInterval(() => setSyncTime(formatSyncTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return syncTime;
}

function useFullHdCanvas() {
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    scale: 1,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    function updateCanvasSize() {
      const scale = Math.min(
        window.innerWidth / FULL_HD_WIDTH,
        window.innerHeight / FULL_HD_HEIGHT,
      );

      setCanvasSize({
        scale,
        left: (window.innerWidth - FULL_HD_WIDTH * scale) / 2,
        top: (window.innerHeight - FULL_HD_HEIGHT * scale) / 2,
      });
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  return canvasSize;
}

function SelectBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-w-36 flex-col gap-1">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#d4c4b7]/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function NativeSelect({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="h-8 cursor-pointer rounded border-0 bg-transparent p-0 text-[13px] font-bold text-[#d4e4fa] outline-none focus:ring-0"
      {...props}
    >
      {children}
    </select>
  );
}

function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "good" | "warning";
}) {
  return (
    <span
      className={
        tone === "good"
          ? "rounded border border-emerald-500/40 bg-emerald-500/20 px-4 py-1.5 font-mono text-[11px] font-bold uppercase text-emerald-400"
          : "rounded border border-amber-500/40 bg-amber-500/20 px-4 py-1.5 font-mono text-[11px] font-bold uppercase text-amber-400"
      }
    >
      {children}
    </span>
  );
}

function SalesKpiCard({
  className = "",
  label,
  value,
  note,
  tone = "primary",
  trend,
  progress,
}: {
  className?: string;
  label: string;
  value: React.ReactNode;
  note: string;
  tone?: "primary" | "neutral" | "error";
  trend?: "up" | "down";
  progress?: number;
}) {
  const trendTone = trend === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-[#ffb4ab] bg-[#ffb4ab]/10";
  const valueTone =
    tone === "primary"
      ? "text-[#f2be8c]"
      : tone === "error"
        ? "text-[#ffb4ab]"
        : "text-[#d4e4fa]";

  return (
    <article
      className={`flex flex-col justify-between rounded-lg border border-white/10 bg-black/25 p-5 backdrop-blur-xl ${className}`}
    >
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
        {label}
      </p>
      <div className="flex items-end justify-between gap-4">
        <div className={`text-[40px] font-bold leading-tight tracking-tight ${valueTone}`}>
          {value}
        </div>
        {trend ? (
          <div className={`flex items-center rounded px-2 py-1 font-mono text-[14px] font-medium ${trendTone}`}>
            {trend === "up" ? (
              <TrendingUp className="mr-1 h-4 w-4" aria-hidden />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" aria-hidden />
            )}
            {note}
          </div>
        ) : (
          <div className="font-mono text-[14px] font-medium text-[#d4c4b7]">
            {note}
          </div>
        )}
      </div>
      {typeof progress === "number" ? (
        <div className="relative mt-2 h-2 rounded bg-white/5">
          <div
            className="h-full rounded bg-[#ffb4ab]/40"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute -top-1 bottom-[-4px] right-0 w-0.5 bg-[#f2be8c]" />
        </div>
      ) : null}
    </article>
  );
}

function SalesCommandCenterContent() {
  const units = [
    {
      name: "TKPI Floor Division",
      meta: "Export - High-Grade Timber",
      revenue: "$24.2M",
      volume: "142k",
      price: "$170.4",
      gap: "+12.4%",
      gapTone: "text-emerald-400",
      status: "Target",
      statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      trend: "up",
    },
    {
      name: "Panel Division",
      meta: "Domestic - Fit-outs",
      revenue: "$18.6M",
      volume: "310k",
      price: "$60.0",
      gap: "-18.2%",
      gapTone: "text-[#ffb4ab]",
      status: "Critical",
      statusClass: "border-[#ffb4ab]/20 bg-[#ffb4ab]/10 text-[#ffb4ab]",
      trend: "down",
    },
    {
      name: "Wood Pellet Base",
      meta: "Alternative Fuel",
      revenue: "$5.4M",
      volume: "880k",
      price: "$6.1",
      gap: "-2.1%",
      gapTone: "text-[#f2be8c]",
      status: "Stable",
      statusClass: "border-[#f2be8c]/20 bg-[#f2be8c]/10 text-[#f2be8c]",
      trend: "flat",
    },
    {
      name: "Veneer Export Unit",
      meta: "Export - Premium Veneer",
      revenue: "$3.8M",
      volume: "62k",
      price: "$61.3",
      gap: "+4.8%",
      gapTone: "text-emerald-400",
      status: "Target",
      statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
      trend: "up",
    },
    {
      name: "Component Unit",
      meta: "OEM - Furniture Parts",
      revenue: "$2.7M",
      volume: "45k",
      price: "$60.0",
      gap: "-6.4%",
      gapTone: "text-amber-400",
      status: "Watch",
      statusClass: "border-amber-500/20 bg-amber-500/10 text-amber-400",
      trend: "down",
    },
    {
      name: "Retail Local",
      meta: "Domestic - Retail Channel",
      revenue: "$1.9M",
      volume: "28k",
      price: "$67.8",
      gap: "+1.6%",
      gapTone: "text-emerald-400",
      status: "Stable",
      statusClass: "border-[#f2be8c]/20 bg-[#f2be8c]/10 text-[#f2be8c]",
      trend: "flat",
    },
  ];

  return (
    <>
      <div className="grid h-[120px] shrink-0 grid-cols-12 gap-4">
        <article className="col-span-2 flex flex-col justify-between rounded-lg border border-white/10 border-t-2 border-t-[#f2be8c]/40 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <div>
            <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
              Total Sales Revenue
            </p>
            <p className="text-[32px] font-bold leading-tight text-[#f2be8c]">$42.8M</p>
          </div>
          <p className="flex items-center text-[12px] font-bold text-emerald-400">
            <TrendingUp className="mr-1 h-4 w-4" aria-hidden /> +5.2%
          </p>
        </article>
        <article className="col-span-3 flex flex-col justify-between rounded-lg border border-white/10 border-t-2 border-t-[#ffb4ab]/40 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
                Target Achievement
              </p>
              <p className="text-[32px] font-bold leading-tight text-white">94.2%</p>
            </div>
            <span className="rounded bg-[#ffb4ab]/10 px-2 py-0.5 text-[10px] font-bold text-[#ffb4ab]">
              -4.9%
            </span>
          </div>
          <div>
            <div className="relative h-1.5 rounded-full bg-white/5">
              <div className="h-full w-[94.2%] rounded-full bg-[#ffb4ab]/60" />
              <span className="absolute -top-1 bottom-[-3px] right-0 w-0.5 bg-[#f2be8c]" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-[#d4c4b7]">
              <span>$42.8M</span>
              <span>Target: $45.4M</span>
            </div>
          </div>
        </article>
        {[
          ["Export Sales", "$28.4M", "66% Share", "col-span-2 border-t-[#d4a373]/40", "text-white", "text-[#d4a373]"],
          ["Domestic Sales", "$14.4M", "34% Share", "col-span-2 border-t-[#273647]/40", "text-white", "text-[#d4c4b7]"],
        ].map(([label, value, note, cardClass, valueTone, noteTone]) => (
          <article
            className={`${cardClass} flex flex-col justify-between rounded-lg border border-white/10 border-t-2 bg-[#122131]/40 p-4 backdrop-blur-xl`}
            key={label}
          >
            <div>
              <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
                {label}
              </p>
              <p className={`text-[24px] font-bold leading-tight ${valueTone}`}>{value}</p>
            </div>
            <p className={`text-[12px] font-bold ${noteTone}`}>{note}</p>
          </article>
        ))}
        <article className="col-span-3 flex flex-col justify-between rounded-lg border border-white/10 border-t-2 border-t-[#c8c6c5]/40 bg-[#122131]/40 p-4 backdrop-blur-xl">
          <div>
            <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
              Outstanding Orders
            </p>
            <p className="text-[24px] font-bold leading-tight text-[#f2be8c]">
              1.2k <span className="text-[14px] font-normal text-[#d4c4b7]">Units</span>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1 text-[12px] text-[#c8c6c5]">
              <Clock className="h-4 w-4" aria-hidden /> 14 Pending
            </p>
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px]">
              AVG 4.2D Lead
            </span>
          </div>
        </article>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-12 gap-4">
        <section className="col-span-8 flex min-h-0 flex-col gap-4 overflow-hidden">
          <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/10 border-l-4 border-l-[#f2be8c]/40 bg-[#122131]/40 backdrop-blur-xl">
            <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-[#0d1c2d]/50 p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-[#f2be8c]" aria-hidden />
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f2be8c]">
                    Business Unit Sales Performance
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#d4c4b7]">
                    Consolidated all-unit sales, pricing, and gap monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d4c4b7]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Optimal
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#d4c4b7]">
                  <span className="h-2 w-2 rounded-full bg-[#ffb4ab] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  Action Required
                </div>
                <div className="rounded border border-white/10 bg-white/5 px-3 py-1 text-right">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                    Active Units
                  </p>
                  <p className="text-sm font-bold text-white">6</p>
                </div>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <table className="w-full table-fixed border-collapse text-left">
                <thead className="bg-[#1c2b3c]/60">
                  <tr>
                    {["Unit", "Revenue", "Vol (M2)", "Price", "Gap", "7D", "Status"].map((head, index) => (
                      <th
                        className={`border-b border-white/5 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7] ${
                          index > 0 && index < 5 ? "text-right" : index === 5 ? "text-center" : ""
                        } ${index === 0 ? "w-[28%] px-5" : index === 6 ? "w-[10%] px-5" : "w-[12%]"}`}
                        key={head}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {units.map((unit) => (
                    <tr className="transition-colors hover:bg-white/5" key={unit.name}>
                      <td className="truncate px-5 py-2.5">
                        <p className="truncate text-sm font-bold text-white">{unit.name}</p>
                        <p className="truncate text-[10px] text-[#d4c4b7]">{unit.meta}</p>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-sm text-white">{unit.revenue}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-sm text-[#d4c4b7]">{unit.volume}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-sm text-[#d4c4b7]">{unit.price}</td>
                      <td className={`px-4 py-2.5 text-right font-mono text-sm ${unit.gapTone}`}>{unit.gap}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex justify-center">
                          {unit.trend === "up" ? (
                            <TrendingUp className="h-5 w-5 text-emerald-400" aria-hidden />
                          ) : unit.trend === "down" ? (
                            <TrendingDown className="h-5 w-5 text-[#ffb4ab]" aria-hidden />
                          ) : (
                            <span className="h-0.5 w-5 rounded bg-[#f2be8c]" />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-2.5">
                        <span className={`whitespace-nowrap rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${unit.statusClass}`}>
                          {unit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid h-[74px] shrink-0 grid-cols-4 gap-3 border-t border-white/5 bg-[#0d1c2d]/35 p-3">
              {[
                ["Revenue Mix", "Floor 56%", "Panel 31%", "bg-[#f2be8c]", "bg-[#ffb4ab]/70"],
                ["Volume Mix", "Pellet 59%", "Panel 21%", "bg-emerald-500", "bg-[#d4a373]"],
                ["Pricing Health", "+3.8%", "Weighted ASP", "bg-emerald-500", "bg-white/20"],
                ["At Risk", "$3.4M", "Gap + claims", "bg-[#ffb4ab]", "bg-amber-500"],
              ].map(([label, primary, secondary, toneA, toneB]) => (
                <div className="rounded border border-white/5 bg-white/[0.03] px-3 py-2" key={label}>
                  <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                    {label}
                  </p>
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="truncate text-[13px] font-bold text-white">{primary}</span>
                    <span className="truncate text-[9px] text-[#d4c4b7]">{secondary}</span>
                  </div>
                  <div className="flex h-1 overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full w-2/3 ${toneA}`} />
                    <div className={`h-full flex-1 ${toneB}`} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <section className="grid h-[110px] shrink-0 grid-cols-3 gap-4">
            {[
              ["Top SKU: Flooring", "Select Oak Plank v2", "$8.4M Rev - 42% GM", "bg-[#f2be8c]/20", "text-[#f2be8c]", "85%", "bg-[#f2be8c]"],
              ["Top SKU: Panels", "MDF Core Standard", "$5.2M Rev - 18% GM", "bg-[#273647]/40", "text-[#c8c6c5]", "62%", "bg-[#ffb4ab]"],
            ].map(([label, title, meta, iconBg, iconTone, width, barTone]) => (
              <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#122131]/40 p-3 backdrop-blur-xl" key={label}>
                <p className="mb-1 truncate font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
                  {label}
                </p>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${iconBg}`}>
                    <Factory className={`h-5 w-5 ${iconTone}`} aria-hidden />
                  </div>
                  <div className="truncate">
                    <p className="truncate text-[13px] font-bold text-white">{title}</p>
                    <p className="truncate text-[10px] text-[#d4c4b7]">{meta}</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full ${barTone}`} style={{ width }} />
                </div>
              </article>
            ))}
            <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-dashed border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
              <p className="mb-1 truncate font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d4c4b7]">
                Category Split
              </p>
              <div className="flex flex-1 flex-col justify-center space-y-2">
                {[
                  ["Timber", "68%", "bg-[#f2be8c]", "bg-[#f2be8c]/20"],
                  ["MDF/HDF", "22%", "bg-[#c8c6c5]", "bg-[#c8c6c5]/20"],
                ].map(([label, value, tone, bg]) => (
                  <div className="space-y-1" key={label}>
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-tight">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className={`h-1 overflow-hidden rounded-full ${bg}`}>
                      <div className={`h-full ${tone}`} style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>

        <aside className="col-span-4 flex min-h-0 flex-col gap-4 overflow-hidden">
          <article className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 border-l-4 border-l-[#ffb4ab] bg-[#122131]/40 p-4 backdrop-blur-xl">
            <div className="mb-3 flex shrink-0 items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#ffb4ab]" aria-hidden />
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ffb4ab]">Anomalies</p>
              </div>
              <span className="rounded bg-[#ffb4ab]/20 px-2 py-0.5 text-[10px] font-bold text-[#ffb4ab]">3 Active</span>
            </div>
            <div className="space-y-2 overflow-hidden">
              {[
                ["Target Deficit", "-$2.6M", "Panel Division 18% below budget. Critical shortfall in RDC 04, 07.", "text-[#ffb4ab]", "bg-[#ffb4ab]/5 border-[#ffb4ab]/10"],
                ["Logistics Risk", "48H DELAY", "Vessel scheduling issues at Port B.", "text-[#f2be8c]", "bg-[#273647]/10 border-white/5"],
                ["Inventory Alert", "", "Plant A timber below safety threshold.", "text-[#d4c4b7]", "bg-white/5 border-white/5"],
              ].map(([title, badge, copy, tone, cardTone]) => (
                <div className={`rounded-lg border p-3 ${cardTone}`} key={title}>
                  <div className="flex items-start justify-between">
                    <p className={`font-mono text-[12px] font-bold ${tone}`}>{title}</p>
                    {badge ? <span className={`font-mono text-[10px] ${tone}`}>{badge}</span> : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-normal text-[#d4c4b7]">{copy}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 border-l-4 border-l-[#f2be8c] bg-[#122131]/40 p-4 backdrop-blur-xl">
            <div className="mb-3 flex shrink-0 items-center gap-2">
              <Brain className="h-5 w-5 text-[#f2be8c]" aria-hidden />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f2be8c]">
                Strategic AI Insights
              </p>
            </div>
            <div className="space-y-3 overflow-hidden">
              {[
                ["EU Scaling", "Demand for high-grade timber up 22%. Scalability potential identified.", "text-[#f2be8c]", "bg-[#f2be8c]/20"],
                ["Mix Pivot", "Shift Panel focus to renovation retail lines to offset softness.", "text-[#c8c6c5]", "bg-[#273647]/50"],
              ].map(([title, copy, tone, iconBg]) => (
                <div className="flex items-start gap-3" key={title}>
                  <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded ${iconBg}`}>
                    <Info className={`h-3.5 w-3.5 ${tone}`} aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-[12px] font-bold text-white">{title}</p>
                    <p className="text-[10px] leading-tight text-[#d4c4b7]">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="shrink-0 rounded-lg border border-white/10 border-l-4 border-l-[#c8c6c5] bg-[#122131]/40 p-4 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#c8c6c5]" aria-hidden />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c8c6c5]">Value at Risk</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                <p className="mb-1 truncate text-[9px] uppercase tracking-widest text-[#d4c4b7]">Renewal</p>
                <p className="text-base font-bold text-white">$4.2M</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/5 p-2">
                <p className="mb-1 truncate text-[9px] uppercase tracking-widest text-[#d4c4b7]">Claims</p>
                <p className="text-base font-bold text-[#ffb4ab]">$0.8M</p>
              </div>
            </div>
          </article>
        </aside>
      </div>

      <section className="flex h-[180px] shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#122131]/40 p-4 backdrop-blur-xl">
        <div className="mb-2 flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#f2be8c]">
              12 Month Revenue Performance
            </p>
            <span className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#f2be8c]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f2be8c]">
                MTD: $12.4M
              </span>
              <span className="text-[10px] font-bold text-emerald-400">+11% vs Prev</span>
            </div>
          </div>
          <div className="flex gap-4 font-mono text-[9px] font-bold uppercase tracking-widest opacity-80">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#f2be8c]" />Actual</div>
            <div className="flex items-center gap-1.5"><span className="h-px w-4 bg-white/30" />Target</div>
            <div className="flex items-center gap-1.5"><span className="h-px w-4 border-b border-dashed border-[#c8c6c5]/40" />Forecast</div>
          </div>
        </div>
        <div className="relative mt-1 flex-1">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
            <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="0" x2="1200" y1="20" y2="20" />
            <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="0" x2="1200" y1="50" y2="50" />
            <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="0" x2="1200" y1="80" y2="80" />
            <line stroke="rgba(255,255,255,0.15)" strokeDasharray="8,4" strokeWidth="1" x1="0" x2="1200" y1="35" y2="25" />
            <path d="M1000,40 L1200,30" fill="none" stroke="rgba(200,198,197,0.3)" strokeDasharray="4,4" strokeWidth="2" />
            <path d="M0,80 Q100,70 200,85 T400,60 T600,45 T800,55 T1000,30 T1200,35" fill="none" stroke="#f2be8c" strokeLinecap="round" strokeWidth="2.5" />
            <path d="M0,80 Q100,70 200,85 T400,60 T600,45 T800,55 T1000,30 T1200,35 L1200,100 L0,100 Z" fill="#f2be8c" opacity="0.1" />
            <circle cx="1000" cy="30" fill="#f2be8c" r="4" />
            <text fill="#f2be8c" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="980" y="20">$42.8M</text>
          </svg>
          <div className="mt-2 flex justify-between px-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#d4c4b7]">
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((month) => (
              <span className={month === "NOV" ? "border-b border-[#f2be8c]/40 px-1 text-[#f2be8c]" : month === "DEC" ? "opacity-40" : ""} key={month}>
                {month}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PlantKpiCard({
  className = "",
  label,
  value,
  children,
  tone = "white",
}: {
  className?: string;
  label: string;
  value: React.ReactNode;
  children: React.ReactNode;
  tone?: "white" | "primary" | "success";
}) {
  const toneClass =
    tone === "primary"
      ? "text-[#f2be8c]"
      : tone === "success"
        ? "text-emerald-400"
        : "text-white";

  return (
    <article
      className={`row-span-2 flex flex-col justify-between rounded-lg border border-white/5 bg-[#122131]/60 p-4 backdrop-blur-xl ${className}`}
    >
      <div>
        <p className="mb-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
          {label}
        </p>
        <div className={`text-[28px] font-bold leading-tight tracking-tight ${toneClass}`}>
          {value}
        </div>
      </div>
      {children}
    </article>
  );
}

function PlantSalesContent({
  plantData,
  regionData
}: {
  plantData: {name: string; sales: string; volume: string; achievement: number; status: string; statusClass: string}[];
  regionData: Array<[string, number, string]>;
}) {
  const plantProducts = plantData.map((plant, idx) => ({
    grade: ["Grade A", "Grade B", "Eng. Floor", "Laminate"][idx % 4],
    volume: plant.volume,
    price: `$${Math.round(Math.random() * 200 + 100)}`,
    gap: plant.achievement >= 100 ? "+2.4%" : "-4.1%",
    gapTone: plant.achievement >= 100 ? "text-emerald-400" : "text-[#ffb4ab]",
    path: ["M0 12 L10 14 L20 8 L30 10 L40 2 L48 4", "M0 4 L10 2 L20 10 L30 8 L40 14 L48 12", "M0 10 L12 8 L24 12 L36 4 L48 2", "M0 8 L10 9 L20 8 L30 9 L40 8 L48 8"][idx % 4],
    stroke: plant.achievement >= 100 ? "#10b981" : "#ef4444",
    dot: plant.achievement >= 100 ? "bg-emerald-400" : "bg-amber-400",
  }));

  const pipeline = [
    ["Orders", "1,842", "Avg 1.2d | 88% Conv", false],
    ["Allocated", "1,620", "Avg 2.5d | 75% Conv", false],
    ["Ready", "1,215", "4.2d +150%", true],
    ["Shipped", "840", "Avg 3.1d | 92% Conv", false],
    ["Invoiced", "720", "Avg 0.5d | 99% Conv", false],
  ] as const;

  const totalAchievement = Math.round(plantData.reduce((sum, p) => sum + p.achievement, 0) / plantData.length);
  const criticalCount = plantData.filter(p => p.status === "Critical").length;
  const optimalCount = plantData.filter(p => p.status === "Optimal").length;

  return (
    <>
      <PlantKpiCard
        className="col-span-2 border-l-2 border-l-[#f2be8c]/50"
        label="Total Sales Revenue"
        value={`$${plantData.reduce((sum, p) => sum + parseFloat(p.sales.replace("$", "").replace("M", "")), 0).toFixed(1)}M`}
      >
        <div>
          <div className="flex justify-between text-[11px]">
            <span className="text-[#d4c4b7]">Plant Units: {plantData.length}</span>
            <span className="font-bold text-emerald-400">{optimalCount} Optimal</span>
          </div>
          <div className="mt-1 h-1 w-full rounded-full bg-white/5">
            <div className="h-full rounded-full bg-[#f2be8c]" style={{ width: `${totalAchievement}%` }} />
          </div>
        </div>
      </PlantKpiCard>
      <PlantKpiCard
        className="col-span-2"
        label="Target Achievement"
        value={`${totalAchievement}%`}
        tone="primary"
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400">
          <TrendingUp className="h-4 w-4" aria-hidden /> {plantData.length} Active Plants
        </p>
      </PlantKpiCard>
      <PlantKpiCard className="col-span-2" label="Plant Breakdown" value={`${plantData.length} Plants`}>
        <div className="space-y-1">
          {plantData.slice(0, 2).map((plant) => (
            <div key={plant.name} className="flex items-center justify-between text-[10px]">
              <span className="truncate text-[#d4c4b7]">{plant.name}</span>
              <span className="font-bold text-white">{plant.achievement}%</span>
            </div>
          ))}
        </div>
      </PlantKpiCard>
      <PlantKpiCard className="col-span-2" label="Outstanding Orders" value={<>{`1,248 `}<span className="text-[14px] font-normal text-[#d4c4b7]">Units</span></>}>
        <p className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
          <AlertTriangle className="h-4 w-4" aria-hidden /> +5% vs LY
        </p>
      </PlantKpiCard>
      <PlantKpiCard className="col-span-2" label="Sales Growth" value={plantData[0]?.status === "Critical" ? "-8.2%" : "+12.4%"} tone="success">
        <p className="text-[11px] text-[#d4c4b7]">Region-based Growth</p>
      </PlantKpiCard>
      <PlantKpiCard
        className={`col-span-2 border-l-2 ${criticalCount > 0 ? "border-l-[#ffb4ab]/50" : "border-l-emerald-500/50"}`}
        label="Avg. Margin"
        value={`${22 + optimalCount * 2}.5%`}
      >
        <div className="flex justify-between text-[11px]">
          <span className="text-[#d4c4b7]">Target: 25%</span>
          <span className="text-emerald-400">+{optimalCount * 1.5}%</span>
        </div>
      </PlantKpiCard>

      <section className="col-span-4 row-span-7 flex min-h-0 flex-col rounded-lg border border-white/5 bg-[#122131]/60 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            Product Sales Contribution
          </h3>
          <Factory className="h-5 w-5 text-[#d4c4b7]" aria-hidden />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <table className="mb-4 w-full text-left text-[11px]">
          <thead className="border-b border-white/10 font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            <tr>
              <th className="pb-2 font-normal">Grade</th>
              <th className="pb-2 text-right font-normal">Vol (M2)</th>
              <th className="pb-2 text-right font-normal">Avg Price</th>
              <th className="pb-2 text-right font-normal">Gap</th>
              <th className="pb-2 text-right font-normal">7D Trend</th>
              <th className="pb-2 text-center font-normal">ST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {plantProducts.map((product) => (
              <tr className="transition-colors hover:bg-white/5" key={product.grade}>
                <td className="py-2.5 font-medium">{product.grade}</td>
                <td className="py-2.5 text-right">{product.volume}</td>
                <td className="py-2.5 text-right">{product.price}</td>
                <td className={`py-2.5 text-right ${product.gapTone}`}>
                  {product.gap}
                </td>
                <td className="py-2.5 text-right">
                  <svg className="inline-block h-4 w-12" viewBox="0 0 48 16">
                    <path
                      d={product.path}
                      fill="none"
                      stroke={product.stroke}
                      strokeWidth="1.5"
                    />
                  </svg>
                </td>
                <td className="py-2.5">
                  <span className={`mx-auto mt-1 block h-1.5 w-1.5 rounded-full ${product.dot}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-auto grid flex-1 grid-rows-[56px_1fr] gap-3 border-t border-white/5 pt-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Total Volume", "94.2k", "M2 Sold"],
              ["Avg Price", "$256", "Blended ASP"],
              ["Premium Mix", "68%", "Grade A + Eng."],
            ].map(([label, value, note]) => (
              <div className="rounded border border-white/5 bg-white/5 px-3 py-2" key={label}>
                <p className="truncate font-mono text-[8px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                  {label}
                </p>
                <p className="text-[16px] font-bold leading-tight text-white">{value}</p>
                <p className="truncate text-[8px] text-[#d4c4b7]">{note}</p>
              </div>
            ))}
          </div>
          <div className="grid min-h-0 grid-cols-[1.15fr_0.85fr] gap-3">
            <div className="flex min-h-0 flex-col rounded border border-white/5 bg-white/[0.03] p-3">
              <h4 className="mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                Grade Inventory Mix
              </h4>
              <div className="flex flex-1 flex-col justify-between">
                {[
                  ["Grade A", "82%", "bg-[#f2be8c]"],
                  ["Grade B", "45%", "bg-[#ffb4ab]/60"],
                  ["Eng. Floor", "71%", "bg-emerald-500"],
                  ["Laminate", "58%", "bg-white/30"],
                ].map(([label, value, tone]) => (
                  <div className="flex flex-col gap-1" key={label}>
                    <div className="flex justify-between text-[9px]">
                      <span>{label}</span>
                      <span className="font-mono">{value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div className={`h-full ${tone}`} style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex min-h-0 flex-col rounded border border-white/5 bg-white/[0.03] p-3">
              <h4 className="mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                Contribution
              </h4>
              <div className="flex flex-1 items-end gap-2">
                {[
                  ["A", 82, "bg-[#f2be8c]"],
                  ["B", 54, "bg-[#d4a373]"],
                  ["E", 68, "bg-emerald-500"],
                  ["L", 28, "bg-white/30"],
                ].map(([label, height, tone]) => (
                  <div className="flex h-full flex-1 flex-col items-center justify-end gap-1" key={label}>
                    <div
                      className={`w-full rounded-t ${tone}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="font-mono text-[8px] text-[#d4c4b7]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="col-span-5 row-span-7 flex min-h-0 flex-col gap-5">
        <article className="min-h-0 flex-1 rounded-lg border border-white/5 bg-[#122131]/60 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d4c4b7]">
              Enhanced Sales Order Pipeline
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-[9px] text-[#d4c4b7]">Alert</span>
              </div>
              <span className="text-[10px] text-[#d4c4b7]">Live Fulfillment</span>
            </div>
          </div>
          <div className="mb-6 flex h-24 items-center gap-1">
            {pipeline.map(([label, value, detail, alert], index) => (
              <div
                className={`flex h-full flex-1 flex-col items-center justify-center ${
                  alert
                    ? "relative z-10 border-y border-amber-500/30 bg-amber-500/10 text-amber-400"
                    : "bg-[#122131] text-[#d4e4fa]"
                }`}
                key={label}
                style={{
                  clipPath:
                    index === 0
                      ? "polygon(0% 0%,85% 0%,100% 50%,85% 100%,0% 100%)"
                      : "polygon(0% 0%,85% 0%,100% 50%,85% 100%,0% 100%,15% 50%)",
                }}
              >
                <span className="text-[16px] font-bold">{value}</span>
                <span className="mb-1 font-mono text-[8px] uppercase text-current opacity-75">
                  {label}
                </span>
                <div
                  className={`w-full border-t pt-1 text-center text-[7px] ${
                    alert
                      ? "border-amber-500/20 font-bold text-amber-400"
                      : "border-white/5 text-[#d4c4b7]"
                  }`}
                >
                  {detail}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
                High Value Pending Orders
              </h4>
              <span className="text-[9px] font-bold text-[#f2be8c]">$1.4M At Risk</span>
            </div>
            <div className="h-[62px] overflow-hidden">
              <div className="pending-orders-marquee space-y-2">
                {[
                  ["ORD-9281 (Global Exports Ltd)", "Grade A | $420k | Destination: EU", "READY", "6 Days Lag", "text-amber-400"],
                  ["ORD-9442 (Southern Dist.)", "Eng. Flooring | $215k | Destination: DOM", "ALLOCATED", "2 Days Lag", "text-[#f2be8c]"],
                  ["ORD-9587 (Prime Build Asia)", "Grade A | $310k | Destination: SEA", "READY", "4 Days Lag", "text-amber-400"],
                  ["ORD-9620 (Metro Retail)", "Laminate | $95k | Destination: DOM", "PENDING", "1 Day Lag", "text-[#d4c4b7]"],
                ].map(([order, meta, status, lag, tone]) => (
                  <div
                    className="flex h-[30px] items-center justify-between rounded border border-white/5 bg-white/5 px-2"
                    key={order}
                  >
                    <div className="min-w-0 flex flex-col">
                      <span className="truncate text-[10px] font-bold text-white">{order}</span>
                      <span className="truncate text-[8px] text-[#d4c4b7]">{meta}</span>
                    </div>
                    <div className="ml-3 shrink-0 text-right">
                      <span className={`block text-[10px] font-bold ${tone}`}>{status}</span>
                      <span className="text-[8px] text-[#d4c4b7]">{lag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
        <div className="grid h-[180px] grid-cols-2 gap-5">
        <article className="flex flex-col rounded-lg border border-white/5 bg-[#122131]/60 p-4 backdrop-blur-xl">
          <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            Regional Achievement
          </h3>
          <div className="flex flex-1 flex-col justify-between">
            {regionData.map(([region, value, tone]) => (
              <div className="flex items-center gap-2" key={region}>
                <span className="w-10 text-[10px] text-[#d4c4b7]">{region}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className={`h-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
                </div>
                <span className="w-8 text-right text-[10px] font-bold">{value}%</span>
              </div>
            ))}
          </div>
        </article>
        <article className="flex flex-col rounded-lg border border-white/5 bg-[#122131]/60 p-4 backdrop-blur-xl">
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            Channel Mix
          </h3>
          <div className="flex flex-1 flex-col justify-between">
            {[
              ["Export Dist.", "42%", "text-[#f2be8c]"],
              ["Domestic Proj.", "28%", "text-white"],
              ["Retail/Local", "18%", "text-white"],
            ].map(([label, value, tone]) => (
              <div className="flex items-center justify-between" key={label}>
                <span className="text-[11px]">{label}</span>
                <span className={`text-[11px] font-bold ${tone}`}>{value}</span>
              </div>
            ))}
          </div>
        </article>
        </div>
      </section>

      <aside className="col-span-3 row-span-7 flex min-h-0 flex-col gap-4">
        <article className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/5 border-l-2 border-l-[#ffb4ab] bg-[#122131]/60 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#ffb4ab]/5 px-4 py-3 text-[#ffb4ab]">
            <AlertTriangle className="h-5 w-5" aria-hidden />
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
              Sales Risk Alerts
            </h3>
          </div>
          <div className="space-y-3 overflow-hidden p-4">
            {[
              ["Export Capacity Reached", "Logistics bottleneck at Port B affecting Grade A shipments for EU.", "bg-[#ffb4ab]/10 border-[#ffb4ab]/20"],
              ["High-Margin Order Backlog", "420 units of Engineered Flooring pending allocation.", "bg-amber-500/10 border-amber-500/20"],
              ["Payment Overdue: $1.2M", "SEA Distributor exceeded 60-day credit term.", "bg-[#ffb4ab]/10 border-[#ffb4ab]/20"],
            ].map(([title, copy, tone]) => (
              <div className={`rounded border p-3 ${tone}`} key={title}>
                <p className="mb-0.5 text-[11px] font-bold text-white">{title}</p>
                <p className="text-[10px] leading-tight text-[#d4c4b7]">{copy}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/5 border-l-2 border-l-[#f2be8c] bg-[#122131]/60 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#f2be8c]/5 px-4 py-3 text-[#f2be8c]">
            <Lightbulb className="h-5 w-5" aria-hidden />
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
              Strategic Insights
            </h3>
          </div>
          <ul className="space-y-4 overflow-hidden p-5">
            {[
              ["Grade A Demand Surge", "+15% over capacity. Prioritize Export production."],
              ["Logistics Escalation", "Risking $1.2M at Port B. Urgent clearance required."],
            ].map(([title, copy]) => (
              <li className="flex gap-3" key={title}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f2be8c]" />
                <div className="text-[11px] leading-normal">
                  <span className="block font-bold text-white">{title}</span>
                  <span className="text-[10px] text-[#d4c4b7]">{copy}</span>
                </div>
              </li>
            ))}
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />
              <p className="text-[10px] italic leading-snug text-[#d4c4b7]">
                Inventory turnover for Laminate is stable. Suggest reallocation
                of raw materials to Grade A.
              </p>
            </li>
          </ul>
        </article>
      </aside>

      <section className="col-span-12 row-span-3 flex flex-col rounded-lg border border-white/5 bg-[#122131]/60 p-5 backdrop-blur-xl">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d4c4b7]">
              12-Month Sales Revenue Trend
            </h3>
            <div className="mt-1 flex gap-6">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-3 rounded-full bg-[#f2be8c]" />
                <span className="text-[9px] font-medium uppercase text-[#d4c4b7]">
                  Actual Revenue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-3 rounded-full border border-dashed border-white/40 bg-white/20" />
                <span className="text-[9px] font-medium uppercase text-[#d4c4b7]">
                  Target Revenue
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-[12px] font-bold text-emerald-400">
              <span className="mr-1 font-mono text-[10px] uppercase text-[#d4c4b7]">
                MTD Trend:
              </span>
              +4.2% Over Target
            </p>
            <p className="mt-1 text-[20px] font-bold text-white">
              $2.4M{" "}
              <span className="ml-1 text-[10px] font-normal uppercase text-[#d4c4b7]">
                August
              </span>
            </p>
          </div>
        </div>
        <div className="relative flex flex-1 items-end gap-2 px-2 pb-6">
          {[60, 65, 58, 72, 80, 85, 78, 88].map((base, index) => {
            const actual = [85, 92, 70, 88, 95, 105, 100, 110][index];
            return (
              <div className="relative flex-1 rounded-t-sm bg-white/5" key={base} style={{ height: `${base}%` }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-sm bg-[#f2be8c]/30"
                  style={{ height: `${actual}%` }}
                />
                <div
                  className={`absolute w-full border-t ${
                    actual >= 100 ? "border-emerald-400" : "border-[#f2be8c]/60"
                  }`}
                  style={{ bottom: `${actual}%` }}
                />
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 flex w-full justify-between px-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#d4c4b7]">
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"].map((month) => (
              <span className={month === "AUG" ? "font-bold text-[#f2be8c]" : ""} key={month}>
                {month}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function DashboardTwoShell() {
  const syncTime = useSyncTime();
  const canvasSize = useFullHdCanvas();

  // Use dashboard data hook
  const {
    category,
    setCategory,
    businessUnit,
    setBusinessUnit,
    region,
    setRegion,
    timePeriod,
    setTimePeriod,
    isSalesCategory,
    isProductionCategory,
    isPlantSales,
    groupKPIs,
    currentRegionData,
    filteredPlantData,
    productionData,
  } = useDashboardData();

  return (
    <div className="h-screen overflow-hidden bg-[#020b14] text-[#d4e4fa]">
      <div
        className="absolute overflow-hidden bg-[#051424]"
        style={{
          height: FULL_HD_HEIGHT,
          left: canvasSize.left,
          top: canvasSize.top,
          transform: `scale(${canvasSize.scale})`,
          transformOrigin: "top left",
          width: FULL_HD_WIDTH,
        }}
      >
      <nav className="absolute left-0 top-0 z-50 flex h-20 w-full flex-col justify-center border-b border-white/10 bg-[#051424]/95 px-10 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4 xl:gap-10">
            <Link
              href="/"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-[#d4c4b7] transition-colors hover:text-white"
              aria-label="Back to dashboard picker"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </Link>
            <div className="truncate text-xl font-extrabold tracking-tight text-[#f2be8c] sm:text-[28px]">
              DSN Group{" "}
              <span className="hidden font-light text-[#d4c4b7]/40 md:inline">
                {isPlantSales
                  ? "TKPI Plant A Sales Dashboard"
                  : isSalesCategory
                    ? "Sales Command Center"
                    : isProductionCategory
                      ? "Production Command Center"
                      : "Executive Summary"}
              </span>
            </div>
            <div className="hidden items-center gap-3 rounded-lg bg-[#1c2b3c] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#d4c4b7]/70 xl:flex">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Live Sync: <span className="text-[#d4e4fa]">{syncTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden rounded bg-[#f2be8c] px-5 py-2 font-mono text-[11px] font-extrabold uppercase text-[#482904] shadow-lg transition hover:brightness-110 sm:inline-flex">
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
              Refresh Data
            </button>
            <div className="relative">
              <Bell className="h-6 w-6 text-[#f2be8c]" aria-hidden />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffb4ab] text-[9px] font-bold text-[#482904]">
                2
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f2be8c]/20 bg-[#d4a373]/20">
              <UserRound className="h-5 w-5 text-[#f2be8c]" aria-hidden />
            </div>
          </div>
        </div>
      </nav>

      <div className="absolute left-0 top-20 z-40 flex h-16 w-full items-center justify-between gap-4 border-b border-white/5 bg-[#122131]/80 px-10 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2 self-end pb-1">
            <Filter className="h-5 w-5 text-[#c8c6c5]" aria-hidden />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c8c6c5]">
              Filter Console
            </span>
          </div>
          <SelectBlock label="Business Unit">
            <NativeSelect
              value={businessUnit}
              onChange={(event) =>
                setBusinessUnit(event.target.value as DashboardTwoBusinessUnit)
              }
            >
              <option>All Units</option>
              <option>TKPI Floor Division</option>
              <option>Panel Division</option>
            </NativeSelect>
          </SelectBlock>
          <SelectBlock label="Category">
            <NativeSelect
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as DashboardTwoCategory)
              }
            >
              <option>All Categories</option>
              <option>Sales</option>
              <option>Production</option>
              <option>Raw Material</option>
              <option>Cost</option>
            </NativeSelect>
          </SelectBlock>
          <SelectBlock label="Region">
            <NativeSelect
              value={region}
              onChange={(event) => setRegion(event.target.value as DashboardTwoRegion)}
            >
              <option>Global View</option>
              <option>SEA Region</option>
              <option>North America</option>
              <option>Europe</option>
            </NativeSelect>
          </SelectBlock>
          <SelectBlock label="Time Period">
            <NativeSelect
              value={timePeriod}
              onChange={(event) => setTimePeriod(event.target.value as DashboardTwoPeriod)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>YTD</option>
            </NativeSelect>
          </SelectBlock>
        </div>
        <div className="flex items-center gap-3 rounded border border-white/5 bg-white/5 px-4 py-2">
          <span className="font-mono text-[11px] font-bold uppercase text-[#d4c4b7]/80">
            Compare Mode
          </span>
          <span className="relative h-5 w-10 rounded-full border border-white/10 bg-[#273647]">
            <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-[#f2be8c]" />
          </span>
        </div>
      </div>

      <main
        className={
          isPlantSales
            ? "absolute inset-x-0 bottom-0 top-36 grid grid-cols-12 grid-rows-12 gap-4 px-6 py-6"
            : isSalesCategory
            ? "absolute inset-x-0 bottom-0 top-36 flex flex-col gap-4 px-6 py-4"
            : isProductionCategory
            ? "absolute inset-x-0 bottom-0 top-36 flex flex-col gap-4 px-10 py-5 overflow-hidden"
            : "absolute inset-x-0 bottom-0 top-36 grid grid-rows-[132px_minmax(0,1fr)_300px] gap-5 overflow-hidden px-10 py-5"
        }
      >
        {isPlantSales ? (
          <PlantSalesContent
            plantData={filteredPlantData}
            regionData={currentRegionData.regions}
          />
        ) : isSalesCategory ? (
          <SalesCommandCenterContent />
        ) : isProductionCategory ? (
          <ProductionContent data={productionData} />
        ) : (
          <>
            <ExecutiveKPIs kpis={groupKPIs} />

            <section className="grid min-h-0 grid-cols-[1.35fr_1fr] gap-5">
          <article className="relative flex min-h-0 flex-col overflow-hidden rounded-lg border border-[#f2be8c]/20 bg-[#0d1c2d] p-6 shadow-2xl">
          <BarChart3 className="absolute right-8 top-6 h-32 w-32 text-[#f2be8c]/5" aria-hidden />
          <div className="mb-5 flex justify-between gap-6">
            <div>
              <h2 className="mb-1 flex items-center gap-3 text-[26px] font-black text-white">
                <LineChart className="h-8 w-8 text-[#f2be8c]" aria-hidden />
                Business Unit Performance
              </h2>
              <p className="max-w-2xl text-[13px] text-[#d4c4b7]/80">
                Consolidated ranking of divisional performance across sales,
                production, and cost efficiency categories.
              </p>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-3">
              <div className="w-44 rounded-lg border-2 border-emerald-500/50 bg-emerald-500/10 p-3 text-center">
                <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
                  Best Performing
                </p>
                <p className="text-[14px] font-extrabold text-white">TKPI Floor Division</p>
              </div>
              <div className="w-44 rounded-lg border-2 border-red-500/50 bg-red-500/10 p-3 text-center">
                <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.18em] text-red-400">
                  Underperforming
                </p>
                <p className="text-[14px] font-extrabold text-white">Panel Division</p>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <table className="w-full border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="font-mono text-[10px] font-black uppercase text-[#d4c4b7]/60">
                  <th className="px-6 pb-2">Rank / Business Unit</th>
                  <th className="px-6 pb-2 text-center">Composite Score</th>
                  <th className="px-6 pb-2">Top Category Hit</th>
                  <th className="px-6 pb-2">Critical Variance</th>
                  <th className="px-6 pb-2 text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr className="rounded-lg bg-white/[0.03] transition hover:bg-white/[0.06]">
                  <td className="rounded-l-lg border-l-4 border-l-emerald-500 px-5 py-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-base font-black text-emerald-400">
                        1
                      </span>
                      <div>
                        <div className="text-[17px] font-black text-white">TKPI Floor Division</div>
                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#d4c4b7]/50">
                          Lumber & Flooring
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="text-[24px] font-black text-emerald-400">94.2</div>
                    <div className="text-[10px] font-bold uppercase text-[#d4c4b7]/40">Out of 100</div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-white">Production Output</p>
                    <p className="text-[11px] font-bold uppercase text-emerald-400">112% of Target</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-[#d4c4b7]/80">Resin Cost</p>
                    <p className="text-[11px] font-bold uppercase text-red-400">+5.8% vs Budget</p>
                  </td>
                  <td className="rounded-r-lg px-5 py-4 text-right">
                    <StatusPill tone="good">Improving</StatusPill>
                  </td>
                </tr>
                <tr className="rounded-lg bg-white/[0.03] transition hover:bg-white/[0.06]">
                  <td className="rounded-l-lg border-l-4 border-l-red-500 px-5 py-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base font-black text-white/40">
                        2
                      </span>
                      <div>
                        <div className="text-[17px] font-black text-white">Panel Division</div>
                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#d4c4b7]/50">
                          Boards & Panels
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="text-[24px] font-black text-red-500">72.5</div>
                    <div className="text-[10px] font-bold uppercase text-[#d4c4b7]/40">Out of 100</div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-white">Sales Growth</p>
                    <p className="text-[11px] font-bold uppercase text-emerald-400">104% of Target</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-bold text-[#d4c4b7]/80">Log Supply</p>
                    <p className="text-[11px] font-bold uppercase text-red-400">-28% vs Target</p>
                  </td>
                  <td className="rounded-r-lg px-5 py-4 text-right">
                    <StatusPill tone="warning">Declining</StatusPill>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </article>

              <div className="flex min-h-0 flex-col gap-5">
              <article className="animate-[critical-pulse_2s_ease-in-out_infinite] flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#ffb4ab]/20 border-l-[10px] border-l-[#ffb4ab] bg-[#0d1c2d] p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="flex items-center gap-3 text-[17px] font-black uppercase tracking-tight text-white">
                    <AlertTriangle className="h-7 w-7 text-[#ffb4ab]" aria-hidden />
                    Group Operations Alerts
                  </h3>
                  <span className="rounded bg-[#ffb4ab] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#482904]">
                    2 Issues
                  </span>
                </div>
                <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-hidden">
                  <div className="flex gap-3 rounded-lg border-2 border-[#ffb4ab]/20 bg-[#ffb4ab]/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#ffb4ab] text-[#482904]">
                      <Factory className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-white">TKPI Line 4: Downtime</p>
                      <p className="mt-1 text-[11px] leading-4 text-[#d4c4b7]">
                        Sensor failure impacting group-level lumber output quotas.
                      </p>
                      <button className="mt-2 rounded bg-[#ffb4ab] px-3 py-1 text-[9px] font-black uppercase text-[#482904]">
                        Review Impact Map
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border-2 border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-amber-500/80 text-[#051424]">
                      <Truck className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-white">Port Congestion</p>
                      <p className="mt-1 text-[11px] leading-4 text-[#d4c4b7]">
                        Raw material buffer projected below 12d by Monday.
                      </p>
                      <button className="mt-2 text-[9px] font-black uppercase text-amber-400 underline decoration-2">
                        Alternate Routes
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#f2be8c]/10 border-l-[10px] border-l-[#f2be8c] bg-[#0d1c2d] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-3 text-[17px] font-black uppercase tracking-tight text-white">
                <Lightbulb className="h-7 w-7 text-[#f2be8c]" aria-hidden />
                Group Strategic Insights
              </h3>
              <div className="flex items-center gap-2 rounded-full border border-[#f2be8c]/30 bg-[#f2be8c]/20 px-3 py-1 font-mono text-[10px] font-black text-[#f2be8c]">
                <Sparkles className="h-4 w-4" aria-hidden /> Group Co-Pilot
              </div>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden">
              <div className="border-l-4 border-[#f2be8c]/30 pl-5">
                <p className="mb-2 text-[13px] font-black uppercase tracking-widest text-[#f2be8c]">
                  Inter-Divisional Optimization
                </p>
                <p className="text-[12px] leading-5 text-[#d4c4b7]">
                  <strong>Procurement:</strong> Resin procurement across divisions is{" "}
                  <span className="font-bold text-[#ffb4ab]">5.8% above target</span>.
                  Negotiating group-level contract could save{" "}
                  <span className="font-bold text-emerald-400">$2.1M/year</span>.
                </p>
              </div>
              <div className="border-l-4 border-emerald-500/30 pl-5">
                <p className="mb-2 text-[13px] font-black uppercase tracking-widest text-emerald-400">
                  Group Revenue Synergy
                </p>
                <p className="text-[12px] leading-5 text-[#d4c4b7]">
                  <strong>Market Shift:</strong> Global demand for Flooring Grade A is
                  outperforming panel boards. Re-allocate 15% raw log supply to TKPI
                  for stronger margins.
                </p>
              </div>
            </div>
          </article>
          </div>
            </section>

            <section className="grid min-h-0 grid-cols-2 gap-5">
              <article className="rounded-lg border border-[#f2be8c]/10 border-t-4 border-t-[#f2be8c]/30 bg-[#0d1c2d] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-[18px] font-black uppercase tracking-tight text-white">
                  Group Production Trend
                </h4>
                <p className="mt-1 text-[12px] text-[#d4c4b7]/60">
                  Consolidated Output (m3) - Year-over-Year
                </p>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-black text-emerald-400">1.34M m3</div>
                <div className="text-[11px] font-bold uppercase text-[#d4c4b7]/40">
                  Annual Group Total
                </div>
              </div>
            </div>
            <div className="flex h-[170px] items-end justify-between gap-3 px-1">
              {productionBars.map(([month, height]) => (
                <div className="flex h-full flex-1 flex-col items-center justify-end gap-4" key={month}>
                  <div
                    className={`w-full rounded transition ${
                      month === "OCT"
                        ? "bg-[#f2be8c]/80 shadow-[0_0_25px_rgba(242,190,140,0.4)]"
                        : month === "NOV" || month === "DEC"
                          ? "border-2 border-dashed border-white/10 bg-white/5"
                          : "bg-[#f2be8c]/20"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <span
                    className={`text-[12px] font-bold ${
                      month === "OCT" ? "text-[#f2be8c]" : "text-[#d4c4b7]/40"
                    }`}
                  >
                    {month}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[#f2be8c]/10 border-t-4 border-t-[#ffb4ab]/30 bg-[#0d1c2d] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-[18px] font-black uppercase tracking-tight text-white">
                  Group Cost vs. Budget
                </h4>
                <p className="mt-1 text-[12px] text-[#d4c4b7]/60">
                  Variance Analysis - Consolidated Regional View
                </p>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-black text-[#ffb4ab]">+$0.6M</div>
                <div className="text-[11px] font-bold uppercase text-[#d4c4b7]/40">
                  Over Group Budget
                </div>
              </div>
            </div>
            <div className="relative flex h-[170px] items-center">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 240">
                <path
                  d="M0,120 L1000,120"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="8,8"
                  strokeWidth="4"
                />
                <path
                  d="M0,150 Q100,160 200,130 T400,140 T600,80 T800,40 L900,20"
                  fill="none"
                  stroke="#ffb4ab"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <path
                  d="M0,150 Q100,160 200,130 T400,140 T600,80 T800,40 L900,20 L900,240 L0,240 Z"
                  fill="#ffb4ab"
                  opacity="0.1"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-12">
                <span className="w-fit bg-[#051424]/80 px-2 text-[12px] font-black uppercase text-[#d4c4b7]/40">
                  Expenditure Over Target
                </span>
                <span className="w-fit bg-[#051424]/80 px-2 text-[12px] font-black uppercase tracking-widest text-[#d4c4b7]/20">
                  Budget Baseline
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-between px-2">
              <span className="text-[12px] font-bold uppercase text-[#d4c4b7]/40">Q1</span>
              <span className="text-[12px] font-bold uppercase text-[#d4c4b7]/40">Q2</span>
              <span className="text-[12px] font-bold uppercase text-[#d4c4b7]/40">Q3</span>
              <span className="rounded bg-[#ffb4ab]/20 px-3 py-1 text-[12px] font-black uppercase text-white">
                Current Status
              </span>
            </div>
          </article>
        </section>
        </>
        )}
      </main>

      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-[#f2be8c]/5 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[800px] w-[800px] rounded-full bg-[#ffb4ab]/5 blur-[150px]" />
      </div>
    </div>
  );
}
