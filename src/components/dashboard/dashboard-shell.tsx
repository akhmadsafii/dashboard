"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  dashboardIcons,
  plants,
  tickerItems,
} from "@/lib/dashboard-data";
import type { DashboardMode, Plant } from "@/types/dashboard";

const {
  BarChart3,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Factory,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  WalletCards,
} = dashboardIcons;

type TimeState = {
  clock: string;
  date: string;
};

function formatTime(): TimeState {
  const now = new Date();

  return {
    clock: now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    date: now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function useLiveClock() {
  const [time, setTime] = useState<TimeState>({
    clock: "00.00.00",
    date: "Loading...",
  });

  useEffect(() => {
    setTime(formatTime());
    const interval = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "min-h-10 flex-1 rounded-md px-4 text-xs font-bold uppercase tracking-wider transition-colors sm:flex-none sm:px-5",
        active
          ? "bg-accent-blue text-white shadow-lg"
          : "text-on-surface-variant hover:text-white",
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PlantSelect({
  selectedPlantId,
  onPlantChange,
}: {
  selectedPlantId: string;
  onPlantChange: (plantId: string) => void;
}) {
  return (
    <div className="min-w-56">
      <select
        className="h-10 w-full rounded-lg border border-white/10 bg-primary-container px-3 text-sm font-bold text-white outline-none transition-colors focus:border-accent-blue"
        value={selectedPlantId}
        onChange={(event) => onPlantChange(event.target.value)}
      >
        {plants.map((plant) => (
          <option key={plant.id} value={plant.id}>
            {plant.name} - {plant.location}
          </option>
        ))}
      </select>
    </div>
  );
}

function PlantChecklist({
  selectedPlantIds,
  onPlantToggle,
}: {
  selectedPlantIds: string[];
  onPlantToggle: (plantId: string) => void;
}) {
  const selectedLabel =
    selectedPlantIds.length === plants.length
      ? "Semua Plant"
      : `${selectedPlantIds.length} Plant`;

  return (
    <details className="group isolate relative min-w-56">
      <summary className="flex h-10 cursor-pointer list-none items-center justify-between rounded-lg border border-white/10 bg-primary-container px-3 text-sm font-bold text-white outline-none transition-colors hover:border-accent-blue">
        <span>{selectedLabel}</span>
        <ChevronRight
          className="h-4 w-4 rotate-90 text-on-surface-variant transition-transform group-open:-rotate-90"
          aria-hidden
        />
      </summary>
      <div style={{zIndex: 50}} className="absolute left-0 top-12 w-72 rounded-xl border border-white/10 bg-surface-container p-3 shadow-2xl">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
          Checklist Plant
        </div>
        <div className="space-y-2">
          {plants.map((plant) => {
            const checked = selectedPlantIds.includes(plant.id);

            return (
              <label
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                key={plant.id}
              >
                <input
                  checked={checked}
                  className="h-4 w-4 rounded border-white/20 bg-primary-container text-accent-blue focus:ring-accent-blue"
                  type="checkbox"
                  onChange={() => onPlantToggle(plant.id)}
                />
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    {plant.name}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                    {plant.location}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </details>
  );
}

function DashboardHeader({
  mode,
  selectedPlantId,
  selectedPlantIds,
  time,
  onModeChange,
  onPlantChange,
  onPlantToggle,
}: {
  mode: DashboardMode;
  selectedPlantId: string;
  selectedPlantIds: string[];
  time: TimeState;
  onModeChange: (mode: DashboardMode) => void;
  onPlantChange: (plantId: string) => void;
  onPlantToggle: (plantId: string) => void;
}) {
  return (
    <nav style={{zIndex: 40}} className="isolate flex flex-col gap-5 border-b border-white/5 bg-surface/50 px-5 py-5 shadow-md backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-8">
        <div className="flex min-w-64 flex-col">
          <h1 className="flex items-center gap-2 text-3xl font-black uppercase tracking-tight text-white lg:text-4xl">
            <span className="text-accent-blue">DSN</span> Group
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant">
            Wood Product Division
          </span>
        </div>

        <div className="hidden h-12 w-px bg-white/10 xl:block" />

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col">
            <span className="font-mono text-3xl font-black tracking-tighter lg:text-4xl">
              {time.clock}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
              {time.date}
            </span>
          </div>
          <div className="flex min-w-56 flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
              {mode === "single" ? "Pilih Plant" : "Compare Plant"}
            </span>
            {mode === "single" ? (
              <PlantSelect
                selectedPlantId={selectedPlantId}
                onPlantChange={onPlantChange}
              />
            ) : (
              <PlantChecklist
                selectedPlantIds={selectedPlantIds}
                onPlantToggle={onPlantToggle}
              />
            )}
          </div>
        </div>

        <div className="flex w-full max-w-md items-center rounded-lg border border-white/10 bg-white/5 p-1 sm:w-auto mt-5">
          <ModeButton
            active={mode === "comparison"}
            onClick={() => onModeChange("comparison")}
          >
            Multi
          </ModeButton>
          <ModeButton
            active={mode === "single"}
            onClick={() => onModeChange("single")}
          >
            Single
          </ModeButton>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5 lg:justify-end xl:gap-8">
        <div className="flex rounded-lg border border-white/10 bg-white/5 p-1 text-[11px] font-black uppercase tracking-wider">
          <Link
            className="rounded bg-accent-blue px-3 py-2 text-white"
            href="/dashboard-1"
          >
            Dashboard 1
          </Link>
          <Link
            className="rounded px-3 py-2 text-on-surface-variant transition-colors hover:text-white"
            href="/dashboard-2"
          >
            Dashboard 2
          </Link>
        </div>
        <div className="flex items-center gap-5 text-white/40">
          <LayoutDashboard className="h-7 w-7 fill-current" aria-hidden />
          <BarChart3 className="h-7 w-7" aria-hidden />
          <ShieldCheck className="h-7 w-7 text-success" aria-hidden />
        </div>
      </div>
    </nav>
  );
}

function formatRevenueB(value: number) {
  return `Rp ${value.toFixed(1)}B`;
}

function ComparisonDashboard({
  selectedPlants,
}: {
  selectedPlants: Plant[];
}) {
  const aggregateRevenue = selectedPlants.reduce(
    (total, plant) => total + plant.comparison.revenueB,
    0,
  );

  return (
    <main className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-5 lg:grid-cols-12 lg:grid-rows-[minmax(18rem,1fr)_minmax(18rem,1fr)] lg:gap-8 lg:p-10">
      <Link
        href="/dashboard/sales"
        className="glass-card group relative flex min-h-80 flex-col overflow-hidden rounded-xl p-6 lg:col-span-4 lg:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-accent-blue/10 p-3 text-accent-blue">
              <CircleDollarSign className="h-8 w-8" aria-hidden />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Sales Performance
            </h2>
          </div>
          <div className="rounded bg-accent-blue/10 px-2 py-1 text-[10px] font-bold text-accent-blue">
            {selectedPlants.length} PLANT
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5">
          <div className="space-y-3">
            {selectedPlants.map((plant) => (
              <div
                className="rounded-lg border border-white/5 bg-white/5 p-4"
                key={plant.id}
              >
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <span className="comparison-label text-accent-blue">
                      {plant.name}
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      {plant.location}
                    </p>
                  </div>
                  <span className="rounded bg-success/10 px-2 py-1 text-[10px] font-black text-success">
                    {plant.growth}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <span className="text-3xl font-black tracking-tighter">
                    {plant.revenue}
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">
                    Target {plant.target}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Aggregate Selected Revenue
            </span>
            <div className="text-2xl font-black">
              {formatRevenueB(aggregateRevenue)}
            </div>
          </div>
        </div>
      </Link>

      <Link
        href="/dashboard/production"
        className="glass-card group flex min-h-80 flex-col rounded-xl p-6 lg:col-span-5 lg:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-success/10 p-3 text-success">
              <Factory className="h-8 w-8" aria-hidden />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Production Volume
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            <span className="h-2 w-2 rounded-full bg-success" />
            Active Shift 01
          </div>
        </div>

        <div className="grid flex-1 content-center gap-4">
          {selectedPlants.map((plant) => (
            <div
              className="rounded-lg border border-white/5 bg-white/5 p-4"
              key={plant.id}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <span className="comparison-label text-success">
                    {plant.name}
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                    Produksi terhadap kapasitas
                  </p>
                </div>
                <span className="text-3xl font-black">
                  {plant.comparison.production}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-success"
                  style={{ width: `${plant.comparison.production}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Link
        href="/dashboard/raw-material"
        className="glass-card group flex min-h-80 flex-col rounded-xl p-6 lg:col-span-3 lg:p-8"
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-lg bg-warning/10 p-3 text-warning">
            <Boxes className="h-8 w-8" aria-hidden />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">
            Raw Material
          </h2>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-4">
            {selectedPlants.map((plant) => (
              <div
                key={plant.id}
                className="rounded-lg border border-white/5 bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="comparison-label text-warning">
                    {plant.name}
                  </span>
                  <span className="text-xs font-bold">
                    {plant.comparison.rawDays} Hari
                  </span>
                </div>
                <div className="text-2xl font-black">
                  {plant.comparison.rawMaterial}{" "}
                  <span className="text-[10px] font-medium text-on-surface-variant">
                    / Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>

      <Link
        href="/dashboard/cost"
        className="glass-card group flex min-h-80 flex-col rounded-xl p-6 lg:col-span-6 lg:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-error/10 p-3 text-error">
              <WalletCards className="h-8 w-8" aria-hidden />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Cost Analysis
            </h2>
          </div>
        </div>

        <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedPlants.map((plant) => (
            <div
              key={plant.id}
              className="flex flex-col justify-between rounded-lg border border-white/5 bg-white/5 p-5"
            >
              <div>
                <span className="comparison-label mb-2 block text-error">
                  {plant.name}
                </span>
                <span className="text-4xl font-black tracking-tighter">
                  {plant.comparison.cost}
                </span>
              </div>
              <span
                className={clsx(
                  "mt-5 text-xs font-black uppercase tracking-wider",
                  plant.comparison.costNote.includes("atas")
                    ? "text-error"
                    : "text-success",
                )}
              >
                {plant.comparison.costNote}
              </span>
            </div>
          ))}
        </div>
      </Link>

      <Link
        href="/dashboard/hr"
        className="glass-card group flex min-h-80 flex-col rounded-xl p-6 lg:col-span-6 lg:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-accent-blue/10 p-3 text-accent-blue">
              <UsersRound className="h-8 w-8" aria-hidden />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              HR Productivity
            </h2>
          </div>
        </div>

        <div className="grid flex-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {selectedPlants.map((plant) => (
            <div
              key={plant.id}
              className="flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-5 xl:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="comparison-label text-accent-blue">
                  {plant.name}
                </span>
                <span className="rounded bg-success/20 px-2 py-0.5 text-[10px] font-black text-success">
                  {plant.comparison.hr}
                </span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant">
                    Attendance
                  </p>
                  <p className="text-3xl font-black">{plant.comparison.hr}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant">
                    Efficiency
                  </p>
                  <p className="text-3xl font-black">
                    {plant.comparison.efficiency}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-accent-blue/20 bg-accent-blue/10 p-3">
                <p className="mb-1 text-center text-[10px] font-bold uppercase text-accent-blue">
                  HR Index
                </p>
                <p className="text-center text-4xl font-black">
                  {plant.comparison.hr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </main>
  );
}

function Gauge({ value }: { value: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative h-48 w-48">
      <svg className="h-full w-full -rotate-90">
        <circle
          className="text-primary-container"
          cx="96"
          cy="96"
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
        />
        <circle
          className="chart-glow text-secondary-container"
          cx="96"
          cy="96"
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="12"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black">{value}%</span>
        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Target
        </span>
      </div>
    </div>
  );
}

function RegionalFocus({ plant }: { plant: Plant }) {
  return (
    <section className="glass-card group relative overflow-hidden rounded-xl p-6 lg:col-span-3">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        Konsentrasi Wilayah
      </h3>
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-primary-container">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute left-[18%] top-[30%] h-16 w-32 -rotate-12 rounded-[60%] border border-secondary-container/50 bg-secondary-container/15 blur-[1px]" />
        <div className="absolute left-[42%] top-[42%] h-10 w-40 rotate-6 rounded-[60%] border border-secondary-fixed-dim/50 bg-secondary-fixed-dim/10 blur-[1px]" />
        <div className="absolute left-[64%] top-[23%] h-16 w-24 rotate-12 rounded-[60%] border border-success/40 bg-success/10 blur-[1px]" />
        <span className="absolute left-[46%] top-[47%] h-3 w-3 rounded-full bg-secondary-container shadow-[0_0_18px_rgba(33,112,228,0.95)]" />
        <span className="absolute left-[34%] top-[57%] h-2.5 w-2.5 rounded-full bg-secondary-fixed-dim shadow-[0_0_14px_rgba(173,198,255,0.85)]" />
        <span className="absolute left-[69%] top-[35%] h-2 w-2 rounded-full bg-success shadow-[0_0_14px_rgba(16,185,129,0.8)]" />
        <MapPinned
          className="absolute bottom-4 right-4 h-8 w-8 text-secondary-fixed-dim"
          aria-hidden
        />
      </div>

      <ul className="space-y-3">
        {plant.regions.map((region) => (
          <li
            className="flex items-center justify-between gap-4"
            key={region.name}
          >
            <span className="text-sm font-semibold text-white">
              {region.name}
            </span>
            <span
              className={clsx(
                "rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider",
                region.highlight
                  ? "bg-secondary-container/20 text-secondary-fixed"
                  : "text-on-surface-variant",
              )}
            >
              {region.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SingleDashboard({ plant }: { plant: Plant }) {
  return (
    <main className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 lg:gap-6 lg:p-8">
      <div className="grid gap-5 lg:h-[34%] lg:grid-cols-12 lg:gap-6">
        <section className="glass-card relative flex min-h-80 items-center justify-between overflow-hidden rounded-xl p-6 lg:col-span-8 lg:p-8">
          <div className="relative z-10 max-w-2xl">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Total Pendapatan YTD
            </h2>
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-5xl font-black leading-tight tracking-tight text-white lg:text-[64px]">
                {plant.revenue}
              </span>
              <div className="flex items-center gap-1 text-secondary-fixed">
                <TrendingUp className="h-6 w-6" aria-hidden />
                <span className="text-lg font-black">{plant.growth}</span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-on-surface-variant">
              {plant.targetNote}
            </p>
          </div>

          <div className="relative z-10 hidden h-full items-center justify-center md:flex md:w-1/3">
            <Gauge value={plant.target} />
          </div>
          <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-secondary-container/10 blur-3xl" />
        </section>

        <section className="glass-card flex min-h-80 flex-col justify-between rounded-xl p-6 lg:col-span-4">
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Breakdown Produk
            </h3>
            <div className="space-y-6">
              {plant.products.map((product) => (
                <div key={product.name}>
                  <div className="mb-2 flex items-end justify-between gap-4">
                    <div>
                      <span className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                        {product.name}
                      </span>
                      <span className="text-2xl font-black text-white">
                        {product.revenue}
                      </span>
                    </div>
                    <span className="text-lg font-black text-on-surface-variant">
                      {product.percent}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-primary-container">
                    <div
                      className={clsx("h-full", product.color)}
                      style={{ width: `${product.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid flex-1 gap-5 lg:min-h-0 lg:grid-cols-12 lg:gap-6">
        <section className="glass-card flex min-h-96 flex-col rounded-xl p-6 lg:col-span-9 lg:p-8">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                Tren Penjualan Bulanan vs Target
              </h3>
              <p className="text-sm text-on-surface-variant">
                Visualisasi komparatif real-time periode Januari - Mei 2026
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-secondary-container" />
                <span className="text-xs font-bold text-on-surface-variant">
                  Aktual
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-outline" />
                <span className="text-xs font-bold text-on-surface-variant">
                  Target
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-end gap-4 px-1 sm:gap-6 sm:px-4">
            {plant.trend.map((item) => (
              <div
                className="flex h-full flex-1 flex-col justify-end gap-2"
                key={item.month}
              >
                <div className="flex h-full items-end gap-1">
                  <div
                    className="w-full rounded-t-sm bg-outline opacity-25"
                    style={{ height: `${item.target}%` }}
                  />
                  <div
                    className={clsx(
                      "w-full rounded-t-sm bg-secondary-container",
                      item.actual > item.target && "chart-glow shadow-lg",
                    )}
                    style={{ height: `${item.actual}%` }}
                  />
                </div>
                <span className="text-center text-xs font-bold text-on-surface-variant">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        <RegionalFocus plant={plant} />
      </div>

      <div className="grid gap-5 lg:h-32 lg:grid-cols-4 lg:gap-6">
        {plant.quickStats.map((stat) => {
          const Icon = dashboardIcons[stat.icon as keyof typeof dashboardIcons];

          return (
            <section
              className={clsx(
                "glass-card flex min-h-32 flex-col justify-between rounded-xl border-l-4 p-4",
                stat.tone,
              )}
              key={stat.label}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                {stat.label}
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="text-2xl font-black text-white">
                  {stat.value}
                </span>
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              {"progress" in stat ? (
                <div className="h-1 w-full rounded-full bg-primary-container">
                  <div
                    className="h-full rounded-full bg-secondary-container"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                <span className="text-xs font-bold text-on-surface-variant">
                  {stat.note}
                </span>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}

function LiveTicker({ mode }: { mode: DashboardMode }) {
  const duplicatedTicker = useMemo(() => [...tickerItems, ...tickerItems], []);

  if (mode === "single") {
    return (
      <footer className="flex h-12 items-center overflow-hidden border-t border-white/10 bg-primary-container">
        <div className="z-10 flex h-full items-center bg-secondary-container px-6 shadow-lg">
          <span className="whitespace-nowrap text-xs font-black uppercase tracking-wider text-white">
            Pemberitahuan Live
          </span>
        </div>
        <div className="relative flex h-full flex-1 items-center overflow-hidden">
          <div className="inline-flex animate-ticker items-center gap-24 whitespace-nowrap pl-8">
            {duplicatedTicker.map((item, index) => {
              const Icon =
                dashboardIcons[item.icon as keyof typeof dashboardIcons];

              return (
                <div
                  className="inline-flex items-center gap-3 text-sm font-medium text-slate-300"
                  key={`${item.text}-${index}`}
                >
                  <Icon className="h-5 w-5 text-secondary-fixed" aria-hidden />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="z-10 flex h-full items-center border-l border-white/10 bg-primary-container px-6">
          <span className="text-xs font-bold uppercase text-on-surface-variant">
            Live Feed
          </span>
        </div>
      </footer>
    );
  }

  return (
    <div className="w-full overflow-hidden border-t border-white/5 bg-surface/80 py-3 backdrop-blur-md">
      <div className="inline-block whitespace-nowrap pr-[100%] animate-ticker">
        {duplicatedTicker.map((item, index) => {
          const Icon =
            dashboardIcons[item.icon as keyof typeof dashboardIcons];

          return (
            <div
              className="inline-flex items-center gap-3 px-12 text-base font-medium text-slate-400"
              key={`${item.text}-${index}`}
            >
              <Icon className={clsx("h-5 w-5", item.tone)} aria-hidden />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DashboardShell() {
  const [mode, setMode] = useState<DashboardMode>("comparison");
  const [selectedPlantId, setSelectedPlantId] = useState<string>(plants[0].id);
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>(
    plants.map((plant) => plant.id),
  );
  const time = useLiveClock();
  const selectedPlant =
    plants.find((plant) => plant.id === selectedPlantId) ?? plants[0];
  const selectedPlants = plants.filter((plant) =>
    selectedPlantIds.includes(plant.id),
  );

  function handlePlantToggle(plantId: string) {
    setSelectedPlantIds((current) => {
      if (current.includes(plantId)) {
        return current.length === 1
          ? current
          : current.filter((id) => id !== plantId);
      }

      return [...current, plantId];
    });
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden text-on-background">
      <DashboardHeader
        mode={mode}
        selectedPlantId={selectedPlantId}
        selectedPlantIds={selectedPlantIds}
        time={time}
        onModeChange={setMode}
        onPlantChange={setSelectedPlantId}
        onPlantToggle={handlePlantToggle}
      />

      {mode === "single" ? (
        <SingleDashboard plant={selectedPlant} />
      ) : (
        <ComparisonDashboard selectedPlants={selectedPlants} />
      )}

      <LiveTicker mode={mode} />
    </div>
  );
}
