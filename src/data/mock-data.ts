import type {
  GroupKPI,
  RegionData,
  ProductionDashboardData,
  DashboardTwoRegion,
  DashboardTwoBusinessUnit,
  PlantStatus,
} from "@/types";

// Group KPIs for Executive Summary
export const groupKPIs: GroupKPI[] = [
  {
    label: "Group Sales Revenue",
    value: "$42.8M",
    variance: "+5.2%",
    note: "TGT $40.7M",
    positive: true,
    alert: false,
  },
  {
    label: "Group Production",
    value: "112k m3",
    variance: "-1.4%",
    note: "TGT 114k",
    positive: false,
    alert: false,
  },
  {
    label: "Group Op. Cost",
    value: "$12.4M",
    variance: "+4.8%",
    note: "BUDGET $11.8M",
    positive: false,
    alert: true,
  },
  {
    label: "Raw Material Inv.",
    value: "18.2d",
    variance: "Optimal Buffer",
    note: "LIMIT 20d",
    positive: true,
    alert: false,
  },
  {
    label: "Productivity Idx",
    value: "0.94",
    variance: "+2.1%",
    note: "VS PREV MONTH",
    positive: true,
    alert: false,
  },
];

// Sales Region Data (dynamic based on region selection)
export const regionSalesData: Record<DashboardTwoRegion, RegionData> = {
  "Global View": {
    sales: "$24.2M",
    target: "$22M",
    growth: "+12.4%",
    plants: [
      { name: "Plant A (TKPI)", sales: "$12.4M", volume: "48.2k m²", achievement: 92, status: "Target", statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
      { name: "Plant B (Panel)", sales: "$8.2M", volume: "32.1k m²", achievement: 78, status: "Critical", statusClass: "border-[#ffb4ab]/20 bg-[#ffb4ab]/10 text-[#ffb4ab]" },
      { name: "Plant C (Veneer)", sales: "$3.6M", volume: "13.9k m²", achievement: 105, status: "Optimal", statusClass: "border-[#f2be8c]/20 bg-[#f2be8c]/10 text-[#f2be8c]" },
    ],
    regions: [["SEA", 105, "bg-emerald-500"], ["DOM", 95, "bg-[#f2be8c]"], ["EU", 88, "bg-[#f2be8c]"]],
  },
  "SEA Region": {
    sales: "$9.8M",
    target: "$8.5M",
    growth: "+18.2%",
    plants: [
      { name: "Plant A (TKPI)", sales: "$5.2M", volume: "21.4k m²", achievement: 98, status: "Target", statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
      { name: "Plant C (Veneer)", sales: "$4.6M", volume: "18.2k m²", achievement: 112, status: "Optimal", statusClass: "border-[#f2be8c]/20 bg-[#f2be8c]/10 text-[#f2be8c]" },
    ],
    regions: [["ID", 112, "bg-emerald-500"], ["MY", 98, "bg-[#f2be8c]"], ["SG", 95, "bg-[#f2be8c]"]],
  },
  "North America": {
    sales: "$6.4M",
    target: "$7.2M",
    growth: "-6.8%",
    plants: [
      { name: "Plant B (Panel)", sales: "$4.8M", volume: "18.5k m²", achievement: 68, status: "Critical", statusClass: "border-[#ffb4ab]/20 bg-[#ffb4ab]/10 text-[#ffb4ab]" },
      { name: "Plant A (TKPI)", sales: "$1.6M", volume: "5.8k m²", achievement: 85, status: "Watch", statusClass: "border-amber-500/20 bg-amber-500/10 text-amber-400" },
    ],
    regions: [["US-W", 72, "bg-[#ffb4ab]"], ["US-E", 65, "bg-[#ffb4ab]"]],
  },
  "Europe": {
    sales: "$8.0M",
    target: "$6.5M",
    growth: "+24.6%",
    plants: [
      { name: "Plant A (TKPI)", sales: "$5.8M", volume: "22.8k m²", achievement: 118, status: "Optimal", statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
      { name: "Plant C (Veneer)", sales: "$2.2M", volume: "8.5k m²", achievement: 102, status: "Target", statusClass: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
    ],
    regions: [["DE", 122, "bg-emerald-500"], ["FR", 108, "bg-[#f2be8c]"], ["UK", 95, "bg-[#f2be8c]"]],
  },
};

// Period multipliers for time period scaling
export const periodMultipliers: Record<string, number> = {
  "Last 7 Days": 0.23,
  "Last 30 Days": 1,
  "Last 90 Days": 2.8,
  "YTD": 4.2,
};

// Filter plants by business unit
export const filterPlantsByBusinessUnit = (
  plants: RegionData["plants"],
  businessUnit: DashboardTwoBusinessUnit
): RegionData["plants"] => {
  switch (businessUnit) {
    case "TKPI Floor Division":
      return plants.filter((p) => p.name.includes("TKPI") || p.name.includes("Veneer"));
    case "Panel Division":
      return plants.filter((p) => p.name.includes("Panel"));
    default:
      return plants;
  }
};

// Get status color helper
export const getStatusColor = (status: PlantStatus | string): string => {
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
};

// Production Dashboard Mock Data
export const productionDashboardData: ProductionDashboardData = {
  output: { value: "842.1k", unit: "M³", target: "+4.2%" },
  oee: { value: "88.4", unit: "%", progress: 88.4 },
  energy: { value: "14.2", unit: "kWh/M³", status: "Optimized" },
  downtime: { value: "12.4", unit: "HOURS", trend: "Improving" },
  quality: { value: "99.2", unit: "%", status: "Within Tolerance" },
  plants: [
    {
      division: "WOOD FLOORING DIVISION",
      items: [
        { name: "Plant A (Jakarta North)", output: "214,500", oee: "91.2%", gap: "-1.2%", yield: "98.5%", status: "Optimal", trend: [50, 67, 75, 100, 83] },
        { name: "Plant B (Surabaya)", output: "182,000", oee: "76.4%", gap: "+8.4%", yield: "92.1%", status: "Critical", trend: [100, 75, 50, 33, 25] },
      ],
    },
    {
      division: "PANEL DIVISION",
      items: [
        { name: "Main Hub (Central)", output: "345,200", oee: "88.9%", gap: "+2.1%", yield: "96.8%", status: "Alert", trend: [50, 67, 75, 50, 67] },
      ],
    },
    {
      division: "WOOD PELLET BASE",
      items: [
        { name: "Pellet Unit 1", output: "100,400", oee: "94.2%", gap: "-4.2%", yield: "99.1%", status: "Optimal", trend: [100, 100, 100, 100, 100] },
      ],
    },
  ],
  anomalies: [
    { type: "Critical", color: "#ef4444", bgColor: "bg-red-500/20", borderColor: "border-red-500/30", shadowColor: "rgba(239, 68, 68, 0.15)", message: "Line 4 Bearing Overheat at TKPI Floor Plant A. Immediate inspection required." },
    { type: "Alert", color: "#f59e0b", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", shadowColor: "rgba(245, 158, 11, 0.1)", message: "Glue Shortage in Panel Hub. Inventory levels at 8%." },
    { type: "Notice", color: "#d4c4b7", bgColor: "bg-white/5", borderColor: "border-white/10", shadowColor: "", message: "Power fluctuation detected in Surabaya plant. No impact to output yet." },
  ],
  skus: [
    { name: "Oak Engineered Floor 15mm", division: "Wood Flooring Div", volume: "42,000 M²", eff: "94%" },
    { name: "Standard Plywood Grade A", division: "Panel Division", volume: "38,500 M²", eff: "91%" },
    { name: "Eco-Pellet Industrial", division: "Wood Pellet Base", volume: "12,100 M³", eff: "98%" },
  ],
  machines: [
    { name: "LINE 04 - CALIBRATION UNIT", health: 92, status: "SERVICE REQUIRED", statusColor: "text-red-500" },
    { name: "LINE 01 - MAIN PRESS", health: 24, status: "OPTIMAL", statusColor: "text-[#f2be8c]" },
    { name: "LINE 08 - FINISHING", health: 0, status: "IDLE", statusColor: "text-[#d4c4b7]" },
  ],
};
