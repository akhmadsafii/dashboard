import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { GroupKPI } from "@/types";

interface ExecutiveKPIsProps {
  kpis: GroupKPI[];
}

export function ExecutiveKPIs({ kpis }: ExecutiveKPIsProps) {
  return (
    <section className="grid grid-cols-5 gap-5">
      {kpis.map((kpi) => (
        <article
          className={`rounded-lg border border-[#f2be8c]/10 bg-[#0d1c2d] p-5 shadow-xl backdrop-blur-xl ${
            kpi.alert ? "border-l-[6px] border-l-[#ffb4ab]" : "border-l-[6px] border-l-[#f2be8c]"
          }`}
          key={kpi.label}
        >
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#d4c4b7]">
            {kpi.label}
          </p>
          <div className="mb-3 text-[34px] font-black leading-none tracking-tight text-white">
            {kpi.value}
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <span
              className={`text-[14px] font-extrabold ${
                kpi.positive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {kpi.variance}
            </span>
            <span className="text-[12px] font-medium text-[#d4c4b7]/60">
              {kpi.note}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
